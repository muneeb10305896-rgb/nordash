'use client';

export default function TruckArtwork({ isMobile }) {
  /* ViewBox 580×300 — wider/taller bus proportions */
  return (
    <svg
      viewBox="0 0 580 300"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* ── Glow filters ── */}
        <filter id="hlGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="auroraBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12"/>
        </filter>

        {/* ── Aurora trail gradients (flow LEFT, extends to negative x) ── */}
        <linearGradient id="auroraG1" x1="1" y1="0" x2="0" y2="0.3">
          <stop offset="0%"   stopColor="#00E5FF" stopOpacity="0.75"/>
          <stop offset="30%"  stopColor="#7B61FF" stopOpacity="0.50"/>
          <stop offset="65%"  stopColor="#00E5FF" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="#7B61FF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="auroraG2" x1="1" y1="0.2" x2="0" y2="0">
          <stop offset="0%"   stopColor="#7B61FF" stopOpacity="0.65"/>
          <stop offset="45%"  stopColor="#00E5FF" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="auroraG3" x1="1" y1="0.4" x2="0" y2="0">
          <stop offset="0%"   stopColor="#FFB300" stopOpacity="0.48"/>
          <stop offset="55%"  stopColor="#7B61FF" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#7B61FF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="auroraG4" x1="1" y1="0" x2="0" y2="0.5">
          <stop offset="0%"   stopColor="#00FF94" stopOpacity="0.35"/>
          <stop offset="60%"  stopColor="#00E5FF" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0"/>
        </linearGradient>

        {/* ── Body / cabin gradients ── */}
        <linearGradient id="bodyTopShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFD700" stopOpacity="0.30"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0.45"/>
        </linearGradient>
        <radialGradient id="hubGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%"   stopColor="#d4d4d4"/>
          <stop offset="50%"  stopColor="#555"/>
          <stop offset="100%" stopColor="#111"/>
        </radialGradient>
        <radialGradient id="tyreGrad" cx="40%" cy="30%" r="65%">
          <stop offset="0%"  stopColor="#3a3a3a"/>
          <stop offset="100%" stopColor="#0c0c0c"/>
        </radialGradient>
        <linearGradient id="cabinGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1A2B8C"/>
          <stop offset="100%" stopColor="#0a1240"/>
        </linearGradient>
        <linearGradient id="windGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#b8e0f5" stopOpacity="0.88"/>
          <stop offset="100%" stopColor="#4ea8d0" stopOpacity="0.55"/>
        </linearGradient>
        <linearGradient id="pattiGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#060d1f"/>
          <stop offset="50%"  stopColor="#1A2B8C"/>
          <stop offset="100%" stopColor="#060d1f"/>
        </linearGradient>
        <linearGradient id="chassisGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#bbb"/>
          <stop offset="50%"  stopColor="#eee"/>
          <stop offset="100%" stopColor="#777"/>
        </linearGradient>
        <radialGradient id="hlGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.95"/>
          <stop offset="40%"  stopColor="#00E5FF" stopOpacity="0.90"/>
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.20"/>
        </radialGradient>
        <radialGradient id="fogGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.90"/>
          <stop offset="50%"  stopColor="#FFB300" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#FFB300" stopOpacity="0.10"/>
        </radialGradient>
      </defs>

      {/* ══════════════════════════════════════════════════
          AURORA TRAIL — extends far LEFT via overflow:visible
          (after parent scaleX:-1 flip, this appears to the RIGHT,
           trailing behind the left-facing truck as it drives)
          ══════════════════════════════════════════════════ */}
      <g opacity="0.88">
        {/* Wide sweeping bands */}
        <rect    x="-480" y="30"  width="520" height="160" fill="url(#auroraG1)"/>
        <rect    x="-480" y="80"  width="480" height="110" fill="url(#auroraG2)" opacity="0.85"/>
        <ellipse cx="-180" cy="80"  rx="260" ry="55"  fill="url(#auroraG3)" opacity="0.90"/>
        <ellipse cx="-80"  cy="120" rx="160" ry="38"  fill="url(#auroraG4)" opacity="0.80"/>

        {/* Tight glowing core near truck rear */}
        <ellipse cx="-10"  cy="90"  rx="80"  ry="28"  fill="#00E5FF" opacity="0.06"
                 style={{filter:'blur(16px)'}}/>
        <ellipse cx="-60"  cy="110" rx="130" ry="48"  fill="#7B61FF" opacity="0.05"
                 style={{filter:'blur(20px)'}}/>

        {/* Rising aurora wisps */}
        <path d="M-480,-40 Q-320,-90 -200,-20 Q-100,20 50,0"
              fill="none" stroke="#00E5FF" strokeWidth="18" strokeLinecap="round" opacity="0.09"
              style={{filter:'blur(8px)'}}/>
        <path d="M-480,-10 Q-300,-60 -150,-5 Q-60,20 50,10"
              fill="none" stroke="#7B61FF" strokeWidth="12" strokeLinecap="round" opacity="0.12"
              style={{filter:'blur(6px)'}}/>
        <path d="M-480,40  Q-280,-30 -100,15 Q-30,30 50,25"
              fill="none" stroke="#00FF94" strokeWidth="8"  strokeLinecap="round" opacity="0.10"
              style={{filter:'blur(5px)'}}/>
      </g>

      {/* ══════════════════════════════════════════════════
          CHASSIS & SKIRT
          ══════════════════════════════════════════════════ */}
      <rect x="46" y="228" width="496" height="10" fill="url(#chassisGrad)" rx="2"/>
      {/* Axle details */}
      {[98, 170, 310, 450].map(x => (
        <rect key={x} x={x-4} y="230" width="8" height="18" fill="#999" rx="1"/>
      ))}
      {/* Crimson skirt */}
      <rect x="48"  y="220" width="434" height="10" fill="#D72B2B" rx="1"/>
      <rect x="50"  y="225" width="430" height="3"  fill="#FFD700" opacity="0.80"/>

      {/* ══════════════════════════════════════════════════
          MAIN BUS BODY (x=48–482, y=54–228)
          ══════════════════════════════════════════════════ */}
      {/* Outer saffron shell */}
      <rect x="48" y="54" width="434" height="174" fill="#B8860B" rx="3"/>
      {/* Gold highlight border */}
      <rect x="48" y="54" width="434" height="174" fill="none" stroke="#FFD700" strokeWidth="3" rx="3"/>
      {/* Overlay gradient */}
      <rect x="48" y="54" width="434" height="174" fill="url(#bodyTopShade)" rx="3"/>

      {/* ── WINDOWS ROW (y=62–118) ── */}
      <rect x="56" y="62" width="418" height="58" fill="#0d1e3a" rx="2"/>
      <rect x="56" y="62" width="418" height="58" fill="none" stroke="#FFD700" strokeWidth="2.2" rx="2"/>
      {/* Individual windows */}
      {[62, 134, 206, 278, 350].map((x, i) => (
        <g key={x}>
          <rect x={x} y="68" width={i===4 ? 58 : 62} height="44" fill="#5ab4d6" opacity="0.35" rx="3"/>
          <rect x={x} y="68" width={i===4 ? 58 : 62} height="44" fill="none" stroke="#FFD700" strokeWidth="1.4" rx="3"/>
          {/* Window highlight */}
          <line x1={x+6} y1="72" x2={x+6} y2="108" stroke="white" strokeWidth="1.5" opacity="0.20"/>
          <line x1={x+12} y1="70" x2={x+12} y2="110" stroke="white" strokeWidth="0.8" opacity="0.12"/>
        </g>
      ))}
      {/* Window top chrome strip */}
      <rect x="56" y="62" width="418" height="7" fill="#FFB300" rx="1"/>
      <rect x="56" y="65" width="418" height="2" fill="#FFD700" opacity="0.70"/>

      {/* ── LOWER BODY PANELS (y=124–220) ── */}

      {/* Decorative upper divider strip */}
      <rect x="56" y="122" width="418" height="6" fill="#007A4C" rx="1"/>
      <rect x="56" y="125" width="418" height="2" fill="#FFD700" opacity="0.75"/>

      {/* Panel 1 — CRIMSON floral (x=56–182) */}
      <rect x="56"  y="130" width="126" height="88" fill="#D72B2B" rx="2"/>
      <rect x="58"  y="132" width="122" height="84" fill="none" stroke="#FFD700" strokeWidth="2.2" rx="1"/>
      <rect x="62"  y="136" width="114" height="76" fill="none" stroke="#FFD700" strokeWidth="0.8" rx="1" opacity="0.50"/>
      {/* Lattice */}
      <line x1="56" y1="130" x2="182" y2="218" stroke="#FFD700" strokeWidth="0.6" opacity="0.25"/>
      <line x1="182" y1="130" x2="56" y2="218" stroke="#FFD700" strokeWidth="0.6" opacity="0.25"/>
      {/* Large flower medallion */}
      <circle cx="119" cy="174" r="30" fill="none" stroke="#FFD700" strokeWidth="2.2"/>
      <circle cx="119" cy="174" r="20" fill="none" stroke="#FFD700" strokeWidth="1.4"/>
      <circle cx="119" cy="174" r="9"  fill="#FFD700" opacity="0.95"/>
      {[0,45,90,135,180,225,270,315].map(deg => {
        const r = deg * Math.PI / 180;
        return <ellipse key={deg}
          cx={119 + Math.cos(r) * 20} cy={174 + Math.sin(r) * 20}
          rx="5.5" ry="9"
          transform={`rotate(${deg},${119 + Math.cos(r)*20},${174 + Math.sin(r)*20})`}
          fill="#FFD700" opacity="0.55"/>;
      })}
      {/* Corner diamonds */}
      {[[64,136],[172,136],[64,210],[172,210]].map(([cx,cy]) => (
        <polygon key={`${cx}${cy}`}
          points={`${cx},${cy-6} ${cx+6},${cy} ${cx},${cy+6} ${cx-6},${cy}`}
          fill="#FFD700"/>
      ))}

      {/* Panel divider */}
      <line x1="184" y1="124" x2="184" y2="228" stroke="#FFD700" strokeWidth="2.8" opacity="0.95"/>

      {/* Panel 2 — EMERALD with NORDASH (x=184–316) */}
      <rect x="184" y="130" width="130" height="88" fill="#007A4C" rx="2"/>
      <rect x="186" y="132" width="126" height="84" fill="none" stroke="#FFD700" strokeWidth="2.2" rx="1"/>
      {/* NORDASH brand text */}
      <text x="249" y="165"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontSize="14"
        textAnchor="middle"
        fill="#FFD700"
        letterSpacing="2"
        style={{filter:'url(#softGlow)'}}>
        NORDASH
      </text>
      <line x1="196" y1="172" x2="302" y2="172" stroke="#FFD700" strokeWidth="1.6" opacity="0.80"/>
      {/* 8-pointed star below text */}
      {Array.from({length:8}, (_, i) => {
        const a = i * 45 * Math.PI / 180;
        return <line key={i}
          x1="249" y1="196"
          x2={249 + Math.cos(a) * 18} y2={196 + Math.sin(a) * 18}
          stroke="#FFD700" strokeWidth="1.6" opacity="0.85"/>;
      })}
      <circle cx="249" cy="196" r="18" fill="none" stroke="#FFD700" strokeWidth="1.2"/>
      <circle cx="249" cy="196" r="6"  fill="#FFD700" opacity="0.95"/>
      {/* Corner gems */}
      {[[192,136],[306,136],[192,210],[306,210]].map(([cx,cy]) => (
        <polygon key={`${cx}${cy}`}
          points={`${cx},${cy-7} ${cx+2.5},${cy-2.5} ${cx+7},${cy} ${cx+2.5},${cy+2.5} ${cx},${cy+7} ${cx-2.5},${cy+2.5} ${cx-7},${cy} ${cx-2.5},${cy-2.5}`}
          fill="#FFD700" opacity="0.90"/>
      ))}

      {/* Panel divider */}
      <line x1="316" y1="124" x2="316" y2="228" stroke="#FFD700" strokeWidth="2.8" opacity="0.95"/>

      {/* Panel 3 — COBALT crescent+star (x=316–482) */}
      <rect x="316" y="130" width="166" height="88" fill="#1A2B8C" rx="2"/>
      <rect x="318" y="132" width="162" height="84" fill="none" stroke="#FFD700" strokeWidth="2.2" rx="1"/>
      {/* Crescent moon */}
      <path d="M340,150 Q374,145 374,174 Q374,203 340,198 Q358,190 358,174 Q358,158 340,150Z"
        fill="#FFD700" opacity="0.95"/>
      {/* Large star */}
      <polygon
        points="414,145 418,160 433,160 421,170 425,185 414,176 403,185 407,170 395,160 410,160"
        fill="#FFD700" opacity="0.90"/>
      {/* Small accent star */}
      <polygon
        points="456,155 458,162 465,162 459,167 461,174 456,170 451,174 453,167 447,162 454,162"
        fill="#00E5FF" opacity="0.85"/>
      {/* Cyan accent lines */}
      <line x1="320" y1="206" x2="478" y2="206" stroke="#00E5FF" strokeWidth="1.8" opacity="0.85"/>
      <line x1="320" y1="211" x2="478" y2="211" stroke="#00E5FF" strokeWidth="0.9" opacity="0.42"/>
      <line x1="320" y1="136" x2="478" y2="136" stroke="#FFB300" strokeWidth="1.4" opacity="0.65"/>
      {/* Corner circles */}
      {[[324,136],[474,136],[324,210],[474,210]].map(([cx,cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="4" fill="#00E5FF" opacity="0.85"/>
      ))}

      {/* ── Top body border strip ── */}
      <rect x="48" y="54" width="434" height="10" fill="#007A4C" rx="2"/>
      <rect x="48" y="58" width="434" height="3"  fill="#FFD700" opacity="0.85"/>

      {/* ── Diamond chain along top of body ── */}
      {[72,104,136,168,200,232,264,296,328,360,392,424,452].map(x => (
        <polygon key={x}
          points={`${x},55 ${x+5},60 ${x},65 ${x-5},60`}
          fill="#FFD700" opacity="0.96"/>
      ))}

      {/* ══════════════════════════════════════════════════
          PATTI / ROOF SIGN BOARD (x=48–526, y=8–54)
          ══════════════════════════════════════════════════ */}
      <rect x="48" y="8" width="478" height="46" fill="url(#pattiGrad)" rx="3"/>
      <rect x="50" y="10" width="474" height="42" fill="none" stroke="#FFD700" strokeWidth="2.8" rx="2"/>
      <rect x="54" y="14" width="466" height="34" fill="none" stroke="#FFD700" strokeWidth="0.9" rx="1" opacity="0.42"/>

      {/* Central crimson band */}
      <rect x="176" y="12" width="176" height="38" fill="#D72B2B" rx="1"/>
      <rect x="178" y="14" width="172" height="34" fill="none" stroke="#FFD700" strokeWidth="1.8" rx="1"/>
      <line x1="192" y1="20" x2="352" y2="20" stroke="#FFD700" strokeWidth="2"/>
      <line x1="192" y1="28" x2="352" y2="28" stroke="#FFD700" strokeWidth="1.2" opacity="0.70"/>
      <line x1="192" y1="36" x2="342" y2="36" stroke="#FFD700" strokeWidth="0.8" opacity="0.50"/>

      {/* Left gem diamonds on patti */}
      {[72, 98, 124, 152].map((x, i) => (
        <polygon key={x}
          points={`${x},28 ${x+8},35 ${x},42 ${x-8},35`}
          fill={i===1?'#00E5FF':'#FFD700'} opacity="0.94"/>
      ))}
      {/* Right gem diamonds */}
      {[458, 432, 406, 378].map((x, i) => (
        <polygon key={x}
          points={`${x},28 ${x+8},35 ${x},42 ${x-8},35`}
          fill={i===1?'#00E5FF':'#FFD700'} opacity="0.94"/>
      ))}

      {/* Tassels hanging from patti bottom */}
      {[68, 104, 142, 180, 220, 264, 308, 352, 396, 440, 484, 516].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="54" x2={x} y2="62" stroke={i%3===0?'#D72B2B':i%3===1?'#FFB300':'#007A4C'} strokeWidth="1.8"/>
          <circle cx={x} cy="64" r="3.2" fill={i%3===0?'#D72B2B':i%3===1?'#FFD700':'#00E5FF'}/>
          {/* Pompom fringe */}
          <line x1={x-3} y1="68" x2={x-3} y2="74" stroke={i%2===0?'#FFD700':'#FF69B4'} strokeWidth="1.2" opacity="0.80"/>
          <line x1={x}   y1="68" x2={x}   y2="76" stroke={i%2===0?'#FFB300':'#FFD700'} strokeWidth="1.2" opacity="0.80"/>
          <line x1={x+3} y1="68" x2={x+3} y2="73" stroke={i%2===0?'#FFD700':'#FF69B4'} strokeWidth="1.2" opacity="0.80"/>
        </g>
      ))}

      {/* Spike teeth on patti top edge */}
      {[60, 92, 124, 156, 188, 220, 350, 384, 418, 452, 486, 516].map((x, i) => (
        <polygon key={x}
          points={`${x},8 ${x+7},0 ${x+14},8`}
          fill={i%2===0?'#D72B2B':'#FFB300'} opacity="0.95"/>
      ))}

      {/* ══════════════════════════════════════════════════
          EXHAUST PIPE (x=320–330, y=2–54, between body and cabin area)
          ══════════════════════════════════════════════════ */}
      <rect x="322" y="2"  width="9"   height="56" fill="#888" rx="3"/>
      <rect x="318" y="2"  width="17"  height="9"  fill="#777" rx="2"/>
      <rect x="319" y="2"  width="15"  height="6"  fill="#aaa" rx="1"/>
      <ellipse cx="326.5" cy="2" rx="9" ry="3.5" fill="#FFB300" opacity="0.50"
               className="truck-exhaust-glow" style={{filter:'blur(3px)'}}/>

      {/* ══════════════════════════════════════════════════
          CABIN (x=482–560, y=26–238)
          ══════════════════════════════════════════════════ */}
      {/* Outer emerald frame */}
      <path d="M482,54 L486,30 L548,30 L554,40 L558,50 L558,238 L482,238Z" fill="#007A4C"/>
      {/* Inner cabin body */}
      <path d="M486,54 L490,34 L546,34 L552,43 L556,52 L556,238 L486,238Z" fill="url(#cabinGrad)"/>

      {/* Visor above windshield */}
      <path d="M489,34 L546,34 L551,40 L484,40Z" fill="#FFB300"/>
      <line x1="489" y1="34" x2="546" y2="34" stroke="#FFD700" strokeWidth="2.5"/>
      {/* Visor spikes */}
      {[496, 510, 524, 538].map(x => (
        <polygon key={x} points={`${x},34 ${x+5},26 ${x+10},34`} fill="#D72B2B" opacity="0.95"/>
      ))}

      {/* Main windshield */}
      <path d="M488,54 L492,40 L550,40 L556,54 L556,112 L488,112Z" fill="url(#windGrad)"/>
      <path d="M488,54 L492,40 L550,40 L556,54 L556,112 L488,112Z"
            fill="none" stroke="#FFD700" strokeWidth="1.8"/>
      {/* Glass reflections */}
      <line x1="500" y1="44" x2="506" y2="108" stroke="white" strokeWidth="1.8" opacity="0.22"/>
      <line x1="514" y1="42" x2="520" y2="110" stroke="white" strokeWidth="1.0" opacity="0.14"/>
      {/* Wipers */}
      <line x1="500" y1="111" x2="524" y2="94" stroke="#333" strokeWidth="1.8"/>
      <line x1="540" y1="111" x2="518" y2="94" stroke="#333" strokeWidth="1.8"/>

      {/* Small upper side window */}
      <rect x="484" y="118" width="30" height="26" fill="#5ab4d6" opacity="0.45" rx="2"/>
      <rect x="484" y="118" width="30" height="26" fill="none" stroke="#FFD700" strokeWidth="1.2" rx="2"/>

      {/* Door panel with ornate mandala */}
      <rect x="486" y="150" width="68" height="84" fill="#D72B2B" rx="2"/>
      <rect x="488" y="152" width="64" height="80" fill="none" stroke="#FFD700" strokeWidth="1.8"/>
      {/* Mandala */}
      <circle cx="520" cy="186" r="26" fill="none" stroke="#FFD700" strokeWidth="2"/>
      <circle cx="520" cy="186" r="18" fill="none" stroke="#FFD700" strokeWidth="1.3"/>
      <circle cx="520" cy="186" r="8"  fill="#FFD700" opacity="0.95"/>
      {[0,45,90,135,180,225,270,315].map(deg => {
        const a = deg * Math.PI / 180;
        return <g key={deg}>
          <line
            x1={520 + Math.cos(a)*8} y1={186 + Math.sin(a)*8}
            x2={520 + Math.cos(a)*26} y2={186 + Math.sin(a)*26}
            stroke="#FFD700" strokeWidth="1.3" opacity="0.80"/>
          {deg % 90 === 0 &&
            <circle cx={520+Math.cos(a)*22} cy={186+Math.sin(a)*22} r="2.5" fill="#00E5FF" opacity="0.85"/>}
        </g>;
      })}
      {/* Door handle */}
      <rect x="536" y="184" width="14" height="4" fill="#FFD700" rx="2"/>

      {/* Cabin trim lines */}
      <line x1="482" y1="54" x2="482" y2="238" stroke="#FFD700" strokeWidth="2.5" opacity="0.75"/>
      {/* Step */}
      <rect x="488" y="235" width="70" height="6" fill="#FFD700" rx="1"/>
      <rect x="490" y="241" width="66" height="3" fill="#FFB300" rx="1"/>

      {/* Side mirror */}
      <rect x="557" y="72" width="22" height="14" fill="#333" rx="3"/>
      <rect x="558" y="73" width="20" height="12" fill="#5ab4d6" opacity="0.45" rx="2"/>
      <line x1="557" y1="80" x2="559" y2="70" stroke="#555" strokeWidth="1.8"/>

      {/* ══════════════════════════════════════════════════
          FRONT BUMPER + GRILLE (x=554–580)
          ══════════════════════════════════════════════════ */}
      <rect x="554" y="168" width="24" height="36" fill="#888" rx="3"/>
      <rect x="556" y="170" width="20" height="32" fill="#ccc" rx="2"/>
      <line x1="558" y1="178" x2="574" y2="178" stroke="#FFD700" strokeWidth="1.8"/>
      <line x1="558" y1="185" x2="574" y2="185" stroke="#FFD700" strokeWidth="1.1" opacity="0.70"/>
      <line x1="558" y1="192" x2="574" y2="192" stroke="#FFD700" strokeWidth="1.8"/>
      {/* Ornamental front badge */}
      <polygon points="566,204 570,212 578,212 572,218 574,226 566,221 558,226 560,218 554,212 562,212"
        fill="#FFD700" opacity="0.90"/>
      {/* Chain/tassel */}
      <path d="M566,203 Q568,212 566,220 Q567,228 566,234" fill="none" stroke="#888" strokeWidth="1.8"/>
      <circle cx="566" cy="237" r="4" fill="#888"/>

      {/* Grille vents */}
      <rect x="552" y="110" width="7" height="58" fill="#1a1a1a" rx="1"/>
      {[116,123,130,137,144,151,158].map(y => (
        <line key={y} x1="552" y1={y} x2="559" y2={y} stroke="#444" strokeWidth="1"/>
      ))}

      {/* ══════════════════════════════════════════════════
          HEADLIGHTS (right side = front of truck)
          ══════════════════════════════════════════════════ */}
      {/* Main headlight — CYAN glow */}
      <circle cx="556" cy="130" r="17" fill="#08113a" stroke="#FFD700" strokeWidth="2.5"/>
      <circle cx="556" cy="130" r="12" fill="url(#hlGrad)" opacity="0.95"
              className="truck-headlight" filter="url(#hlGlow)"/>
      <circle cx="556" cy="130" r="5"  fill="white" opacity="0.98"/>
      <circle cx="556" cy="130" r="17" fill="none" stroke="#00E5FF" strokeWidth="1.3"
              opacity="0.55" className="truck-headlight-ring"/>
      {/* Fog light — amber */}
      <circle cx="556" cy="160" r="11" fill="#08113a" stroke="#FFD700" strokeWidth="1.8"/>
      <circle cx="556" cy="160" r="7.5" fill="url(#fogGrad)" opacity="0.95"
              className="truck-headlight"/>
      <circle cx="556" cy="160" r="3" fill="white" opacity="0.90"/>
      {/* Headlight beam cone */}
      <path d="M573,122 L580,108 L580,152 L573,138Z"
            fill="#00E5FF" opacity="0.065" style={{filter:'blur(6px)'}}/>

      {/* ══════════════════════════════════════════════════
          WHEELS (r=27, centres y=258)
          Positions: x = 98, 170, 310, 450
          ══════════════════════════════════════════════════ */}
      {[
        {cx:98,  stroke:'#FFD700', hub:'#FFD700'},
        {cx:170, stroke:'#FFD700', hub:'#FFD700'},
        {cx:310, stroke:'#007A4C', hub:'#FFB300'},
        {cx:450, stroke:'#D72B2B', hub:'#D72B2B'},
      ].map(({cx, stroke, hub}) => (
        <g key={cx}>
          {/* Tyre */}
          <circle cx={cx} cy="258" r="28" fill="url(#tyreGrad)"/>
          <circle cx={cx} cy="258" r="26" fill="none" stroke="#555" strokeWidth="3.5"/>
          {/* Hub */}
          <circle cx={cx} cy="258" r="19" fill="url(#hubGrad)" stroke={stroke} strokeWidth="2.5"/>
          <circle cx={cx} cy="258" r="12" fill="none" stroke="#FFD700" strokeWidth="1.4"/>
          <circle cx={cx} cy="258" r="5.5" fill={hub}/>
          {/* Spinning spokes */}
          <g className="truck-wheel-spin" style={{transformOrigin:`${cx}px 258px`}}>
            <line x1={cx}    y1="244" x2={cx}    y2="272" stroke="#FFD700" strokeWidth="2.2" opacity="0.85"/>
            <line x1={cx-13} y1="258" x2={cx+13} y2="258" stroke="#FFD700" strokeWidth="2.2" opacity="0.85"/>
            <line x1={cx-9}  y1="248" x2={cx+9}  y2="268" stroke="#FFD700" strokeWidth="1.6" opacity="0.65"/>
            <line x1={cx-9}  y1="268" x2={cx+9}  y2="248" stroke="#FFD700" strokeWidth="1.6" opacity="0.65"/>
            {/* Bolt circles */}
            {[0,72,144,216,288].map(deg => {
              const a = deg * Math.PI / 180;
              return <circle key={deg} cx={cx + Math.cos(a)*12} cy={258 + Math.sin(a)*12}
                r="1.8" fill="#FFD700" opacity="0.75"/>;
            })}
          </g>
        </g>
      ))}

      {/* Mudflap on rear-most wheel */}
      <rect x="68"  y="262" width="16" height="26" fill="#D72B2B" rx="2"/>
      <circle cx="76" cy="274" r="5.5" fill="#FFD700" opacity="0.75"/>

      {/* Wheel arch fender arcs */}
      {[[70,98,126],[142,170,198],[282,310,338],[422,450,478]].map(([a,c,b], i) => (
        <path key={i} d={`M${a},228 Q${c},218 ${b},228`}
              fill="none" stroke={i===3?'#007A4C':'#FFB300'} strokeWidth="3.5"/>
      ))}
    </svg>
  );
}
