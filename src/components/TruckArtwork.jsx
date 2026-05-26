'use client';

export default function TruckArtwork({ isMobile }) {
  return (
    <svg
      viewBox="0 0 520 230"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="hlGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        {/* Aurora trail gradients — flow LEFT (x1=1 to x2=0) */}
        <linearGradient id="auroraG1" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%"   stopColor="#00E5FF" stopOpacity="0.60"/>
          <stop offset="40%"  stopColor="#7B61FF" stopOpacity="0.38"/>
          <stop offset="75%"  stopColor="#FFB300" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#FFB300" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="auroraG2" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%"   stopColor="#7B61FF" stopOpacity="0.48"/>
          <stop offset="55%"  stopColor="#00E5FF" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="auroraG3" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%"   stopColor="#FFB300" stopOpacity="0.38"/>
          <stop offset="65%"  stopColor="#7B61FF" stopOpacity="0.10"/>
          <stop offset="100%" stopColor="#7B61FF" stopOpacity="0"/>
        </linearGradient>

        <linearGradient id="bodyShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFD700" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="0.38"/>
        </linearGradient>
        <radialGradient id="hubGrad" cx="45%" cy="35%" r="60%">
          <stop offset="0%"   stopColor="#cccccc"/>
          <stop offset="55%"  stopColor="#444444"/>
          <stop offset="100%" stopColor="#111111"/>
        </radialGradient>
        <radialGradient id="tyreGrad" cx="45%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#3a3a3a"/>
          <stop offset="100%" stopColor="#0d0d0d"/>
        </radialGradient>
        <linearGradient id="cabinGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1A2B8C"/>
          <stop offset="100%" stopColor="#0d1650"/>
        </linearGradient>
        <linearGradient id="chassisGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#aaaaaa"/>
          <stop offset="45%"  stopColor="#eeeeee"/>
          <stop offset="100%" stopColor="#777777"/>
        </linearGradient>
        <linearGradient id="windGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#a8d8f0" stopOpacity="0.82"/>
          <stop offset="100%" stopColor="#5ab4d6" stopOpacity="0.52"/>
        </linearGradient>
        <linearGradient id="pattiGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#080e2e"/>
          <stop offset="50%"  stopColor="#1A2B8C"/>
          <stop offset="100%" stopColor="#080e2e"/>
        </linearGradient>
      </defs>

      {/* ═══ AURORA TRAIL (extends LEFT via overflow:visible) ═══ */}
      <g opacity="0.82">
        <rect    x="-300" y="52"  width="350" height="118" fill="url(#auroraG1)"/>
        <ellipse cx="-80" cy="88" rx="185"    ry="44"      fill="url(#auroraG2)" opacity="0.92"/>
        <ellipse cx="-20" cy="122" rx="115"   ry="30"      fill="url(#auroraG3)" opacity="0.88"/>
        <ellipse cx="-140" cy="100" rx="200"  ry="72"      fill="#00E5FF" opacity="0.04"
                 style={{filter:'blur(20px)'}}/>
      </g>

      {/* ═══ CHASSIS ═══ */}
      <rect x="44" y="163" width="436" height="9" fill="url(#chassisGrad)" rx="2"/>
      {[108, 178, 258, 372].map(x => (
        <rect key={x} x={x-3} y="165" width="6" height="20" fill="#999" rx="1"/>
      ))}
      {/* Skirt below body */}
      <rect x="46" y="156" width="298" height="9" fill="#D72B2B" rx="1"/>
      <rect x="48" y="160" width="294" height="3" fill="#FFD700" opacity="0.75"/>

      {/* ═══ CARGO BODY (x=46–344, y=42–165) ═══ */}
      <rect x="46" y="42" width="298" height="121" fill="#FFB300" rx="3"/>
      <rect x="46" y="42" width="298" height="121" fill="url(#bodyShade)" rx="3"/>

      {/* ─ Panel 1: CRIMSON (x=54–140) ─ */}
      <rect x="54"  y="50" width="86" height="105" fill="#D72B2B" rx="2"/>
      <rect x="56"  y="52" width="82" height="101" fill="none" stroke="#FFD700" strokeWidth="2.2" rx="1"/>
      <rect x="60"  y="56" width="74" height="93"  fill="none" stroke="#FFD700" strokeWidth="0.75" rx="1" opacity="0.6"/>
      {/* Lattice */}
      <line x1="54" y1="50" x2="140" y2="155" stroke="#FFD700" strokeWidth="0.55" opacity="0.30"/>
      <line x1="140" y1="50" x2="54" y2="155" stroke="#FFD700" strokeWidth="0.55" opacity="0.30"/>
      {/* Flower mandala */}
      <circle cx="97" cy="102" r="22" fill="none" stroke="#FFD700" strokeWidth="1.8"/>
      <circle cx="97" cy="102" r="14" fill="none" stroke="#FFD700" strokeWidth="1.1"/>
      <circle cx="97" cy="102" r="6"  fill="#FFD700" opacity="0.90"/>
      {[0,45,90,135,180,225,270,315].map(deg => {
        const r = deg*Math.PI/180;
        return <ellipse key={deg}
          cx={97+Math.cos(r)*14} cy={102+Math.sin(r)*14}
          rx="4.5" ry="7.5"
          transform={`rotate(${deg},${97+Math.cos(r)*14},${102+Math.sin(r)*14})`}
          fill="#FFD700" opacity="0.52"/>;
      })}
      {[[62,58],[130,58],[62,146],[130,146]].map(([cx,cy]) => (
        <polygon key={`${cx}${cy}`}
          points={`${cx},${cy-5} ${cx+5},${cy} ${cx},${cy+5} ${cx-5},${cy}`}
          fill="#FFD700"/>
      ))}

      {/* Panel divider */}
      <line x1="142" y1="44" x2="142" y2="163" stroke="#FFD700" strokeWidth="2.6" opacity="0.95"/>

      {/* ─ Panel 2: EMERALD (x=142–236) ─ */}
      <rect x="142" y="50" width="92" height="105" fill="#007A4C" rx="2"/>
      <rect x="144" y="52" width="88" height="101" fill="none" stroke="#FFD700" strokeWidth="2.2" rx="1"/>
      <rect x="148" y="56" width="80" height="93"  fill="none" stroke="#FFD700" strokeWidth="0.75" rx="1" opacity="0.6"/>
      {/* 8-pointed star */}
      {Array.from({length:8},(_,i)=>{
        const a = i*45*Math.PI/180;
        return <line key={i}
          x1="188" y1="102"
          x2={188+Math.cos(a)*23} y2={102+Math.sin(a)*23}
          stroke="#FFD700" strokeWidth="1.8" opacity="0.82"/>;
      })}
      <circle cx="188" cy="102" r="23" fill="none" stroke="#FFD700" strokeWidth="1.4"/>
      <circle cx="188" cy="102" r="15" fill="none" stroke="#FFD700" strokeWidth="1.0"/>
      <circle cx="188" cy="102" r="7"  fill="#FFD700" opacity="0.92"/>
      <path d="M150,124 Q188,114 226,124" stroke="#FFD700" strokeWidth="1.8" fill="none"/>
      <path d="M150,130 Q188,120 226,130" stroke="#FFD700" strokeWidth="0.9" fill="none" opacity="0.6"/>
      <path d="M152,68  Q188,60 224,68"   stroke="#FFD700" strokeWidth="1.4" fill="none"/>
      {[[152,58],[224,58],[152,148],[224,148]].map(([cx,cy]) => (
        <polygon key={`${cx}${cy}`}
          points={`${cx},${cy-6} ${cx+2},${cy-2} ${cx+6},${cy} ${cx+2},${cy+2} ${cx},${cy+6} ${cx-2},${cy+2} ${cx-6},${cy} ${cx-2},${cy-2}`}
          fill="#FFD700" opacity="0.88"/>
      ))}

      {/* Panel divider */}
      <line x1="236" y1="44" x2="236" y2="163" stroke="#FFD700" strokeWidth="2.6" opacity="0.95"/>

      {/* ─ Panel 3: COBALT BLUE (x=236–344) ─ */}
      <rect x="236" y="50" width="100" height="105" fill="#1A2B8C" rx="2"/>
      <rect x="238" y="52" width="96"  height="101" fill="none" stroke="#FFD700" strokeWidth="2.2" rx="1"/>
      <rect x="242" y="56" width="88"  height="93"  fill="none" stroke="#FFD700" strokeWidth="0.75" rx="1" opacity="0.6"/>
      {/* Crescent + star */}
      <path d="M264,78 Q290,78 290,102 Q290,126 264,126 Q278,118 278,102 Q278,86 264,78Z"
        fill="#FFD700" opacity="0.92"/>
      <polygon points="306,72 308,80 316,80 310,85 312,93 306,88 300,93 302,85 296,80 304,80"
        fill="#FFD700" opacity="0.88"/>
      <line x1="240" y1="134" x2="334" y2="134" stroke="#00E5FF" strokeWidth="1.6" opacity="0.82"/>
      <line x1="240" y1="139" x2="334" y2="139" stroke="#00E5FF" strokeWidth="0.8" opacity="0.42"/>
      <line x1="240" y1="66"  x2="334" y2="66"  stroke="#FFB300" strokeWidth="1.2" opacity="0.62"/>
      {[[246,62],[328,62],[246,150],[328,150]].map(([cx,cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="3" fill="#00E5FF" opacity="0.82"/>
      ))}

      {/* ─ Top border strip ─ */}
      <rect x="46" y="42" width="298" height="8" fill="#007A4C" rx="2"/>
      <rect x="46" y="46" width="298" height="2" fill="#FFD700" opacity="0.82"/>

      {/* ─ Diamond chain along body top ─ */}
      {[66,98,130,162,194,226,258,290,322].map(x => (
        <polygon key={x}
          points={`${x},43 ${x+5},48 ${x},53 ${x-5},48`}
          fill="#FFD700" opacity="0.96"/>
      ))}

      {/* ═══ PATTI (roof signboard, x=46–452, y=6–42) ═══ */}
      <rect x="46" y="6" width="406" height="36" fill="url(#pattiGrad)" rx="3"/>
      <rect x="48" y="8" width="402" height="32" fill="none" stroke="#FFD700" strokeWidth="2.6" rx="2"/>
      <rect x="52" y="12" width="394" height="24" fill="none" stroke="#FFD700" strokeWidth="0.8" rx="1" opacity="0.44"/>
      {/* Red centre band */}
      <rect x="153" y="10" width="146" height="28" fill="#D72B2B" rx="1"/>
      <rect x="155" y="12" width="142" height="24" fill="none" stroke="#FFD700" strokeWidth="1.6" rx="1"/>
      <line x1="166" y1="18" x2="292" y2="18" stroke="#FFD700" strokeWidth="1.8"/>
      <line x1="166" y1="24" x2="292" y2="24" stroke="#FFD700" strokeWidth="1.0" opacity="0.7"/>
      <line x1="166" y1="30" x2="272" y2="30" stroke="#FFD700" strokeWidth="0.7" opacity="0.5"/>
      {/* Left gems */}
      {[62,86,110,134].map((x,i) => (
        <polygon key={x}
          points={`${x},24 ${x+7},30 ${x},36 ${x-7},30`}
          fill={i===1?'#00E5FF':'#FFD700'} opacity="0.92"/>
      ))}
      {/* Right gems */}
      {[390,366,342,318].map((x,i) => (
        <polygon key={x}
          points={`${x},24 ${x+7},30 ${x},36 ${x-7},30`}
          fill={i===1?'#00E5FF':'#FFD700'} opacity="0.92"/>
      ))}
      {/* Tassels */}
      {[72,112,152,202,252,302,352,402,442].map((x,i) => (
        <g key={x}>
          <line x1={x} y1="42" x2={x} y2="50" stroke={i%2===0?'#D72B2B':'#FFB300'} strokeWidth="1.6"/>
          <circle cx={x} cy="52" r="2.6" fill={i%2===0?'#D72B2B':'#FFD700'}/>
        </g>
      ))}
      {/* Spike teeth on patti top */}
      {[68,100,132,164,196,358,392,424].map((x,i) => (
        <polygon key={x}
          points={`${x},6 ${x+6},0 ${x+12},6`}
          fill={i%2===0?'#D72B2B':'#FFB300'} opacity="0.92"/>
      ))}

      {/* ═══ EXHAUST PIPE (x=336–344, y=4–42) ═══ */}
      <rect x="336" y="4"  width="8"  height="44" fill="#888" rx="3"/>
      <rect x="333" y="2"  width="14" height="8"  fill="#777" rx="2"/>
      <rect x="334" y="2"  width="12" height="5"  fill="#aaa" rx="1"/>
      <ellipse cx="340" cy="3" rx="7" ry="3" fill="#FFB300" opacity="0.44"
               className="truck-exhaust-glow" style={{filter:'blur(2px)'}}/>
      <rect x="336" y="4" width="8" height="44" fill="none"
            stroke="#FFB300" strokeWidth="1" opacity="0.32" rx="3"/>

      {/* ═══ CABIN (x=344–470, y=26–166) ═══ */}
      {/* Outer shell - emerald trim */}
      <path d="M344,42 L348,26 L454,26 L460,36 L464,46 L464,166 L344,166Z" fill="#007A4C"/>
      {/* Inner cabin body */}
      <path d="M348,42 L352,30 L452,30 L458,39 L462,48 L462,166 L348,166Z" fill="url(#cabinGrad)"/>

      {/* Visor above windshield */}
      <path d="M350,30 L454,30 L458,36 L346,36Z" fill="#FFB300"/>
      <line x1="350" y1="30" x2="454" y2="30" stroke="#FFD700" strokeWidth="2.2"/>
      {/* Visor spikes */}
      {[362,380,398,416,434].map(x => (
        <polygon key={x} points={`${x},30 ${x+6},24 ${x+12},30`} fill="#D72B2B" opacity="0.92"/>
      ))}

      {/* Windshield */}
      <path d="M350,42 L354,36 L454,36 L460,42 L460,88 L350,88Z" fill="url(#windGrad)"/>
      <path d="M350,42 L354,36 L454,36 L460,42 L460,88 L350,88Z"
            fill="none" stroke="#FFD700" strokeWidth="1.6"/>
      <line x1="364" y1="40" x2="370" y2="84" stroke="white" strokeWidth="1.5" opacity="0.24"/>
      <line x1="380" y1="38" x2="386" y2="86" stroke="white" strokeWidth="0.8" opacity="0.14"/>
      {/* Wipers */}
      <line x1="372" y1="87" x2="392" y2="74" stroke="#444" strokeWidth="1.6"/>
      <line x1="432" y1="87" x2="414" y2="74" stroke="#444" strokeWidth="1.6"/>

      {/* Side window */}
      <rect x="348" y="94"  width="28" height="30" fill="#5ab4d6" opacity="0.50" rx="2"/>
      <rect x="348" y="94"  width="28" height="30" fill="none" stroke="#FFD700" strokeWidth="1.2" rx="2"/>

      {/* Cabin door panel */}
      <rect x="350" y="128" width="110" height="36" fill="#D72B2B" rx="2"/>
      <rect x="352" y="130" width="106" height="32" fill="none" stroke="#FFD700" strokeWidth="1.6"/>
      {/* Door mandala */}
      <circle cx="405" cy="146" r="13" fill="none" stroke="#FFD700" strokeWidth="1.8"/>
      <circle cx="405" cy="146" r="8"  fill="none" stroke="#FFD700" strokeWidth="1.2"/>
      <circle cx="405" cy="146" r="4"  fill="#FFD700" opacity="0.92"/>
      {[0,45,90,135].map(deg=>{
        const a=deg*Math.PI/180;
        return <line key={deg}
          x1={405+Math.cos(a)*4} y1={146+Math.sin(a)*4}
          x2={405+Math.cos(a)*13} y2={146+Math.sin(a)*13}
          stroke="#FFD700" strokeWidth="1.2" opacity="0.8"/>;
      })}
      {/* Door handle */}
      <rect x="430" y="144" width="12" height="4" fill="#FFD700" rx="2"/>

      {/* Cabin trim lines */}
      <line x1="344" y1="42" x2="344" y2="166" stroke="#FFD700" strokeWidth="2.2" opacity="0.72"/>
      {/* Step */}
      <rect x="350" y="163" width="112" height="5" fill="#FFD700" rx="1"/>
      <rect x="352" y="168" width="108" height="3" fill="#FFB300" rx="1"/>

      {/* Side mirror */}
      <rect x="462" y="60" width="18" height="11" fill="#333" rx="3"/>
      <rect x="463" y="61" width="16" height="9"  fill="#5ab4d6" opacity="0.48" rx="2"/>
      <line x1="462" y1="66" x2="464" y2="58" stroke="#555" strokeWidth="1.5"/>

      {/* ═══ FRONT BUMPER + GRILLE ═══ */}
      <rect x="462" y="138" width="20" height="30" fill="#888" rx="3"/>
      <rect x="464" y="140" width="16" height="26" fill="#ccc" rx="2"/>
      <line x1="465" y1="148" x2="478" y2="148" stroke="#FFD700" strokeWidth="1.6"/>
      <line x1="465" y1="154" x2="478" y2="154" stroke="#FFD700" strokeWidth="1.0" opacity="0.7"/>
      <line x1="465" y1="160" x2="478" y2="160" stroke="#FFD700" strokeWidth="1.6"/>
      {/* Bumper chain */}
      <path d="M472,168 Q473,174 472,180 Q473,187 472,193" fill="none" stroke="#888" strokeWidth="1.5"/>
      <circle cx="472" cy="195" r="3.5" fill="#888"/>

      {/* Grille vents */}
      <rect x="460" y="90" width="6" height="48" fill="#222" rx="1"/>
      {[96,103,110,117,124,131].map(y=>(
        <line key={y} x1="460" y1={y} x2="466" y2={y} stroke="#555" strokeWidth="1"/>
      ))}

      {/* ═══ HEADLIGHTS ═══ */}
      {/* Main headlight — CYAN */}
      <circle cx="464" cy="106" r="14" fill="#0a1240" stroke="#FFD700" strokeWidth="2.2"/>
      <circle cx="464" cy="106" r="9"  fill="#00E5FF" opacity="0.92"
              className="truck-headlight" filter="url(#hlGlow)"/>
      <circle cx="464" cy="106" r="4"  fill="white"  opacity="0.96"/>
      <circle cx="464" cy="106" r="14" fill="none"   stroke="#00E5FF" strokeWidth="1.1"
              opacity="0.52" className="truck-headlight-ring"/>
      {/* Fog light — amber */}
      <circle cx="464" cy="132" r="9"  fill="#0a1240" stroke="#FFD700" strokeWidth="1.6"/>
      <circle cx="464" cy="132" r="5.5" fill="#FFB300" opacity="0.92"
              className="truck-headlight"/>
      {/* Beam cone */}
      <path d="M478,100 L520,86 L520,126 L478,112Z"
            fill="#00E5FF" opacity="0.055" style={{filter:'blur(5px)'}}/>

      {/* ═══ WHEELS (r=25, centres y=196) ═══ */}
      {/* positions: x = 100, 162, 262, 400 */}
      {[
        {cx:100, stroke:'#FFD700', hub:'#FFD700'},
        {cx:162, stroke:'#FFD700', hub:'#FFD700'},
        {cx:262, stroke:'#007A4C', hub:'#FFB300'},
        {cx:400, stroke:'#D72B2B', hub:'#D72B2B'},
      ].map(({cx,stroke,hub}) => (
        <g key={cx}>
          <circle cx={cx} cy="196" r="26" fill="url(#tyreGrad)"/>
          <circle cx={cx} cy="196" r="24" fill="none" stroke="#555" strokeWidth="3"/>
          <circle cx={cx} cy="196" r="17" fill="url(#hubGrad)" stroke={stroke} strokeWidth="2.2"/>
          <circle cx={cx} cy="196" r="11" fill="none" stroke="#FFD700" strokeWidth="1.2"/>
          <circle cx={cx} cy="196" r="5"  fill={hub}/>
          {/* Spinning spokes */}
          <g className="truck-wheel-spin" style={{transformOrigin:`${cx}px 196px`}}>
            <line x1={cx}    y1="184" x2={cx}    y2="208" stroke="#FFD700" strokeWidth="1.8" opacity="0.82"/>
            <line x1={cx-12} y1="196" x2={cx+12} y2="196" stroke="#FFD700" strokeWidth="1.8" opacity="0.82"/>
            <line x1={cx-8}  y1="187" x2={cx+8}  y2="205" stroke="#FFD700" strokeWidth="1.4" opacity="0.62"/>
            <line x1={cx-8}  y1="205" x2={cx+8}  y2="187" stroke="#FFD700" strokeWidth="1.4" opacity="0.62"/>
          </g>
        </g>
      ))}

      {/* Mudflap rear-most wheel */}
      <rect x="72" y="200" width="14" height="22" fill="#D72B2B" rx="2"/>
      <circle cx="79" cy="211" r="5" fill="#FFD700" opacity="0.72"/>

      {/* Wheel arch fender arcs */}
      {[[74,100,126],[136,162,188],[236,262,288],[374,400,426]].map(([a,c,b],i)=>(
        <path key={i} d={`M${a},172 Q${c},164 ${b},172`}
              fill="none" stroke={i===3?'#007A4C':'#FFB300'} strokeWidth="3"/>
      ))}
    </svg>
  );
}
