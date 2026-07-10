import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Rotating 3D Gold Bullion Coin (XAU themed)
function GoldBullionCoin({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.3) * 0.12;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Outer Golden Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.22, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.98} roughness={0.12} envMapIntensity={2} />
      </mesh>
      {/* Coin Face */}
      <mesh position={[0, 0, 0.115]}>
        <cylinderGeometry args={[1.35, 1.35, 0.02, 64]} />
        <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0, -0.115]}>
        <cylinderGeometry args={[1.35, 1.35, 0.02, 64]} />
        <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.18} />
      </mesh>
      {/* Raising Gold core */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.5, 0.1, 16, 48]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

// Animated Emerald Crystal
function EmeraldPrism({ position = [3.5, 1.2, -2] }: { position?: [number, number, number] }) {
  const topRef = useRef<THREE.Mesh>(null);
  const bottomRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (topRef.current && bottomRef.current) {
      topRef.current.rotation.y += delta * 0.5;
      bottomRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group position={position}>
        {/* Upper Pyramidal Half */}
        <mesh ref={topRef} position={[0, 0.7, 0]}>
          <coneGeometry args={[0.8, 1.5, 4]} />
          <meshStandardMaterial color="#10B981" metalness={0.9} roughness={0.05} emissive="#047857" emissiveIntensity={0.5} />
        </mesh>
        {/* Lower Inverted Half */}
        <mesh ref={bottomRef} position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.8, 0.9, 4]} />
          <meshStandardMaterial color="#10B981" metalness={0.9} roughness={0.1} emissive="#059669" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// Golden Wealth Orb
function WealthOrb({ position = [-3.8, -0.8, -1.5] }: { position?: [number, number, number] }) {
  return (
    <Float speed={3} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh position={position}>
        <icosahedronGeometry args={[0.8, 2]} />
        <MeshDistortMaterial color="#D4AF37" speed={2} distort={0.3} metalness={0.9} roughness={0.15} emissive="#AA7C11" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
}

// Floating Neon Cyber Grid Floor
function CyberGrid() {
  return (
    <group position={[0, -2.8, 0]}>
      <gridHelper args={[60, 60, '#D4AF37', '#0B1120']} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#03050C" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

// Quantum Particle Data Stream (Gold and Emerald colored)
function DataParticles({ count = 250 }: { count?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 25;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#D4AF37" transparent opacity={0.65} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// Parallax Mouse Camera rig
function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 1.4 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 1.1 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function TradingCanvas3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0.5, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#D4AF37" />
        <pointLight position={[-10, -10, -5]} intensity={2.5} color="#10B981" />
        <pointLight position={[0, 5, -2]} intensity={2} color="#D4AF37" />

        <Stars radius={80} depth={50} count={1200} factor={3.5} saturation={0.8} fade speed={0.8} />
        
        <CameraRig />
        <GoldBullionCoin position={[0, 0.4, 0]} />
        <EmeraldPrism position={[3.6, 1.2, -1.5]} />
        <WealthOrb position={[-3.8, -0.6, -1.2]} />
        <CyberGrid />
        <DataParticles count={300} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
