import { useState } from 'react';
import { useLanguage } from '@/app/hooks/useLanguage';
import { TrendingUp, X, Scale } from 'lucide-react';

type TabId = 'thesis' | 'dontdo' | 'fits';

export function AvanteModelTabs() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>('thesis');

  const tabs = [
    { id: 'thesis' as TabId, label: t('thesis.tab'), icon: TrendingUp },
    { id: 'dontdo' as TabId, label: t('dontdo.tab'), icon: X },
    { id: 'fits' as TabId, label: t('fits.tab'), icon: Scale },
  ];

  return (
    <div>
      {/* Enhanced Tabs Navigation with premium styling */}
      <div 
        style={{
          display: 'flex',
          gap: 'var(--avante-space-2)',
          marginBottom: 'var(--avante-space-6)',
          padding: 'var(--avante-space-1)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 'var(--avante-radius-16)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          // Brand-aligned per-tab colors. Use the canonical accent vars from
          // theme.css; the previous shorthand `--avante-indigo` was undefined
          // and fell back to near-black on dark navy (a11y contrast 1.31:1).
          const tabColors = {
            thesis: { active: '#FCD96E', bg: 'rgba(249, 180, 55, 0.18)', border: 'rgba(249, 180, 55, 0.5)', shadow: 'rgba(249, 180, 55, 0.25)' },
            dontdo: { active: '#D9A6DA', bg: 'rgba(152, 80, 154, 0.18)', border: 'rgba(152, 80, 154, 0.5)', shadow: 'rgba(152, 80, 154, 0.25)' },
            fits:   { active: '#FBC59B', bg: 'rgba(244, 162, 97, 0.18)', border: 'rgba(244, 162, 97, 0.5)', shadow: 'rgba(244, 162, 97, 0.25)' },
          };
          
          const colors = tabColors[tab.id];
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--avante-space-2)',
                padding: 'var(--avante-space-3) var(--avante-space-5)',
                backgroundColor: isActive 
                  ? colors.bg
                  : 'transparent',
                border: isActive 
                  ? `1px solid ${colors.border}`
                  : '1px solid transparent',
                borderRadius: 'var(--avante-radius-12)',
                color: isActive ? colors.active : 'rgba(255, 255, 255, 0.65)',
                fontSize: '15px',
                fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                boxShadow: isActive ? `0 4px 16px ${colors.shadow}` : 'none',
                transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.color = colors.active;
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{tab.label}</span>
              
              {/* Active indicator dot */}
              {isActive && (
                <div 
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: colors.active,
                    boxShadow: `0 0 8px ${colors.active}`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content with enhanced container */}
      <div 
        style={{ 
          minHeight: '450px',
          padding: 'var(--avante-space-8)',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: 'var(--avante-radius-24)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {activeTab === 'thesis' && <ThesisContent />}
        {activeTab === 'dontdo' && <DontDoContent />}
        {activeTab === 'fits' && <FitsContent />}
      </div>
    </div>
  );
}

// Thesis Tab Content
function ThesisContent() {
  const { t } = useLanguage();
  
  return (
    <div style={{ 
      animation: 'fadeIn 0.4s ease-out',
    }}>
      {/* Subtle glow */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(152, 80, 154, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Bold statement at top */}
        <h3 
          style={{ 
            fontSize: '22px',
            lineHeight: '1.4',
            color: 'var(--avante-text-primary)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--avante-space-8)',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto var(--avante-space-8) auto'
          }}
        >
          {t('thesis.intro')}
        </h3>

        {/* 3 cards with colored numbered circles */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--avante-space-4)',
            marginTop: 'var(--avante-space-6)'
          }}
        >
          {/* Card 1 - Purple */}
          <div
            style={{
              padding: 'var(--avante-space-6)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--avante-radius-16)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(152, 80, 154, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.4)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(152, 80, 154, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--avante-accent-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--avante-space-4)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(152, 80, 154, 0.4)',
                position: 'relative',
                zIndex: 1
              }}
            >
              1
            </div>
            <h4 
              style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                marginBottom: 'var(--avante-space-3)',
                position: 'relative',
                zIndex: 1
              }}
            >
              {t('thesis.step1.title')}
            </h4>
            <p 
              className="avante-small"
              style={{ 
                color: 'var(--avante-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.7',
                position: 'relative',
                zIndex: 1
              }}
            >
              {t('thesis.step1.desc')}
            </p>
          </div>

          {/* Card 2 - Gold */}
          <div
            style={{
              padding: 'var(--avante-space-6)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--avante-radius-16)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(249, 180, 55, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.4)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(249, 180, 55, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--avante-accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--avante-space-4)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: '#1A1A1A',
                boxShadow: '0 4px 20px rgba(249, 180, 55, 0.4)',
                position: 'relative',
                zIndex: 1
              }}
            >
              2
            </div>
            <h4 
              style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                marginBottom: 'var(--avante-space-3)',
                position: 'relative',
                zIndex: 1
              }}
            >
              {t('thesis.step2.title')}
            </h4>
            <p 
              className="avante-small"
              style={{ 
                color: 'var(--avante-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.7',
                position: 'relative',
                zIndex: 1
              }}
            >
              {t('thesis.step2.desc')}
            </p>
          </div>

          {/* Card 3 - Orange */}
          <div
            style={{
              padding: 'var(--avante-space-6)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--avante-radius-16)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(244, 162, 97, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(244, 162, 97, 0.4)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(244, 162, 97, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--avante-accent-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--avante-space-4)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(244, 162, 97, 0.4)',
                position: 'relative',
                zIndex: 1
              }}
            >
              3
            </div>
            <h4 
              style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                marginBottom: 'var(--avante-space-3)',
                position: 'relative',
                zIndex: 1
              }}
            >
              {t('thesis.step3.title')}
            </h4>
            <p 
              className="avante-small"
              style={{ 
                color: 'var(--avante-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.7',
                position: 'relative',
                zIndex: 1
              }}
            >
              {t('thesis.step3.desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// What We Don't Do Tab Content
function DontDoContent() {
  const { t } = useLanguage();
  
  const items = [
    { title: t('dontdo.item1').split(':')[0] || t('dontdo.item1'), desc: t('dontdo.item1').split(':')[1] || '' },
    { title: t('dontdo.item2').split(':')[0] || t('dontdo.item2'), desc: t('dontdo.item2').split(':')[1] || '' },
    { title: t('dontdo.item3').split(':')[0] || t('dontdo.item3'), desc: t('dontdo.item3').split(':')[1] || '' },
  ];

  return (
    <div style={{ 
      animation: 'fadeIn 0.4s ease-out',
    }}>
      {/* Subtle red glow */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          right: '20%',
          transform: 'translate(50%, -50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(152, 80, 154, 0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Bold statement */}
        <h3 
          style={{ 
            fontSize: '22px',
            lineHeight: '1.4',
            color: 'var(--avante-text-primary)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--avante-space-8)',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto var(--avante-space-8) auto'
          }}
        >
          {t('dontdo.intro')}
        </h3>

        {/* 3 cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--avante-space-4)',
          }}
        >
          {/* Card 1 - Purple */}
          <div
            style={{
              padding: 'var(--avante-space-6)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--avante-radius-16)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(152, 80, 154, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.4)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(152, 80, 154, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--avante-accent-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--avante-space-4)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(152, 80, 154, 0.4)',
              }}
            >
              1
            </div>
            <h4 
              style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                marginBottom: 'var(--avante-space-3)',
              }}
            >
              No Hype Markets
            </h4>
            <p 
              style={{ 
                color: 'var(--avante-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.7',
              }}
            >
              We do not chase hype-first markets with no operational edge.
            </p>
          </div>

          {/* Card 2 - Gold */}
          <div
            style={{
              padding: 'var(--avante-space-6)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--avante-radius-16)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(249, 180, 55, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.4)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(249, 180, 55, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--avante-accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--avante-space-4)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: '#1A1A1A',
                boxShadow: '0 4px 20px rgba(249, 180, 55, 0.4)',
              }}
            >
              2
            </div>
            <h4 
              style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                marginBottom: 'var(--avante-space-3)',
              }}
            >
              No Services as Software
            </h4>
            <p 
              style={{ 
                color: 'var(--avante-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.7',
              }}
            >
              We do not build services disguised as software.
            </p>
          </div>

          {/* Card 3 - Orange */}
          <div
            style={{
              padding: 'var(--avante-space-6)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--avante-radius-16)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(244, 162, 97, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(244, 162, 97, 0.4)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(244, 162, 97, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--avante-accent-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--avante-space-4)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(244, 162, 97, 0.4)',
              }}
            >
              3
            </div>
            <h4 
              style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                marginBottom: 'var(--avante-space-3)',
              }}
            >
              No Fundraising as Model
            </h4>
            <p 
              style={{ 
                color: 'var(--avante-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.7',
              }}
            >
              We do not depend on fundraising as the business model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Where Avante Fits Tab Content
function FitsContent() {
  const { t } = useLanguage();

  return (
    <div style={{ 
      animation: 'fadeIn 0.4s ease-out',
    }}>
      {/* Subtle gold glow */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(249, 180, 55, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Bold statement */}
        <h3 
          style={{ 
            fontSize: '22px',
            lineHeight: '1.4',
            color: 'var(--avante-text-primary)',
            fontWeight: 'var(--font-weight-semibold)',
            marginBottom: 'var(--avante-space-8)',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto var(--avante-space-8) auto'
          }}
        >
          {t('fits.intro')}
        </h3>

        {/* 3 cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--avante-space-4)',
          }}
        >
          {/* Card 1 - Purple */}
          <div
            style={{
              padding: 'var(--avante-space-6)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--avante-radius-16)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(152, 80, 154, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.4)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(152, 80, 154, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--avante-accent-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--avante-space-4)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(152, 80, 154, 0.4)',
              }}
            >
              1
            </div>
            <h4 
              style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                marginBottom: 'var(--avante-space-3)',
              }}
            >
              Pre-Traction Entry
            </h4>
            <p 
              style={{ 
                color: 'var(--avante-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.7',
              }}
            >
              Lower price, more upside. We invest before the market sees the signal.
            </p>
          </div>

          {/* Card 2 - Gold */}
          <div
            style={{
              padding: 'var(--avante-space-6)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--avante-radius-16)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(249, 180, 55, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.4)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(249, 180, 55, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--avante-accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--avante-space-4)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: '#1A1A1A',
                boxShadow: '0 4px 20px rgba(249, 180, 55, 0.4)',
              }}
            >
              2
            </div>
            <h4 
              style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                marginBottom: 'var(--avante-space-3)',
              }}
            >
              Shared Infrastructure
            </h4>
            <p 
              style={{ 
                color: 'var(--avante-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.7',
              }}
            >
              Faster payback, lower burn. We provide the full execution stack.
            </p>
          </div>

          {/* Card 3 - Orange */}
          <div
            style={{
              padding: 'var(--avante-space-6)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 'var(--avante-radius-16)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(244, 162, 97, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(244, 162, 97, 0.4)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(244, 162, 97, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--avante-accent-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--avante-space-4)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(244, 162, 97, 0.4)',
              }}
            >
              3
            </div>
            <h4 
              style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                marginBottom: 'var(--avante-space-3)',
              }}
            >
              Execution Control
            </h4>
            <p 
              style={{ 
                color: 'var(--avante-text-secondary)',
                fontSize: '14px',
                lineHeight: '1.7',
              }}
            >
              Higher ownership, real governance. We co-build and steer from day one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}