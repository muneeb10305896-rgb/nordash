'use client';

import { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useScroll, useAnimationFrame } from 'framer-motion';
import * as THREE from 'three';

// ── Simple Truck Model ───────────────────────────────────────
function SimpleTruck({ scrollRef }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const progress = scrollRef.current;
    const time = clock.getElapsedTime();

    // Truck moves across screen based on scroll
    groupRef.current.position.x = -8 + progress * 16;

    // Slight vertical bob
    groupRef.current.position.y = 3 + Math.sin(time * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef} position={[-8, 3, 0]}>
      {/* Truck body - LARGE and bright */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 1.2, 1.2]} />
        <meshBasicMaterial color="#FFB300" />
      </mesh>

      {/* Cabin */}
      <mesh position={[1.8, 0.3, 0]}>
        <boxGeometry args={[1, 1, 1.2]} />
        <meshBasicMaterial color="#1A2B8C" />
      </mesh>

      {/* Roof */}
      <mesh position={[1.5, 1.2, 0]}>
        <boxGeometry args={[1.5, 0.3, 1.2]} />
        <meshBasicMaterial color="#007A4C" />
      </mesh>

      {/* Wheels */}
      <mesh position={[-0.7, -0.8, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      <mesh position={[-0.7, -0.8, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      <mesh position={[1.2, -0.8, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      <mesh position={[1.2, -0.8, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} />
        <meshBasicMaterial color="#222222" />
      </mesh>

      {/* Decorative elements */}
      <mesh position={[-0.5, 0.8, 0.7]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="#007A4C" />
      </mesh>
      <mesh position={[0.5, 0.8, 0.7]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshBasicMaterial color="#FFB300" />
      </mesh>

      {/* Exhaust */}
      <mesh position={[1.5, 1.8, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
        <meshBasicMaterial color="#666666" />
      </mesh>

      {/* Headlights */}
      <pointLight position={[2.5, 0.3, -0.6]} color="#00E5FF" intensity={1.5} distance={5} />
      <pointLight position={[2.5, 0.3, 0.6]} color="#00E5FF" intensity={1.5} distance={5} />
    </group>
  );
}

// ── Aurora Particles ─────────────────────────────────────────
function AuroraParticles() {
  const pointsRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 5 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color('#00E5FF'),
      new THREE.Color('#7B61FF'),
      new THREE.Color('#00FF94'),
    ];
    for (let i = 0; i < count; i++) {
      const c = colorChoices[i % colorChoices.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, []);

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
      <PointMaterial size={0.08} vertexColors transparent opacity={0.8} sizeAttenuation />
    </Points>
  );
}

// ── Simple Aurora Ribbon ─────────────────────────────────────
function AuroraRibbon({ color, phase, amplitude, scrollRef }) {
  const linesRef = useRef([]);
  const POINTS = 50;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const progress = scrollRef.current;
    const truckX = -8 + progress * 16;

    for (let layer = 0; layer < 2; layer++) {
      if (!linesRef.current[layer]) return;

      const positions = new Float32Array(POINTS * 3);
      const offsetZ = (layer - 0.5) * 0.3;

      for (let i = 0; i < POINTS; i++) {
        const x = truckX - (i / POINTS) * (progress * 16 + 3);
        const y = 3 + Math.sin(i * 0.2 + phase + t * 0.4) * amplitude;
        const z = Math.cos(i * 0.1 + phase + t * 0.3) * 1 + offsetZ;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }

      if (linesRef.current[layer].geometry.attributes.position) {
        linesRef.current[layer].geometry.attributes.position.array = positions;
        linesRef.current[layer].geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {Array.from({ length: 2 }).map((_, i) => (
        <line key={i} ref={el => (linesRef.current[i] = el)}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={POINTS}
              array={new Float32Array(POINTS * 3)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={0.7 - i * 0.2} linewidth={3} />
        </line>
      ))}
    </group>
  );
}

// ── Star Field ───────────────────────────────────────────────
function StarField() {
  const pointsRef = useRef();
  const count = 150;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 20;
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
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.003;
    }
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <PointMaterial size={0.04} color="#FFFFFF" transparent opacity={0.7} sizeAttenuation />
    </Points>
  );
}

// ── Scene ────────────────────────────────────────────────────
function Scene({ scrollRef }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 5, 3]} color="#FFB300" intensity={1.5} distance={20} />
      <pointLight position={[-5, 5, 2]} color="#00E5FF" intensity={1.2} distance={20} />

      {/* TEST: Big red sphere to verify canvas is rendering */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#FF0000" />
      </mesh>

      <StarField />
      <AuroraParticles />
      <SimpleTruck scrollRef={scrollRef} />
      <AuroraRibbon color="#00E5FF" phase={0} amplitude={0.8} scrollRef={scrollRef} />
      <AuroraRibbon color="#7B61FF" phase={2} amplitude={1.2} scrollRef={scrollRef} />
      <AuroraRibbon color="#00FF94" phase={4} amplitude={0.6} scrollRef={scrollRef} />
    </>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function TruckAuroraBackground() {
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef(0);

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
      camera={{ position: [0, 2, 8], fov: 75, near: 0.1, far: 1000 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <Scene scrollRef={scrollRef} />
      </Suspense>
    </Canvas>
  );
}
