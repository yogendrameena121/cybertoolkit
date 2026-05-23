# CyberToolkit — Deployment Guide

## Quick Start

```bash
cd cybertoolkit
npm install
npm run dev
# → http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments on push.

---

## Configuration Checklist

### 1. Domain
- Update all `cybertoolkit-nu.vercel.app` references in metadata files to your actual domain
- Key files: `app/layout.tsx`, `app/sitemap.ts`, all `app/tools/*/page.tsx` canonical URLs

### 2. Google AdSense
1. Sign up at https://adsense.google.com
2. Get your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
3. Update `app/layout.tsx` line ~36: replace `ca-pub-XXXXXXXXXXXXXXXX`
4. Update `components/layout/AdSlot.tsx` line ~34: replace `ca-pub-XXXXXXXXXXXXXXXX`
5. Replace the slot IDs in each tool's `<AdSlot slot="...">` with real slot IDs from AdSense

### 3. Google Search Console
1. Sign up at https://search.google.com/search-console
2. Get your verification token
3. Update `app/layout.tsx` verification.google field
4. Submit your sitemap: `https://yourdomain.com/sitemap.xml`

### 4. Affiliate Links
Update the following with your real affiliate links:
- `app/tools/password-strength/page.tsx` — 1Password, Bitwarden
- `app/tools/ip-lookup/page.tsx` — NordVPN, ProtonVPN
- `app/tools/resources/page.tsx` — all items in the resources page

Always use `rel="noopener noreferrer sponsored"` on affiliate links (already set).

### 5. Open Graph Image
Create a 1200×630px OG image and place it at `public/og-image.png`

---

## Project Structure

```
cybertoolkit/
├── app/
│   ├── layout.tsx              # Root layout (fonts, nav, footer)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles + cyber theme
│   ├── prose.css               # Blog article styles
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # robots.txt
│   ├── not-found.tsx           # 404 page
│   ├── error.tsx               # Error boundary
│   ├── loading.tsx             # Global loading skeleton
│   ├── tools/
│   │   ├── page.tsx            # Tools index (filterable)
│   │   ├── ToolsIndexClient.tsx
│   │   ├── hash-generator/     # MD5, SHA-1, SHA-256, SHA-512
│   │   ├── base64/             # Base64 encode/decode
│   │   ├── password-strength/  # Entropy scorer + time-to-crack
│   │   ├── jwt-decoder/        # JWT header/payload inspector
│   │   ├── url-encoder/        # encodeURIComponent / encodeURI
│   │   ├── ip-lookup/          # ip-api.com geolocation
│   │   ├── ssl-checker/        # Certificate validity checker
│   │   ├── whois/              # RDAP domain lookup
│   │   ├── cve-search/         # NIST NVD API search
│   │   ├── uuid-generator/     # RFC 4122 v4 UUIDs
│   │   └── resources/          # Affiliate resources page
│   ├── blog/
│   │   ├── page.tsx            # Blog index
│   │   ├── what-is-md5/
│   │   ├── how-to-read-jwt/
│   │   ├── what-does-ssl-protect/
│   │   ├── password-hashing-explained/
│   │   ├── base64-is-not-encryption/
│   │   └── cve-cvss-guide/
│   └── about/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AdSlot.tsx
│   │   └── BlogLayout.tsx
│   ├── tools/
│   │   ├── ToolLayout.tsx      # Wrapper for all tool pages
│   │   ├── ToolCard.tsx        # Card for tools index
│   │   ├── CopyButton.tsx
│   │   ├── OutputBox.tsx
│   │   ├── InputArea.tsx
│   │   └── StrengthBar.tsx
│   └── seo/
│       ├── ToolSchema.tsx      # JSON-LD SoftwareApplication
│       └── FAQSchema.tsx       # JSON-LD FAQ
├── lib/
│   ├── tools-registry.ts       # Central tool metadata registry
│   ├── blog.ts                 # Blog post metadata registry
│   └── utils.ts                # Shared utilities
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## APIs Used

| Tool | API | Rate Limits | Auth Required |
|------|-----|-------------|---------------|
| IP Lookup | ip-api.com | 45 req/min (free) | No |
| CVE Search | nvd.nist.gov/rest/json/cves/2.0 | 5 req/30s (no key) | No (key increases limit) |
| WHOIS | rdap.org | None specified | No |
| SSL Checker | ssl-checker.io | Reasonable use | No |

All other tools (Hash, Base64, Password, JWT, URL, UUID) are 100% client-side — no API calls.

### NVD API Key (Optional)
For higher CVE search rate limits, get a free API key at https://nvd.nist.gov/developers/request-an-api-key
Then update `app/tools/cve-search/CVESearchClient.tsx` to add the header:
```js
headers: { "apiKey": process.env.NEXT_PUBLIC_NVD_API_KEY }
```

---

## SEO Notes

Each tool page includes:
- `export const metadata` with title, description, keywords, canonical URL
- `<ToolSchema>` (JSON-LD SoftwareApplication structured data)
- `<FAQSchema>` (JSON-LD FAQ structured data for rich results)
- 600–800 word SEO content section below the tool UI
- Breadcrumb navigation

Submit to Google Search Console after deployment and check Google's Rich Results Test for FAQ schema validation.

---

## Adding a New Tool

1. Create `app/tools/[tool-name]/page.tsx` with `ToolLayout` wrapper
2. Create `app/tools/[tool-name]/[ToolName]Client.tsx` with `"use client"` directive
3. Add tool entry to `lib/tools-registry.ts`
4. Add to `app/sitemap.ts`
5. Add to `components/layout/Footer.tsx` and `Navbar.tsx`

## Adding a New Blog Article

1. Create `app/blog/[slug]/page.tsx` using `BlogLayout`
2. Add metadata entry to `lib/blog.ts`
3. Update `app/sitemap.ts`
