"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/imgs/logo.png" alt="Finstack logo" className="w-36 h-auto object-contain" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 flex items-center gap-2">
                <ArrowRight size={16} />
                Get Started
              </Button>
            </div>

            <button
              className="md:hidden p-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/20 transition-all duration-200 hover:scale-105"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={18} className="text-primary" /> : <Menu size={18} className="text-primary" />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isOpen ? "visible" : "invisible"}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <img src="/imgs/logo.png" alt="Finstack logo" className="w-32 h-auto object-contain" />
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-2">
              <a
                href="#home"
                className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-gray-700 font-medium">Home</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#about"
                className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-gray-700 font-medium">About</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="#features"
                className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-gray-700 font-medium">Features</span>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
              </a>
            </nav>

            {/* CTA Button */}
            <div className="pt-6 border-t border-gray-100">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-4 flex items-center justify-center gap-2 font-semibold">
                <ArrowRight size={18} />
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
