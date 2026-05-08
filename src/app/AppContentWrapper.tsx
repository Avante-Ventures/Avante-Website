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
            hero, before the credibility row. The visual that the site is
            remembered by. Editorial restraint: one figure, one caption,
            no surrounding chrome.                                          */}
        <ScrollRevealSection
          className="py-[64px] md:py-[96px] relative"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
            <CompoundingChart />
          </div>
        </ScrollRevealSection>

        <StatsBar />

        <SocialProofStrip />

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
                  eyebrow={language === 'pt' ? 'Nosso Playbook' : 'Our Playbook'}
                  title={
                    language === 'pt'
                      ? 'Um loop repetível. Seis estágios. 3–4 ventures por ano.'
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
                {language === 'pt' ? 'Como nos juntamos' : 'How we came together'}
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
                  ? 'Jess e Andrea passaram a década anterior construindo a inDinero (US$100M+ ARR, 100+ funcionários) e investindo a partir de São Francisco. Amanda e Felipe ficaram com cicatrizes operacionais brasileiras — Amanda escalando a Sigga até um exit de 10×, Felipe construindo a Bamboo DCM no mercado de capitais. Nos conhecemos em 2024 quando os quatro chegamos à mesma conclusão a partir de ângulos opostos: o Brasil tem volume massivo de economia de serviço, talento sênior de engenharia subestimado e quase nenhum capital pré-tração com profundidade operacional. A divisão de trabalho é deliberada: time de São Paulo opera; time de São Francisco traz playbook + capital + rede.'
                  : 'Jess and Andrea spent the prior decade building inDinero ($100M+ ARR, 100+ headcount) and investing out of San Francisco. Amanda and Felipe earned operational scar tissue in Brazil — Amanda scaling Sigga through a 10× exit, Felipe building Bamboo DCM in the capital markets. We met in 2024 when all four of us arrived at the same conclusion from opposite angles: Brazil has massive service-economy volume, underestimated senior engineering talent, and almost no pre-traction capital with operational depth attached. The division of labor is deliberate: the São Paulo team operates; the San Francisco team brings playbook + capital + network.'}
              </p>
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
                eyebrow={language === 'pt' ? 'Doutrina Operacional' : 'Operating Doctrine'}
                title={
                  language === 'pt'
                    ? 'Três das dez regras pelas quais operamos.'
                    : 'Three of the ten rules we operate by.'
                }
                description={
                  language === 'pt'
                    ? 'Não são valores. São regras que constrangem comportamento — as decisões que já tomamos para gastar tempo operacional nas que ainda restam.'
                    : 'Not values. Rules that constrain behavior — the decisions we have already made so we can spend operating time on the ones that are left.'
                }
              />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: '24px',
                  marginTop: '48px',
                }}
              >
                {[
                  {
                    n: '01',
                    title: language === 'pt' ? 'Primeiro cheque ou nada.' : 'First ticket or no ticket.',
                    body:
                      language === 'pt'
                        ? "Somos first-money-in ou não investimos. A vantagem do studio está no momento de fundação."
                        : "We are first-money-in or we do not invest. The studio's edge is at the founding moment.",
                  },
                  {
                    n: '04',
                    title:
                      language === 'pt'
                        ? '3–4 ventures por ano. Sem exceção.'
                        : '3–4 ventures per year. No exceptions.',
                    body:
                      language === 'pt'
                        ? 'A gente limita throughput de propósito. Studios que escalam mais rápido que seu stack amadurece degradam a vantagem que justifica o modelo.'
                        : 'We deliberately cap throughput. Studios that scale faster than their stack matures debase the very advantage that justifies the model.',
                  },
                  {
                    n: '10',
                    title:
                      language === 'pt'
                        ? 'O que não fazemos é o que somos.'
                        : 'What we will not do is what we are.',
                    body:
                      language === 'pt'
                        ? 'Um studio que não consegue articular seu espaço negativo não consegue articular o positivo. Dizer não é a disciplina.'
                        : 'A studio that cannot articulate its negative space cannot articulate its positive. Saying no is the discipline.',
                  },
                ].map((p) => (
                  <div
                    key={p.n}
                    style={{
                      padding: '28px',
                      background: 'rgba(255, 255, 255, 0.025)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '32px',
                        fontWeight: 600,
                        color: '#F9B437',
                        lineHeight: 1,
                        marginBottom: '14px',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {p.n}
                    </div>
                    <h3
                      style={{
                        fontSize: '17px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        margin: '0 0 10px 0',
                        lineHeight: 1.3,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '14px',
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.7)',
                        margin: 0,
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
                  {language === 'pt' ? 'Ler os 10 princípios →' : 'Read all 10 principles →'}
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
            <ContactFormSection />
          </ScrollRevealSection>

        </div>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}