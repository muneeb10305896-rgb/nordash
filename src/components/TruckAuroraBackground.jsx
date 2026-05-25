'use client';
import { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

// Truck model
function Truck({ scrollRef }) {
  const bodyRef = useRef();
  const cabinRef = useRef();
  const roofRef = useRef();
  const wheel1Ref = useRef();
  const wheel2Ref = useRef();

  useFrame(() => {
    const progress = scrollRef.current;
    const truckX = -14 + progress * 28;

    if (bodyRef.current) bodyRef.current.position.x = truckX;
    if (cabinRef.current) cabinRef.current.position.x = truckX;
    if (roofRef.current) roofRef.current.position.x = truckX;
    if (wheel1Ref.current) {
      wheel1Ref.current.position.x = truckX - 2;
      wheel1Ref.current.rotation.z += 0.05;
    }
    if (wheel2Ref.current) {
      wheel2Ref.current.position.x = truckX + 3;
      wheel2Ref.current.rotation.z += 0.05;
    }
  });

  return (
    <group>
      {/* Body - Saffron */}
      <mesh ref={bodyRef} position={[0, 1.5, 0]}>
        <boxGeometry args={[4, 0.8, 1.5]} />
        <meshStandardMaterial color="#FFB300" emissive="#FFB300" emissiveIntensity={0.3} />
      </mesh>

      {/* Cabin - Cobalt */}
      <mesh ref={cabinRef} position={[0, 2.2, 0]}>
        <boxGeometry args={[1.5, 1.2, 1.5]} />
        <meshStandardMaterial color="#1A2B8C" emissive="#1A2B8C" emissiveIntensity={0.2} />
      </mesh>

      {/* Roof - Emerald */}
      <mesh ref={roofRef} position={[0, 2.9, 0]}>
        <boxGeometry args={[1.4, 0.15, 1.5]} />
        <meshStandardMaterial color="#007A4C" emissive="#007A4C" emissiveIntensity={0.25} />
      </mesh>

      {/* Wheels */}
      <mesh ref={wheel1Ref} position={[-2, 0.8, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      <mesh ref={wheel2Ref} position={[3, 0.8, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      {/* Headlight */}
      <pointLight position={[2.2, 1.8, 0.8]} color="#00E5FF" intensity={1.5} distance={5} />
    </group>
  );
}

// Aurora Ribbon
function AuroraRibbon({ color, phase, amplitude, scrollRef }) {
  const lineRef = useRef();

  useFrame(({ clock }) => {
    if (!lineRef.current) return;

    const t = clock.getElapsedTime();
    const progress = scrollRef.current;
    const truckX = -14 + progress * 28;

    const points = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      const x = truckX - (i / count) * 15;
      const y = 2 + Math.sin(i * 0.15 + phase + t * 0.3) * amplitude;
      const z = Math.cos(i * 0.1 + phase + t * 0.2) * 0.5;
      points.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    lineRef.current.geometry.dispose();
    lineRef.current.geometry = geometry;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.6} linewidth={3} />
    </lineSegments>
  );
}

// Exhaust Particles
function ExhaustParticles({ scrollRef }) {
  const pointsRef = useRef();
  const particlesRef = useRef(new Float32Array(300 * 3));

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const progress = scrollRef.current;
    const truckX = -14 + progress * 28;
    const baseY = 2;
    const baseZ = 0;

    const positions = pointsRef.current;
    const t = clock.getElapsedTime();

    for (let i = 0; i < 100; i++) {
      const angle = (i / 100) * Math.PI * 2;
      const distance = 1.5 + Math.sin(t * 2 + i) * 1;

      positions[i * 3]     = truckX + Math.cos(angle) * distance;
      positions[i * 3 + 1] = baseY + Math.sin(angle) * distance;
      positions[i * 3 + 2] = baseZ + Math.cos(angle * 0.5) * 0.3;
    }

    pointsRef.current.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={particlesRef.current}>
      <PointMaterial sizeAttenuation color="#FFB300" size={0.08} />
    </Points>
  );
}

// Background stars
function BackgroundStars() {
  const pointsRef = useRef();
  const starPositions = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const r = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.002;
    }
  });

  return (
    <Points ref={pointsRef} positions={starPositions}>
      <PointMaterial size={0.05} color="#FFFFFF" opacity={0.5} />
    </Points>
  );
}

// Test - Bright visible cube
function TestCube() {
  return (
    <mesh position={[0, 2, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={1} />
    </mesh>
  );
}

// Main scene
function Scene({ scrollRef, isMobile }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <BackgroundStars />
      <TestCube />
      <Truck scrollRef={scrollRef} />
      <AuroraRibbon color="#00E5FF" phase={0} amplitude={0.6} scrollRef={scrollRef} />
      <AuroraRibbon color="#7B61FF" phase={1.2} amplitude={1} scrollRef={scrollRef} />
      <AuroraRibbon color="#00FF94" phase={2.4} amplitude={0.5} scrollRef={scrollRef} />
      {!isMobile && <ExhaustParticles scrollRef={scrollRef} />}
    </>
  );
}

export default function TruckAuroraBackground() {
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    let animationFrameId;

    const updateScroll = () => {
      if (scrollYProgress.get) {
        scrollRef.current = scrollYProgress.get();
      }
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    updateScroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollYProgress]);

  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <Scene scrollRef={scrollRef} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
