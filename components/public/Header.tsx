'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe, Phone } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/industries', label: 'Industries' },
  { href: '/export-readiness', label: 'Export Info' },
  { href: '/blog', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border py-3" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group relative z-50">
          <div className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center transition-colors shadow-lg",
            scrolled ? "bg-primary text-white" : "bg-white text-primary"
          )}>
            <Globe className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-bold text-lg leading-none tracking-tight",
              scrolled ? "text-slate-900" : "text-white"
            )}>
              Africma’s & Dakeb
            </span>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-widest opacity-80",
              scrolled ? "text-slate-500" : "text-white/80"
            )}>
              Farm Export LTD
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                scrolled 
                  ? "text-slate-600 hover:text-primary hover:bg-slate-50" 
                  : "text-white/90 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a 
            href="https://wa.me/233555123456" 
            className={cn(
              "text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-full transition-colors",
              scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
            )}
          >
            <Phone className="h-4 w-4" />
            <span>+233 55 512 3456</span>
          </a>
          <Button 
            asChild 
            className={cn(
              "font-bold shadow-lg transition-all hover:scale-105 rounded-full px-6",
              !scrolled && "bg-white text-primary hover:bg-white/90"
            )}
          >
            <Link href="/rfq">Request Quote</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "hover:bg-white/20",
                  scrolled ? "text-slate-900" : "text-white"
                )}
              >
                <Menu className="h-8 w-8" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l-primary/10 p-0">
              <div className="flex flex-col h-full bg-white">
                <div className="p-6 border-b">
                  <span className="font-bold text-xl text-primary">Menu</span>
                </div>
                <nav className="flex flex-col p-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between p-4 rounded-xl text-lg font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-all"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto p-6 space-y-4 bg-slate-50">
                  <SheetClose asChild>
                    <Button asChild className="w-full h-12 text-lg rounded-xl shadow-md" size="lg">
                      <Link href="/rfq">Request Quote</Link>
                    </Button>
                  </SheetClose>
                  <p className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Premium Ghanaian Exports
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
