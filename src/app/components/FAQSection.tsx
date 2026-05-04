import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/app/hooks/useLanguage';

export function FAQSection() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1, marginTop: 'var(--avante-space-6)' }}>
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--avante-space-5)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--avante-radius-12)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginBottom: isExpanded ? 'var(--avante-space-6)' : '0'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        }}
      >
        <h3 
          style={{
            fontSize: '24px',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--avante-text-primary)',
            margin: 0
          }}
        >
          {t('faq.title')}
        </h3>
        <ChevronDown 
          size={24} 
          style={{
            color: 'var(--avante-text-secondary)',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        />
      </button>

      {/* FAQ Content */}
      {isExpanded && (
        <div 
          style={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      )}
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: 'var(--avante-space-5)',
        paddingBottom: 'var(--avante-space-5)',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          gap: 'var(--avante-space-3)',
        }}
      >
        <h4
          style={{
            fontSize: '18px',
            fontWeight: 'var(--font-weight-medium)',
            color: isOpen ? 'var(--avante-text-primary)' : 'var(--avante-text-secondary)',
            transition: 'color 0.3s ease',
            margin: 0
          }}
        >
          {question}
        </h4>
        <ChevronDown
          size={20}
          style={{
            color: 'var(--avante-text-secondary)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            flexShrink: 0,
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: 'var(--avante-space-4)',
            paddingLeft: 'var(--avante-space-2)',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <p
            style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'var(--avante-text-secondary)',
              margin: 0
            }}
          >
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}