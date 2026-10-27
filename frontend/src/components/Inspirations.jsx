import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Inspirations() {
  const sectionRef = useRef(null)
  const leftImageWrapperRef = useRef(null)
  const rightImageWrapperRef = useRef(null)
  const leftImageRef = useRef(null)
  const rightImageRef = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [hasAnimated, setHasAnimated] = useState([false, false, false, false, false])
  const [inView, setInView] = useState(false)

  const slides = [
    {
      id: 1,
      counter: '01',
      title: 'Solitaire & Diamond Rings',
      description: 'Exquisite brilliant-cut solitaire diamonds set in handcrafted 18k solid gold bands, capturing light with breathtaking clarity and fire.',
      mood: 'GIA-certified diamonds, 18k yellow and white gold, micro-pavé halos, timeless brilliance.',
      leftImage: 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/6951191e002702070237f0a2_Ring%20Image.webp',
      rightImage: 'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cbfc3e6b2e8d98c5c010c_Celeste%20Diamond%20Ring.webp'
    },
    {
      id: 2,
      counter: '02',
      title: 'Golden Cascades & Drops',
      description: 'Sculptural dangling earrings designed to frame the cheekbones with fluid grace, moving seamlessly from daytime tea to evening galas.',
      mood: 'Solid 18k gold, shimmering teardrop pendants, seamless movement, luminous earwear.',
      leftImage: 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69534fafd27a73f155d0d6ca_Close%20Up%20Portrait%20Of%20A%20Women.webp',
      rightImage: 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69513455ae98181d0af81f11_Elegant%20Gold%20Earring.webp'
    },
    {
      id: 3,
      counter: '03',
      title: 'Luminous Pearl Poise',
      description: 'Lustrous South Sea and Akoya pearls embraced by minimal gold links, reinterpreting traditional royalty for the contemporary connoisseur.',
      mood: 'Natural cultured pearls, iridescent luster, satin finish gold, regal neckline.',
      leftImage: 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69511465c99a64fe367f8548_Elegant%20Pearl%20Necklace.webp',
      rightImage: 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/6952261e577cc8a4d1051930_Closeup%20Necklace%20Shot.webp'
    },
    {
      id: 4,
      counter: '04',
      title: 'Stellar Link Arm Candy',
      description: 'Precision-articulated gold links that drape comfortably on the wrist, balancing substantial tactile weight with sleek, understated luxury.',
      mood: 'Heavy hand-polished solid links, concealed safety clasp, mirror sheen.',
      leftImage: 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/6953502765bc85b415f439fb_Elegant%20Portrait%20With%20Bracelet.webp',
      rightImage: 'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cc4ecb859eb55bfa76853_Stellar%20Link%20Bracelet.webp'
    },
    {
      id: 5,
      counter: '05',
      title: 'Bridal & Heirloom Suites',
      description: 'Bespoke ceremonial suites conceived to honor lifelong commitments, designed to be passed down and cherished through generations.',
      mood: 'Intricate vintage filigree, royal rose cut diamonds, eternal romance.',
      leftImage: 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69525416b12765c2252b9706_Elegant%20Fashion%20Portrait.webp',
      rightImage: 'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cd3a3d77b7f47bb9d4c1e_Gold%20Flower%20Ring.webp'
    }
  ]

  const activeSlide = slides[activeIndex]

  // Setup ScrollTrigger for initial section entrance
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      onEnter: () => {
        setInView(true)
      },
      once: true
    })

    return () => trigger.kill()
  }, [])

  // Parallax scrolling effects for left and right image wrappers
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(leftImageWrapperRef.current, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

      gsap.to(rightImageWrapperRef.current, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Control reveal / change animations for the active slide
  useEffect(() => {
    if (!inView) return

    let ctx = gsap.context(() => {
      const isFirstTime = !hasAnimated[activeIndex]

      if (isFirstTime) {
        // Run full unrolling animation (completes within 2s)
        const tl = gsap.timeline({
          onComplete: () => {
            setHasAnimated(prev => {
              const next = [...prev]
              next[activeIndex] = true
              return next
            })
          }
        })

        // Set initial states to ensure unrolling is visible
        gsap.set([leftImageRef.current, rightImageRef.current], {
          clipPath: 'inset(0% 0% 100% 0%)',
          opacity: 1
        })
        gsap.set('.inspiration-animate-text', { opacity: 0, y: 30 })

        // 1. Left image unrolls first (duration 0.8s)
        tl.to(leftImageRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.8,
          ease: 'power3.inOut'
        })

        // 2. Right image unrolls second (duration 0.8s, overlapping)
        tl.to(rightImageRef.current, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.8,
          ease: 'power3.inOut'
        }, '-=0.4')

        // 3. Text appears (duration 0.6s, staggered)
        tl.to('.inspiration-animate-text', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1
        }, '-=0.2')

      } else {
        // Run simple changing effect (quick cross-fade)
        gsap.set([leftImageRef.current, rightImageRef.current], {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 0
        })
        gsap.set('.inspiration-animate-text', { opacity: 0, y: 0 })

        gsap.to([leftImageRef.current, rightImageRef.current, '.inspiration-animate-text'], {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.05
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [inView, activeIndex])

  const handleSlideChange = (newIndex) => {
    // Quickly fade out existing content (0.2s)
    gsap.to([leftImageRef.current, rightImageRef.current, '.inspiration-animate-text'], {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(newIndex)
      }
    })
  }

  const nextSlide = () => {
    const nextIndex = (activeIndex + 1) % slides.length
    handleSlideChange(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = (activeIndex - 1 + slides.length) % slides.length
    handleSlideChange(prevIndex)
  }

  return (
    <section
      ref={sectionRef}
      id="inspirations"
      className="relative w-full overflow-hidden bg-[#FAF7F2] py-24 md:py-28 flex flex-col justify-center select-none z-20 border-t border-zinc-200"
    >
      <div className="max-w-[1440px] w-full mx-auto relative z-10 grid grid-cols-3 lg:grid-cols-12 items-center px-4 md:px-12 lg:px-16 gap-3 xs:gap-4 lg:gap-16">
        
        {/* Left Column: Vertical Image (Inspiration Left) */}
        <div ref={leftImageWrapperRef} className="col-span-1 lg:col-span-4 w-full relative">
          <div className="aspect-[2/3] w-full bg-zinc-100 overflow-hidden rounded-xs shadow-lg relative">
            <img
              ref={leftImageRef}
              src={activeSlide.leftImage}
              alt={`${activeSlide.title} interior`}
              className="w-full h-full object-cover relative z-10 opacity-0"
              style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            />
          </div>
        </div>

        {/* Middle Column: Text Details */}
        <div className="col-span-1 lg:col-span-4 flex flex-col justify-center text-left py-0">
          <span className="inspiration-animate-text text-[8px] xs:text-[11px] uppercase tracking-[0.15em] xs:tracking-[0.2em] text-[#c59d5f] font-sans font-semibold block mb-1 xs:mb-4 opacity-0">
            Fine Jewelry Suites
          </span>
          <h2 className="inspiration-animate-text font-serif text-[13px] xs:text-base sm:text-3xl md:text-4xl lg:text-[54px] font-normal text-[#1A1A1A] leading-tight select-none opacity-0">
            {activeSlide.title}
          </h2>
          <p className="inspiration-animate-text text-zinc-600 font-sans font-light text-[9px] xs:text-[11px] sm:text-sm md:text-base leading-relaxed mt-2 xs:mt-4 sm:mt-6 max-w-sm opacity-0">
            {activeSlide.description}
          </p>
        </div>

        {/* Right Column: Counter, Right Image, Mood and Buttons */}
        <div className="col-span-1 lg:col-span-4 flex flex-col justify-between relative">
          
          {/* Top Right Counter */}
          <div className="flex justify-end mb-2 xs:mb-6 lg:mb-12">
            <span className="inspiration-animate-text font-serif text-sm xs:text-xl lg:text-3xl font-light text-[#1A1A1A] select-none opacity-0">
              <span className="italic font-normal">{activeSlide.counter}</span>
              <span className="text-zinc-400 text-xs xs:text-base lg:text-xl font-light ml-0.5">/05</span>
            </span>
          </div>

          {/* Right/Square Image */}
          <div ref={rightImageWrapperRef} className="w-full relative mb-3 xs:mb-6 lg:mb-12">
            <div className="aspect-[4/5] w-full bg-zinc-100 overflow-hidden rounded-xs shadow-md relative">
              <img
                ref={rightImageRef}
                src={activeSlide.rightImage}
                alt={`${activeSlide.title} mood`}
                className="w-full h-full object-cover relative z-10 opacity-0"
                style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
              />
            </div>
          </div>

          {/* Mood Caption & Navigation Buttons */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 xs:gap-4 lg:gap-6 mt-1 xs:mt-4">
            
            <p className="inspiration-animate-text text-[8px] xs:text-[11px] lg:text-[13px] leading-tight xs:leading-relaxed text-zinc-500 max-w-[280px] opacity-0">
              <span className="font-bold italic text-zinc-700">The Mood:</span> {activeSlide.mood}
            </p>

            {/* Circular Navigation Buttons */}
            <div className="flex items-center gap-1.5 xs:gap-3 sm:gap-4 self-end md:self-auto">
              <button
                onClick={prevSlide}
                className="w-7 h-7 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border border-zinc-300 bg-white/70 hover:bg-[#1A1A1A] hover:border-[#1A1A1A] flex items-center justify-center text-zinc-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                aria-label="Previous inspiration"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-7 h-7 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border border-zinc-300 bg-white/70 hover:bg-[#1A1A1A] hover:border-[#1A1A1A] flex items-center justify-center text-zinc-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                aria-label="Next inspiration"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  )
}
