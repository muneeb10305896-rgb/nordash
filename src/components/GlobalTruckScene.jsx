"use client";
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════
// GLOBAL TRUCK SCENE — Realistic semi-truck moving diagonally
// across all pages with Nordic aurora exhaust smoke
// ═══════════════════════════════════════════════════════════════

// ── Color palette ──
const CLR = {
  cabBlue: '#2E5DA1',
  cabDark: '#1A3A6B',
  trailerWhite: '#F0F2F5',
  trailerSilver: '#D5D8DE',
  chassis: '#222222',
  chrome: '#C8CCD4',
  chromeBright: '#E8ECF0',
  tire: '#1A1A1A',
  glass: '#5B8CC0',
  lightAmber: '#FFBB44',
  lightRed: '#DD3333',
  lightWhite: '#FFF5EE',
  exhaust: '#99AABB',
};

// ═══════════════════════════════════════════════════
// REALISTIC SEMI-TRUCK MODEL
// ═══════════════════════════════════════════════════

/* ── Wheel (detailed) ──────────────────────────── */
function Wheel({ position, rotation = [0, 0, 0], scale = 1, isDual = false }) {
  const groupRef = useRef();
  const radius = 0.52 * scale;
  const width = 0.28 * scale;

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Tire */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius, radius, width, 32]} />
        <meshStandardMaterial color={CLR.tire} roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Tire tread groove */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[radius * 0.75, 0.04, 8, 32]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} metalness={0} />
      </mesh>
      {/* Hub/rim */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[isDual ? -width * 0.35 : 0, 0, 0]}>
        <cylinderGeometry args={[radius * 0.55, radius * 0.5, width * 0.92, 16]} />
        <meshStandardMaterial color={CLR.chrome} roughness={0.25} metalness={0.85} />
      </mesh>
      {/* Hub center cap */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[isDual ? -width * 0.35 : 0, 0, width * 0.5]}>
        <cylinderGeometry args={[radius * 0.15, radius * 0.15, 0.03, 16]} />
        <meshStandardMaterial color={CLR.chromeBright} roughness={0.15} metalness={0.9} />
      </mesh>
      {/* Lug nuts */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const lugR = radius * 0.35;
        return (
          <mesh
            key={i}
            position={[isDual ? -width * 0.35 : 0, Math.cos(angle) * lugR, Math.sin(angle) * lugR]}
            rotation={[0, 0, 0]}
          >
            <cylinderGeometry args={[0.03, 0.03, 0.04, 6]} />
            <meshStandardMaterial color={CLR.chromeBright} roughness={0.15} metalness={0.9} />
          </mesh>
        );
      })}
      {/* Dual wheel (second tire) */}
      {isDual && (
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-width * 0.75, 0, 0]}>
          <cylinderGeometry args={[radius, radius, width, 32]} />
          <meshStandardMaterial color={CLR.tire} roughness={0.85} metalness={0.05} />
        </mesh>
      )}
    </group>
  );
}

/* ── Tractor Cab ───────────────────────────────── */
function TractorCab() {
  return (
    <group position={[-6.8, 1.25, 0]}>
      {/* ── Main cab body ── */}
      {/* Lower cab */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2.2, 1.6, 2.4]} />
        <meshStandardMaterial color={CLR.cabBlue} roughness={0.3} metalness={0.35} />
      </mesh>

      {/* Upper cab (sleeper) — slightly narrower */}
      <mesh position={[0.45, 1.1, 0]}>
        <boxGeometry args={[1.4, 1.5, 2.35]} />
        <meshStandardMaterial color={CLR.cabBlue} roughness={0.3} metalness={0.35} />
      </mesh>

      {/* Roof cap — aerodynamic */}
      <mesh position={[0.35, 1.92, 0]}>
        <boxGeometry args={[1.35, 0.18, 2.2]} />
        <meshStandardMaterial color={CLR.cabDark} roughness={0.25} metalness={0.4} />
      </mesh>

      {/* ── Front panel (angled nose) ── */}
      <mesh position={[-0.95, 0.15, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.35, 1.4, 2.1]} />
        <meshStandardMaterial color={CLR.cabBlue} roughness={0.28} metalness={0.38} />
      </mesh>

      {/* ── Windshield (angled) ── */}
      <mesh position={[-0.85, 1.05, 0]} rotation={[0, 0, 0.45]}>
        <planeGeometry args={[0.05, 1.0, 1.9]} />
        <meshStandardMaterial
          color={CLR.glass}
          roughness={0.05}
          metalness={0.2}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Windshield dark border */}
      <mesh position={[-0.82, 1.05, 0]} rotation={[0, 0, 0.45]}>
        <planeGeometry args={[0.06, 1.05, 1.95]} />
        <meshBasicMaterial color="#0A0A0A" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Side windows ── */}
      {[1.21, -1.21].map((z, i) => (
        <mesh key={`sw-${i}`} position={[0.1, 1.25, z]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.9, 0.55]} />
          <meshStandardMaterial color={CLR.glass} roughness={0.05} metalness={0.2} transparent opacity={0.55} />
        </mesh>
      ))}

      {/* ── Door panel lines ── */}
      {[1.21, -1.21].map((z, i) => (
        <mesh key={`door-${i}`} position={[0.1, 0.35, z * 1.02]}>
          <planeGeometry args={[0.9, 1.1]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.08} />
        </mesh>
      ))}

      {/* ── Grille ── */}
      <mesh position={[-1.1, 0.05, 0]}>
        <boxGeometry args={[0.08, 1.0, 0.9]} />
        <meshStandardMaterial color={CLR.chassis} roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Grille horizontal slats */}
      {[-0.35, -0.15, 0.05, 0.25, 0.45].map((y, i) => (
        <mesh key={`gslat-${i}`} position={[-1.1, y, 0]}>
          <boxGeometry args={[0.1, 0.03, 0.78]} />
          <meshStandardMaterial color={CLR.chrome} roughness={0.2} metalness={0.88} />
        </mesh>
      ))}

      {/* Grille surround — chrome */}
      <mesh position={[-1.09, 0.05, 0]}>
        <boxGeometry args={[0.04, 1.08, 0.96]} />
        <meshStandardMaterial color={CLR.chromeBright} roughness={0.18} metalness={0.9} />
      </mesh>

      {/* ── Headlights ── */}
      {[0.7, -0.7].map((z, i) => (
        <group key={`hl-${i}`}>
          {/* Housing */}
          <mesh position={[-1.08, -0.05, z]}>
            <boxGeometry args={[0.1, 0.22, 0.22]} />
            <meshStandardMaterial color={CLR.chrome} roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Lens */}
          <mesh position={[-1.14, -0.05, z]}>
            <circleGeometry args={[0.09, 16]} />
            <meshStandardMaterial
              color={CLR.lightWhite}
              roughness={0.03}
              metalness={0.05}
              emissive={CLR.lightWhite}
              emissiveIntensity={0.7}
            />
          </mesh>
        </group>
      ))}

      {/* ── Fog lights ── */}
      {[0.45, -0.45].map((z, i) => (
        <mesh key={`fog-${i}`} position={[-1.12, -0.55, z]}>
          <circleGeometry args={[0.06, 12]} />
          <meshStandardMaterial
            color={CLR.lightAmber}
            roughness={0.03}
            emissive={CLR.lightAmber}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* ── Front bumper ── */}
      <mesh position={[-1.05, -0.7, 0]}>
        <boxGeometry args={[0.22, 0.28, 2.3]} />
        <meshStandardMaterial color={CLR.chrome} roughness={0.18} metalness={0.88} />
      </mesh>

      {/* ── Side mirrors ── */}
      {[1.25, -1.25].map((z, i) => (
        <group key={`mirror-${i}`}>
          {/* Bracket */}
          <mesh position={[-0.4, 1.6, z * 0.9]}>
            <boxGeometry args={[0.3, 0.06, 0.06]} />
            <meshStandardMaterial color={CLR.chassis} roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Arm */}
          <mesh position={[-0.6, 1.6, z * 0.92]}>
            <boxGeometry args={[0.08, 0.06, 0.2]} />
            <meshStandardMaterial color={CLR.chassis} roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Mirror head */}
          <mesh position={[-0.72, 1.6, z * 0.92]}>
            <boxGeometry args={[0.15, 0.25, 0.06]} />
            <meshStandardMaterial color={CLR.chrome} roughness={0.2} metalness={0.85} />
          </mesh>
        </group>
      ))}

      {/* ── Roof spoiler / air deflector ── */}
      <mesh position={[0.4, 2.02, 0]}>
        <boxGeometry args={[1.2, 0.1, 2.28]} />
        <meshStandardMaterial color={CLR.cabDark} roughness={0.25} metalness={0.4} />
      </mesh>

      {/* ── Sun visor ── */}
      <mesh position={[-0.7, 1.85, 0]}>
        <boxGeometry args={[0.08, 0.12, 2.1]} />
        <meshStandardMaterial color={CLR.cabDark} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* ── Cab side steps ── */}
      {[1.05, -1.05].map((z, i) => (
        <group key={`step-${i}`}>
          <mesh position={[-0.4, -0.68, z]}>
            <boxGeometry args={[0.6, 0.05, 0.25]} />
            <meshStandardMaterial color={CLR.chrome} roughness={0.2} metalness={0.85} />
          </mesh>
          <mesh position={[-0.1, -0.55, z]}>
            <boxGeometry args={[0.55, 0.04, 0.2]} />
            <meshStandardMaterial color={CLR.chrome} roughness={0.2} metalness={0.85} />
          </mesh>
        </group>
      ))}

      {/* ── Exhaust stacks (vertical, behind cab) ── */}
      {[0.75, -0.75].map((z, i) => (
        <group key={`exh-${i}`} position={[0.95, 0.3, z]}>
          {/* Main pipe */}
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.07, 0.09, 2.8, 16]} />
            <meshStandardMaterial color={CLR.exhaust} roughness={0.3} metalness={0.75} />
          </mesh>
          {/* Heat shield */}
          <mesh position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.13, 0.14, 1.5, 16, 1, false, 0, Math.PI * 0.65]} />
            <meshStandardMaterial color={CLR.chrome} roughness={0.22} metalness={0.85} />
          </mesh>
          {/* Exhaust tip */}
          <mesh position={[0, 2.82, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 0.15, 16]} />
            <meshStandardMaterial color={CLR.chromeBright} roughness={0.12} metalness={0.92} />
          </mesh>
        </group>
      ))}

      {/* ── Fuel tanks (side-mounted) ── */}
      {[1.05, -1.05].map((z, i) => (
        <group key={`tank-${i}`} position={[0.5, -0.2, z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.32, 0.32, 1.5, 16]} />
            <meshStandardMaterial color={CLR.chassis} roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Tank strap */}
          <mesh position={[-0.4, 0, 0]}>
            <torusGeometry args={[0.34, 0.025, 8, 16, Math.PI]} />
            <meshStandardMaterial color={CLR.chrome} roughness={0.25} metalness={0.85} />
          </mesh>
          <mesh position={[0.4, 0, 0]}>
            <torusGeometry args={[0.34, 0.025, 8, 16, Math.PI]} />
            <meshStandardMaterial color={CLR.chrome} roughness={0.25} metalness={0.85} />
          </mesh>
        </group>
      ))}

      {/* ── Air intake behind cab ── */}
      <mesh position={[0.8, 1.65, 0]}>
        <boxGeometry args={[0.35, 0.45, 1.0]} />
        <meshStandardMaterial color={CLR.cabDark} roughness={0.35} metalness={0.35} />
      </mesh>

      {/* ── Brand badge ── */}
      <mesh position={[-1.05, 1.55, 0]}>
        <planeGeometry args={[0.55, 0.12]} />
        <meshStandardMaterial
          color={CLR.chromeBright}
          roughness={0.15}
          metalness={0.9}
          emissive={CLR.chromeBright}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

/* ── Trailer ───────────────────────────────────── */
function Trailer() {
  const length = 7.5;
  const width = 2.4;
  const height = 2.65;

  return (
    <group position={[0.2, 1.1, 0]}>
      {/* ── Main cargo body ── */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[length, height, width]} />
        <meshStandardMaterial color={CLR.trailerWhite} roughness={0.35} metalness={0.15} />
      </mesh>

      {/* ── Roof ── */}
      <mesh position={[0, height + 0.02, 0]}>
        <boxGeometry args={[length, 0.05, width]} />
        <meshStandardMaterial color={CLR.trailerSilver} roughness={0.3} metalness={0.25} />
      </mesh>

      {/* ── Floor ── */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[length, 0.06, width]} />
        <meshStandardMaterial color={CLR.chassis} roughness={0.5} metalness={0.5} />
      </mesh>

      {/* ── Side panels (subtle ribbing) ── */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = -length / 2 + 0.4 + i * (length - 0.8) / 13;
        return (
          <group key={`rib-${i}`}>
            {[1, -1].map((side, si) => (
              <mesh key={si} position={[x, height / 2, side * (width / 2 + 0.02)]}>
                <planeGeometry args={[0.04, height - 0.25]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.04} side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* ── Side rails (top & bottom) ── */}
      {[1, -1].map((side, si) => (
        <group key={`siderail-${si}`}>
          <mesh position={[0, height - 0.08, side * (width / 2 + 0.03)]}>
            <boxGeometry args={[length - 0.1, 0.08, 0.06]} />
            <meshStandardMaterial color={CLR.trailerSilver} roughness={0.3} metalness={0.35} />
          </mesh>
          <mesh position={[0, 0.08, side * (width / 2 + 0.03)]}>
            <boxGeometry args={[length - 0.1, 0.08, 0.06]} />
            <meshStandardMaterial color={CLR.trailerSilver} roughness={0.3} metalness={0.35} />
          </mesh>
        </group>
      ))}

      {/* ── Front wall (facing cab) ── */}
      <mesh position={[-length / 2, height / 2, 0]}>
        <boxGeometry args={[0.06, height, width]} />
        <meshStandardMaterial color={CLR.trailerWhite} roughness={0.35} metalness={0.15} />
      </mesh>

      {/* ── Rear doors ── */}
      <mesh position={[length / 2, height / 2, 0]}>
        <boxGeometry args={[0.06, height, width]} />
        <meshStandardMaterial color={CLR.trailerSilver} roughness={0.3} metalness={0.25} />
      </mesh>
      {/* Door split line */}
      <mesh position={[length / 2 + 0.04, height / 2, 0]}>
        <planeGeometry args={[0.06, height * 0.85]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      {/* Door hinges */}
      {[0.4, -0.4].map((z, i) => (
        <mesh key={`hinge-${i}`} position={[length / 2 + 0.04, height * 0.75, z * width * 0.4]}>
          <boxGeometry args={[0.03, 0.25, 0.06]} />
          <meshStandardMaterial color={CLR.chrome} roughness={0.2} metalness={0.85} />
        </mesh>
      ))}

      {/* ── Rear lights ── */}
      {[0.8, -0.8].map((z, i) => (
        <group key={`rlight-${i}`} position={[length / 2 + 0.04, 0.35, z * width * 0.42]}>
          <mesh>
            <boxGeometry args={[0.04, 0.15, 0.12]} />
            <meshStandardMaterial
              color={i === 0 ? CLR.lightRed : CLR.lightAmber}
              roughness={0.05}
              emissive={i === 0 ? CLR.lightRed : CLR.lightAmber}
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* ── Undercarriage protection bars ── */}
      <mesh position={[-1.5, -0.05, width / 2 + 0.08]}>
        <boxGeometry args={[1.2, 0.08, 0.06]} />
        <meshStandardMaterial color={CLR.chassis} roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[-1.5, -0.05, -(width / 2 + 0.08)]}>
        <boxGeometry args={[1.2, 0.08, 0.06]} />
        <meshStandardMaterial color={CLR.chassis} roughness={0.5} metalness={0.6} />
      </mesh>
    </group>
  );
}

/* ── Chassis Frame ─────────────────────────────── */
function ChassisFrame() {
  return (
    <group>
      {/* Main chassis rails */}
      {[0.8, -0.8].map((z, i) => (
        <mesh key={`rail-${i}`} position={[-0.8, 0.6, z]}>
          <boxGeometry args={[9.5, 0.18, 0.1]} />
          <meshStandardMaterial color={CLR.chassis} roughness={0.45} metalness={0.75} />
        </mesh>
      ))}

      {/* Cross members */}
      {[-5.5, -3.5, -1.5, 0.5, 2.5].map((x, i) => (
        <mesh key={`cross-${i}`} position={[x, 0.6, 0]}>
          <boxGeometry args={[0.08, 0.14, 1.7]} />
          <meshStandardMaterial color={CLR.chassis} roughness={0.45} metalness={0.75} />
        </mesh>
      ))}

      {/* Fifth wheel (trailer coupling) */}
      <mesh position={[-2.3, 0.82, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 24]} />
        <meshStandardMaterial color={CLR.chassis} roughness={0.35} metalness={0.8} />
      </mesh>

      {/* Trailer landing gear */}
      {[0.8, -0.8].map((z, i) => (
        <mesh key={`gear-${i}`} position={[-2.8, 0.45, z * 0.95]}>
          <boxGeometry args={[0.12, 1.2, 0.12]} />
          <meshStandardMaterial color={CLR.chassis} roughness={0.4} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Full Truck ────────────────────────────────── */
function RealisticTruck() {
  const truckRef = useRef();

  return (
    <group ref={truckRef}>
      <ChassisFrame />
      <TractorCab />
      <Trailer />

      {/* ── Front wheels (steering axle) ── */}
      <Wheel position={[-5.7, 0.52, 1.15]} rotation={[0, 0, 0]} scale={1} />
      <Wheel position={[-5.7, 0.52, -1.15]} rotation={[0, 0, 0]} scale={1} />

      {/* ── Rear tractor wheels (drive axles, dual) ── */}
      <Wheel position={[-3.8, 0.52, 1.15]} rotation={[0, 0, 0]} scale={0.95} isDual />
      <Wheel position={[-3.8, 0.52, -1.15]} rotation={[0, 0, 0]} scale={0.95} isDual />
      <Wheel position={[-2.6, 0.52, 1.15]} rotation={[0, 0, 0]} scale={0.95} isDual />
      <Wheel position={[-2.6, 0.52, -1.15]} rotation={[0, 0, 0]} scale={0.95} isDual />

      {/* ── Trailer wheels (3 axles, dual) ── */}
      {[1.5, 2.7, 3.9].map((x, i) => [
        <Wheel key={`tl-${i}`} position={[x, 0.52, 1.15]} rotation={[0, 0, 0]} scale={0.9} isDual />,
        <Wheel key={`tr-${i}`} position={[x, 0.52, -1.15]} rotation={[0, 0, 0]} scale={0.9} isDual />,
      ])}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// NORDIC AURORA EXHAUST — Lights emitting from truck exhaust
// like smoke, spreading Nordic aurora colors
// ═══════════════════════════════════════════════════════════════

function AuroraExhaustSmoke() {
  const pointsRef = useRef();
  const count = 350;

  const { positions, colors, sizes, seeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const sds = new Float32Array(count);

    const palette = [
      new THREE.Color('#00E5FF'),
      new THREE.Color('#7B61FF'),
      new THREE.Color('#00FF94'),
      new THREE.Color('#40C9FF'),
      new THREE.Color('#B388FF'),
      new THREE.Color('#18FFFF'),
      new THREE.Color('#64FFDA'),
      new THREE.Color('#448AFF'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = -50;
      pos[i * 3 + 2] = 0;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      siz[i] = Math.random() * 0.14 + 0.03;
      sds[i] = Math.random();
    }
    return { positions: pos, colors: col, sizes: siz, seeds: sds };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const posArr = pointsRef.current.geometry.attributes.position.array;
    const sizArr = pointsRef.current.geometry.attributes.size.array;

    // Truck exhaust pipe world position (updated by controller)
    const truckX = window.__truckWorldX ?? -6.8;
    const truckY = window.__truckWorldY ?? 3.2;
    const truckZ = window.__truckWorldZ ?? 0;

    // Two exhaust pipes (left and right)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const seed = seeds[i];
      const exhaustSide = i % 2 === 0 ? 0.75 : -0.75;

      // Exhaust pipe world position
      const exhaustX = truckX + 0.95; // behind cab
      const exhaustY = truckY + 2.8; // top of exhaust stacks
      const exhaustZ = truckZ + exhaustSide;

      // Respawn dead or initial particles
      if (posArr[i3 + 1] < -20 || posArr[i3 + 1] > 30 || (t < 3 && i < count)) {
        posArr[i3] = exhaustX + (Math.random() - 0.5) * 0.2;
        posArr[i3 + 1] = exhaustY;
        posArr[i3 + 2] = exhaustZ + (Math.random() - 0.5) * 0.3;
      }

      // ── Smoke/Aurora physics ──
      const life = seed;
      const age = (t + seed * 7.3) % 6; // 6-second particle lifetime

      // Rise upward (like smoke)
      posArr[i3 + 1] += 0.008 + life * 0.015;

      // Drift backward (trailing behind truck) and spread
      const waveX = Math.sin(t * 1.2 + seed * 9) * 0.015;
      const waveZ = Math.cos(t * 0.9 + seed * 7) * 0.02;
      posArr[i3] += 0.006 + waveX; // drift right (back of truck)
      posArr[i3 + 2] += waveZ;

      // Horizontal spread as particle rises (like real smoke/aurora)
      posArr[i3 + 2] += (seed - 0.5) * 0.008 * (1 + age);

      // Opacity fades with age — size grows then fades
      const sizeFade = age < 1 ? age : age > 5 ? (6 - age) : 1;
      sizArr[i] = (0.02 + life * 0.12) * sizeFade * (0.7 + Math.sin(t * 3 + seed * 11) * 0.3);
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Ambient Aurora Particles (atmosphere) ──────── */
function AmbientAurora({ count = 120 }) {
  const pointsRef = useRef();

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const palette = [
      new THREE.Color('#00E5FF'),
      new THREE.Color('#7B61FF'),
      new THREE.Color('#00FF94'),
      new THREE.Color('#1E90FF'),
      new THREE.Color('#B388FF'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = Math.random() * 8 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = Math.random() * 0.06 + 0.015;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const posArr = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const baseY = posArr[i3 + 1];
      const wave = Math.sin(t * 0.5 + baseY * 1.3 + i * 0.1) * 0.4;
      posArr[i3 + 1] = baseY + wave * 0.02;
      posArr[i3] += Math.cos(t * 0.35 + i * 0.2) * 0.004;
      posArr[i3 + 2] += Math.sin(t * 0.3 + i * 0.15) * 0.003;

      // Wrap around
      if (posArr[i3 + 1] > 8) posArr[i3 + 1] = -2;
      if (posArr[i3 + 1] < -3) posArr[i3 + 1] = 7;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Road Surface ───────────────────────────────── */
function RoadSurface() {
  return (
    <group>
      {/* Road plane — dark but visible */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.8, 0]} receiveShadow>
        <planeGeometry args={[50, 10]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.6} metalness={0.15} />
      </mesh>
      {/* Road edge lines — brighter */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.77, 4.8]}>
        <planeGeometry args={[50, 0.08]} />
        <meshBasicMaterial color="#FFB300" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.77, -4.8]}>
        <planeGeometry args={[50, 0.08]} />
        <meshBasicMaterial color="#FFB300" transparent opacity={0.35} />
      </mesh>
      {/* Center dashed line */}
      {Array.from({ length: 25 }).map((_, i) => (
        <mesh key={`dash-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-12 + i * 1.0, -2.76, 0]}>
          <planeGeometry args={[0.5, 0.06]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// TRUCK MOVEMENT CONTROLLER (diagonal: top-right → bottom-left)
// ═══════════════════════════════════════════════════════════════

function TruckMovementController() {
  const truckGroupRef = useRef();

  useFrame(({ clock }) => {
    if (!truckGroupRef.current) return;
    const t = clock.getElapsedTime();

    // ── Diagonal loop: top-right → bottom-left ──
    // Full cycle: ~18 seconds for one diagonal crossing
    const cycleDuration = 18;
    const cycleProgress = (t % cycleDuration) / cycleDuration;

    // Ease-in-out for smooth motion
    const eased = cycleProgress < 0.5
      ? 2 * cycleProgress * cycleProgress
      : 1 - Math.pow(-2 * cycleProgress + 2, 2) / 2;

    // Start: mid-right area
    // End: bottom-left area
    const startX = 7;
    const startY = 3.5;
    const endX = -8;
    const endY = -2.5;

    const x = startX + (endX - startX) * eased;
    const y = startY + (endY - startY) * eased;

    // Slight depth movement (z)
    const z = Math.sin(cycleProgress * Math.PI) * 1.5;

    truckGroupRef.current.position.set(x, y, z);

    // ── Truck faces movement direction (diagonally left-down) ──
    const rotationY = -0.35; // face slightly left
    const rotationZ = Math.sin(cycleProgress * Math.PI) * 0.05;
    truckGroupRef.current.rotation.set(0, rotationY, rotationZ);

    // ── Expose truck world position for exhaust particles ──
    window.__truckWorldX = x;
    window.__truckWorldY = y;
    window.__truckWorldZ = z;

    // ── Subtle bounce ──
    const bounce = Math.abs(Math.sin(cycleProgress * 14)) * 0.03;
    truckGroupRef.current.position.y += bounce;
  });

  return (
    <group ref={truckGroupRef}>
      <RealisticTruck />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCENE
// ═══════════════════════════════════════════════════════════════

function Scene() {
  return (
    <>
      {/* ── Brighter Lighting for visibility ── */}
      <ambientLight intensity={1.2} color="#8899CC" />
      <directionalLight position={[10, 12, 8]} intensity={2.5} color="#FFFFFF" />
      <directionalLight position={[-6, 4, -5]} intensity={1.0} color="#8899FF" />
      <directionalLight position={[0, 2, 10]} intensity={1.5} color="#FFEEDD" />
      <pointLight position={[0, 5, 4]} intensity={2.0} color="#00E5FF" distance={20} />
      <pointLight position={[-3, -1, 5]} intensity={1.5} color="#00FF94" distance={15} />

      {/* ── Road ── */}
      <RoadSurface />

      {/* ── Ambient aurora atmosphere ── */}
      <AmbientAurora count={80} />

      {/* ── Truck exhaust aurora smoke ── */}
      <AuroraExhaustSmoke />

      {/* ── Animated truck ── */}
      <TruckMovementController />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// EXPORT — Global Canvas
// ═══════════════════════════════════════════════════════════════

export default function GlobalTruckScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 9], fov: 55, near: 0.2, far: 60 }}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        background: 'transparent',
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4,
      }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
