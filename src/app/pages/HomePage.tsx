import { AppContent } from "../AppContentWrapper.tsx";
import { SEOHelmet } from "../components/SEOHelmet.tsx";
import { useLanguage } from "@/app/hooks/useLanguage";

const SEO_COPY = {
  en: {
    title: "Avante Ventures: AI-native Venture Studio in Brazil",
    description: "We co-found AI-native companies from scratch. Silicon Valley playbooks, Brazil-native execution. Built to compound for decades.",
    inLanguage: "en",
  },
  pt: {
    title: "Avante Ventures: Venture Studio AI-Native no Brasil",
    description: "Co-fundamos empresas AI-native do zero. Playbooks do Vale do Silício, execução brasileira. Construído para compor por décadas.",
    inLanguage: "pt-BR",
  },
  es: {
    title: "Avante Ventures: Venture Studio AI-Native en Brasil",
    description: "Co-fundamos empresas AI-native desde cero. Playbooks de Silicon Valley, ejecución nativa de Brasil. Construido para hacer compound por décadas.",
    inLanguage: "es",
  },
} as const;

export default function HomePage() {
  const { language } = useLanguage();
  const copy = SEO_COPY[language] ?? SEO_COPY.en;

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://avanteventures.com/${language}#home`,
    "url": `https://avanteventures.com/${language}`,
    "name": copy.title,
    "description": copy.description,
    "inLanguage": copy.inLanguage,
    "isPartOf": { "@id": "https://avanteventures.com/#website" },
    "about": { "@id": "https://avanteventures.com/#organization" },
    "primaryImageOfPage": "https://avanteventures.com/og-image.png",
  };

  return (
    <>
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        pathname=""
        jsonLd={homeJsonLd}
      />
      <AppContent />
    </>
  );
}
