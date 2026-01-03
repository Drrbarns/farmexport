"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Globe2, FileCheck, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/Container"
import { RevealText, FadeIn } from "@/components/shared/Animations"

const slides = [
  {
    id: 1,
    image: "/images/hero-1.png",
    heading: "Premium Agricultural Exports from Africa",
    subheading: "Sourcing high-quality Shea Butter, Soybeans, and Cash Crops directly from sustainable farms in Ghana.",
    cta_primary: "Request a Quote",
    cta_link: "/rfq",
    cta_secondary: "View Products",
    cta_secondary_link: "/products"
  },
  {
    id: 2,
    image: "/images/hero-2.png",
    heading: "Global Logistics & Export Readiness",
    subheading: "Seamless shipping to the EU, USA, and Asia with full export documentation and compliance support.",
    cta_primary: "Talk to Export Team",
    cta_link: "/export-readiness",
    cta_secondary: "Our Process",
    cta_secondary_link: "/rfq"
  },
  {
    id: 3,
    image: "/images/hero-3.png",
    heading: "Grade A Unrefined Premium Shea Butter",
    subheading: "Rich, creamy, and 100% natural. Sourced responsibly from women cooperatives in Northern Ghana.",
    cta_primary: "Order Samples",
    cta_link: "/rfq",
    cta_secondary: "Download Specs",
    cta_secondary_link: "/products"
  }
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000) // Increased duration for readability
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative min-h-[85vh] sm:min-h-[700px] lg:min-h-[90vh] flex items-center bg-slate-900 overflow-hidden text-white pt-20 sm:pt-24">
      {/* Background Images with Transitions */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            />
            {/* Overlay Gradient for Readability - stronger on mobile */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/40 sm:from-slate-950/90 sm:via-slate-900/60 sm:to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <Container className="relative z-10 w-full pb-20 sm:pb-0">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <div className="overflow-hidden min-h-[120px] sm:min-h-[160px] lg:min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`heading-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
                     <RevealText text={slides[currentSlide].heading} delay={0.2} />
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.p 
                key={`sub-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-light drop-shadow-sm"
              >
                {slides[currentSlide].subheading}
              </motion.p>
            </AnimatePresence>

            <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold h-12 px-8 text-base shadow-lg shadow-primary/20 w-full sm:w-auto transition-transform hover:scale-105" asChild>
                <Link href={slides[currentSlide].cta_link}>
                  {slides[currentSlide].cta_primary} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-900 font-semibold h-12 px-8 text-base bg-transparent backdrop-blur-sm w-full sm:w-auto transition-transform hover:scale-105" asChild>
                <Link href={slides[currentSlide].cta_secondary_link}>
                  {slides[currentSlide].cta_secondary}
                </Link>
              </Button>
            </FadeIn>

            {/* Trust bar - Consistent across all slides */}
            <FadeIn delay={0.6} className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 sm:pt-8 text-xs sm:text-sm text-slate-300 font-medium border-t border-white/10 mt-8">
              <span className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-primary" /> Global Export
              </span>
              <span className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-primary" /> ISO Certified
              </span>
              <span className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" /> Bulk Supply
              </span>
            </FadeIn>
          </div>

          {/* Right side - Optional content or just empty to let image show */}
          <div className="hidden lg:block"></div>
        </div>
      </Container>

      {/* Slider Controls - Hidden on mobile, shown on larger screens */}
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10 z-20 flex gap-2 sm:gap-4">
        <Button size="icon" variant="outline" onClick={prevSlide} className="rounded-full h-10 w-10 sm:h-12 sm:w-12 border-white/20 bg-black/20 hover:bg-white hover:text-black text-white backdrop-blur-md transition-transform hover:scale-110">
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
        <Button size="icon" variant="outline" onClick={nextSlide} className="rounded-full h-10 w-10 sm:h-12 sm:w-12 border-white/20 bg-black/20 hover:bg-white hover:text-black text-white backdrop-blur-md transition-transform hover:scale-110">
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-1/2 sm:-translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
