// /portfolio — full venture lineup, beyond the home hero strip.
//
// Purpose: a destination page anyone (LP, founder, partner) can land on and
// immediately understand the studio's track record + active cohort. Avoids
// the home-page constraint of "one editorial line" and shows actual breadth.

import { useLanguage } from '@/app/hooks/useLanguage'
import { Navbar } from '@/app/components/Navbar'
import { Footer } from '@/app/components/Footer'
import { BackToTop } from '@/app/components/BackToTop'
import { SEOHelmet } from '@/app/components/SEOHelmet'
import { SectionMasthead } from '@/app/components/SectionMasthead'
import { EditorialCard } from '@/app/components/EditorialCard'
import { Link } from 'react-router'

// Ventures data. Status: 'exit' = realized, 'active' = current cohort,
// 'alumni' = previously co-founded by team members but not Avante studio.
interface Venture {
  name: string
  description: { en: string; pt: string }
  status: 'exit' | 'active' | 'alumni'
  accent: string
  url?: string
  highlight?: string
}

const VENTURES: Venture[] = [
  {
    name: 'Sigga Technologies',
    description: {
      en: 'Industrial asset management software for Brazilian mid-market operators. Mobile-native, SAP-integrated, sold into mining, paper, energy.',
      pt: 'Software de gestão de ativos industriais para o mid-market brasileiro. Mobile-native, integrado com SAP, vendido para mineração, papel, energia.',
    },
    status: 'exit',
    accent: '#98509A',
    highlight: '10× exit',
  },
  {
    name: 'Mahway',
    description: {
      en: 'AI-native operator platform built by repeat founders Jess Mah + Andrea Barrica. Studio-affiliated; defines our partner-of-record model.',
      pt: 'Plataforma operacional AI-native construída pelas fundadoras seriais Jess Mah e Andrea Barrica. Afiliada ao studio; define nosso modelo de partner-of-record.',
    },
    status: 'active',
    accent: '#F4A261',
  },
  {
    name: 'WIR',
    description: {
      en: 'Async insurance pricing + risk scoring API. AXA pilot in motion; reference architecture for InsurTech sales across LATAM.',
      pt: 'API assíncrona de pricing e risk scoring para seguros. Piloto AXA em andamento; arquitetura de referência para vendas InsurTech na LATAM.',
    },
    status: 'active',
    accent: '#F9B437',
  },
  {
    name: 'Bamboo DCM',
    description: {
      en: 'Debt capital markets advisory + structuring built by Felipe Moraes. Strategic partner across the studio cap stack.',
      pt: 'Boutique de assessoria e estruturação de debt capital markets fundada por Felipe Moraes. Parceiro estratégico em toda a cap stack do studio.',
    },
    status: 'active',
    accent: '#F4A261',
  },
  {
    name: 'AlphaLit',
    description: {
      en: 'AI-native learning company; studio-adjacent reference for product loop design in consumer education.',
      pt: 'Empresa de aprendizado AI-native; referência adjacente ao studio para desenho de product loops em educação consumer.',
    },
    status: 'alumni',
    accent: '#E6C54C',
  },
  {
    name: 'inDinero',
    description: {
      en: 'Profitable accounting + finance platform founded by Jess Mah. Scaled to 100+ employees; reference operator track record for the studio.',
      pt: 'Plataforma rentável de contabilidade e finanças fundada por Jess Mah. Escalou para 100+ funcionários; track record de referência operacional para o studio.',
    },
    status: 'alumni',
    accent: '#7B68EE',
  },
]

const SEO = {
  en: {
    title: 'Portfolio — Avante Ventures',
    description:
      'The full Avante portfolio: realized exits, active cohort, and alumni ventures from our partner team. From Sigga (10× exit) to Mahway, WIR, and beyond.',
    inLanguage: 'en',
  },
  pt: {
    title: 'Portfólio — Avante Ventures',
    description:
      'O portfólio completo da Avante: exits realizados, cohort ativa e ventures alumni do nosso time de partners. Da Sigga (exit 10×) à Mahway, WIR e além.',
    inLanguage: 'pt-BR',
  },
} as const

export default function PortfolioPage() {
  const { language } = useLanguage()
  const t = (en: string, pt: string) => (language === 'pt' ? pt : en)
  const copy = SEO[language]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `https://avanteventures.com/${language}/portfolio#page`,
    name: copy.title,
    description: copy.description,
    url: `https://avanteventures.com/${language}/portfolio`,
    inLanguage: copy.inLanguage,
    isPartOf: { '@id': 'https://avanteventures.com/#website' },
    about: VENTURES.map((v) => v.name),
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--avante-background)' }}>
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        pathname="/portfolio"
        jsonLd={jsonLd}
      />
      <Navbar />
      <BackToTop />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(96px, 12vh, 140px) 24px 96px',
        }}
      >
        <Link
          to={`/${language}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.55)',
            textDecoration: 'none',
            fontSize: '14px',
            marginBottom: '32px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F9B437')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)')}
        >
          ← {t('Back to home', 'Voltar ao início')}
        </Link>

        <SectionMasthead
          eyebrow={t('Portfolio', 'Portfólio')}
          title={t(
            'The ventures we co-founded — and the ones our team built before.',
            'As ventures que co-fundamos — e as que nosso time construiu antes.'
          )}
          description={t(
            'A working portfolio, not a pitch list. Each venture below is either active in the current Avante studio cohort, a realized exit, or an alumni venture that shaped the operating playbook we use today.',
            'Um portfólio de trabalho, não uma lista de pitch. Cada venture abaixo está na cohort ativa do studio, é um exit realizado, ou é alumni que moldou o playbook operacional que usamos hoje.'
          )}
        />

        {/* 3 status filters as a legend */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            margin: '24px 0 48px',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.55)',
          }}
        >
          <StatusKey label={t('Realized exit', 'Exit realizado')} dot="#98509A" />
          <StatusKey label={t('Active cohort', 'Cohort ativa')} dot="#F9B437" />
          <StatusKey label={t('Alumni / partner-built', 'Alumni / construído por partners')} dot="#7B68EE" />
        </div>

        {/* Ventures grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '20px',
          }}
        >
          {VENTURES.map((v) => {
            const eyebrow = {
              exit: t('REALIZED EXIT', 'EXIT REALIZADO'),
              active: t('ACTIVE COHORT', 'COHORT ATIVA'),
              alumni: t('ALUMNI', 'ALUMNI'),
            }[v.status]
            return (
              <EditorialCard
                key={v.name}
                eyebrow={eyebrow}
                title={v.name}
                body={v.description[language]}
                highlight={v.highlight}
                accent={v.accent}
                accentPosition="border-left"
                style={{ padding: '28px' }}
              />
            )
          })}
        </div>

        {/* Bottom note */}
        <div
          style={{
            marginTop: '64px',
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderLeft: '3px solid #F9B437',
            borderRadius: '12px',
          }}
        >
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.75)',
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            {t(
              'We launch 3–4 new ventures per year inside the studio. The active cohort listed here is intentionally narrow — a discipline, not a scarcity. New cohort additions are introduced after a venture has cleared Stage 3 (Build) of the playbook.',
              'Lançamos 3–4 novas ventures por ano dentro do studio. A cohort ativa aqui listada é deliberadamente enxuta — disciplina, não escassez. Novas ventures aparecem na lista depois de passar pelo Estágio 3 (Build) do playbook.'
            )}
          </p>
        </div>

        {/* CTA back to home library */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <Link
            to={`/${language}/library/sigga-case-study-10x-exit`}
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #F9B437 0%, #F4A261 100%)',
              color: '#0E1428',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(249, 180, 55, 0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(249, 180, 55, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 180, 55, 0.25)'
            }}
          >
            {t('Read the Sigga case study →', 'Leia o estudo de caso da Sigga →')}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function StatusKey({ label, dot }: { label: string; dot: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: dot,
          boxShadow: `0 0 8px ${dot}80`,
        }}
      />
      <span>{label}</span>
    </div>
  )
}

