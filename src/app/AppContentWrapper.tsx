import { useState, useEffect } from "react";
import { ContactModal } from "@/app/components/ContactModal";
import { BackToTop } from "@/app/components/BackToTop";
import { CursorGlow } from "@/app/components/CursorGlow";
import { Navbar } from "@/app/components/Navbar";
import { AvanteHeroBackground } from "@/app/components/AvanteHeroBackground";
import { StatsBar } from "@/app/components/StatsBar";
import { SocialProofStrip } from "@/app/components/SocialProofStrip";
import { ScrollRevealSection } from "@/app/components/ScrollRevealSection";
import { SectionHeader } from "@/app/components/SectionHeader";
import { PlaybookStaircase } from "@/app/components/PlaybookStaircase";
import { ProofSection } from "@/app/components/ProofSection";
import { CTASection } from "@/app/components/CTASection";
import { AvanteModelTabs } from "@/app/components/AvanteModelTabs";
import { VenturePipeline } from "@/app/components/VenturePipeline";
import { WhyVentureStudio } from "@/app/components/WhyVentureStudio";
import { InvestorEcosystem } from "@/app/components/InvestorEcosystem";
import { FAQSection } from "@/app/components/FAQSection";
import { SiliconValleyVentureBuilding } from "@/app/components/SiliconValleyVentureBuilding";
import { TeamSection } from "@/app/components/TeamSection";
import { ContactFormSection } from "@/app/components/ContactFormSection";
import { Footer } from "@/app/components/Footer";
import { useLanguage } from "@/app/hooks/useLanguage";
import avanteLogo from "figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png";
import brazilMap3D from "figma:asset/74fa96e445ccfc4a7e6981a97d144c53880a9f45.png";

export function AppContent() {
  const { t } = useLanguage();
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
        
        {/* HERO SECTION */}
        <section 
          id="hero"
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
        </section>

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

        <StatsBar />
        
        <SocialProofStrip />

        <div className="max-w-[1200px] mx-auto px-[24px]">

          <ScrollRevealSection 
            id="whatwedo"
            className="py-[48px] md:py-[64px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <div className="max-w-[800px] mx-auto text-center px-4">
              <h2
                className="text-[28px] sm:text-[32px] md:text-[44px] lg:text-[52px]"
                style={{
                  lineHeight: '1.25',
                  color: 'var(--avante-text-primary)',
                  marginBottom: 'var(--avante-space-8)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: '-0.02em'
                }}
              >
                {t('whatwedo.title.line1')}
                <br />
                {t('whatwedo.title.line2')}
              </h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 'var(--avante-space-8)',
                }}
              >
                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  style={{
                    padding: 'var(--avante-space-2) var(--avante-space-5)',
                    background: 'var(--avante-gradient-linear)',
                    color: 'var(--avante-text-primary)',
                    border: 'none',
                    borderRadius: 'var(--avante-radius-12)',
                    fontSize: '16px',
                    fontWeight: 'var(--font-weight-semibold)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(152, 80, 154, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {t('cta.compact')}
                </button>
              </div>
            </div>
          </ScrollRevealSection>

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
              <SectionHeader
                title={t('system.title')}
                description={t('system.subtitle')}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PlaybookStaircase />
              </div>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection
            className="py-[48px] md:py-[64px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <ProofSection />
          </ScrollRevealSection>

          <ScrollRevealSection
            id="team"
            className="py-[48px] md:py-[64px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <TeamSection />
          </ScrollRevealSection>

          {/* Behind the Scenes — placeholder for future team-working photos.
              Renders 4 dimmed slots with a subtle "coming soon" treatment.
              Replace each <BehindSlot /> with an <img> when assets land. */}
          <ScrollRevealSection
            className="py-[48px] md:py-[64px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <div style={{ textAlign: 'center', marginBottom: 'var(--avante-space-6)' }}>
              <SectionHeader
                title="Behind the Scenes"
                description="Photos from the studio coming soon."
              />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 var(--avante-space-4)',
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '4 / 3',
                    borderRadius: '12px',
                    background:
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                    border: '1px dashed rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255, 255, 255, 0.25)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                  }}
                >
                  Slot {i}
                </div>
              ))}
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection
            className="py-[48px] md:py-[64px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <SiliconValleyVentureBuilding />
          </ScrollRevealSection>

          <ScrollRevealSection
            className="py-[48px] md:py-[64px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <div style={{ textAlign: 'center', marginBottom: 'var(--avante-space-6)' }}>
              <SectionHeader title="The Avante Model" description="Our framework for filtering noise and building conviction." />
            </div>
            <AvanteModelTabs onOpenContact={() => setIsContactModalOpen(true)} />
          </ScrollRevealSection>

          <ScrollRevealSection 
            className="py-[48px] md:py-[64px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <WhyVentureStudio />
          </ScrollRevealSection>

          <ScrollRevealSection 
            id="ventures"
            className="py-[48px] md:py-[64px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <SectionHeader title="Venture Pipeline" description="Next wave of AI-native category leaders" align="center" />
            <div style={{ marginTop: 'var(--avante-space-6)' }}>
              <VenturePipeline />
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection
            id="investors"
            className="py-[48px] md:py-[64px] relative"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <InvestorEcosystem onOpenContact={() => setIsContactModalOpen(true)} />
            
            {/* FAQ Section - Collapsible below investor close */}
            <FAQSection />
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