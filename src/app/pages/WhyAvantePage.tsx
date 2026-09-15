import { useLanguage } from "@/app/hooks/useLanguage";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { BackToTop } from "@/app/components/BackToTop";
import { SEOHelmet } from "@/app/components/SEOHelmet";
import { InteriorHero, InteriorClosing } from '@/app/components/interiors/InteriorHero';
import { StudioStory } from '@/app/components/interiors/StudioStory';
import { ProcessExhibit } from '@/app/components/interiors/ProcessExhibit';
import { BUILDER_COPY } from '@/app/components/world/InsideVentureBuilder';

const SEO_COPY = {
  en: {
    title: "Why Avante: The Venture Builder Advantage in Brazil",
    description: "Avante co-founds AI-native companies in Brazil and Latin America. Explore the people, first capital and six-stage operating process behind the venture builder.",
    inLanguage: "en",
  },
  pt: {
    title: "Por Que Avante: A Vantagem do Venture Builder no Brasil",
    description: "A Avante cofunda empresas AI-native no Brasil e na América Latina. Conheça as pessoas, o primeiro capital e o processo operacional de seis etapas do venture builder.",
    inLanguage: "pt-BR",
  },
  es: {
    title: "Por Qué Avante: La Ventaja del Venture Builder en Brasil",
    description: "Avante cofunda empresas AI-native en Brasil y Latinoamérica. Conoce a las personas, el primer capital y el proceso operativo de seis etapas del venture builder.",
    inLanguage: "es",
  },
} as const;

export default function WhyAvantePage() {
  const { language } = useLanguage();
  const c = BUILDER_COPY[language];
  const copy = SEO_COPY[language] ?? SEO_COPY.en;
  const questions = {
    en: ['How does Avante work with founders?', 'How much capital goes into each venture?', 'How long do operating partners stay involved?'],
    pt: ['Como a Avante trabalha com fundadores?', 'Quanto capital vai para cada venture?', 'Até quando os sócios operacionais participam?'],
    es: ['¿Cómo trabaja Avante con los fundadores?', '¿Cuánto capital recibe cada venture?', '¿Hasta cuándo participan los socios operativos?'],
  }[language];
  const faqEntries = [c.body, `${c.commitments[1][0]}. ${c.commitments[1][2]}`, c.commitments[2][2]].map((a, i) => ({ q: questions[i], a }));

  const whyAvanteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://avanteventures.com/${language}/why-avante#article`,
        "headline": copy.title,
        "description": copy.description,
        "url": `https://avanteventures.com/${language}/why-avante`,
        "image": "https://avanteventures.com/og-image.png",
        "inLanguage": copy.inLanguage,
        "author": { "@id": "https://avanteventures.com/#organization" },
        "publisher": { "@id": "https://avanteventures.com/#organization" },
        "isPartOf": { "@id": "https://avanteventures.com/#website" },
        "about": [
          "Venture Builders",
          "Brazil Startup Ecosystem",
          "AI-Native Startups",
          "Pre-traction Capital",
          "Operating Process",
        ],
        "datePublished": "2026-01-01",
      },
      {
        "@type": "FAQPage",
        "@id": `https://avanteventures.com/${language}/why-avante#faq`,
        "inLanguage": copy.inLanguage,
        "mainEntity": faqEntries.map(({ q, a }) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a },
        })),
      },
    ],
  };

  return (
    <div className="avante-interior avante-world-home">
      <SEOHelmet title={copy.title} description={copy.description} pathname="/why-avante" jsonLd={whyAvanteJsonLd} />
      <Navbar /><BackToTop />
      <main>
        <InteriorHero kind="studio" eyebrow="Venture Builder" title={<>{c.title[0]}<br />{c.title[1]}</>} description={c.thesis} />
        <div className="interior-content" id="page-content">
          <StudioStory />
          <ProcessExhibit />
          <section className="studio-faq"><h2>{language === 'pt' ? 'Por dentro do modelo.' : language === 'es' ? 'Dentro del modelo.' : 'Inside the model.'}</h2>{faqEntries.map(({ q, a }) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
        </div>
        <InteriorClosing />
      </main>
      <Footer />
    </div>
  );
}
