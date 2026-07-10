import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

// 3D Rotating Solid Gold Bullion Coin (XAU themed)
function GoldBullionCoin({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Outer Coin Body */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.22, 64]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.98}
          roughness={0.12}
          emissive="#AA7C11"
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Inner Raised Ring */}
      <mesh position={[0, 0, 0.12]}>
        <torusGeometry args={[1.1, 0.06, 16, 64]} />
        <meshStandardMaterial color="#FFF" metalness={0.95} roughness={0.08} />
      </mesh>
      <mesh position={[0, 0, -0.12]}>
        <torusGeometry args={[1.1, 0.06, 16, 64]} />
        <meshStandardMaterial color="#FFF" metalness={0.95} roughness={0.08} />
      </mesh>
    </group>
  );
}

// 3D Rotating Emerald Crystal Gemstone (representing emerald green trading pips)
function EmeraldGem({ position }: { position: [number, number, number] }) {
  const crystalRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y -= delta * 0.7;
      crystalRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <group ref={crystalRef} position={position}>
      {/* Top Octahedron */}
      <mesh position={[0, 0.6, 0]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          color="#10B981"
          transmission={0.9}
          opacity={1}
          transparent
          roughness={0.08}
          ior={1.6}
          thickness={0.6}
          emissive="#047857"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Bottom Octahedron */}
      <mesh position={[0, -0.6, 0]} rotation={[Math.PI, 0, 0]} scale={[1, 0.8, 1]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          color="#34D399"
          transmission={0.85}
          opacity={0.95}
          transparent
          roughness={0.15}
          emissive="#059669"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

// Floating Wealth Nodes
function FloatingWealthNodes() {
  return (
    <>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2} position={[-4.5, 2.5, -2]}>
        <Sphere args={[0.4, 32, 32]}>
          <MeshDistortMaterial color="#10B981" speed={2.5} distort={0.35} metalness={0.85} roughness={0.15} />
        </Sphere>
      </Float>
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1.5} position={[4.8, -2, -3]}>
        <Sphere args={[0.55, 32, 32]}>
          <MeshDistortMaterial color="#D4AF37" speed={2} distort={0.4} metalness={0.9} roughness={0.1} />
        </Sphere>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={3} position={[3.2, 3, -1.5]}>
        <Sphere args={[0.3, 32, 32]}>
          <MeshDistortMaterial color="#E2E8F0" speed={3.5} distort={0.25} metalness={0.9} roughness={0.1} />
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
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#D4AF37" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#10B981" />
        <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2.2} color="#FBBF24" castShadow />

        <Stars radius={100} depth={50} count={2000} factor={3.5} saturation={0.8} fade speed={0.8} />

        <GoldBullionCoin position={[-2.6, 0.3, 0]} />
        <EmeraldGem position={[2.8, -0.3, 0]} />
        <FloatingWealthNodes />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.25}
          minPolarAngle={Math.PI / 2 - 0.25}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}
