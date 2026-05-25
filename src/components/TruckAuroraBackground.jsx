'use client';
import { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

// Truck Component
function Truck({ scrollProgress }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    // Truck moves from -12 to 12 based on scroll
    groupRef.current.position.x = -12 + scrollProgress * 24;
  });

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Body - Saffron Yellow */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.5, 0.8, 1.2]} />
        <meshStandardMaterial
          color="#FFB300"
          emissive="#FFB300"
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Cabin - Cobalt Blue */}
      <mesh position={[1.5, 0.8, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color="#1A2B8C"
          emissive="#1A2B8C"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Roof Bar - Emerald */}
      <mesh position={[1.2, 1.4, 0]}>
        <boxGeometry args={[1.0, 0.2, 1.2]} />
        <meshStandardMaterial
          color="#007A4C"
          emissive="#007A4C"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Front Wheel */}
      <mesh position={[-1.2, -0.5, -0.7]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Rear Wheel */}
      <mesh position={[1.2, -0.5, -0.7]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Side Wheel Right */}
      <mesh position={[-1.2, -0.5, 0.7]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Rear Wheel Right */}
      <mesh position={[1.2, -0.5, 0.7]}>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Headlight - Cyan Glow */}
      <pointLight position={[2, 0.6, 0.5]} color="#00E5FF" intensity={2} distance={8} />
      <mesh position={[2, 0.6, 0.5]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}

// Aurora Ribbon - Flowing light trails
function AuroraRibbon({ color, phase, amplitude, scrollProgress }) {
  const lineRef = useRef();

  useFrame(({ clock }) => {
    if (!lineRef.current) return;

    const t = clock.getElapsedTime();
    const truckX = -12 + scrollProgress * 24;

    const points = [];
    for (let i = 0; i < 60; i++) {
      const x = truckX - (i / 60) * 12;
      const y = 2 + Math.sin(i * 0.2 + phase + t * 0.5) * amplitude;
      const z = Math.cos(i * 0.1 + phase + t * 0.3) * 0.8;
      points.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    if (lineRef.current.geometry) {
      lineRef.current.geometry.dispose();
    }
    lineRef.current.geometry = geometry;
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.7}
        linewidth={4}
      />
    </line>
  );
}

// Particle System - Glowing exhaust
function Particles({ scrollProgress }) {
  const pointsRef = useRef();
  const particleCount = 150;

  const positions = useMemo(() => {
    return new Float32Array(particleCount * 3);
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const t = clock.getElapsedTime();
    const truckX = -12 + scrollProgress * 24;

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const dist = 1.5 + Math.sin(t * 3 + i * 0.1) * 0.8;
      const y = 2 + Math.sin(t + i) * 0.5;

      positions[i * 3] = truckX + Math.cos(angle) * dist;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * dist;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial
        size={0.12}
        color="#FFB300"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </Points>
  );
}

// Starfield Background
function Starfield() {
  const pointsRef = useRef();

  const starPositions = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += 0.0001;
    }
  });

  return (
    <Points ref={pointsRef} positions={starPositions}>
      <PointMaterial
        size={0.08}
        color="#FFFFFF"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </Points>
  );
}

// Main Scene Component
function Scene({ scrollProgress }) {
  return (
    <>
      <color attach="background" args={['#050A14']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      <Starfield />

      <Truck scrollProgress={scrollProgress} />

      <AuroraRibbon
        color="#00E5FF"
        phase={0}
        amplitude={0.8}
        scrollProgress={scrollProgress}
      />
      <AuroraRibbon
        color="#7B61FF"
        phase={2}
        amplitude={1.2}
        scrollProgress={scrollProgress}
      />
      <AuroraRibbon
        color="#00FF94"
        phase={4}
        amplitude={0.6}
        scrollProgress={scrollProgress}
      />

      <Particles scrollProgress={scrollProgress} />
    </>
  );
}

// Main Background Component
export default function TruckAuroraBackground() {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      setScrollProgress(value);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

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
      camera={{
        position: [0, 0, 15],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        precision: 'highp',
      }}
      dpr={[1, 2]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
