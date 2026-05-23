import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Syne } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "CyberToolkit — Free Online Security & Developer Tools",
    template: "%s | CyberToolkit",
  },
  verification: {
    google: "googled8eb57b155f5ff7b",
  },
  description:
    "Free browser-based security tools: hash generators, Base64 encoder/decoder, password strength meter, JWT decoder, IP lookup, and more. No data sent to servers. Fast, private, open.",
  keywords: [
    "cybersecurity tools",
    "hash generator",
    "base64 encoder",
    "password strength",
    "jwt decoder",
    "ip lookup",
    "security tools online",
    "developer tools",
  ],
  authors: [{ name: "CyberToolkit" }],
  creator: "CyberToolkit",
  metadataBase: new URL("https://cybertoolkit-nu.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cybertoolkit-nu.vercel.app",
    siteName: "CyberToolkit",
    title: "CyberToolkit — Free Online Security & Developer Tools",
    description:
      "Free browser-based security tools. No data sent to servers. Fast, private, open.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CyberToolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberToolkit — Free Online Security & Developer Tools",
    description:
      "Free browser-based security tools. No data sent to servers. Fast, private, open.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      {/* Google AdSense — replace ca-pub-XXXX with your publisher ID */}
      {process.env.NODE_ENV === "production" && (
        <head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6535660175745534"
            crossOrigin="anonymous"
          />
        </head>
      )}
      <body
        className={`${jetbrainsMono.variable} ${syne.variable} ${inter.variable} min-h-screen bg-[#050d1a] text-slate-100 antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          {/* Ambient background glow */}
          <div
            className="pointer-events-none fixed inset-0 z-0"
            aria-hidden="true"
          >
            <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[#00ff88] opacity-[0.03] blur-3xl" />
            <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-[#00d4ff] opacity-[0.03] blur-3xl" />
          </div>

          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0d1f35",
              border: "1px solid rgba(0,255,136,0.2)",
              color: "#e2e8f0",
            },
          }}
        />
      </body>
    </html>
  );
}
