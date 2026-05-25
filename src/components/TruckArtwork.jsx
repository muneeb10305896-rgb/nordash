'use client';

export default function TruckArtwork({ scrollProgress, isMobile }) {
  return (
    <svg
      viewBox="0 0 240 140"
      style={{ width: '100%', height: '100%' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Truck Body - Base Layer */}
      <g>
        {/* Main cargo body - saffron */}
        <rect x="50" y="50" width="100" height="50" fill="#FFB300" rx="4" className="truck-body" />

        {/* Door panels - crimson with patterns */}
        <g className="truck-door-left">
          <rect x="60" y="55" width="35" height="40" fill="#D72B2B" rx="2" />
          {/* Door pattern - mandala style */}
          <circle cx="77" cy="75" r="12" fill="none" stroke="#FFD700" strokeWidth="1" />
          <circle cx="77" cy="75" r="8" fill="none" stroke="#FFD700" strokeWidth="0.8" />
          <polygon points="77,67 82,75 77,83 72,75" fill="#FFD700" opacity="0.8" />
        </g>

        {/* Door panels - emerald */}
        <g className="truck-door-right">
          <rect x="100" y="55" width="35" height="40" fill="#007A4C" rx="2" />
          {/* Door pattern */}
          <circle cx="117" cy="75" r="12" fill="none" stroke="#FFD700" strokeWidth="1" />
          <circle cx="117" cy="75" r="8" fill="none" stroke="#FFD700" strokeWidth="0.8" />
          <polygon points="117,67 122,75 117,83 112,75" fill="#FFD700" opacity="0.8" />
        </g>

        {/* Decorative diamond chain along body */}
        <g className="diamond-chain" opacity="0.9">
          <path d="M60,60 L64,65 L60,70 L56,65 Z" fill="#FFD700" />
          <path d="M80,58 L84,63 L80,68 L76,63 Z" fill="#FFD700" />
          <path d="M100,60 L104,65 L100,70 L96,65 Z" fill="#FFD700" />
          <path d="M120,58 L124,63 L120,68 L116,63 Z" fill="#FFD700" />
          <path d="M140,60 L144,65 L140,70 L136,65 Z" fill="#FFD700" />
        </g>

        {/* Aurora accent stripes - cyan */}
        <line x1="50" y1="60" x2="150" y2="60" stroke="#00E5FF" strokeWidth="1" opacity="0.6" />
        <line x1="50" y1="80" x2="150" y2="80" stroke="#00E5FF" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Cabin - Front Section */}
      <g>
        {/* Cabin body */}
        <rect x="30" y="45" width="20" height="35" fill="#1A2B8C" rx="2" />

        {/* Windshield */}
        <rect x="32" y="48" width="16" height="10" fill="#87CEEB" opacity="0.7" rx="1" />

        {/* Headlights - cyan glow points */}
        <circle cx="30" cy="55" r="2" fill="#00E5FF" className="truck-headlight" />
        <circle cx="30" cy="65" r="2" fill="#00E5FF" className="truck-headlight" />

        {/* Cabin decoration */}
        <circle cx="40" cy="60" r="4" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.8" />
        <circle cx="40" cy="60" r="2.5" fill="none" stroke="#FFD700" strokeWidth="0.8" opacity="0.8" />
      </g>

      {/* Roof Bar - Emerald */}
      <rect x="50" y="45" width="100" height="4" fill="#007A4C" className="truck-body" />

      {/* Exhaust Stack - Particle emitter */}
      <g>
        <rect x="145" y="50" width="5" height="20" fill="#666666" rx="1" />
        {/* Exhaust glow */}
        <rect x="144" y="50" width="7" height="20" fill="none" stroke="#FFB300" strokeWidth="1" opacity="0.4" />
      </g>

      {/* Wheels - 6 wheels with rotation */}
      <g className="truck-wheels">
        {/* Front left wheel */}
        <circle cx="55" cy="105" r="8" fill="none" stroke="#333333" strokeWidth="2" />
        <circle cx="55" cy="105" r="5" fill="none" stroke="#FFD700" strokeWidth="1" />
        <circle cx="55" cy="105" r="3" fill="#333333" className="truck-wheel" />

        {/* Front middle wheel */}
        <circle cx="70" cy="105" r="8" fill="none" stroke="#333333" strokeWidth="2" />
        <circle cx="70" cy="105" r="5" fill="none" stroke="#FFD700" strokeWidth="1" />
        <circle cx="70" cy="105" r="3" fill="#333333" className="truck-wheel" />

        {/* Front right wheel */}
        <circle cx="85" cy="105" r="8" fill="none" stroke="#333333" strokeWidth="2" />
        <circle cx="85" cy="105" r="5" fill="none" stroke="#FFD700" strokeWidth="1" />
        <circle cx="85" cy="105" r="3" fill="#333333" className="truck-wheel" />

        {/* Rear left wheel */}
        <circle cx="135" cy="105" r="8" fill="none" stroke="#333333" strokeWidth="2" />
        <circle cx="135" cy="105" r="5" fill="none" stroke="#FFD700" strokeWidth="1" />
        <circle cx="135" cy="105" r="3" fill="#333333" className="truck-wheel" />

        {/* Rear middle wheel */}
        <circle cx="150" cy="105" r="8" fill="none" stroke="#333333" strokeWidth="2" />
        <circle cx="150" cy="105" r="5" fill="none" stroke="#FFD700" strokeWidth="1" />
        <circle cx="150" cy="105" r="3" fill="#333333" className="truck-wheel" />

        {/* Rear right wheel */}
        <circle cx="165" cy="105" r="8" fill="none" stroke="#333333" strokeWidth="2" />
        <circle cx="165" cy="105" r="5" fill="none" stroke="#FFD700" strokeWidth="1" />
        <circle cx="165" cy="105" r="3" fill="#333333" className="truck-wheel" />
      </g>

      {/* Bumper/Chassis */}
      <line x1="25" y1="115" x2="170" y2="115" stroke="#FFD700" strokeWidth="2" />

      {/* Glow effect wrapper */}
      <filter id="truckGlow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  );
}
