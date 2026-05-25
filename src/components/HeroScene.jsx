"use client";
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

// ── Rotating nested gem (icosahedra) ──────────────────────────
function MainGem() {
  const g1 = useRef(), g2 = useRef(), g3 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    g1.current.rotation.x = Math.sin(t * 0.18) * 0.35;
    g1.current.rotation.y += 0.004;
    g2.current.rotation.x = Math.cos(t * 0.14) * 0.4;
    g2.current.rotation.y -= 0.006;
    g3.current.rotation.x = Math.sin(t * 0.22) * 0.25;
    g3.current.rotation.z += 0.003;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={2.5} floatingRange={[-0.3, 0.3]}>
      <group position={[2.8, 0.4, -1]}>
        {/* Outer cage */}
        <mesh ref={g1}>
          <icosahedronGeometry args={[2.4, 1]} />
          <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.07} />
        </mesh>
        {/* Mid cage */}
        <mesh ref={g2}>
          <icosahedronGeometry args={[1.7, 0]} />
          <meshBasicMaterial color="#7B61FF" wireframe transparent opacity={0.09} />
        </mesh>
        {/* Core — saffron (truck art accent) */}
        <mesh ref={g3}>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshBasicMaterial color="#FFB300" wireframe transparent opacity={0.18} />
        </mesh>
        {/* Point light inside */}
        <pointLight color="#00E5FF" intensity={1.5} distance={5} />
      </group>
    </Float>
  );
}

// ── Smaller orbiting gems ────────────────────────────────────
function SmallGem({ position, color, size, floatSpeed }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.getElapsedTime() * 0.4;
    mesh.current.rotation.z = clock.getElapsedTime() * 0.3;
  });
  return (
    <Float speed={floatSpeed} rotationIntensity={1.4} floatIntensity={3.5} floatingRange={[-0.5, 0.5]}>
      <mesh ref={mesh} position={position}>
        <octahedronGeometry args={[size]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

// ── Truck-art inspired ring ──────────────────────────────────
function TruckRing() {
  const ring = useRef();
  useFrame(({ clock }) => {
    ring.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.6;
    ring.current.rotation.y = clock.getElapsedTime() * 0.08;
  });
  return (
    <Float speed={0.5} floatIntensity={1.2}>
      <mesh ref={ring} position={[-2.5, -1.5, -2]}>
        <torusGeometry args={[1.4, 0.012, 4, 40]} />
        <meshBasicMaterial color="#FFB300" transparent opacity={0.14} />
      </mesh>
    </Float>
  );
}

// ── Ambient particles ────────────────────────────────────────
function Particles({ count = 140 }) {
  const ref = useRef();

  const sphere = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    return positions;
  }, [count]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.018;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.012) * 0.1;
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={sphere} itemSize={3} />
      </bufferGeometry>
      <PointMaterial size={0.04} color="#00E5FF" transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

// ── Gold particles ───────────────────────────────────────────
function GoldParticles({ count = 60 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = -clock.getElapsedTime() * 0.012;
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <PointMaterial size={0.035} color="#FFB300" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

// ── Scene root ───────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <MainGem />
      <TruckRing />
      <SmallGem position={[-3.5, 2.2, -1.5]} color="#7B61FF" size={0.55} floatSpeed={1.6} />
      <SmallGem position={[4.5, -2, -2]}     color="#00FF94" size={0.40} floatSpeed={2.1} />
      <SmallGem position={[-4, -1.5, -1]}    color="#FFB300" size={0.35} floatSpeed={1.8} />
      <SmallGem position={[1.5, 2.8, -2.5]}  color="#FF4081" size={0.30} floatSpeed={2.4} />
      <Particles count={130} />
      <GoldParticles count={55} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 58 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
