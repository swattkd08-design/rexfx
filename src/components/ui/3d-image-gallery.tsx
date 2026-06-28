"use client"

import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Plane,
  Sphere,
} from "@react-three/drei"
import { Download, Heart, X, Sparkles, Layers } from "lucide-react"

type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  // Institutional Alpha NFT & Crypto Trading Assets using reliable Unsplash URLs
  const cards: Card[] = [
    { id: "1", imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80", alt: "Bitcoin Genesis", title: "Bitcoin Genesis Vault" },
    { id: "2", imageUrl: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=600&auto=format&fit=crop&q=80", alt: "Ethereum Monolith", title: "Ethereum L1 Monolith" },
    { id: "3", imageUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=600&auto=format&fit=crop&q=80", alt: "Solana Cyber", title: "Solana Speed Core" },
    { id: "4", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80", alt: "Quantum Abstract", title: "Quantum Orderflow" },
    { id: "5", imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&auto=format&fit=crop&q=80", alt: "DeFi Liquidity", title: "DeFi Liquidity Sweep" },
    { id: "6", imageUrl: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=600&auto=format&fit=crop&q=80", alt: "Cyberpunk Desk", title: "Cyberpunk Colocation" },
    { id: "7", imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&auto=format&fit=crop&q=80", alt: "Apex Matrix", title: "Apex Neural Matrix" },
    { id: "8", imageUrl: "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=600&auto=format&fit=crop&q=80", alt: "Gamma Squeeze", title: "Derivatives Gamma" },
    { id: "9", imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=80", alt: "Smart Money", title: "Smart Money Block" },
    { id: "10", imageUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=600&auto=format&fit=crop&q=80", alt: "Arbitrage Yield", title: "Delta Neutral Yield" },
    { id: "11", imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80", alt: "Institutional Custody", title: "Sovereign Custody" },
    { id: "12", imageUrl: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=600&auto=format&fit=crop&q=80", alt: "MEV Shield", title: "MEV Sentinel Shield" },
    { id: "13", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80", alt: "Algorithmic Execution", title: "Algorithmic Sniper" },
    { id: "14", imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&auto=format&fit=crop&q=80", alt: "Whale Cluster", title: "Whale On-Chain Radar" },
    { id: "15", imageUrl: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=600&auto=format&fit=crop&q=80", alt: "Basis Arb", title: "Perpetual Basis Arb" },
    { id: "16", imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&auto=format&fit=crop&q=80", alt: "Alpha Leaks", title: "Alpha Syndicate Leaks" },
    { id: "17", imageUrl: "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=600&auto=format&fit=crop&q=80", alt: "SUI Ecosystem", title: "SUI Breakout Alpha" },
    { id: "18", imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=80", alt: "RENDER GPU", title: "RENDER Compute Grid" },
    { id: "19", imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80", alt: "Cold Storage", title: "Multi-Sig Treasury" },
    { id: "20", imageUrl: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=600&auto=format&fit=crop&q=80", alt: "Hyperliquid", title: "Hyperliquid DOM" },
  ]

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  )
}

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x050816, 1)
    mountRef.current.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 4000
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1500
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1500
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1500
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0x00FFAA, size: 0.8, sizeAttenuation: true })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0003
      stars.rotation.x += 0.0001
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#050816]" />
}

function FloatingCard({
  card,
  position,
}: {
  card: Card
  position: { x: number; y: number; z: number; rotationX: number; rotationY: number; rotationZ: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setSelectedCard(card)
  }
  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }
  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = "auto"
  }

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[4.5, 6]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "scale(1.18)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-44 h-56 rounded-2xl overflow-hidden shadow-2xl bg-[#0B1120] p-3 select-none backdrop-blur-xl transition-all"
          style={{
            boxShadow: hovered
              ? "0 20px 50px rgba(0, 255, 170, 0.4), 0 0 30px rgba(0, 200, 255, 0.3)"
              : "0 15px 35px rgba(0, 0, 0, 0.8)",
            border: hovered ? "2px solid #00FFAA" : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <img
            src={card.imageUrl || "/placeholder.svg"}
            alt={card.alt}
            className="w-full h-40 object-cover rounded-xl border border-white/5"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-2 text-center flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
            <p className="text-white text-xs font-mono font-bold truncate">{card.title}</p>
          </div>
        </div>
      </Html>
    </group>
  )
}

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const [isFavorited, setIsFavorited] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selectedCard) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  const toggleFavorite = () => setIsFavorited((v) => !v)
  const handleClose = () => setSelectedCard(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816]/85 backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={handleBackdropClick}>
      <div className="relative max-w-md w-full">
        <button onClick={handleClose} className="absolute -top-12 right-0 text-slate-400 hover:text-white transition-colors z-10 cursor-pointer">
          <X className="w-8 h-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-3xl bg-[#0B1120] p-6 transition-all duration-500 ease-out w-full border border-emerald-500/50 shadow-[0_0_60px_rgba(0,255,170,0.2)]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full mb-4 aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl || "/placeholder.svg"}
              />
            </div>

            <span className="text-[10px] font-mono text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 uppercase tracking-widest">
              QUANTUM VAULT ASSET
            </span>
            <h3 className="text-white text-xl font-display font-bold my-3 text-center">{selectedCard.title}</h3>

            <div className="flex gap-3 pt-2 font-mono">
              <button
                type="button"
                onClick={() => alert("Asset certificate securely downloaded to hardware wallet.")}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl text-xs font-bold text-[#050816] transition hover:opacity-90 active:scale-95 cursor-pointer bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_20px_rgba(0,255,170,0.4)]"
              >
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>EXPORT CERTIFICATE</span>
                </div>
              </button>
              <button
                type="button"
                onClick={toggleFavorite}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-emerald-400 hover:border-emerald-400 transition cursor-pointer"
              >
                <Heart className="h-5 w-5" fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo(() => {
    const positions: {
      x: number
      y: number
      z: number
      rotationX: number
      rotationY: number
      rotationZ: number
    }[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 14 + (i % 3) * 4.5

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      })
    }
    return positions
  }, [cards.length])

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#00FFAA" transparent opacity={0.12} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#00C8FF" transparent opacity={0.06} wireframe />
      </Sphere>
      <Sphere args={[18, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FFC857" transparent opacity={0.03} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

export default function StellarCardGallerySingle() {
  return (
    <CardProvider>
      <div className="w-full h-[650px] min-h-[550px] relative overflow-hidden bg-[#050816] rounded-3xl border border-emerald-500/20 shadow-[0_0_50px_rgba(0,255,170,0.05)]">
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 18], fov: 55 }}
          className="absolute inset-0 z-10 w-full h-full"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.5} />
            <pointLight position={[15, 15, 15]} intensity={1.2} color="#00FFAA" />
            <pointLight position={[-15, -15, -15]} intensity={0.8} color="#00C8FF" />
            <CardGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={6}
              maxDistance={38}
              autoRotate={true}
              autoRotateSpeed={0.4}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        <div className="absolute top-6 left-6 z-20 pointer-events-none space-y-1">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
            3D SPATIAL ASSET VAULT
          </span>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight pt-1">
            Stellar Alpha <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Card Gallery</span>
          </h2>
          <p className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-md border border-slate-800 backdrop-blur-md">
            🖱️ Drag to orbit galaxy • Scroll to zoom • Click cards for asset inspection
          </p>
        </div>
      </div>
    </CardProvider>
  )
}
