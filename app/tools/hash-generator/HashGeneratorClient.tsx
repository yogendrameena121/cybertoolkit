"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, FileText, X, Hash } from "lucide-react";
import { CopyButton } from "@/components/tools/CopyButton";

// MD5 implementation (pure JS, no library needed for basic use)
function md5(input: string): string {
  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function binlMD5(x: number[], len: number): number[] {
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    let i: number, olda: number, oldb: number, oldc: number, oldd: number;
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (i = 0; i < x.length; i += 16) {
      olda = a; oldb = b; oldc = c; oldd = d;
      a = md5ff(a, b, c, d, x[i], 7, -680876936); d = md5ff(d, a, b, c, x[i + 1], 12, -389564586); c = md5ff(c, d, a, b, x[i + 2], 17, 606105819); b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897); d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426); c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341); b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416); d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417); c = md5ff(c, d, a, b, x[i + 10], 17, -42063); b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682); d = md5ff(d, a, b, c, x[i + 13], 12, -40341101); c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290); b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510); d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632); c = md5gg(c, d, a, b, x[i + 11], 14, 643717713); b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691); d = md5gg(d, a, b, c, x[i + 10], 9, 38016083); c = md5gg(c, d, a, b, x[i + 15], 14, -660478335); b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438); d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690); c = md5gg(c, d, a, b, x[i + 3], 14, -187363961); b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467); d = md5gg(d, a, b, c, x[i + 2], 9, -51403784); c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473); b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5hh(a, b, c, d, x[i + 5], 4, -378558); d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463); c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562); b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060); d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353); c = md5hh(c, d, a, b, x[i + 7], 16, -155497632); b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174); d = md5hh(d, a, b, c, x[i], 11, -358537222); c = md5hh(c, d, a, b, x[i + 3], 16, -722521979); b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487); d = md5hh(d, a, b, c, x[i + 12], 11, -421815835); c = md5hh(c, d, a, b, x[i + 15], 16, 530742520); b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5ii(a, b, c, d, x[i], 6, -198630844); d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415); c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905); b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571); d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606); c = md5ii(c, d, a, b, x[i + 10], 15, -1051523); b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359); d = md5ii(d, a, b, c, x[i + 15], 10, -30611744); c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380); b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070); d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379); c = md5ii(c, d, a, b, x[i + 2], 15, 718787259); b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safeAdd(a, olda); b = safeAdd(b, oldb); c = safeAdd(c, oldc); d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }
  function binl2rstr(input: number[]): string {
    let output = '';
    for (let i = 0; i < input.length * 32; i += 8) output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
    return output;
  }
  function rstr2binl(input: string): number[] {
    const output: number[] = Array(input.length >> 2).fill(0);
    for (let i = 0; i < input.length * 8; i += 8) output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
    return output;
  }
  function rstrMD5(s: string): string { return binl2rstr(binlMD5(rstr2binl(s), s.length * 8)); }
  function rstr2hex(input: string): string {
    const hexTab = '0123456789abcdef'; let output = '';
    for (let i = 0; i < input.length; i++) { const x = input.charCodeAt(i); output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f); }
    return output;
  }
  function str2rstrUTF8(input: string): string {
    return unescape(encodeURIComponent(input));
  }
  return rstr2hex(rstrMD5(str2rstrUTF8(input)));
}

// SHA hash via Web Crypto API
async function sha(algorithm: string, data: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface HashResult {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

const HASH_INFO = [
  { key: "md5" as const, label: "MD5", bits: 128, chars: 32, status: "⚠ Broken" },
  { key: "sha1" as const, label: "SHA-1", bits: 160, chars: 40, status: "⚠ Deprecated" },
  { key: "sha256" as const, label: "SHA-256", bits: 256, chars: 64, status: "✓ Secure" },
  { key: "sha512" as const, label: "SHA-512", bits: 512, chars: 128, status: "✓ Secure" },
];

export function HashGeneratorClient() {
  const [tab, setTab] = useState<"text" | "file">("text");
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [hashes, setHashes] = useState<HashResult | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const computeFromBuffer = useCallback(async (buffer: ArrayBuffer, textForMd5?: string) => {
    setLoading(true);
    try {
      const [sha1, sha256, sha512] = await Promise.all([
        sha("SHA-1", buffer),
        sha("SHA-256", buffer),
        sha("SHA-512", buffer),
      ]);
      const md5Hash = textForMd5 !== undefined ? md5(textForMd5) : (() => {
        // For files, compute MD5 from buffer
        const view = new Uint8Array(buffer);
        const str = Array.from(view).map(b => String.fromCharCode(b)).join('');
        return md5(str);
      })();
      setHashes({ md5: md5Hash, sha1, sha256, sha512 });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Compute on text change
  useEffect(() => {
    if (tab !== "text") return;
    if (!input) { setHashes(null); return; }
    const encoded = new TextEncoder().encode(input);
    computeFromBuffer(encoded.buffer, input);
  }, [input, tab, computeFromBuffer]);

  // Handle file select
  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    const buffer = await f.arrayBuffer();
    computeFromBuffer(buffer);
  }, [computeFromBuffer]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  return (
    <div className="space-y-5">
      {/* Tab switcher */}
      <div className="flex rounded-lg border border-[#0d2a1f] bg-[#050d1a] p-1">
        {(["text", "file"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setHashes(null); setInput(""); setFile(null); }}
            className={`flex flex-1 items-center justify-center gap-2 rounded py-2 text-sm font-medium transition-all ${
              tab === t
                ? "bg-[#00ff88]/10 text-[#00ff88]"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {t === "text" ? <Hash className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
            {t === "text" ? "Hash Text" : "Hash File"}
          </button>
        ))}
      </div>

      {/* Input */}
      {tab === "text" ? (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-400">Input Text</label>
            {input && <span className="font-mono text-xs text-slate-600">{input.length} chars</span>}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text to hash..."
            rows={4}
            className="w-full resize-y rounded-lg border border-[#0d2a1f] bg-[#050d1a] px-4 py-3 font-mono text-sm text-slate-200 placeholder-slate-600 focus:border-[#00ff88]/40 focus:outline-none focus:ring-1 focus:ring-[#00ff88]/20"
          />
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all ${
            file
              ? "border-[#00ff88]/40 bg-[#00ff88]/5"
              : "border-[#0d2a1f] hover:border-[#00ff88]/30 hover:bg-[#00ff88]/3"
          }`}
        >
          <input ref={fileRef} type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          {file ? (
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-6 w-6 text-[#00ff88]" />
                <span className="font-mono text-sm text-[#00ff88]">{file.name}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); setHashes(null); }}
                  className="text-slate-500 hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          ) : (
            <>
              <Upload className="mx-auto mb-2 h-8 w-8 text-slate-600" />
              <p className="text-sm text-slate-400">Drag & drop a file here, or <span className="text-[#00ff88]">click to browse</span></p>
              <p className="mt-1 text-xs text-slate-600">Any file type • Processed entirely in your browser</p>
            </>
          )}
        </div>
      )}

      {/* Hash outputs */}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0d2a1f] border-t-[#00ff88]" />
          Computing hashes...
        </div>
      )}

      {hashes && !loading && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-[#0d2a1f]" />
            <span className="font-mono text-xs text-slate-500">Hash Results</span>
            <div className="h-px flex-1 bg-[#0d2a1f]" />
          </div>

          {HASH_INFO.map(({ key, label, bits, chars, status }) => (
            <div key={key} className="rounded-lg border border-[#0d2a1f] bg-[#020a14] p-3">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-300">{label}</span>
                  <span className="font-mono text-[10px] text-slate-600">{bits}-bit / {chars} chars</span>
                  <span className={`text-[10px] ${status.includes("✓") ? "text-[#00ff88]" : "text-yellow-500"}`}>
                    {status}
                  </span>
                </div>
                <CopyButton text={hashes[key]} size="sm" />
              </div>
              <p className="font-mono text-xs text-[#00ff88] break-all">{hashes[key]}</p>
            </div>
          ))}
        </div>
      )}

      {!input && !file && !hashes && (
        <div className="rounded-lg border border-dashed border-[#0d2a1f] p-6 text-center text-sm text-slate-600">
          Enter text above to see hashes instantly
        </div>
      )}
    </div>
  );
}
