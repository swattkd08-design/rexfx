import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

// 3D Rotating Bitcoin Gold Coin
function BitcoinCoin({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Outer Coin Body */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.25, 48]} />
        <meshStandardMaterial
          color="#FFC857"
          metalness={0.95}
          roughness={0.15}
          emissive="#FF9F1C"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Inner Core Accent */}
      <mesh position={[0, 0, 0.13]}>
        <torusGeometry args={[1.0, 0.08, 16, 48]} />
        <meshStandardMaterial color="#FFF" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, -0.13]}>
        <torusGeometry args={[1.0, 0.08, 16, 48]} />
        <meshStandardMaterial color="#FFF" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Animated Ethereum Crystal Geometry
function EthereumCrystal({ position }: { position: [number, number, number] }) {
  const crystalRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y -= delta * 0.8;
      crystalRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={crystalRef} position={position}>
      {/* Top Octahedron */}
      <mesh position={[0, 0.7, 0]}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshPhysicalMaterial
          color="#00C8FF"
          transmission={0.85}
          opacity={1}
          transparent
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
          emissive="#0066FF"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Bottom Octahedron */}
      <mesh position={[0, -0.7, 0]} rotation={[Math.PI, 0, 0]} scale={[1, 0.8, 1]}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshPhysicalMaterial
          color="#00FFAA"
          transmission={0.8}
          opacity={0.9}
          transparent
          roughness={0.2}
          emissive="#00FFAA"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

// Floating Quantum Network Nodes
function FloatingNetworkNodes() {
  return (
    <>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2} position={[-4.5, 2.5, -2]}>
        <Sphere args={[0.45, 32, 32]}>
          <MeshDistortMaterial color="#00FFAA" speed={3} distort={0.4} metalness={0.8} roughness={0.2} />
        </Sphere>
      </Float>
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1.5} position={[4.8, -2, -3]}>
        <Sphere args={[0.6, 32, 32]}>
          <MeshDistortMaterial color="#9D4EDD" speed={2} distort={0.5} metalness={0.9} roughness={0.1} />
        </Sphere>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={3} position={[3.2, 3, -1.5]}>
        <Sphere args={[0.35, 32, 32]}>
          <MeshDistortMaterial color="#FFC857" speed={4} distort={0.3} metalness={0.8} roughness={0.2} />
        </Sphere>
      </Float>
    </>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C8FF" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#00FFAA" />
        <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#FFC857" castShadow />

        <Stars radius={100} depth={50} count={2500} factor={4} saturation={1} fade speed={1} />

        <BitcoinCoin position={[-2.8, 0.4, 0]} />
        <EthereumCrystal position={[3.0, -0.2, 0]} />
        <FloatingNetworkNodes />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.3}
          minPolarAngle={Math.PI / 2 - 0.3}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
