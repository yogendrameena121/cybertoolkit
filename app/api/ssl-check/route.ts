import { NextRequest, NextResponse } from "next/server";
import * as tls from "tls";

export async function POST(request: NextRequest) {
  const { domain } = await request.json();

  if (!domain) {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  const cleanDomain = domain.replace(/^https?:\/\//, "").split("/")[0].trim();

  try {
    const cert = await checkSSLCertificate(cleanDomain);
    return NextResponse.json(cert);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to check SSL certificate",
      },
      { status: 500 }
    );
  }
}

function checkSSLCertificate(domain: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      host: domain,
      port: 443,
      servername: domain,
    };

    const socket = tls.connect(options, () => {
      const cert = socket.getPeerCertificate();

      if (!cert || Object.keys(cert).length === 0) {
        socket.destroy();
        reject(new Error("Unable to retrieve certificate"));
        return;
      }

      const validFrom = new Date(cert.valid_from);
      const validTo = new Date(cert.valid_to);
      const now = new Date();
      const daysRemaining = Math.ceil(
        (validTo.getTime() - now.getTime()) / 86400000
      );

      socket.destroy();

      resolve({
        domain,
        valid: validTo > now,
        validFrom: validFrom.toLocaleDateString("en-US", { dateStyle: "long" }),
        validTo: validTo.toLocaleDateString("en-US", { dateStyle: "long" }),
        daysRemaining,
        issuer: cert.issuer?.O || "Unknown",
        subject: cert.subject?.CN || domain,
        sans: parseSANs(cert),
        protocol: "TLS 1.2+",
      });
    });

    socket.on("error", (error) => {
      socket.destroy();
      reject(error);
    });

    socket.setTimeout(10000, () => {
      socket.destroy();
      reject(new Error("Connection timeout"));
    });
  });
}

function parseSANs(cert: any): string[] {
  const altNames = cert.subjectAltName || "";
  if (!altNames) return [];

  return altNames
    .split(", ")
    .map((san: string) => san.replace("DNS:", ""))
    .filter((san: string) => san.trim());
}
