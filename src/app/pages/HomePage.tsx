import { AppContent } from "../AppContentWrapper.tsx";
import { SEOHelmet } from "../components/SEOHelmet.tsx";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://avanteventures.com/#home",
  "url": "https://avanteventures.com/",
  "name": "Avante Ventures — AI-native Venture Studio in Brazil",
  "description": "We co-found AI-native companies from scratch. Silicon Valley playbooks, Brazil-native execution. Built to compound for decades.",
  "inLanguage": "en",
  "isPartOf": { "@id": "https://avanteventures.com/#website" },
  "about": { "@id": "https://avanteventures.com/#organization" },
  "primaryImageOfPage": "https://avanteventures.com/og-image.png",
};

export default function HomePage() {
  return (
    <>
      <SEOHelmet
        title="Avante Ventures — AI-native Venture Studio in Brazil"
        description="We co-found AI-native companies from scratch. Silicon Valley playbooks, Brazil-native execution. Built to compound for decades."
        canonical="https://avanteventures.com/"
        jsonLd={homeJsonLd}
      />
      <AppContent />
    </>
  );
}
