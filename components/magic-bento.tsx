"use client"

import React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"
import { Globe, TrendingUp, Shield, Zap, DollarSign, Headphones } from "lucide-react"
import "@/styles/bento.css"

export interface BentoCardProps {
  color?: string
  title?: string
  description?: string
  label?: string
  textAutoHide?: boolean
  disableAnimations?: boolean
}

export interface BentoProps {
  textAutoHide?: boolean
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  disableAnimations?: boolean
  spotlightRadius?: number
  particleCount?: number
  enableTilt?: boolean
  glowColor?: string
  clickEffect?: boolean
  enableMagnetism?: boolean
}

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPOTLIGHT_RADIUS = 300
const DEFAULT_GLOW_COLOR = "47, 103, 250"
const MOBILE_BREAKPOINT = 768

const cardData: BentoCardProps[] = [
  {
    color: "#060010",
    title: "Global Reach",
    description: "Send money to 180+ countries instantly",
    label: "Worldwide",
  },
  {
    color: "#060010",
    title: "Real-Time Rates",
    description: "Live exchange rates updated every second",
    label: "Transparent",
  },
  {
    color: "#060010",
    title: "Bank-Grade Security",
    description: "Multi-layer encryption protects your transfers",
    label: "Protected",
  },
  {
    color: "#060010",
    title: "Lightning Fast",
    description: "90% of transfers complete in minutes",
    label: "Speed",
  },
  {
    color: "#060010",
    title: "Low Fees",
    description: "Save up to 8x vs traditional banks",
    label: "Savings",
  },
  {
    color: "#060010",
    title: "24/7 Support",
    description: "Expert help whenever you need it",
    label: "Support",
  },
]

const cardIcons = [Globe, TrendingUp, Shield, Zap, DollarSign, Headphones]

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement("div")
  el.className = "particle"
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
})

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const relativeX = ((mouseX - rect.left) / rect.width) * 100
  const relativeY = ((mouseY - rect.top) / rect.height) * 100

  card.style.setProperty("--glow-x", `${relativeX}%`)
  card.style.setProperty("--glow-y", `${relativeY}%`)
  card.style.setProperty("--glow-intensity", glow.toString())
  card.style.setProperty("--glow-radius", `${radius}px`)
}

const BentoCardGrid: React.FC<{
  children: React.ReactNode
  gridRef?: React.RefObject<HTMLDivElement>
}> = ({ children, gridRef }) => (
  <div
    className="bento-section grid gap-2 px-2 py-3 md:p-4 max-w-[72rem] w-full select-none relative"
    style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }}
    ref={gridRef}
  >
    {children}
  </div>
)

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()
  const shouldDisableAnimations = disableAnimations || isMobile

  const backgroundImages = [
    "/worldwide.jpg",
    "/rate.jpg",
    "/digital-security-lock-and-encryption-shield.jpg",
    "/instant.png",
    "/savings.jpg",
    "/support.jpg",
  ]

  return (
    <div className="bento-section" style={{ "--glow-color": glowColor } as React.CSSProperties}>
      <BentoCardGrid gridRef={gridRef}>
        {cardData.map((card, index) => (
          <div
            key={card.title}
            className="card card--border-glow relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out text-white"
            style={{ background: card.color }}
          >
            <div 
              className="card-with-bg relative flex flex-col justify-between p-6 h-full min-h-[220px] transition-transform duration-300 ease-in-out"
              style={{
                backgroundImage: `url(${backgroundImages[index]})`,
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {React.createElement(cardIcons[index], {
                      size: 24,
                      className: "text-white",
                    })}
                    <span className="font-medium text-sm uppercase tracking-wider opacity-80">
                      {card.label}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                  <p className="text-base opacity-80 leading-relaxed">{card.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </BentoCardGrid>
    </div>
  )
}

export default function Bento(props: BentoProps) {
  return (
    <div className="w-full flex justify-center items-center">
      <MagicBento {...props} />
    </div>
  )
}