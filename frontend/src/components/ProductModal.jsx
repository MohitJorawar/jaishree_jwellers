import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'

export default function ProductModal({ isOpen, onClose, product, onAddToCart }) {
  if (!isOpen || !product) return null

  // Setup carousel images.
  // We automatically look for product-specific suffixes like _1, _2, _3
  // and fall back to the main image to ensure the carousel has multiple slides.
  // Detailed descriptions, specs & gallery database for jewelry collection
  const getProductDetails = (id) => {
    const detailsMap = {
      1: {
        category: 'Solitaire Diamond Rings',
        description: 'The Celeste Diamond Ring is the quintessential emblem of timeless love. Handcrafted in solid 18k yellow gold with platinum prongs, it features a hand-selected 1.85-carat round brilliant diamond of exceptional clarity and fire.',
        gallery: [
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cbfc3e6b2e8d98c5c010c_Celeste%20Diamond%20Ring.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/6951191e002702070237f0a2_Ring%20Image.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69513520577cc8a4d1edf89c_Elegant%20Diamond%20Ring.webp'
        ],
        specs: {
          'Materials': 'Solid 18K Yellow Gold & Platinum 950 Prongs',
          'Gemstone': '1.85 Carat Round Brilliant Diamond (VVS1 Clarity, F Color)',
          'Band Width': '2.2mm Comfort-Fit Tapered Band',
          'Certification': 'GIA Certified (Diamond Dossier Included)',
          'Care Instructions': 'Clean with warm soapy water and soft brush or ultrasonic bath.',
          'Country of Origin': 'Handcrafted in Antwerp, Belgium'
        }
      },
      2: {
        category: 'Pendants & Charms',
        description: 'Cast in 18k warm recycled gold, the Celest Gold Charm features an engraved celestial compass centered with a brilliant pave diamond star. Designed to be worn on delicate chains or modular charm bracelets.',
        gallery: [
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cc043904ed2ee3ecd82aa_Celest%20Gold%20Charm.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/6952261e577cc8a4d1051930_Closeup%20Necklace%20Shot.webp',
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cd21428379a4e0612461e_Elegant%20Gold%20Jewelry.webp'
        ],
        specs: {
          'Materials': 'Solid 18K Recycled Gold, Hand-Polished Satin Sheen',
          'Gemstone': '0.15 Carat Round Pave Accent Diamonds (VS1, G Color)',
          'Dimensions': '22mm Diameter, 2.5mm Depth',
          'Chain Compatibility': 'Fits chains up to 3.5mm thickness',
          'Care Instructions': 'Buff gently with microfiber polishing cloth.',
          'Country of Origin': 'Cast & Hand-Finished in Arezzo, Italy'
        }
      },
      3: {
        category: 'Haute Earrings',
        description: 'A breathtaking pair of cascading drops engineered for fluid kinetic motion. Featuring delicate gold links punctuated by shimmering bezel-set pear-cut diamonds that catch every ambient flicker of light.',
        gallery: [
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cc3ab4626d0937bb51809_Aurea%20Diamond%20Drops.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69513455ae98181d0af81f11_Elegant%20Gold%20Earring.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69534fafd27a73f155d0d6ca_Close%20Up%20Portrait%20Of%20A%20Women.webp'
        ],
        specs: {
          'Materials': 'Solid 18K Yellow Gold',
          'Gemstone': '0.90 Total Carat Weight Pear & Round Brilliant Diamonds',
          'Drop Length': '42mm (1.65 inches)',
          'Backing Type': 'Secure French Wire with Safety Clasp',
          'Care Instructions': 'Wipe with soft lint-free cloth after wear. Keep away from perfumes.',
          'Country of Origin': 'Artisanal Studio in Paris, France'
        }
      },
      4: {
        category: 'Fine Bracelets',
        description: 'An architectural classic re-envisioned. Interlocking solid gold cable links offer a satisfying tactile weight, seamlessly fastening with a hidden pressure-lock clasp and double security latch.',
        gallery: [
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cc4ecb859eb55bfa76853_Stellar%20Link%20Bracelet.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/6953502765bc85b415f439fb_Elegant%20Portrait%20With%20Bracelet.webp',
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cd21428379a4e0612461e_Elegant%20Gold%20Jewelry.webp'
        ],
        specs: {
          'Materials': '18K Gold Vermeil over 925 Sterling Silver / Solid Gold Core',
          'Length': '7.0 inches (Custom sizing available upon request)',
          'Link Width': '6.5mm',
          'Clasp': 'Concealed Box Clasp with Dual Safety Figure-8 Clips',
          'Care Instructions': 'Clean with lukewarm water and mild soap. Avoid chlorine.',
          'Country of Origin': 'Handcrafted in Vicenza, Italy'
        }
      },
      5: {
        category: 'Floral & Nature Bands',
        description: 'Inspired by blossoming gardenia petals in twilight, this organic sculpted band features hand-etched botanical curves holding micro-pavé diamonds for a touch of romantic mystique.',
        gallery: [
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cbd4079000a555d4cab9e_Eternal%20Bloom%20Ring.webp',
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cd3a3d77b7f47bb9d4c1e_Gold%20Flower%20Ring.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69534f187ac3f49a2b0c524a_Women%20Close%20Shot.webp'
        ],
        specs: {
          'Materials': 'Solid 14K Warm Rose Gold',
          'Diamonds': '0.45 Carat Pavé Lab Diamonds (VS Clarity, Colorless)',
          'Band Profile': 'Scalloped Floral Edge, 3.2mm Width',
          'Care Instructions': 'Store separately in lined jewelry box.',
          'Country of Origin': 'Designed in Kyoto, Hand-cast in Tokyo'
        }
      },
      6: {
        category: 'Statement Earrings',
        description: 'Understated yet unforgettable. These slender solid gold drops drape effortlessly, catching natural daylight and candlelight with a warm polished gleam.',
        gallery: [
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cc67702c7d43c3641e4fa_Celeste%20Drop%20Earrings.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69513455ae98181d0af81f11_Elegant%20Gold%20Earring.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69534fafd27a73f155d0d6ca_Close%20Up%20Portrait%20Of%20A%20Women.webp'
        ],
        specs: {
          'Materials': '18K Solid Yellow Gold',
          'Drop Length': '35mm',
          'Weight': '4.8 grams per pair',
          'Closure': 'Comfort Post & Butterfly Push-Back',
          'Care Instructions': 'Polish with soft chamois cloth.',
          'Country of Origin': 'Crafted in Milan, Italy'
        }
      },
      7: {
        category: 'Eternity & Stacking Bands',
        description: 'A sleek, domed stackable band designed with subtle geometric faceting along its circumference, creating an undulating halo of reflections that flatters any finger.',
        gallery: [
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/69588eddb350d170e2fae408_Gold%20Ring.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/6951191e002702070237f0a2_Ring%20Image.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69534f187ac3f49a2b0c524a_Women%20Close%20Shot.webp'
        ],
        specs: {
          'Materials': 'Solid 18K Yellow Gold',
          'Width': '4.0mm Domed Profile',
          'Finish': 'High Mirror Polish exterior with Satin Interior',
          'Care Instructions': 'Ultrasonic cleaner safe.',
          'Country of Origin': 'Crafted in Pforzheim, Germany'
        }
      },
      8: {
        category: 'Cocktail & Statement Rings',
        description: 'A celebration of nature’s eternal renewal. Tiered flower petals of hand-brushed 18k yellow gold spiral inward toward a cluster of high-clarity pavé diamonds.',
        gallery: [
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cd3a3d77b7f47bb9d4c1e_Gold%20Flower%20Ring.webp',
          'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cbd4079000a555d4cab9e_Eternal%20Bloom%20Ring.webp',
          'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69513520577cc8a4d1edf89c_Elegant%20Diamond%20Ring.webp'
        ],
        specs: {
          'Materials': 'Solid 18K Yellow Gold with Hand-Brushed Satin Petals',
          'Gemstones': '0.38 Total Carat Weight Diamonds (VVS2 Clarity, E Color)',
          'Crown Diameter': '18mm',
          'Care Instructions': 'Store in dedicated soft pouch to preserve petal edges.',
          'Country of Origin': 'Handmade in Geneva, Switzerland'
        }
      }
    }
    return detailsMap[id] || {
      category: 'Haute Joaillerie',
      description: 'An exquisitely finished fine jewelry masterpiece designed to elevate your moments with everlasting brilliance.',
      gallery: [product.image],
      specs: {
        'Materials': 'Solid 18K Yellow Gold & Certified Diamonds',
        'Dimensions': 'Custom Bespoke Fit',
        'Care Instructions': 'Polish with soft microfiber cloth.',
        'Country of Origin': 'Crafted in Antwerp'
      }
    }
  }

  const details = getProductDetails(product.id)
  const carouselImages = details.gallery && details.gallery.length > 0 ? details.gallery : [product.image]

  const [currentSlide, setCurrentSlide] = useState(0)

  // Reset slide index when opening a new product
  useEffect(() => {
    setCurrentSlide(0)
  }, [product])

  const nextSlide = (e) => {
    e.stopPropagation()
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = (e) => {
    e.stopPropagation()
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  // Prevent scroll propagation when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none bg-[#121212]/60 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Card container */}
      <div
        className="relative w-full max-w-4xl bg-[#F0EDE8] text-[#1A1A1A] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row gap-8 p-6 md:p-8 animate-[fadeInUp_0.4s_cubic-bezier(0.25,0.1,0.25,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#E8E4DE] rounded-full p-2 transition-all cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Carousel */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="aspect-square w-full bg-[#E8E4DE] rounded-[8px] flex items-center justify-center overflow-hidden relative group">
            <img
              src={carouselImages[currentSlide]}
              alt={`${product.name} slide ${currentSlide + 1}`}
              className="w-[70%] h-[70%] object-contain mix-blend-multiply transition-all duration-300"
              onError={(e) => {
                // Fall back to main image if secondary images fail to load
                e.target.src = product.image
              }}
            />

            {/* Left navigation arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#F0EDE8]/80 hover:bg-[#F0EDE8] border border-[#1A1A1A]/5 rounded-full p-1.5 shadow-sm text-[#1A1A1A] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#F0EDE8]/80 hover:bg-[#F0EDE8] border border-[#1A1A1A]/5 rounded-full p-1.5 shadow-sm text-[#1A1A1A] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx 
                    ? 'bg-[#B87333] w-4' 
                    : 'bg-[#E8E4DE] hover:bg-[#1A1A1A]/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-between overflow-y-auto max-h-[70vh] md:max-h-none pr-1">
          <div>
            {/* Category label */}
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B87333] font-sans font-semibold block mb-2">
              {details.category}
            </span>

            {/* Product Title */}
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight mb-2">
              {product.name}
            </h2>

            {/* Price */}
            <p className="font-serif text-lg md:text-xl text-[#B87333] font-medium mb-6">
              {product.price}
            </p>

            {/* Divider line */}
            <hr className="border-[#E8E4DE] mb-6" />

            {/* Product Description */}
            <p className="text-zinc-600 font-sans font-light text-sm md:text-[14.5px] leading-relaxed mb-6">
              {details.description}
            </p>

            {/* About / Product Specifications */}
            <div className="flex flex-col gap-3 mb-8">
              <h4 className="font-sans font-semibold text-[13px] uppercase tracking-wider text-[#1A1A1A] mb-1">
                Product Details
              </h4>
              {Object.entries(details.specs).map(([key, val]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-start text-xs border-b border-[#E8E4DE]/50 pb-2">
                  <span className="font-medium text-[#1A1A1A]/60 sm:w-1/3 mb-1 sm:mb-0 select-none">
                    {key}
                  </span>
                  <span className="text-zinc-700 sm:w-2/3">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={() => {
              onAddToCart(product)
              onClose()
            }}
            className="w-full bg-[#1A1A1A] text-[#F0EDE8] py-3.5 px-6 font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-[#B87333] transition-colors duration-300 cursor-pointer rounded-xs"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  )
}
