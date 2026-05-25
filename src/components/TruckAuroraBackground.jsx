'use client';
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useTransform } from 'framer-motion';

// Starfield
function Starfield() {
  const pointsRef = useRef();
  const starPositions = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return positions;
  }, []);

  return (
    <Points ref={pointsRef} positions={starPositions}>
      <PointMaterial size={0.1} color="#FFFFFF" opacity={0.6} />
    </Points>
  );
}

// Truck
function Truck({ scrollX }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = scrollX.get ? scrollX.get() : 0;
    }
  });

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.8, 1.2]} />
        <meshStandardMaterial
          color="#FFB300"
          emissive="#FFB300"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Cabin */}
      <mesh position={[1.2, 0.8, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#1A2B8C"
          emissive="#1A2B8C"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[1, 1.3, 0]}>
        <boxGeometry args={[0.9, 0.15, 1]} />
        <meshStandardMaterial
          color="#007A4C"
          emissive="#007A4C"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Wheels */}
      <mesh position={[-1, -0.5, -0.6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[1, -0.5, -0.6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[-1, -0.5, 0.6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[1, -0.5, 0.6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Headlight */}
      <pointLight position={[1.8, 0.6, 0.5]} color="#00E5FF" intensity={2} distance={6} />
    </group>
  );
}

// Aurora Ribbons
function Aurora({ color, phase, scrollX }) {
  const lineRef = useRef();

  useFrame(({ clock }) => {
    if (!lineRef.current) return;

    const t = clock.getElapsedTime();
    const x = scrollX.get ? scrollX.get() : 0;

    const points = [];
    for (let i = 0; i < 50; i++) {
      const px = x - (i / 50) * 15;
      const py = 2 + Math.sin(i * 0.3 + phase + t * 0.5) * 1;
      const pz = Math.cos(i * 0.15 + phase + t * 0.3) * 0.6;
      points.push(new THREE.Vector3(px, py, pz));
    }

    const geom = new THREE.BufferGeometry().setFromPoints(points);
    if (lineRef.current.geometry) lineRef.current.geometry.dispose();
    lineRef.current.geometry = geom;
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.7} linewidth={3} />
    </line>
  );
}

// Particles
function Particles({ scrollX }) {
  const pointsRef = useRef();
  const positions = useMemo(() => new Float32Array(150 * 3), []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const t = clock.getElapsedTime();
    const x = scrollX.get ? scrollX.get() : 0;

    for (let i = 0; i < 150; i++) {
      const angle = (i / 150) * Math.PI * 2;
      const dist = 1.2 + Math.sin(t * 2 + i) * 0.6;

      positions[i * 3] = x + Math.cos(angle) * dist;
      positions[i * 3 + 1] = 2 + Math.sin(t + i * 0.05) * 0.4;
      positions[i * 3 + 2] = Math.sin(angle) * dist;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial size={0.12} color="#FFB300" opacity={0.8} />
    </Points>
  );
}

// Scene
function Scene({ scrollX }) {
  return (
    <>
      <color attach="background" args={['#050A14']} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.4} />
      <Starfield />
      <Truck scrollX={scrollX} />
      <Aurora color="#00E5FF" phase={0} scrollX={scrollX} />
      <Aurora color="#7B61FF" phase={2} scrollX={scrollX} />
      <Aurora color="#00FF94" phase={4} scrollX={scrollX} />
      <Particles scrollX={scrollX} />
    </>
  );
}

// Main Component
export default function TruckAuroraBackground() {
  const { scrollYProgress } = useScroll();
  const scrollX = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 16], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <Scene scrollX={scrollX} />
      </Suspense>
    </Canvas>
  );
}
