'use client';

import { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import { useScroll, useAnimationFrame } from 'framer-motion';
import * as THREE from 'three';

// ── Truck Model ──────────────────────────────────────────────
function TruckModel({ scrollRef, isMobile }) {
  const bodyRef = useRef();
  const wheelsRef = useRef([]);
  const exhaustRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const progress = scrollRef.current;
    const truckX = -14 + progress * 28;

    if (bodyRef.current) {
      bodyRef.current.position.x = truckX;
      // Pulsing glow
      bodyRef.current.material.emissiveIntensity = 0.4 + Math.sin(t * 1.5) * 0.2;
    }

    // Rotate wheels
    wheelsRef.current.forEach(wheel => {
      wheel.rotation.x += 0.08;
    });

    if (exhaustRef.current) {
      exhaustRef.current.position.x = truckX;
    }
  });

  return (
    <group>
      {/* Body */}
      <mesh ref={bodyRef} position={[-14, 2, 0]}>
        <boxGeometry args={[4, 0.8, 1.5]} />
        <meshStandardMaterial color="#FFB300" emissive="#FFB300" emissiveIntensity={0.4} />
      </mesh>

      {/* Cabin */}
      <mesh position={[-12.2, 2.3, 0]}>
        <boxGeometry args={[1.5, 1.2, 1.5]} />
        <meshStandardMaterial color="#1A2B8C" emissive="#1A2B8C" emissiveIntensity={0.2} />
      </mesh>

      {/* Roof bar */}
      <mesh position={[-12, 3.1, 0]}>
        <boxGeometry args={[1.4, 0.15, 1.5]} />
        <meshStandardMaterial color="#007A4C" emissive="#007A4C" emissiveIntensity={0.3} />
      </mesh>

      {/* Wheels - back left */}
      <mesh
        ref={el => (wheelsRef.current[0] = el)}
        position={[-15.2, 0.8, -0.7]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.4, 0.4, 0.3, 12]} />
        <meshStandardMaterial color="#003D2B" emissive="#007A4C" emissiveIntensity={0.2} />
      </mesh>

      {/* Wheels - back right */}
      <mesh
        ref={el => (wheelsRef.current[1] = el)}
        position={[-15.2, 0.8, 0.7]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.4, 0.4, 0.3, 12]} />
        <meshStandardMaterial color="#003D2B" emissive="#007A4C" emissiveIntensity={0.2} />
      </mesh>

      {/* Wheels - front left */}
      <mesh
        ref={el => (wheelsRef.current[2] = el)}
        position={[-11, 0.8, -0.7]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.4, 0.4, 0.3, 12]} />
        <meshStandardMaterial color="#003D2B" emissive="#007A4C" emissiveIntensity={0.2} />
      </mesh>

      {/* Wheels - front right */}
      <mesh
        ref={el => (wheelsRef.current[3] = el)}
        position={[-11, 0.8, 0.7]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.4, 0.4, 0.3, 12]} />
        <meshStandardMaterial color="#003D2B" emissive="#007A4C" emissiveIntensity={0.2} />
      </mesh>

      {/* Decorative diamonds */}
      <mesh position={[-14.5, 2.2, 0.8]}>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial color="#FFB300" emissive="#FFB300" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-14.5, 2.2, -0.8]}>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial color="#007A4C" emissive="#007A4C" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-11.5, 2.2, 0.8]}>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial color="#007A4C" emissive="#007A4C" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-11.5, 2.2, -0.8]}>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial color="#FFB300" emissive="#FFB300" emissiveIntensity={0.5} />
      </mesh>

      {/* Exhaust stack */}
      <mesh ref={exhaustRef} position={[-12, 3.6, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Headlights */}
      <pointLight position={[-13, 2.5, 0.8]} color="#00E5FF" intensity={2} distance={8} />
      <pointLight position={[-13, 2.5, -0.8]} color="#00E5FF" intensity={2} distance={8} />
    </group>
  );
}

// ── Aurora Ribbon ────────────────────────────────────────────
function AuroraRibbon({ color, phase, amplitude, offset, scrollRef }) {
  const linesRef = useRef([]);
  const POINTS = 80;
  const RIBBON_WIDTH = 3;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const progress = scrollRef.current;
    const truckX = -14 + progress * 28;

    // Create multiple lines for width effect
    for (let line = 0; line < RIBBON_WIDTH; line++) {
      const positions = new Float32Array(POINTS * 3);
      const offsetZ = (line - RIBBON_WIDTH / 2 + 0.5) * 0.15;

      for (let i = 0; i < POINTS; i++) {
        const px = truckX - (i / POINTS) * progress * 28;
        const py = 2 + Math.sin(i * 0.15 + phase + t * 0.3) * amplitude;
        const pz = Math.cos(i * 0.1 + phase + t * 0.2) * 0.5 + offset + offsetZ;

        positions[i * 3] = px;
        positions[i * 3 + 1] = py;
        positions[i * 3 + 2] = pz;
      }

      if (linesRef.current[line]) {
        linesRef.current[line].geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        linesRef.current[line].geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {Array.from({ length: RIBBON_WIDTH }).map((_, i) => (
        <line key={i} ref={el => (linesRef.current[i] = el)}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={POINTS}
              array={new Float32Array(POINTS * 3)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={0.6 - i * 0.15}
            linewidth={2}
          />
        </line>
      ))}
    </group>
  );
}

// ── Exhaust Particles ────────────────────────────────────────
function ExhaustParticles({ scrollRef, isMobile }) {
  const pointsRef = useRef();
  const particlesRef = useRef([]);
  const maxParticles = isMobile ? 40 : 100;

  useMemo(() => {
    for (let i = 0; i < maxParticles; i++) {
      particlesRef.current.push({
        x: 0,
        y: 0,
        z: 0,
        vx: (Math.random() - 0.5) * 0.05,
        vy: Math.random() * 0.03 + 0.02,
        vz: (Math.random() - 0.5) * 0.02,
        age: Math.random() * maxParticles,
        lifespan: maxParticles * 2,
      });
    }
  }, [maxParticles]);

  useFrame(({ clock }) => {
    const progress = scrollRef.current;
    const truckX = -14 + progress * 28;
    const exhaustY = 3.6;
    const exhaustZ = 0;

    particlesRef.current.forEach(p => {
      p.age++;
      if (p.age > p.lifespan) {
        p.x = truckX;
        p.y = exhaustY;
        p.z = exhaustZ;
        p.age = 0;
      } else {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
      }
    });

    if (pointsRef.current) {
      const positions = new Float32Array(maxParticles * 3);
      const colors = new Float32Array(maxParticles * 3);
      const particleColors = ['#FFB300', '#00E5FF', '#7B61FF'];

      particlesRef.current.forEach((p, i) => {
        positions[i * 3] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;

        const colorIdx = i % particleColors.length;
        const color = new THREE.Color(particleColors[colorIdx]);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      });

      pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pointsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={maxParticles}
          array={new Float32Array(maxParticles * 3)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={maxParticles}
          array={new Float32Array(maxParticles * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial size={0.08} vertexColors transparent />
    </Points>
  );
}

// ── Aurora Ambient Particles ─────────────────────────────────
function AuroraParticles({ isMobile }) {
  const pointsRef = useRef();
  const count = isMobile ? 150 : 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 8 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color('#00E5FF'),
      new THREE.Color('#7B61FF'),
      new THREE.Color('#00FF94'),
      new THREE.Color('#FFB300'),
    ];
    for (let i = 0; i < count; i++) {
      const c = colorChoices[i % colorChoices.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <PointMaterial size={0.06} vertexColors transparent opacity={0.6} sizeAttenuation />
    </Points>
  );
}

// ── Starfield ────────────────────────────────────────────────
function StarField() {
  const pointsRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 25 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <PointMaterial size={0.03} color="#FFFFFF" transparent opacity={0.6} sizeAttenuation />
    </Points>
  );
}

// ── Scene ────────────────────────────────────────────────────
function Scene({ scrollRef, isMobile }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 3, 5]} color="#FFB300" intensity={1.5} distance={30} />
      <pointLight position={[-5, 4, 2]} color="#00E5FF" intensity={1.2} distance={25} />

      {/* Main elements */}
      <StarField />
      <AuroraParticles isMobile={isMobile} />
      <TruckModel scrollRef={scrollRef} isMobile={isMobile} />

      {/* Aurora ribbons */}
      <AuroraRibbon color="#00E5FF" phase={0} amplitude={0.6} offset={-0.5} scrollRef={scrollRef} />
      <AuroraRibbon color="#7B61FF" phase={1.2} amplitude={1.0} offset={0} scrollRef={scrollRef} />
      {!isMobile && <AuroraRibbon color="#00FF94" phase={2.4} amplitude={0.5} offset={0.5} scrollRef={scrollRef} />}

      {/* Exhaust particles */}
      {!isMobile && <ExhaustParticles scrollRef={scrollRef} isMobile={isMobile} />}
    </>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function TruckAuroraBackground() {
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useAnimationFrame(() => {
    scrollRef.current = scrollYProgress.get();
  });

  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 12], fov: 60 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <Scene scrollRef={scrollRef} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
