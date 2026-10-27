import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react'

export default function Navbar({ cartCount, onCartClick, isWelcomeComplete }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
        setMobileMenuOpen(false)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isWelcomeComplete) {
      if (window.innerWidth < 768) {
        setMobileMenuOpen(true)
      }
    }
  }, [isWelcomeComplete])

  const navItems = [
    { name: 'Home', hasDropdown: false, href: '#' },
    { name: 'About', hasDropdown: false, href: '#about' },
    { 
      name: 'Jewelry', 
      hasDropdown: true, 
      href: '#featured-products',
      sublinks: [
        { name: 'Celeste Diamond Rings', href: '#featured-products' },
        { name: 'Aurea Drop Earrings', href: '#featured-products' },
        { name: 'Stellar Link Bracelets', href: '#featured-products' },
        { name: 'Celest Gold Charms', href: '#featured-products' }
      ]
    },
    { 
      name: 'Collections', 
      hasDropdown: true, 
      href: '#inspirations',
      sublinks: [
        { name: 'Bridal & Solitaires', href: '#inspirations' },
        { name: 'Golden Cascades', href: '#inspirations' },
        { name: 'Luminous Pearls', href: '#inspirations' },
        { name: 'Heirloom Treasures', href: '#inspirations' }
      ]
    },
    { name: 'Contact', hasDropdown: false, href: '#contact' }
  ]

  return (
    <motion.header
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.2,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out text-[#F5F0EA] border-b border-[#F5F0EA]/10 ${
        scrolled 
          ? 'bg-[#121212]/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      {/* Top Jewelry Announcement Marquee Bar */}
      <div className="hidden sm:flex w-full bg-[#16120e]/90 border-b border-white/5 py-1 px-4 text-center justify-center items-center overflow-hidden">
        <p className="text-[11px] tracking-[0.2em] uppercase font-sans text-zinc-300 font-light flex items-center gap-3">
          <span>Enjoy 20% off all diamond rings</span>
          <span className="text-[#c59d5f]">•</span>
          <span>Get 15% off your first jewelry purchase</span>
          <span className="text-[#c59d5f]">•</span>
          <span className="text-zinc-400">Complimentary Insured Worldwide Shipping</span>
        </p>
      </div>

      {/* Main Navbar Container */}
      <div className={`max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${
        scrolled ? 'py-3.5' : 'py-5'
      }`}>
        
        {/* Logo - JaiShree Jwellers */}
        <div className="flex items-center">
          <a href="#" className="flex flex-col text-left group select-none">
            <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.16em] text-[#F5F0EA] uppercase group-hover:text-[#c59d5f] transition-colors duration-300">
              JaiShree Jwellers
            </span>
            <span className="text-[8px] uppercase tracking-[0.35em] text-[#c59d5f] font-sans font-medium -mt-0.5 block opacity-90">
              Fine Jewelry
            </span>
          </a>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-9 text-[14px] font-light tracking-[0.16em] py-2 uppercase font-serif">
          {navItems.map((item) => (
            <div key={item.name} className="relative group flex items-center cursor-pointer">
              <a
                href={item.href}
                onClick={() => setActiveTab(item.name)}
                className={`transition-colors duration-300 flex items-center gap-1.5 ${
                  activeTab === item.name 
                    ? 'text-[#c59d5f]' 
                    : 'text-[#F5F0EA]/85 hover:text-[#c59d5f]'
                }`}
              >
                {item.name}
                {item.hasDropdown && (
                  <span className="text-[9px] text-zinc-400 font-normal transition-transform duration-300 group-hover:rotate-180">
                    ▼
                  </span>
                )}
              </a>

              {/* Submenu Dropdown */}
              {item.hasDropdown && (
                <div className="absolute top-[calc(100%+12px)] left-0 mt-1 w-52 bg-[#16120e] shadow-2xl border border-white/10 rounded-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="py-2 text-xs text-[#F5F0EA]/80 font-normal">
                    {item.sublinks?.map((sub) => (
                      <a 
                        key={sub.name}
                        href={sub.href} 
                        className="block px-4 py-2.5 hover:bg-white/5 hover:text-[#c59d5f] transition-colors border-b border-white/5 last:border-0"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side utilities */}
        <div className="flex items-center space-x-6 text-[#F5F0EA]">
          <button className="hover:text-[#B87333] transition-colors duration-300 p-1 cursor-pointer" aria-label="Search">
            <Search className="w-[18px] h-[18px] stroke-[1.8]" />
          </button>

          {/* Cart Icon with badge */}
          <button 
            onClick={onCartClick} 
            className="hover:text-[#B87333] transition-colors duration-300 p-1 cursor-pointer relative flex items-center" 
            aria-label="Cart"
          >
            <ShoppingCart className="w-[18px] h-[18px] stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#E07B2A] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center scale-90 border border-[#121212]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden hover:text-[#B87333] transition-colors p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#121212]/95 backdrop-blur-md border-b border-white/10 overflow-hidden absolute w-full left-0 z-40"
          >
            <div className="px-6 py-6 flex flex-col space-y-4 text-[#F5F0EA]/90 text-[16px] font-light tracking-[0.15em] uppercase font-serif">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-white/5 pb-3">
                  <div className="flex justify-between items-center">
                    <a 
                      href={item.href} 
                      onClick={() => {
                        setActiveTab(item.name)
                        if (!item.hasDropdown) setMobileMenuOpen(false)
                      }}
                      className={activeTab === item.name ? 'text-[#c59d5f]' : 'hover:text-[#c59d5f]'}
                    >
                      {item.name}
                    </a>
                    {item.hasDropdown && <span className="text-xs text-[#c59d5f]">▼</span>}
                  </div>
                  {item.hasDropdown && item.sublinks && (
                    <div className="pl-4 mt-2 flex flex-col space-y-2 text-xs normal-case text-zinc-400 font-sans">
                      {item.sublinks.map((sub) => (
                        <a 
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="hover:text-[#c59d5f] py-1"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Polobar (Animated bottom border line/dot) */}
      <div className="absolute bottom-0 left-0 right-0 h-[16px] flex justify-center items-center pointer-events-none translate-y-1/2 z-50">
        {/* Horizontal Line expanding left and right */}
        <div className="polobar-line w-full h-[1px] bg-white/70 origin-center scale-x-0" />
        
        {/* Outer Circle and Inner Dot (Polo Stick Knob equivalent) */}
        <div className="polobar-knob w-4 h-4 rounded-full border border-white/40 flex items-center justify-center bg-white/5 backdrop-blur-xs absolute scale-0 opacity-0">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F5F0EA]" />
        </div>
      </div>
    </motion.header>
  )
}
