import React from 'react'
import SplitText from './ui/SplitText'

export default function Footer() {
  return (
    <footer className="w-full bg-[#121212] text-white pt-24 pb-12 px-6 md:px-12 lg:px-16 relative z-20 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Top Section: Newsletter Signup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Top Left: Heading */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-serif text-sm tracking-wide text-zinc-400 mb-4 block">
              <SplitText 
                text="Weekly Newsletter" 
                delay={60} 
                duration={1.8} 
                mode="words"
              />
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal leading-[1.1] text-white select-none">
              <SplitText 
                text="Your Weekly Dose" 
                delay={50} 
                duration={1.8} 
                mode="words"
              />
              <span className="block font-script italic text-white mt-2">
                <SplitText 
                  text="of Elegance" 
                  delay={80} 
                  duration={2.2} 
                  mode="words"
                />
              </span>
            </h2>
          </div>

          {/* Top Right: Input & Info */}
          <div className="lg:col-span-5 flex flex-col justify-end h-full lg:pt-16">
            <p className="text-zinc-400 font-sans font-light text-sm md:text-[15px] leading-relaxed max-w-sm mb-6">
              <SplitText 
                text="Stay connected with private trunk shows, gemstone releases, and insider jewelry styling." 
                delay={25} 
                duration={1.6} 
                mode="words"
              />
            </p>
            
            {/* Input field */}
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to JaiShree Jwellers VIP Newsletter!'); }} className="flex items-center border border-white/10 bg-transparent rounded-none max-w-md w-full overflow-hidden transition-colors focus-within:border-[#c59d5f]/50">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                className="bg-transparent text-white placeholder-zinc-600 focus:outline-none flex-grow py-3.5 px-5 text-sm font-sans"
              />
              <div className="h-8 w-[1px] bg-white/10"></div>
              <button 
                type="submit"
                className="flex items-center justify-center px-6 text-zinc-400 hover:text-[#c59d5f] cursor-pointer transition-colors"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-white/10 mb-16" />

        {/* Bottom Section: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-12">
          
          {/* Logo & Tagline */}
          <div className="lg:col-span-4 flex flex-col text-left">
            <span className="font-serif text-2xl font-light tracking-[0.16em] text-[#F5F0EA] uppercase select-none mb-1">
              JAISHREE JWELLERS
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#c59d5f] font-sans font-medium mb-4 block">
              Fine Jewelry Atelier
            </span>
            <p className="text-zinc-500 font-sans font-light text-xs md:text-sm max-w-[260px] leading-relaxed">
              Crafting timeless fine jewelry to elevate life's most unforgettable moments.
            </p>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Jewelry Collections */}
            <div className="flex flex-col gap-4 text-left">
              <span className="text-zinc-500 font-sans font-semibold text-[11px] uppercase tracking-wider select-none">
                Collections
              </span>
              <ul className="flex flex-col gap-2.5 text-[13px] font-sans font-light text-zinc-400">
                <li><a href="#featured-products" className="hover:text-[#c59d5f] transition-colors">Diamond Rings</a></li>
                <li><a href="#featured-products" className="hover:text-[#c59d5f] transition-colors">Earrings &amp; Drops</a></li>
                <li><a href="#featured-products" className="hover:text-[#c59d5f] transition-colors">Stellar Bracelets</a></li>
                <li><a href="#inspirations" className="hover:text-[#c59d5f] transition-colors">Pearl Poise</a></li>
                <li><a href="#inspirations" className="hover:text-[#c59d5f] transition-colors">Bridal Suites</a></li>
              </ul>
            </div>

            {/* The Atelier */}
            <div className="flex flex-col gap-4 text-left">
              <span className="text-zinc-500 font-sans font-semibold text-[11px] uppercase tracking-wider select-none">
                The Atelier
              </span>
              <ul className="flex flex-col gap-2.5 text-[13px] font-sans font-light text-zinc-400">
                <li><a href="#about" className="hover:text-[#c59d5f] transition-colors">Our Heritage</a></li>
                <li><a href="#why-choose-us" className="hover:text-[#c59d5f] transition-colors">Artisanship</a></li>
                <li><a href="#" className="hover:text-[#c59d5f] transition-colors">GIA Diamond Guide</a></li>
                <li><a href="#" className="hover:text-[#c59d5f] transition-colors">Ethical Sourcing</a></li>
                <li><a href="#" className="hover:text-[#c59d5f] transition-colors">Ring Sizing Guide</a></li>
              </ul>
            </div>

            {/* Client Care */}
            <div className="flex flex-col gap-4 text-left">
              <span className="text-zinc-500 font-sans font-semibold text-[11px] uppercase tracking-wider select-none">
                Client Care
              </span>
              <ul className="flex flex-col gap-2.5 text-[13px] font-sans font-light text-zinc-400">
                <li><a href="#" className="hover:text-[#c59d5f] transition-colors">Insured Shipping</a></li>
                <li><a href="#" className="hover:text-[#c59d5f] transition-colors">Lifetime Warranty</a></li>
                <li><a href="#" className="hover:text-[#c59d5f] transition-colors">Complimentary Cleaning</a></li>
                <li><a href="#" className="hover:text-[#c59d5f] transition-colors">Book Private Consultation</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Divider */}
        <hr className="border-white/5 my-8" />

        {/* Footer Bottom Strip */}
        <div className="flex flex-col items-center justify-center pt-4 text-center">
          <p className="text-[11px] text-zinc-600 font-sans">
            &copy; 2026 JaiShree Jwellers. All rights reserved. Designed and Developed by <a href="https://mohitjorawar.github.io/Mohit-portfolio/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 underline transition-colors">Mohit Jorawar</a>
          </p>
        </div>

      </div>
    </footer>
  )
}
