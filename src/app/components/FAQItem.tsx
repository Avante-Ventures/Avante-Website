import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="interactive-card"
      style={{ 
        marginBottom: 'var(--avante-space-4)',
        padding: 'var(--avante-space-5)',
        backgroundColor: isOpen ? 'rgba(249, 180, 55, 0.06)' : 'rgba(255, 255, 255, 0.03)',
        border: isOpen ? '1px solid rgba(249, 180, 55, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 'var(--avante-radius-12)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        if (!isOpen) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isOpen) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        }
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          textAlign: 'left',
          marginBottom: isOpen ? 'var(--avante-space-3)' : '0',
          transition: 'margin 0.3s ease'
        }}
      >
        <h3 
          className="avante-body-emphasized" 
          style={{ 
            color: 'var(--avante-text-primary)',
            margin: 0,
            fontSize: '16px',
            letterSpacing: '-0.01em'
          }}
        >
          {question}
        </h3>
        <div 
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            backgroundColor: isOpen ? 'rgba(249, 180, 55, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            border: isOpen ? '1px solid rgba(249, 180, 55, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            flexShrink: 0,
            marginLeft: 'var(--avante-space-3)'
          }}
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transition: 'transform 0.3s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          >
            <path 
              d="M4 6L8 10L12 6" 
              stroke={isOpen ? 'rgba(249, 180, 55, 0.8)' : 'rgba(255, 255, 255, 0.5)'} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      
      <div 
        style={{
          maxHeight: isOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
          opacity: isOpen ? 1 : 0,
          transitionProperty: 'max-height, opacity',
          transitionDuration: '0.3s'
        }}
      >
        <p 
          className="avante-body" 
          style={{ 
            color: 'var(--avante-text-secondary)',
            margin: 0,
            fontSize: '15px',
            lineHeight: '1.7'
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}