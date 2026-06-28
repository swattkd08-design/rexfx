import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Rotating 3D Bitcoin Gold Coin
function BitcoinCoin({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.45;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Outer Golden Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.22, 64]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.12} envMapIntensity={2} />
      </mesh>
      {/* Coin Face */}
      <mesh position={[0, 0, 0.115]}>
        <cylinderGeometry args={[1.45, 1.45, 0.02, 64]} />
        <meshStandardMaterial color="#E6AC00" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -0.115]}>
        <cylinderGeometry args={[1.45, 1.45, 0.02, 64]} />
        <meshStandardMaterial color="#E6AC00" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Holographic Glowing B Core */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.55, 0.12, 16, 48]} />
        <meshStandardMaterial color="#00FFAA" emissive="#00FFAA" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.18, 1.6, 0.3]} />
        <meshStandardMaterial color="#00FFAA" emissive="#00FFAA" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

// Animated Ethereum Crystal
function EthereumCrystal({ position = [3.5, 1.2, -2] }: { position?: [number, number, number] }) {
  const topRef = useRef<THREE.Mesh>(null);
  const bottomRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (topRef.current && bottomRef.current) {
      topRef.current.rotation.y += delta * 0.6;
      bottomRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group position={position}>
        {/* Upper Pyramidal Half */}
        <mesh ref={topRef} position={[0, 0.7, 0]}>
          <coneGeometry args={[0.9, 1.6, 4]} />
          <meshStandardMaterial color="#00C8FF" metalness={0.9} roughness={0.05} emissive="#005588" emissiveIntensity={0.5} wireframe={false} />
        </mesh>
        {/* Lower Inverted Half */}
        <mesh ref={bottomRef} position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.9, 1.0, 4]} />
          <meshStandardMaterial color="#00C8FF" metalness={0.9} roughness={0.1} emissive="#003366" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// Solana Cyber Orb
function SolanaOrb({ position = [-3.8, -0.8, -1.5] }: { position?: [number, number, number] }) {
  return (
    <Float speed={3} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh position={position}>
        <icosahedronGeometry args={[0.85, 2]} />
        <MeshDistortMaterial color="#00FFAA" speed={2.5} distort={0.4} metalness={0.8} roughness={0.2} emissive="#00AA66" emissiveIntensity={0.6} />
      </mesh>
    </Float>
  );
}

// Floating Neon Cyber Grid Floor
function CyberGrid() {
  return (
    <group position={[0, -2.8, 0]}>
      <gridHelper args={[60, 60, '#00FFAA', '#0B1120']} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#050816" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

// Quantum Particle Data Stream
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
      ref.current.rotation.y += delta * 0.05;
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
      <pointsMaterial size={0.06} color="#00FFAA" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// Parallax Mouse Camera rig
function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 1.2 - camera.position.y) * 0.05;
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
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#00FFAA" />
        <pointLight position={[-10, -10, -5]} intensity={2.5} color="#00C8FF" />
        <pointLight position={[0, 5, -2]} intensity={2} color="#FFC857" />

        <Stars radius={80} depth={50} count={1500} factor={4} saturation={1} fade speed={1} />
        
        <CameraRig />
        <BitcoinCoin position={[0, 0.4, 0]} />
        <EthereumCrystal position={[3.6, 1.2, -1.5]} />
        <SolanaOrb position={[-3.8, -0.6, -1.2]} />
        <CyberGrid />
        <DataParticles count={350} />

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
