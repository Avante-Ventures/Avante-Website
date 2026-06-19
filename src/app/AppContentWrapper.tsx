import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ContactModal } from "@/app/components/ContactModal";
import { BackToTop } from "@/app/components/BackToTop";
import { CursorGlow } from "@/app/components/CursorGlow";
import { Navbar } from "@/app/components/Navbar";
import { HeroV2A_Masthead } from "@/app/components/heroes/HeroV2A_Masthead";
import { StatsBar } from "@/app/components/StatsBar";
import { SocialProofStrip } from "@/app/components/SocialProofStrip";
import { ScrollRevealSection } from "@/app/components/ScrollRevealSection";
import { SectionMasthead } from "@/app/components/SectionMasthead";
import { PlaybookStaircase } from "@/app/components/PlaybookStaircase";
import { CompoundingChart } from "@/app/components/CompoundingChart";
import { TeamSection } from "@/app/components/TeamSection";
import { ContactFormSection } from "@/app/components/ContactFormSection";
import { ContactDoors } from "@/app/components/ContactDoors";
import { EditorialTicker } from "@/app/components/EditorialTicker";
import { AvtCord } from "@/app/components/AvtCord";
import { CinematicFrame } from "@/app/components/CinematicFrame";
import { Footer } from "@/app/components/Footer";
import { useLanguage } from "@/app/hooks/useLanguage";
import avanteLogo from "figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png";
import brazilMap3D from "figma:asset/74fa96e445ccfc4a7e6981a97d144c53880a9f45.png";

export function AppContent() {
  const { t, language } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Preload critical assets
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    
    preloadImage(avanteLogo);
    preloadImage(brazilMap3D);
  }, []);
  
  return (
    <div 
      className="min-h-screen w-full flex justify-center"
      style={{ backgroundColor: 'var(--avante-background)', position: 'relative' }}
    >
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Cursor Glow Effect */}
      <CursorGlow />
      
      {/* Global Atmospheric Haze - Optimized for Performance */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* Purple Haze - Top */}
        <div 
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '50%',
            background: 'radial-gradient(ellipse at 20% 20%, rgba(152, 80, 154, 0.015) 0%, transparent 60%)',
            opacity: 0.8
          }}
        ></div>
        
        {/* Gold Haze - Bottom */}
        <div 
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '50%',
            background: 'radial-gradient(ellipse at 80% 80%, rgba(249, 180, 55, 0.012) 0%, transparent 65%)',
            opacity: 0.7
          }}
        ></div>

        {/* Decorative Dots */}
        <div 
          style={{
            position: 'absolute',
            top: '15%',
            right: '8%',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'rgba(249, 180, 55, 0.3)',
            boxShadow: '0 0 20px rgba(249, 180, 55, 0.4)'
          }}
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Frame Container */}
      <div className="w-full max-w-[1440px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* HERO SECTION — replaced by HeroV2A_Masthead (editorial 60/40 +
            masthead dateline + portfolio strip + 3 featured Library cards).
            Old hero left commented below for one cycle in case rollback is
            needed; will be removed in the next sweep. */}
        <div id="hero">
          <HeroV2A_Masthead />
        </div>

        {/* EditorialTicker — Phase D. Surfaces the studio's operating
            metrics (vintage, exits, intake, offices, legal, horizon) on
            an infinite mono-strip right under the hero. Re-densifies
            above-the-fold without bloating section count. */}
        <EditorialTicker />

        {false && <section
          className="flex items-center justify-center relative w-full"
          style={{
            overflow: 'hidden',
            background: '#151E35',
            position: 'relative',
            height: '100vh'
          }}
        >
            <AvanteHeroBackground />

            <div 
              className="flex flex-col items-center justify-center relative z-10 px-6 max-w-[1000px] mx-auto text-center"
              style={{ gap: '32px' }}
            >
              <div>
                <img 
                  src={avanteLogo}
                  alt="Avante"
                  loading="eager"
                  style={{
                    height: '200px',
                    width: 'auto',
                    filter: 'drop-shadow(0 10px 40px rgba(249, 180, 55, 0.15))'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h1 
                  style={{ 
                    fontSize: '56px',
                    lineHeight: '1.1',
                    color: '#FFFFFF',
                    fontWeight: 'var(--font-weight-bold)',
                    letterSpacing: '-0.02em',
                    margin: 0
                  }}
                >
                  We co-found AI-native companies from scratch.
                </h1>
                
                <h2
                  style={{ 
                    fontSize: '56px',
                    lineHeight: '1.1',
                    color: '#FFFFFF',
                    fontWeight: 'var(--font-weight-bold)',
                    letterSpacing: '-0.02em',
                    margin: 0
                  }}
                >
                  Built to compound for decades.
                </h2>
              </div>

              <p
                style={{ 
                  fontSize: '24px',
                  lineHeight: '1.4',
                  color: '#F4A261',
                  fontWeight: 'var(--font-weight-medium)',
                  margin: 0
                }}
              >
                Silicon Valley Playbooks. Brazil-Native Execution.
              </p>

              <p
                style={{ 
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#9CA3AF',
                  fontWeight: 'var(--font-weight-regular)',
                  maxWidth: '800px',
                  margin: 0
                }}
              >
                We combine SF venture-building standards with proven operators and investors on the ground in Brazil.
              </p>

              <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }} className="hero-cta-container">
                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setTimeout(() => {
                        const select = document.querySelector('#inquiryType') as HTMLSelectElement;
                        if (select) {
                          select.value = 'Founder Inquiry';
                          select.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                      }, 800);
                    }
                  }}
                  style={{
                    padding: '16px 32px',
                    minHeight: '48px',
                    fontSize: '16px',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#FFFFFF',
                    background: 'transparent',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  className="hero-cta-button"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  For Founders
                </button>

                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setTimeout(() => {
                        const select = document.querySelector('#inquiryType') as HTMLSelectElement;
                        if (select) {
                          select.value = 'Investor Inquiry';
                          select.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                      }, 800);
                    }
                  }}
                  style={{
                    padding: '16px 32px',
                    minHeight: '48px',
                    fontSize: '16px',
                    fontWeight: 'var(--font-weight-medium)',
                    color: '#FFFFFF',
                    background: 'linear-gradient(135deg, #F4A261 0%, #98509A 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  className="hero-cta-button"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 180, 55, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  For Investors
                </button>
              </div>
            </div>
        </section>}

        <style>{`
          @media (max-width: 640px) {
            .hero-cta-container {
              flex-direction: column !important;
              width: 100%;
              padding: 0 16px;
            }
            .hero-cta-button {
              width: 100%;
            }
          }
        `}</style>

        {/* SIGNATURE MOMENT — the compounding curve. Placed right after the
            hero, before the credibility row. Generous vertical breathing per
            Ive's panel note ("the chart should respire 2x more"). The chart
            now spans up to 720px wide and the section gets clamp(96-160px)
            of vertical padding so it reads as a "chapter break" between
            the hero and the credibility row.                               */}
        <ScrollRevealSection
          className="relative"
          style={{
            padding: 'clamp(96px, 14vh, 160px) 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 24px' }}>
            <CompoundingChart />
          </div>
        </ScrollRevealSection>

        <StatsBar />

        <SocialProofStrip />

        {/* AvtCord — Phase D. Editorial divider that draws itself on
            scroll-into-view. Replaces the standard hairline border between
            the credibility row and the playbook section with something
            that signals "chapter break" without taking visual weight. */}
        <div style={{ maxWidth: '1200px', margin: '48px auto 0', padding: '0 24px' }}>
          <AvtCord width="62%" />
        </div>

        <div className="max-w-[1200px] mx-auto px-[24px]">

          {/* Removed: "Two ways to work with Avante" CTA section. The hero
              already has For Founders + For Investors CTAs — repeating
              them here added a pseudo-section without new content.       */}

          <ScrollRevealSection
            id="playbook"
            className="py-[48px] md:py-[64px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                backgroundImage: `url(${brazilMap3D})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.05,
                filter: 'blur(0.5px)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            ></div>
            
            <div style={{ position: 'relative', zIndex: 1, marginTop: 'var(--avante-space-4)' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--avante-space-4)' }}>
                <SectionMasthead
                  centered
                  eyebrow={
                    language === 'pt' ? 'Nosso Playbook' : language === 'es' ? 'Nuestro Playbook' : 'Our Playbook'
                  }
                  title={
                    language === 'pt'
                      ? 'Um loop repetível. Seis estágios. 3–4 ventures por ano.'
                      : language === 'es'
                        ? 'Un loop repetible. Seis etapas. 3–4 ventures por año.'
                        : 'A repeatable loop. Six stages. 3–4 ventures a year.'
                  }
                  description={t('system.subtitle')}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PlaybookStaircase />
              </div>
            </div>
          </ScrollRevealSection>

          {/* ProofSection moved to /portfolio. The 10× / 4× / $500MM+ +
              5× / 90% proof points belong with the venture data, not
              repeated on home alongside StatsBar.                          */}

          <ScrollRevealSection
            id="team"
            className="py-[48px] md:py-[64px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <TeamSection />

            {/* Bridge narrative — Sprint 1 / A2.
                Closes the credibility gap between US team (Jess + Andrea)
                and BR team (Amanda + Felipe). Without this paragraph the
                team grid reads as 4 separate photos with no thread. */}
            <div
              style={{
                maxWidth: '760px',
                margin: '48px auto 0',
                padding: '32px',
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(249, 180, 55, 0.15)',
                borderLeft: '3px solid #F9B437',
                borderRadius: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#F9B437',
                  marginBottom: '12px',
                }}
              >
                {language === 'pt' ? 'Como nos juntamos' : language === 'es' ? 'Cómo nos juntamos' : 'How we came together'}
              </div>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.82)',
                  margin: 0,
                }}
              >
                {language === 'pt'
                  ? 'Nos conhecemos em 2024. Quatro operadores em ângulos opostos: Jess e Andrea com inDinero ($100M+ ARR) em SF; Amanda escalando Sigga até exit 10× e Felipe na Bamboo DCM no Brasil. Mesma conclusão: o Brasil tem volume massivo de economia de serviços, talento sênior de engenharia subestimado e quase nenhum capital pré-tração com profundidade operacional. SP opera, SF traz playbook + capital.'
                  : language === 'es'
                    ? 'Nos conocimos en 2024. Cuatro operadores desde ángulos opuestos: Jess y Andrea con inDinero ($100M+ ARR) en SF; Amanda escalando Sigga hasta exit 10× y Felipe en Bamboo DCM en Brasil. Misma conclusión: Brasil tiene volumen masivo de economía de servicios, talento senior de ingeniería subestimado y casi nada de capital pre-tracción con profundidad operativa. SP opera, SF aporta playbook + capital.'
                    : 'We met in 2024. Four operators from opposite angles: Jess and Andrea with inDinero ($100M+ ARR) out of SF; Amanda scaling Sigga to a 10× exit and Felipe at Bamboo DCM in Brazil. Same conclusion: Brazil has massive service-economy volume, underestimated senior engineering talent, and almost no pre-traction capital with operational depth. SP operates, SF brings playbook + capital.'}
              </p>
            </div>
          </ScrollRevealSection>

          {/* CinematicFrame — Phase D. The "stop and breathe" beat between
              the team narrative and the principles/contact closing arc.
              Uses the São Paulo skyline asset that ships under
              /redesign-assets/. Captions are bilingual + reference Av.
              Paulista at dawn — anchors the studio in physical place. */}
          <ScrollRevealSection
            className="py-[80px] md:py-[120px]"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
              <CinematicFrame
                imageUrl="/redesign-assets/photo-skyline.jpg"
                aspectRatio="21 / 9"
                captionLeft="frame 001 — sede"
                captionRight="av. paulista · são paulo · 06:14 brt"
                slotLeft={
                  language === 'pt'
                    ? '— frame · São Paulo ao amanhecer'
                    : language === 'es'
                      ? '— frame · São Paulo al amanecer'
                      : '— frame · São Paulo at dawn'
                }
                slotRight="21:9 · 06:14"
              />
            </div>
          </ScrollRevealSection>

          {/* PRINCIPLES TEASER — replaces the cluster of 5 marketing
              sections (PortfolioStrip duplicate, SiliconValleyVentureBuilding,
              AvanteModelTabs, WhyVentureStudio, VenturePipeline,
              InvestorEcosystem, FAQSection). Each of those was either a
              duplicate or content that lives more naturally on its own
              destination page. Now: 3 principles + a clear link to /principles
              for the full doctrine.

              Content moved to:
              - VenturePipeline → /portfolio (new "Pipeline" section)
              - InvestorEcosystem → /investors (new perks section below CTA)
              - ProofSection → /portfolio (new "Track Record" section)
              - AvanteModelTabs / WhyVentureStudio / SiliconValleyVentureBuilding
                → already covered by /why-avante comparison table + dual model
              - FAQ → /founders Q&A block (5 founder-focused items)            */}
          <ScrollRevealSection
            id="principles"
            className="py-[64px] md:py-[96px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 var(--avante-space-4)' }}>
              <SectionMasthead
                centered
                eyebrow={
                  language === 'pt'
                    ? 'Doutrina Operacional'
                    : language === 'es'
                      ? 'Doctrina Operativa'
                      : 'Operating Doctrine'
                }
                title={
                  language === 'pt'
                    ? 'Três das dez regras pelas quais operamos.'
                    : language === 'es'
                      ? 'Tres de las diez reglas por las que operamos.'
                      : 'Three of the ten rules we operate by.'
                }
                description={
                  language === 'pt'
                    ? 'Não são valores. São regras que constrangem comportamento: as decisões que já tomamos para gastar tempo operacional nas que ainda restam.'
                    : language === 'es'
                      ? 'No son valores. Son reglas que limitan el comportamiento: las decisiones que ya tomamos para gastar tiempo operativo en las que quedan.'
                      : 'Not values. Rules that constrain behavior: the decisions we have already made so we can spend operating time on the ones that are left.'
                }
              />

              {/* Editorial grid — no card chrome. Mirrors the /principles
                  page typography (Beirut's panel note: same number in two
                  places should read with the same visual weight). Numbers
                  scale up to clamp(36-56px) to match the destination page;
                  no border, no background — just type on dark.            */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                  gap: 'clamp(40px, 5vw, 56px)',
                  marginTop: 'clamp(48px, 6vw, 72px)',
                }}
              >
                {[
                  {
                    n: '01',
                    title:
                      language === 'pt'
                        ? 'Primeiro cheque ou nada.'
                        : language === 'es'
                          ? 'Primer cheque o nada.'
                          : 'First ticket or no ticket.',
                    body:
                      language === 'pt'
                        ? 'Somos first-money-in ou não investimos. A vantagem do studio está no momento de fundação.'
                        : language === 'es'
                          ? 'Somos first-money-in o no invertimos. La ventaja del studio está en el momento de fundación.'
                          : "We are first-money-in or we do not invest. The studio's edge is at the founding moment.",
                  },
                  {
                    n: '04',
                    title:
                      language === 'pt'
                        ? '3–4 ventures por ano. Sem exceção.'
                        : language === 'es'
                          ? '3–4 ventures por año. Sin excepciones.'
                          : '3–4 ventures per year. No exceptions.',
                    body:
                      language === 'pt'
                        ? 'A gente limita throughput de propósito. Studios que escalam mais rápido que seu stack amadurece degradam a vantagem que justifica o modelo.'
                        : language === 'es'
                          ? 'Limitamos el throughput a propósito. Studios que escalan más rápido de lo que madura su stack degradan la ventaja que justifica el modelo.'
                          : 'We deliberately cap throughput. Studios that scale faster than their stack matures debase the very advantage that justifies the model.',
                  },
                  {
                    n: '10',
                    title:
                      language === 'pt'
                        ? 'O que não fazemos é o que somos.'
                        : language === 'es'
                          ? 'Lo que no hacemos es lo que somos.'
                          : 'What we will not do is what we are.',
                    body:
                      language === 'pt'
                        ? 'Um studio que não consegue articular seu espaço negativo não consegue articular o positivo. Dizer não é a disciplina.'
                        : language === 'es'
                          ? 'Un studio que no puede articular su espacio negativo no puede articular el positivo. Decir no es la disciplina.'
                          : 'A studio that cannot articulate its negative space cannot articulate its positive. Saying no is the discipline.',
                  },
                ].map((p) => (
                  <div key={p.n}>
                    <div
                      style={{
                        fontSize: 'clamp(36px, 4.5vw, 52px)',
                        fontWeight: 600,
                        color: '#F9B437',
                        lineHeight: 1,
                        marginBottom: '20px',
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {p.n}
                    </div>
                    <h3
                      style={{
                        fontSize: 'clamp(18px, 2vw, 22px)',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        margin: '0 0 12px 0',
                        lineHeight: 1.25,
                        letterSpacing: '-0.015em',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '15px',
                        lineHeight: 1.65,
                        color: 'rgba(255, 255, 255, 0.7)',
                        margin: 0,
                        maxWidth: '380px',
                      }}
                    >
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link
                  to={`/${language}/principles`}
                  style={{
                    display: 'inline-block',
                    padding: '14px 28px',
                    background: 'transparent',
                    color: '#FFFFFF',
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 600,
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.55)'
                    e.currentTarget.style.background = 'rgba(249, 180, 55, 0.06)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {language === 'pt'
                    ? 'Ler os 10 princípios →'
                    : language === 'es'
                      ? 'Leer los 10 principios →'
                      : 'Read all 10 principles →'}
                </Link>
              </div>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection
            id="contact"
            className="py-[48px] md:py-[64px]"
            style={{
              paddingTop: 'var(--avante-space-6)',
              paddingBottom: 'var(--avante-space-8)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
              marginTop: 'var(--avante-space-6)'
            }}
          >
            {/* ContactDoors — Phase D. A single general contact door
                (neutral "Contact") presented as the primary contact pattern.
                The classic ContactFormSection stays below as a fallback for
                visitors who prefer a form, but the door leads the section. */}
            <div style={{ marginBottom: 'var(--avante-space-8)' }}>
              <SectionMasthead
                eyebrow={
                  language === 'pt' ? '§ V — contato' : language === 'es' ? '§ V — contacto' : '§ V — contact'
                }
                title={
                  language === 'pt' ? (
                    <>Nos encontre.</>
                  ) : language === 'es' ? (
                    <>Encuéntranos.</>
                  ) : (
                    <>Find us.</>
                  )
                }
                description={
                  language === 'pt'
                    ? 'Uma porta. Abre para uma pessoa, não um formulário.'
                    : language === 'es'
                      ? 'Una puerta. Abre a una persona, no un formulario.'
                      : 'One door. It opens to a person, not a form.'
                }
                screenLabel={
                  language === 'pt' ? '§ v — contato' : language === 'es' ? '§ v — contacto' : '§ v — contact'
                }
                screenNum="05 / 05"
              />
              <ContactDoors />
            </div>

            <ContactFormSection />
          </ScrollRevealSection>

        </div>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}