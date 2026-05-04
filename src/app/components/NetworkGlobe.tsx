/**
 * Network Globe Component - SVG-based
 * 
 * Premium visual showing a global network sphere with:
 * - Latitude/longitude grid
 * - Network nodes and connecting arcs
 * - Magenta + Teal gradient accents
 * - Soft halo glow
 */
export function NetworkGlobe() {
  return (
    <div 
      className="relative flex items-center justify-center"
      style={{
        width: '100%',
        height: '100%',
      }}
      key="network-globe-svg"
    >
      {/* Outer Glow/Halo */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(255, 47, 179, 0.25) 0%, rgba(31, 228, 201, 0.15) 40%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      {/* Globe Container */}
      <svg 
        viewBox="0 0 400 400" 
        style={{ 
          width: '85%', 
          height: '85%',
          filter: 'drop-shadow(0 10px 40px rgba(255, 47, 179, 0.3))'
        }}
      >
        <defs>
          {/* Gradient for sphere */}
          <radialGradient id="sphereGradient" cx="40%" cy="35%">
            <stop offset="0%" stopColor="rgba(255, 47, 179, 0.15)" />
            <stop offset="50%" stopColor="rgba(31, 228, 201, 0.08)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.3)" />
          </radialGradient>

          {/* Gradient for rim lighting */}
          <radialGradient id="rimGradient" cx="50%" cy="50%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="85%" stopColor="rgba(31, 228, 201, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 47, 179, 0.6)" />
          </radialGradient>

          {/* Gradient for arcs */}
          <linearGradient id="arcGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 47, 179, 0.8)" />
            <stop offset="100%" stopColor="rgba(31, 228, 201, 0.8)" />
          </linearGradient>
        </defs>

        {/* Main Sphere Base */}
        <circle 
          cx="200" 
          cy="200" 
          r="150" 
          fill="url(#sphereGradient)"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />

        {/* Rim Lighting Effect */}
        <circle 
          cx="200" 
          cy="200" 
          r="150" 
          fill="url(#rimGradient)"
          opacity="0.8"
        />

        {/* Latitude Lines */}
        <ellipse cx="200" cy="200" rx="150" ry="30" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
        <ellipse cx="200" cy="200" rx="150" ry="60" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.5" />
        <ellipse cx="200" cy="200" rx="150" ry="90" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
        <ellipse cx="200" cy="200" rx="150" ry="120" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.5" />

        {/* Longitude Lines (vertical) */}
        <ellipse cx="200" cy="200" rx="30" ry="150" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
        <ellipse cx="200" cy="200" rx="60" ry="150" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.5" />
        <ellipse cx="200" cy="200" rx="90" ry="150" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
        <ellipse cx="200" cy="200" rx="120" ry="150" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.5" />

        {/* Equator Line */}
        <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />

        {/* Network Nodes */}
        <circle cx="120" cy="140" r="4" fill="#FF2FB3" opacity="0.9">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="160" r="4" fill="#1FE4C9" opacity="0.9">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="100" r="3" fill="#FF2FB3" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="250" r="3" fill="#1FE4C9" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="240" r="3" fill="#FF2FB3" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="180" cy="180" r="3" fill="#1FE4C9" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3.1s" repeatCount="indefinite" />
        </circle>
        <circle cx="220" cy="220" r="3" fill="#FF2FB3" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.9s" repeatCount="indefinite" />
        </circle>

        {/* Network Arcs (curved connections) */}
        <path 
          d="M 120 140 Q 200 120 280 160" 
          fill="none" 
          stroke="url(#arcGradient1)" 
          strokeWidth="1.5" 
          opacity="0.6"
        >
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
        </path>
        <path 
          d="M 280 160 Q 250 200 250 240" 
          fill="none" 
          stroke="#1FE4C9" 
          strokeWidth="1" 
          opacity="0.5"
        >
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.5s" repeatCount="indefinite" />
        </path>
        <path 
          d="M 120 140 Q 135 195 150 250" 
          fill="none" 
          stroke="#FF2FB3" 
          strokeWidth="1" 
          opacity="0.5"
        >
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.8s" repeatCount="indefinite" />
        </path>
        <path 
          d="M 200 100 Q 190 140 180 180" 
          fill="none" 
          stroke="#1FE4C9" 
          strokeWidth="1" 
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.3s" repeatCount="indefinite" />
        </path>
        <path 
          d="M 180 180 Q 200 200 220 220" 
          fill="none" 
          stroke="#FF2FB3" 
          strokeWidth="1" 
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.6s" repeatCount="indefinite" />
        </path>

        {/* Node Halos */}
        <circle cx="120" cy="140" r="8" fill="none" stroke="#FF2FB3" strokeWidth="0.5" opacity="0.3">
          <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="160" r="8" fill="none" stroke="#1FE4C9" strokeWidth="0.5" opacity="0.3">
          <animate attributeName="r" values="8;12;8" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Inner Glow */}
      <div 
        style={{
          position: 'absolute',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(31, 228, 201, 0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}