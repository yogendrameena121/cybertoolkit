interface ToolSchemaProps {
  name: string;
  description: string;
  url: string;
  category: string;
}

export function ToolSchema({
  name,
  description,
  url,
  category,
}: ToolSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: "Any (browser-based)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "CyberToolkit",
      url: "https://cybertoolkit-nu.vercel.app",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
