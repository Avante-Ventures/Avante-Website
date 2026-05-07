import { memo } from 'react';

const SiliconValleyVentureBuildingComponent = () => {
  return (
    <div
      style={{
        padding: '24px 24px 32px',
        background: 'rgba(255, 255, 255, 0.01)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1200px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(249, 180, 55, 0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255, 255, 255, 0.5)',
              fontWeight: 'var(--font-weight-medium)',
              margin: 0
            }}
          >
            Silicon Valley Venture Building
          </p>
        </div>

        {/* Comparison Table */}
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            overflow: 'hidden'
          }}
        >
          {/* Table Header */}
          <div
            style={{
              padding: '24px 32px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.02)'
            }}
          >
            <h4
              style={{
                fontSize: '16px',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#F4A261',
                margin: 0,
                textAlign: 'center'
              }}
            >
              AI Intake Solution (LegalTech)
            </h4>
          </div>

          {/* Visual comparison rows — each metric shows two horizontal bars
              (before vs after) at proportional widths, plus a reduction badge.
              Replaces the previous 3-col text table that buried the magnitude
              of the change in similar-sized typography. */}
          <div style={{ padding: '32px' }}>
            <ComparisonRow
              label="Time to Market"
              before="3 years"
              after="1 year"
              afterRatio={1 / 3}
              afterColor="#B794C1"
              afterBarColor="rgba(152, 80, 154, 0.7)"
              reduction="−67%"
            />
            <ComparisonRow
              label="Capital Required"
              before="$5M"
              after="$1M"
              afterRatio={1 / 5}
              afterColor="#F4A261"
              afterBarColor="rgba(244, 162, 97, 0.7)"
              reduction="−80%"
            />
            <ComparisonRow
              label="Headcount"
              before="20"
              after="3"
              afterRatio={3 / 20}
              afterColor="#F9B437"
              afterBarColor="rgba(249, 180, 55, 0.7)"
              reduction="−85%"
              isLast
            />
          </div>

          {/* Result Footer */}
          <div
            style={{
              padding: '24px 32px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(249, 180, 55, 0.05)',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontSize: '16px',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#FFFFFF',
                margin: '0 0 8px 0'
              }}
            >
              Result
            </p>
            <p
              style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-bold)',
                background: 'linear-gradient(135deg, #F4A261 0%, #F9B437 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                lineHeight: '1.4'
              }}
            >
              5x intake volume, up to 90% cost reduction
            </p>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            table {
              font-size: 12px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// ComparisonRow — visual before/after bar pair with reduction badge
// ─────────────────────────────────────────────────────────────────────

interface ComparisonRowProps {
  label: string
  before: string
  after: string
  /** afterValue / beforeValue, e.g. 3/20 = 0.15 → After bar is 15% of full width */
  afterRatio: number
  afterColor: string
  afterBarColor: string
  reduction: string
  isLast?: boolean
}

function ComparisonRow({
  label,
  before,
  after,
  afterRatio,
  afterColor,
  afterBarColor,
  reduction,
  isLast,
}: ComparisonRowProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr 80px',
        gap: '24px',
        alignItems: 'center',
        paddingBottom: isLast ? 0 : '28px',
        marginBottom: isLast ? 0 : '28px',
        borderBottom: isLast ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Metric label */}
      <div
        style={{
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.85)',
          fontWeight: 600,
        }}
      >
        {label}
      </div>

      {/* Bars stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Before bar — full width, gray */}
        <BarRow
          width="100%"
          value={before}
          valueColor="rgba(255, 255, 255, 0.55)"
          barColor="rgba(255, 255, 255, 0.10)"
          subLabel="before AI"
        />
        {/* After bar — proportional width, brand color */}
        <BarRow
          width={`${Math.max(afterRatio * 100, 8)}%`}
          value={after}
          valueColor={afterColor}
          barColor={afterBarColor}
          subLabel="after AI"
        />
      </div>

      {/* Reduction badge */}
      <div
        style={{
          fontSize: '15px',
          fontWeight: 700,
          color: afterColor,
          textAlign: 'right',
          letterSpacing: '-0.01em',
        }}
      >
        {reduction}
      </div>
    </div>
  )
}

function BarRow({
  width,
  value,
  valueColor,
  barColor,
  subLabel,
}: {
  width: string
  value: string
  valueColor: string
  barColor: string
  subLabel: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width,
          minWidth: '40px',
          height: '14px',
          borderRadius: '7px',
          background: barColor,
          transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      <div
        style={{
          fontSize: '15px',
          fontWeight: 700,
          color: valueColor,
          whiteSpace: 'nowrap',
        }}
      >
        {value}
        <span
          style={{
            marginLeft: '8px',
            fontSize: '11px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {subLabel}
        </span>
      </div>
    </div>
  )
}

export const SiliconValleyVentureBuilding = memo(SiliconValleyVentureBuildingComponent);
