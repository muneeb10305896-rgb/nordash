"use client";
import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ── Shared scroll state (written by Lenis listener, read by useFrame) ──
const scrollState = { progress: 0, target: 0, velocity: 0 };
let lastProgress = 0;

// ═══════════════════════════════════════════════════════════════
// PAKISTANI TRUCK — Full 3D model built from primitives
// ═══════════════════════════════════════════════════════════════

// ── Color palette (Pakistani truck art) ──
const C = {
  bodyRed:    '#C41E3A',
  bodyBlue:   '#1565C0',
  saffron:    '#FFB300',
  gold:       '#FFC93C',
  emerald:    '#2D5F3F',
  white:      '#F5F5F5',
  chrome:     '#C0C0C0',
  darkMetal:  '#2A2A2A',
  tire:       '#1A1A1A',
  orange:     '#FF6B35',
  rose:       '#FF4081',
  teal:       '#00897B',
  purple:     '#7B1FA2',
  yellow:     '#FFEB3B',
  wood:       '#5D4037',
  glass:      '#4FC3F7',
};

/* ── Wheel ──────────────────────────────────────────────── */
function TruckWheel({ position, radius = 0.52, width = 0.32 }) {
  const group = useRef();
  const wheelGroup = useRef();

  // Expose for external rotation
  useEffect(() => {
    wheelGroup.current.userData = { radius };
  }, [radius]);

  return (
    <group ref={group} position={position}>
      {/* Tire */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius, radius, width, 24]} />
        <meshStandardMaterial color={C.tire} roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Hubcap — decorative pattern */}
      <group ref={wheelGroup}>
        {/* Outer rim */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
          <torusGeometry args={[radius * 0.78, 0.06, 8, 24]} />
          <meshStandardMaterial color={C.chrome} roughness={0.25} metalness={0.9} />
        </mesh>
        {/* Hub center */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
          <cylinderGeometry args={[radius * 0.22, radius * 0.22, width * 1.05, 8]} />
          <meshStandardMaterial color={C.saffron} roughness={0.3} metalness={0.7} emissive={C.saffron} emissiveIntensity={0.15} />
        </mesh>
        {/* Hub spokes — truck art star pattern */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              rotation={[0, 0, Math.PI / 2]}
              position={[
                Math.cos(angle) * radius * 0.48,
                Math.sin(angle) * radius * 0.48,
                0,
              ]}
            >
              <cylinderGeometry args={[0.04, 0.04, width * 1.02, 6]} />
              <meshStandardMaterial color={C.saffron} roughness={0.3} metalness={0.8} emissive={C.saffron} emissiveIntensity={0.1} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ── Decorative Panel (truck art) ────────────────────────── */
function ArtPanel({ position, rotation, size, color, pattern = 'diamond' }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base panel */}
      <mesh>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* Decorative border */}
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[size[0] - 0.1, size[1] - 0.1]} />
        <meshStandardMaterial
          color={C.saffron}
          roughness={0.3}
          metalness={0.5}
          emissive={C.saffron}
          emissiveIntensity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Inner pattern diamonds */}
      {pattern === 'diamond' &&
        Array.from({ length: 4 }).map((_, i) => {
          const row = Math.floor(i / 2);
          const col = i % 2;
          const px = (col - 0.5) * size[0] * 0.35;
          const py = (row - 0.5) * size[1] * 0.45;
          return (
            <mesh key={i} position={[px, py, 0.004]} rotation={[0, 0, Math.PI / 4]}>
              <planeGeometry args={[0.22, 0.22]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? C.bodyRed : C.emerald}
                roughness={0.3}
                metalness={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        })}
      {pattern === 'stripe' &&
        Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, (i - 2) * size[1] * 0.16, 0.004]}>
            <planeGeometry args={[size[0] - 0.2, 0.04]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? C.saffron : C.bodyRed}
              roughness={0.3}
              metalness={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
    </group>
  );
}

/* ── Crown / Taj (iconic Pakistani truck crown) ─────────── */
function CrownTaj({ position }) {
  const crownRef = useRef();
  const { clock } = useThree();

  useFrame(() => {
    if (!crownRef.current) return;
    // Subtle shimmer oscillation
    const t = clock.getElapsedTime();
    crownRef.current.children.forEach((child, i) => {
      if (child.material && child.material.emissiveIntensity !== undefined) {
        child.material.emissiveIntensity = 0.12 + Math.sin(t * 3 + i) * 0.06;
      }
    });
  });

  return (
    <group ref={crownRef} position={position}>
      {/* Base plate */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.08, 1.4]} />
        <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.95} />
      </mesh>

      {/* Tier 1 — arched decorative band */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.6, 0.28, 1.2]} />
        <meshStandardMaterial color={C.saffron} roughness={0.3} metalness={0.7} emissive={C.saffron} emissiveIntensity={0.1} />
      </mesh>

      {/* Decorative cutouts on tier 1 */}
      {[-0.5, 0, 0.5].map((x, i) => (
        <mesh key={`t1-${i}`} position={[x, 0.2, 0.61]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshStandardMaterial color={C.bodyRed} roughness={0.3} metalness={0.4} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Tier 2 — arches */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[1.3, 0.22, 1.0]} />
        <meshStandardMaterial color={C.emerald} roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Small diamonds on tier 2 */}
      {[-0.35, 0.35].map((x, i) => (
        <mesh key={`t2d-${i}`} position={[x, 0.52, 0.51]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.14, 0.14]} />
          <meshStandardMaterial color={C.saffron} roughness={0.2} metalness={0.6} emissive={C.saffron} emissiveIntensity={0.2} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Crown spikes / finials */}
      {[-0.5, -0.2, 0.1, 0.4].map((x, i) => (
        <mesh key={`spike-${i}`} position={[x, 0.72, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.06, 0.3, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? C.chrome : C.saffron}
            roughness={0.2}
            metalness={0.9}
            emissive={i % 2 === 0 ? C.chrome : C.saffron}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}

      {/* Central spire — tallest */}
      <mesh position={[0, 0.88, 0]}>
        <coneGeometry args={[0.08, 0.4, 8]} />
        <meshStandardMaterial color={C.chrome} roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Star on top */}
      <mesh position={[0, 1.12, 0]}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color={C.saffron} roughness={0.2} metalness={0.7} emissive={C.saffron} emissiveIntensity={0.35} />
      </mesh>

      {/* Front decorative panel of crown */}
      <mesh position={[0, 0.35, 0.61]}>
        <planeGeometry args={[1.1, 0.55]} />
        <meshStandardMaterial color={C.bodyRed} roughness={0.3} metalness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Intricate pattern on front panel */}
      {[
        [-0.25, 0.42, 0.62],
        [0.25, 0.42, 0.62],
        [0, 0.25, 0.62],
      ].map((p, i) => (
        <mesh key={`fp-${i}`} position={p} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.12, 0.12]} />
          <meshStandardMaterial color={C.saffron} roughness={0.2} metalness={0.6} emissive={C.saffron} emissiveIntensity={0.25} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Side hanging ornaments */}
      {[-0.7, 0.7].map((x, i) => (
        <group key={`orn-${i}`} position={[x, -0.08, 0]}>
          <mesh position={[0, -0.18, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color={C.saffron} roughness={0.2} metalness={0.7} emissive={C.saffron} emissiveIntensity={0.3} />
          </mesh>
          {[-0.1, 0, 0.1].map((z, j) => (
            <mesh key={`chain-${j}`} position={[0, -0.35 - j * 0.15, z * 0.5]}>
              <sphereGeometry args={[0.03, 6, 6]} />
              <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.9} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ── Cabin ──────────────────────────────────────────────── */
function Cabin() {
  return (
    <group position={[-3.0, 0.95, 0]}>
      {/* Main cabin body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.8, 1.6, 2.2]} />
        <meshStandardMaterial color={C.bodyBlue} roughness={0.35} metalness={0.3} />
      </mesh>

      {/* Cabin lower (doors area) */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[1.8, 0.6, 2.2]} />
        <meshStandardMaterial color={C.bodyBlue} roughness={0.35} metalness={0.3} />
      </mesh>

      {/* Windshield — angled */}
      <mesh position={[-0.95, 0.55, 0]} rotation={[0, 0, 0.35]}>
        <planeGeometry args={[0.05, 1.1, 1.8]} />
        <meshStandardMaterial color={C.glass} roughness={0.1} metalness={0.3} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Side windows */}
      <mesh position={[0, 0.65, 1.11]}>
        <planeGeometry args={[0.9, 0.55]} />
        <meshStandardMaterial color={C.glass} roughness={0.1} metalness={0.3} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 0.65, -1.11]}>
        <planeGeometry args={[0.9, 0.55]} />
        <meshStandardMaterial color={C.glass} roughness={0.1} metalness={0.3} transparent opacity={0.5} />
      </mesh>

      {/* Cabin roof */}
      <mesh position={[0, 1.22, 0]}>
        <boxGeometry args={[1.82, 0.06, 2.22]} />
        <meshStandardMaterial color={C.white} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Truck art on cabin doors */}
      <ArtPanel
        position={[0, 0.15, 1.11]}
        rotation={[0, 0, 0]}
        size={[0.8, 0.9]}
        color={C.bodyBlue}
        pattern="diamond"
      />
      <ArtPanel
        position={[0, 0.15, -1.11]}
        rotation={[0, Math.PI, 0]}
        size={[0.8, 0.9]}
        color={C.bodyBlue}
        pattern="diamond"
      />

      {/* Door handles */}
      {[1.11, -1.11].map((z, i) => (
        <mesh key={`handle-${i}`} position={[-0.1, -0.15, z]}>
          <boxGeometry args={[0.25, 0.05, 0.06]} />
          <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* Side mirror mounts */}
      {[1.16, -1.16].map((z, i) => (
        <group key={`mirror-${i}`}>
          <mesh position={[-0.7, 0.9, z]}>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[-0.85, 0.9, z * 1.1]}>
            <boxGeometry args={[0.22, 0.15, 0.04]} />
            <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Cargo Bed ──────────────────────────────────────────── */
function CargoBed() {
  const length = 5.5;
  const width = 2.1;
  const height = 1.4;

  return (
    <group position={[0.85, 0.35, 0]}>
      {/* Bed floor */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[length, 0.08, width]} />
        <meshStandardMaterial color={C.wood} roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Left side panel (decorated) */}
      <mesh position={[0, height / 2, width / 2]}>
        <boxGeometry args={[length, height, 0.06]} />
        <meshStandardMaterial color={C.bodyRed} roughness={0.35} metalness={0.25} />
      </mesh>

      {/* Right side panel (decorated) */}
      <mesh position={[0, height / 2, -width / 2]}>
        <boxGeometry args={[length, height, 0.06]} />
        <meshStandardMaterial color={C.bodyRed} roughness={0.35} metalness={0.25} />
      </mesh>

      {/* Front panel (near cabin) */}
      <mesh position={[-length / 2, height / 2, 0]}>
        <boxGeometry args={[0.06, height, width]} />
        <meshStandardMaterial color={C.bodyRed} roughness={0.35} metalness={0.25} />
      </mesh>

      {/* Back panel (tailgate) */}
      <mesh position={[length / 2, height / 2, 0]}>
        <boxGeometry args={[0.06, height, width]} />
        <meshStandardMaterial color={C.bodyRed} roughness={0.35} metalness={0.25} />
      </mesh>

      {/* Top rail — left */}
      <mesh position={[0, height + 0.04, width / 2]}>
        <boxGeometry args={[length, 0.06, 0.08]} />
        <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Top rail — right */}
      <mesh position={[0, height + 0.04, -width / 2]}>
        <boxGeometry args={[length, 0.06, 0.08]} />
        <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* ── Truck Art Decorative Panels on cargo bed sides ── */}
      {/* Left side — large decorative panels */}
      <ArtPanel
        position={[0, height * 0.45, width / 2 + 0.04]}
        rotation={[0, 0, 0]}
        size={[length - 0.3, height - 0.3]}
        color={C.saffron}
        pattern="stripe"
      />

      {/* Right side — mirror panels */}
      <ArtPanel
        position={[0, height * 0.45, -(width / 2 + 0.04)]}
        rotation={[0, Math.PI, 0]}
        size={[length - 0.3, height - 0.3]}
        color={C.saffron}
        pattern="stripe"
      />

      {/* Back tailgate art */}
      <ArtPanel
        position={[length / 2 + 0.04, height * 0.4, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[width - 0.3, height - 0.3]}
        color={C.saffron}
        pattern="diamond"
      />

      {/* ── Decorative hanging tassels from cargo bed ── */}
      {Array.from({ length: 10 }).map((_, i) => {
        const x = -length / 2 + 0.4 + i * (length - 0.8) / 9;
        const side = i % 2 === 0 ? 1 : -1;
        const z = side * (width / 2 + 0.05);
        return (
          <group key={`tassel-${i}`} position={[x, -0.15, z]}>
            {/* Tassel string */}
            <mesh position={[0, -0.25, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
              <meshStandardMaterial color={C.saffron} roughness={0.3} metalness={0.5} />
            </mesh>
            {/* Tassel pom-pom */}
            <mesh position={[0, -0.55, 0]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? C.saffron : i % 3 === 1 ? C.bodyRed : C.emerald}
                roughness={0.2}
                metalness={0.4}
                emissive={i % 3 === 0 ? C.saffron : i % 3 === 1 ? C.bodyRed : C.emerald}
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* ── Vertical posts at corners ── */}
      {[
        [-length / 2, width / 2],
        [-length / 2, -width / 2],
        [length / 2, width / 2],
        [length / 2, -width / 2],
      ].map(([px, pz], i) => (
        <mesh key={`post-${i}`} position={[px, height + 0.22, pz]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
          <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* Decorative top finials on posts */}
      {[
        [-length / 2, width / 2],
        [-length / 2, -width / 2],
        [length / 2, width / 2],
        [length / 2, -width / 2],
      ].map(([px, pz], i) => (
        <mesh key={`finial-${i}`} position={[px, height + 0.5, pz]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? C.saffron : C.bodyRed}
            roughness={0.2}
            metalness={0.6}
            emissive={i % 2 === 0 ? C.saffron : C.bodyRed}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}

      {/* ── "PAKISTAN" style decorative text area ── */}
      <mesh position={[0, height * 0.42, -(width / 2 + 0.035)]}>
        <planeGeometry args={[2.0, 0.18]} />
        <meshStandardMaterial color={C.white} roughness={0.3} metalness={0.3} emissive={C.white} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

/* ── Chassis / Frame ────────────────────────────────────── */
function Chassis() {
  return (
    <group>
      {/* Main frame rails (left and right) */}
      {[0.9, -0.9].map((z, i) => (
        <mesh key={`rail-${i}`} position={[0, 0.3, z]}>
          <boxGeometry args={[7.5, 0.14, 0.12]} />
          <meshStandardMaterial color={C.darkMetal} roughness={0.5} metalness={0.8} />
        </mesh>
      ))}

      {/* Cross members */}
      {[-2.5, -1, 0.5, 2, 3.5].map((x, i) => (
        <mesh key={`cross-${i}`} position={[x, 0.3, 0]}>
          <boxGeometry args={[0.1, 0.1, 1.8]} />
          <meshStandardMaterial color={C.darkMetal} roughness={0.5} metalness={0.8} />
        </mesh>
      ))}

      {/* Front bumper */}
      <mesh position={[-3.9, 0.25, 0]}>
        <boxGeometry args={[0.2, 0.3, 2.1]} />
        <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Bumper decorative strip */}
      <mesh position={[-3.9, 0.25, 0]}>
        <boxGeometry args={[0.22, 0.08, 2.0]} />
        <meshStandardMaterial color={C.saffron} roughness={0.2} metalness={0.7} emissive={C.saffron} emissiveIntensity={0.15} />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[3.9, 0.25, 0]}>
        <boxGeometry args={[0.2, 0.3, 2.1]} />
        <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Exhaust pipes (vertical, behind cabin) */}
      {[0.85, -0.85].map((z, i) => (
        <group key={`exhaust-${i}`} position={[-1.5, 0.3, z]}>
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.06, 0.07, 2.0, 12]} />
            <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Exhaust tip */}
          <mesh position={[0, 2.05, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 0.12, 12]} />
            <meshStandardMaterial color={C.chrome} roughness={0.15} metalness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Headlights */}
      {[0.75, -0.75].map((z, i) => (
        <group key={`headlight-${i}`} position={[-3.95, 0.55, z]}>
          <mesh>
            <boxGeometry args={[0.15, 0.18, 0.18]} />
            <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[-0.02, 0, 0]}>
            <circleGeometry args={[0.07, 12]} />
            <meshStandardMaterial
              color="#FFFFCC"
              roughness={0.05}
              metalness={0.1}
              emissive="#FFFFCC"
              emissiveIntensity={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* Fog lights */}
      {[0.65, -0.65].map((z, i) => (
        <group key={`fog-${i}`} position={[-3.95, 0.18, z]}>
          <mesh>
            <circleGeometry args={[0.05, 8]} />
            <meshStandardMaterial
              color="#FFEE88"
              roughness={0.05}
              metalness={0.1}
              emissive="#FFEE88"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>
      ))}

      {/* Front grille */}
      <mesh position={[-3.95, 0.55, 0]}>
        <boxGeometry args={[0.06, 0.3, 0.6]} />
        <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Grille slats */}
      {[-0.1, 0, 0.1].map((y, i) => (
        <mesh key={`grille-${i}`} position={[-3.95, 0.55 + y, 0]}>
          <boxGeometry args={[0.07, 0.02, 0.5]} />
          <meshStandardMaterial color={C.darkMetal} roughness={0.4} metalness={0.8} />
        </mesh>
      ))}

      {/* Front license plate */}
      <mesh position={[-3.95, 0.18, 0]}>
        <planeGeometry args={[0.4, 0.12]} />
        <meshStandardMaterial color={C.white} roughness={0.3} metalness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Mudguards */}
      {[-2.8, 2.5].map((x, i) => (
        <mesh key={`mudguard-${i}`} position={[x, 0.5, 1.05]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.06, 0.08]} />
          <meshStandardMaterial color={C.darkMetal} roughness={0.5} metalness={0.7} />
        </mesh>
      ))}
      {[-2.8, 2.5].map((x, i) => (
        <mesh key={`mudguard-r-${i}`} position={[x, 0.5, -1.05]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.06, 0.08]} />
          <meshStandardMaterial color={C.darkMetal} roughness={0.5} metalness={0.7} />
        </mesh>
      ))}

      {/* Fuel tank (between cabin and rear axle) */}
      <mesh position={[-1.8, 0.35, 1.0]}>
        <boxGeometry args={[1.2, 0.35, 0.3]} />
        <meshStandardMaterial color={C.darkMetal} roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Side steps */}
      {[0.95, -0.95].map((z, i) => (
        <mesh key={`step-${i}`} position={[-1.3, 0.15, z]}>
          <boxGeometry args={[1.2, 0.06, 0.2]} />
          <meshStandardMaterial color={C.chrome} roughness={0.2} metalness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Full Truck assembly ────────────────────────────────── */
function PakistaniTruck() {
  const truckRef = useRef();
  const wheelRefs = useRef([]);

  // Wheel positions: [front-left, front-right, rear1-left, rear1-right, rear2-left, rear2-right]
  const wheelPositions = useMemo(
    () => [
      { pos: [-2.75, 0.5, 1.05], key: 'fw-l' },   // front wheel left
      { pos: [-2.75, 0.5, -1.05], key: 'fw-r' },  // front wheel right
      { pos: [1.8, 0.5, 1.05], key: 'r1-l' },     // rear axle 1 left
      { pos: [1.8, 0.5, -1.05], key: 'r1-r' },    // rear axle 1 right
      { pos: [3.2, 0.5, 1.05], key: 'r2-l' },     // rear axle 2 left
      { pos: [3.2, 0.5, -1.05], key: 'r2-r' },    // rear axle 2 right
    ],
    [],
  );

  // Store wheel refs for rotation from parent
  useEffect(() => {
    truckRef.current.userData = { wheelRefs };
  }, []);

  return (
    <group ref={truckRef}>
      <Chassis />
      <Cabin />
      <CargoBed />
      <CrownTaj position={[-3.0, 2.2, 0]} />
      {wheelPositions.map(({ pos, key }) => (
        <TruckWheel key={key} position={pos} />
      ))}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// NORDIC AURORA LIGHTS — Flowing ribbons behind the truck
// ═══════════════════════════════════════════════════════════════

function AuroraRibbon({ offset = 0, color1 = '#00E5FF', color2 = '#7B61FF', width = 2.5, length = 14, segments = 80 }) {
  const meshRef = useRef();
  const { clock } = useThree();

  const { positions, colors, indices } = useMemo(() => {
    const pos = new Float32Array((segments + 1) * 2 * 3);
    const col = new Float32Array((segments + 1) * 2 * 3);
    const idx = [];

    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      // Top edge
      const iTop = i * 2;
      pos[iTop * 3] = -t * length;
      pos[iTop * 3 + 1] = width / 2;
      pos[iTop * 3 + 2] = 0;
      // Bottom edge
      const iBot = i * 2 + 1;
      pos[iBot * 3] = -t * length;
      pos[iBot * 3 + 1] = -width / 2;
      pos[iBot * 3 + 2] = 0;

      // Color gradient
      const mixed = c1.clone().lerp(c2, t);
      col[iTop * 3] = mixed.r;
      col[iTop * 3 + 1] = mixed.g;
      col[iTop * 3 + 2] = mixed.b;
      col[iBot * 3] = mixed.r;
      col[iBot * 3 + 1] = mixed.g;
      col[iBot * 3 + 2] = mixed.b;

      if (i < segments) {
        const base = iTop;
        idx.push(base, base + 1, base + 2);
        idx.push(base + 1, base + 3, base + 2);
      }
    }

    return { positions: pos, colors: col, indices: new Uint16Array(idx) };
  }, [color1, color2, width, length, segments]);

  useFrame(({ clock: frameClock }) => {
    if (!meshRef.current) return;
    const t = frameClock.getElapsedTime();
    const posArr = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * -length;
      const phaseShift = t * 1.8 + offset + x * 0.6;

      // Organic wave — like real aurora
      const waveY = Math.sin(phaseShift) * 0.7 + Math.sin(phaseShift * 2.3 + offset) * 0.35 + Math.sin(phaseShift * 0.7 + offset * 1.7) * 0.5;

      const iTop = i * 2;
      const iBot = i * 2 + 1;
      posArr[iTop * 3 + 1] = width / 2 + waveY;
      posArr[iBot * 3 + 1] = -width / 2 + waveY;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attach="index" array={indices} itemSize={1} />
      </bufferGeometry>
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.22}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ── Aurora Particle Stream ─────────────────────────────── */
function AuroraParticles({ count = 300 }) {
  const pointsRef = useRef();
  const { clock } = useThree();

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
      new THREE.Color('#00B8D4'),
    ];

    for (let i = 0; i < count; i++) {
      // Spread particles in a wide area
      pos[i * 3] = (Math.random() - 0.7) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = Math.random() * 0.08 + 0.02;
    }

    return { positions: pos, colors: col, sizes: siz };
  }, [count]);

  useFrame(({ clock: frameClock }) => {
    if (!pointsRef.current) return;
    const t = frameClock.getElapsedTime();
    const posArr = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Flowing aurora movement
      const baseX = posArr[i3];
      const baseY = posArr[i3 + 1];

      // Wave-based displacement
      const wave = Math.sin(t * 0.7 + baseY * 1.5 + i * 0.1) * 0.8;
      const wave2 = Math.cos(t * 0.5 + baseX * 1.2 + i * 0.13) * 0.6;

      posArr[i3] = baseX + wave * 0.3;
      posArr[i3 + 1] = baseY + wave2 * 0.4;
      posArr[i3 + 2] += Math.sin(t * 0.3 + i * 0.2) * 0.01;

      // Wrap particles that drift too far
      if (posArr[i3 + 2] > 3) posArr[i3 + 2] = -4;
      if (posArr[i3 + 2] < -5) posArr[i3 + 2] = 2;
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
        size={0.06}
        vertexColors
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Aurora Borealis Sky Curtains ────────────────────────── */
function AuroraSkyCurtains() {
  const groupRef = useRef();
  const { clock } = useThree();

  return (
    <group ref={groupRef}>
      {/* Multiple flowing aurora ribbons in the sky */}
      <group position={[1, 5.5, -3]} rotation={[0.3, 0, 0]}>
        <AuroraRibbon offset={0} color1="#00E5FF" color2="#7B61FF" width={2.2} length={16} segments={100} />
      </group>
      <group position={[-3, 4.8, -4]} rotation={[0.5, 0.2, 0.15]}>
        <AuroraRibbon offset={2.4} color1="#00FF94" color2="#1E90FF" width={1.8} length={18} segments={90} />
      </group>
      <group position={[4, 6.0, -5]} rotation={[0.25, -0.15, -0.1]}>
        <AuroraRibbon offset={4.8} color1="#B388FF" color2="#00E5FF" width={3.0} length={20} segments={100} />
      </group>
      <group position={[-1, 6.5, -6]} rotation={[0.4, 0.1, 0.05]}>
        <AuroraRibbon offset={1.6} color1="#00B8D4" color2="#7B61FF" width={2.5} length={15} segments={85} />
      </group>
      {/* Lower atmosphere ribbons */}
      <group position={[2, 2.5, -2]} rotation={[0.15, -0.1, 0]}>
        <AuroraRibbon offset={3.2} color1="#00E5FF" color2="#00FF94" width={1.5} length={12} segments={70} />
      </group>
    </group>
  );
}

/* ── Truck Exhaust Aurora — Nordic lights released from exhaust ── */
function TruckExhaustAurora() {
  const pointsRef = useRef();
  const particleCount = 200;

  const { positions, colors, sizes, lifetimes } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const siz = new Float32Array(particleCount);
    const life = new Float32Array(particleCount);

    const palette = [
      new THREE.Color('#00E5FF'),
      new THREE.Color('#7B61FF'),
      new THREE.Color('#00FF94'),
      new THREE.Color('#B388FF'),
      new THREE.Color('#00B8D4'),
    ];

    for (let i = 0; i < particleCount; i++) {
      // Initialize particles in a dormant state
      pos[i * 3] = 0;
      pos[i * 3 + 1] = -999;
      pos[i * 3 + 2] = 0;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      siz[i] = Math.random() * 0.12 + 0.03;
      life[i] = Math.random(); // each particle has a random phase
    }

    return { positions: pos, colors: col, sizes: siz, lifetimes: life };
  }, [particleCount]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArr = pointsRef.current.geometry.attributes.position.array;
    const truckX = scrollState.truckX ?? 7.5;
    const truckY = scrollState.truckY ?? 1.2;
    const truckZ = scrollState.truckZ ?? 1.5;
    const velocity = Math.abs(scrollState.velocity);

    // Exhaust pipe world position (rear of cabin, top of exhaust)
    const exhaustX = truckX - 1.5; // behind cabin
    const exhaustY = truckY + 1.8; // top of exhaust pipes
    const exhaustZ = truckZ;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const life = lifetimes[i];

      // If particle is "dead" (below ground or too old), respawn at exhaust
      if (posArr[i3 + 1] < -8 || posArr[i3 + 1] === -999) {
        // Respawn at exhaust position with random offset
        posArr[i3] = exhaustX + (Math.random() - 0.5) * 0.3;
        posArr[i3 + 1] = exhaustY + (Math.random() - 0.5) * 0.2;
        posArr[i3 + 2] = exhaustZ + (Math.random() - 0.5) * 0.8;
      }

      // Drift upward and spread outward (like aurora lights)
      const driftSpeed = 0.02 + velocity * 0.008;
      posArr[i3 + 1] += driftSpeed * (0.6 + life * 0.8); // rise up
      posArr[i3] -= driftSpeed * 0.25 + Math.sin(life * 10) * 0.01; // drift left (trail)
      posArr[i3 + 2] += (Math.sin(life * 7) * 0.02 + Math.cos(life * 5) * 0.015); // spread sideways

      // Size pulsates
      const sizArr = pointsRef.current.geometry.attributes.size.array;
      sizArr[i] = (0.04 + life * 0.1) * (0.6 + Math.sin(scrollState.progress * 20 + life * 12) * 0.4);
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Road Surface ────────────────────────────────────────── */
function RoadSurface() {
  return (
    <group>
      {/* Main road plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
        <planeGeometry args={[40, 8]} />
        <meshStandardMaterial color="#1A1A2E" roughness={0.8} metalness={0.1} transparent opacity={0.7} />
      </mesh>

      {/* Road edge lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.18, 3.95]}>
        <planeGeometry args={[40, 0.08]} />
        <meshBasicMaterial color="#FFB300" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.18, -3.95]}>
        <planeGeometry args={[40, 0.08]} />
        <meshBasicMaterial color="#FFB300" transparent opacity={0.4} />
      </mesh>

      {/* Center dashed line */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`dash-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-9 + i * 1.0, -2.18, 0]}>
          <planeGeometry args={[0.5, 0.06]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Distant Mountains / Background Silhouette ────────────── */
function BackgroundMountains() {
  return (
    <group position={[0, -1.5, -8]}>
      {[
        { x: -8, s: 2.5, h: 3.5 },
        { x: -4, s: 3.2, h: 5.0 },
        { x: 0, s: 4.0, h: 6.5 },
        { x: 4, s: 3.0, h: 4.5 },
        { x: 8, s: 2.8, h: 3.8 },
      ].map((m, i) => (
        <mesh key={`mt-${i}`} position={[m.x, m.h / 2 - 1, 0]}>
          <coneGeometry args={[m.s, m.h, 6]} />
          <meshBasicMaterial color="#0A1628" transparent opacity={0.5} />
        </mesh>
      ))}
      {/* Snow caps */}
      {[
        { x: -4, y: 3.7, s: 0.7, h: 0.8 },
        { x: 0, y: 5.0, s: 1.0, h: 1.2 },
        { x: 4, y: 3.2, s: 0.6, h: 0.7 },
      ].map((m, i) => (
        <mesh key={`snow-${i}`} position={[m.x, m.y, 0.05]}>
          <coneGeometry args={[m.s, m.h, 6]} />
          <meshBasicMaterial color="#1A3A5C" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCROLL-DRIVEN TRUCK ANIMATION
// ═══════════════════════════════════════════════════════════════

function TruckScrollController() {
  const truckRef = useRef();
  const { camera } = useThree();

  useFrame(() => {
    // Smooth interpolation toward target scroll progress
    scrollState.progress += (scrollState.target - scrollState.progress) * 0.06;
    scrollState.velocity = (scrollState.progress - lastProgress) * 60; // approx per-frame delta
    lastProgress = scrollState.progress;

    const p = scrollState.progress; // 0..1 (approximate, page scroll)

    if (!truckRef.current) return;

    // ── Truck path: diagonal top-right → bottom-left ──
    // Start (p=0): truck at right side, slightly elevated
    // End (p~0.5): truck moved past left, gone off-screen
    // The truck path maps to hero section scroll (roughly first 50% of page)

    const heroProgress = Math.min(p * 2.1, 1.0); // Compress to hero section range

    // Position interpolation
    const startX = 7.5;
    const endX = -9;
    const x = startX + (endX - startX) * heroProgress;

    const startY = 1.2;
    const midY = -0.2;
    const endY = -1.5;
    const y =
      heroProgress < 0.5
        ? startY + (midY - startY) * (heroProgress * 2)
        : midY + (endY - midY) * ((heroProgress - 0.5) * 2);

    const startZ = 1.5;
    const midZ = 0;
    const endZ = -2.5;
    const z =
      heroProgress < 0.5
        ? startZ + (midZ - startZ) * (heroProgress * 2)
        : midZ + (endZ - midZ) * ((heroProgress - 0.5) * 2);

    truckRef.current.position.set(x, y, z);

    // ── Share truck world-position so exhaust aurora can follow ──
    scrollState.truckX = x;
    scrollState.truckY = y;
    scrollState.truckZ = z;

    // ── Rotation: slight tilt as truck "drives" ──
    const tiltZ = Math.sin(heroProgress * Math.PI) * 0.08;
    const rotationY = -0.15 + heroProgress * 0.25;
    truckRef.current.rotation.set(0.02, rotationY, tiltZ);

    // ── Subtle bounce ──
    const bounce = Math.abs(Math.sin(heroProgress * 12)) * 0.04 * (1 - heroProgress);
    truckRef.current.position.y += bounce;

    // ── Wheel rotation ──
    const wheelSpeed = scrollState.velocity * 3.5;
    if (truckRef.current.userData?.wheelRefs?.current) {
      truckRef.current.userData.wheelRefs.current.forEach((ref) => {
        if (ref?.current) {
          ref.current.children.forEach((child) => {
            if (child.type === 'Group') {
              child.rotation.x += wheelSpeed * 0.02;
            }
          });
        }
      });
    }

    // ── Camera subtle parallax ──
    camera.position.x = Math.sin(heroProgress * 0.6) * 1.5;
    camera.position.y = -heroProgress * 0.5;
    camera.lookAt(x * 0.3, y * 0.3, 0);
  });

  return (
    <group ref={truckRef}>
      <PakistaniTruck />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCENE ROOT
// ═══════════════════════════════════════════════════════════════

function Scene() {
  return (
    <>
      {/* Ambient & directional lighting */}
      <ambientLight intensity={0.35} color="#1A2A4A" />
      <directionalLight position={[5, 8, 3]} intensity={0.7} color="#E8F0FF" />
      <directionalLight position={[-3, 2, -2]} intensity={0.25} color="#7B61FF" />
      <pointLight position={[0, 3, 2]} intensity={0.4} color="#00E5FF" distance={12} />
      <pointLight position={[-2, -1, 3]} intensity={0.3} color="#00FF94" distance={10} />

      {/* Background mountains (Nordic landscape) */}
      <BackgroundMountains />

      {/* Road surface */}
      <RoadSurface />

      {/* Sky aurora curtains (Nordic lights) */}
      <AuroraSkyCurtains />

      {/* Floating aurora particles throughout the scene */}
      <AuroraParticles count={250} />

      {/* Truck exhaust aurora — Nordic lights released by the truck */}
      <TruckExhaustAurora />

      {/* The truck — scroll-driven */}
      <TruckScrollController />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={['#050A14', 8, 35]} />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// EXPORT — Canvas with Lenis scroll listener
// ═══════════════════════════════════════════════════════════════

export default function HeroScene() {
  // Listen to Lenis smooth-scroll progress events
  useEffect(() => {
    const handler = (e) => {
      scrollState.target = e.detail?.progress ?? 0;
    };
    window.addEventListener('lenis:scroll', handler);

    // Also listen to native scroll as fallback
    const nativeHandler = () => {
      const docEl = document.documentElement;
      const scrollTop = docEl.scrollTop || window.scrollY || 0;
      const scrollHeight = docEl.scrollHeight - docEl.clientHeight;
      if (scrollHeight > 0) {
        scrollState.target = scrollTop / scrollHeight;
      }
    };
    window.addEventListener('scroll', nativeHandler, { passive: true });

    return () => {
      window.removeEventListener('lenis:scroll', handler);
      window.removeEventListener('scroll', nativeHandler);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 1.5, 10], fov: 55, near: 0.1, far: 50 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
