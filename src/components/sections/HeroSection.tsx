import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Server,
  RotateCcw,
  Wrench,
  Zap,
} from 'lucide-react';

export interface HeroSectionProps {
  isLoaded?: boolean;
  onNavigateToCategory?: (category: string) => void;
}

interface HeroSlide {
  id: string;
  badge: string;
  badgeIcon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  keySpecs: string[];
  primaryCtaText: string;
  primaryCtaAction: () => void;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaAction?: () => void;
  secondaryCtaHref: string;
  isSecondaryTel?: boolean;
  imageUrl: string;
  imageAlt: string;
  floatingPills: { label: string; sub: string }[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isLoaded = true,
  onNavigateToCategory,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [slideImageErrors, setSlideImageErrors] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryNav = (cat: string) => {
    if (onNavigateToCategory) {
      onNavigateToCategory(cat);
    }
    scrollToSection('products');
  };

  const slides: HeroSlide[] = [
    // ── Slide 1: HP Elite & ProBook Commercial Fleet ──
    {
      id: 'slide-hp-fleet',
      badge: 'AUTHORIZED HP COMMERCIAL FLEET',
      badgeIcon: ShieldCheck,
      title: 'HP Elite & ProBook Commercial Fleet',
      tagline: 'Elegant and Powerful Business Computing',
      description:
        'Equip your workforce with enterprise AI PCs powered by Intel Core Ultra and AMD Ryzen processors. Built with MIL-STD 810H durability, HP Wolf Security, and all-day battery life for corporate professionals across Delhi NCR.',
      keySpecs: [
        'Intel® Core™ Ultra 5 & 7 with Dedicated NPU',
        'HP Wolf Pro Security with Self-Healing BIOS',
        '16GB–32GB DDR5 5600MHz RAM & 1TB NVMe SSD',
        '100% Genuine OEM Warranty with On-Site Support',
      ],
      primaryCtaText: 'Shop Laptops',
      primaryCtaAction: () => handleCategoryNav('laptops'),
      primaryCtaHref: '#products',
      secondaryCtaText: 'Request Corporate Pricing',
      secondaryCtaAction: () => scrollToSection('contact'),
      secondaryCtaHref: '#contact',
      imageUrl:
        'https://www.graphlinecomputers.com/media/catalog/product/cache/1/small_image/300x/c509f3d4e27d840305e6008f3c21a356/1/_/1_1_4.jpg',
      imageAlt: 'HP ProBook 440 G11 Commercial Laptop',
      floatingPills: [
        { label: 'Authorized HP Partner', sub: 'Direct Commercial Sourcing' },
        { label: 'Same-Day NCR Delivery', sub: 'Pre-Imaged & Ready to Deploy' },
      ],
    },

    // ── Slide 2: Zero-Capex Corporate IT Rentals ──
    {
      id: 'slide-rentals',
      badge: 'ZERO-CAPEX IT INFRASTRUCTURE',
      badgeIcon: RotateCcw,
      title: 'Zero-Capex Corporate IT Rentals',
      tagline: 'Rent Commercial Laptops, Desktops & Workstations from ₹1,499/mo',
      description:
        'Scale your startup, corporate team, or call center with zero upfront security deposit. Flexible monthly and annual leases with doorstep NCR setup, free standby buffer units, and 100% tax-deductible operational expenditure (OpEx).',
      keySpecs: [
        'Commercial Core i5 & i7 Fleets from ₹1,499/month',
        'Zero Upfront Security Deposit for Verified Enterprises',
        'Instant Doorstep Delivery across Delhi, Noida & Gurgaon',
        'Free Standby Replacement Buffer Placed at Your Office',
      ],
      primaryCtaText: 'Explore Rental Plans',
      primaryCtaAction: () => scrollToSection('rentals'),
      primaryCtaHref: '#rentals',
      secondaryCtaText: 'Request Rental Quote',
      secondaryCtaAction: () => scrollToSection('contact'),
      secondaryCtaHref: '#contact',
      imageUrl:
        'https://www.graphlinecomputers.com/media/catalog/product/cache/1/small_image/300x/c509f3d4e27d840305e6008f3c21a356/1/_/1_1_4_6.jpg',
      imageAlt: 'Corporate Laptop & Desktop Fleet on Rent',
      floatingPills: [
        { label: 'From ₹1,499/mo', sub: 'Zero Upfront Deposit' },
        { label: 'Free Standby Buffer', sub: '2-Hour Swap Guarantee' },
      ],
    },

    // ── Slide 3: High-Performance Workstations & Servers ──
    {
      id: 'slide-workstations',
      badge: 'ENTERPRISE COMPUTE POWER',
      badgeIcon: Server,
      title: 'High-Performance Workstations & Servers',
      tagline: 'HP Z2 Workstations & Dell PowerEdge Servers',
      description:
        'ISV-certified mission-critical hardware engineered for AutoCAD, SolidWorks, Revit, 4K rendering, virtualization, and local AI model inference. Backed by ECC memory, NVIDIA RTX professional GPUs, and dual redundant power supplies.',
      keySpecs: [
        'HP Z2 & Z4 Workstations with Intel Xeon / Core i9',
        'Certified ISV Performance for 100+ CAD/BIM Applications',
        'Dell PowerEdge Dual-Xeon Rack Servers for Virtualization',
        'Hardware RAID-10 Storage & Dedicated Out-of-Band iDRAC',
      ],
      primaryCtaText: 'Configure Rig',
      primaryCtaAction: () => scrollToSection('contact'),
      primaryCtaHref: '#contact',
      secondaryCtaText: 'View Workstations',
      secondaryCtaAction: () => handleCategoryNav('workstations'),
      secondaryCtaHref: '#products',
      imageUrl:
        'https://www.graphlinecomputers.com/media/catalog/product/cache/1/small_image/300x/c509f3d4e27d840305e6008f3c21a356/1/_/1_1_4_7.jpg',
      imageAlt: 'HP Z2 Tower Workstation & Enterprise Server',
      floatingPills: [
        { label: 'ISV Certified Hardware', sub: 'AutoCAD & Revit Validated' },
        { label: '4-Hour Replacement SLA', sub: 'Enterprise Mission Critical' },
      ],
    },

    // ── Slide 4: 24/7 Enterprise AMC & Express Chip Lab ──
    {
      id: 'slide-amc-lab',
      badge: 'MISSION-CRITICAL SUPPORT',
      badgeIcon: Wrench,
      title: '24/7 Enterprise AMC & Express Chip Lab',
      tagline: 'Committed 15-Minute Emergency SLA',
      description:
        'Zero-downtime maintenance contracts with certified resident engineers across Delhi NCR. Powered by our Nehru Place BGA motherboard rework facility for component-level IC repair, power rails, and clean room data recovery.',
      keySpecs: [
        'Guaranteed 15-Minute Emergency Helpdesk Response SLA',
        'Comprehensive & Non-Comprehensive Corporate AMC Plans',
        'Nehru Place In-House BGA Rework & Motherboard Repair Lab',
        'Dedicated Resident Engineers Placed at Large Corporate Sites',
      ],
      primaryCtaText: 'Get AMC Quote',
      primaryCtaAction: () => scrollToSection('contact'),
      primaryCtaHref: '#contact',
      secondaryCtaText: 'Support: +91 96435 37006',
      secondaryCtaHref: 'tel:+919643537006',
      isSecondaryTel: true,
      imageUrl:
        'https://www.graphlinecomputers.com/media/catalog/product/cache/1/small_image/300x/c509f3d4e27d840305e6008f3c21a356/1/_/1_1_4_2.jpg',
      imageAlt: 'Component-Level Motherboard Repair & AMC Lab',
      floatingPills: [
        { label: '15-Minute SLA', sub: 'Emergency Response' },
        { label: 'Nehru Place Lab', sub: 'BGA Motherboard Rework' },
      ],
    },
  ];

  const totalSlides = slides.length;

  // Autoplay with 6-second interval, pauses on hover
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (idx: number) => {
    setCurrentSlide(Math.max(0, Math.min(totalSlides - 1, idx)));
  };

  const active = slides[currentSlide];
  const BadgeIcon = active.badgeIcon;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Commercial Hardware and Services Highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setIsPaused(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        }
      }}
      className={`relative w-full bg-gradient-to-b from-white via-slate-50 to-blue-50/20 pt-[155px] sm:pt-[165px] lg:pt-[175px] pb-16 overflow-hidden border-b border-slate-200 focus:outline-none transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-90'
      }`}
    >
      {/* Subtle Background Elements (Clean, Zero 3D/WebGL) */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-wrap relative z-10">
        {/* Main Carousel Slide Stage */}
        <div className="min-h-[500px] sm:min-h-[520px] lg:min-h-[540px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`hero-slide-${currentSlide}`}
              role="tabpanel"
              aria-roledescription="slide"
              aria-label={`Slide ${currentSlide + 1} of ${totalSlides}: ${active.title}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Heading, Value Prop, Specs & CTAs (7 cols) */}
              <div className="lg:col-span-7 space-y-5 text-left">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm">
                  <BadgeIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>{active.badge}</span>
                </div>

                {/* Primary Slide Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-[2.9rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                  {active.title}
                </h1>

                {/* Sharp Value Proposition Tagline */}
                <p className="text-base sm:text-lg font-bold text-blue-700 leading-snug">
                  {active.tagline}
                </p>

                {/* Descriptive Body */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  {active.description}
                </p>

                {/* Key Spec Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {active.keySpecs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href={active.primaryCtaHref}
                    onClick={(e) => {
                      e.preventDefault();
                      active.primaryCtaAction();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{active.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  {active.isSecondaryTel ? (
                    <a
                      href={active.secondaryCtaHref}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-all"
                    >
                      <PhoneCall className="w-4 h-4 text-blue-600" />
                      <span>{active.secondaryCtaText}</span>
                    </a>
                  ) : (
                    <a
                      href={active.secondaryCtaHref}
                      onClick={(e) => {
                        if (active.secondaryCtaAction) {
                          e.preventDefault();
                          active.secondaryCtaAction();
                        }
                      }}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-all"
                    >
                      <span>{active.secondaryCtaText}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: High-Res Hardware Showcase (5 cols) */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full max-w-md mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10 flex flex-col items-center justify-center">
                  {/* Authentic Hardware Image */}
                  <div className="w-full h-56 sm:h-64 flex items-center justify-center overflow-hidden">
                    {slideImageErrors[active.id] ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50/50 rounded-2xl p-6 text-center border border-slate-100">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 mb-3 shadow-sm">
                          <BadgeIcon className="w-7 h-7" />
                        </div>
                        <span className="text-sm font-bold text-slate-900 line-clamp-1">{active.title}</span>
                        <span className="text-xs text-blue-700 font-semibold mt-1">Authorized HP Commercial Partner</span>
                        <span className="mt-2 text-[10px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                          Nehru Place Hub &bull; Delhi NCR
                        </span>
                      </div>
                    ) : (
                      <img
                        src={active.imageUrl}
                        alt={active.imageAlt}
                        onError={() => {
                          setSlideImageErrors((prev) => ({ ...prev, [active.id]: true }));
                        }}
                        className="max-h-full max-w-full object-contain drop-shadow-md"
                        loading="eager"
                      />
                    )}
                  </div>

                  {/* Floating Trust Pills */}
                  <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-5 border-t border-slate-100">
                    {active.floatingPills.map((pill, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                        <span className="block text-xs font-bold text-slate-900 leading-tight">
                          {pill.label}
                        </span>
                        <span className="block text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                          {pill.sub}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls: Navigation Arrows & Indicator Dots */}
        <div className="flex items-center justify-between pt-8 sm:pt-10 border-t border-slate-200/80 mt-8">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Hero Slide"
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-400 shadow-sm transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicator Dots (o o o o) */}
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Hero Slide Indicators">
            {slides.map((s, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`hero-slide-${idx}`}
                  aria-label={`Go to slide ${idx + 1}: ${s.title}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-8 h-2.5 bg-blue-600'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Hero Slide"
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-400 shadow-sm transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Trust Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200/70">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-slate-900 leading-tight">
                Authorized HP Partner
              </span>
              <span className="block text-[11px] text-slate-500 leading-tight">
                100% Genuine OEM Warranty
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <RotateCcw className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-slate-900 leading-tight">
                Zero Security Deposit
              </span>
              <span className="block text-[11px] text-slate-500 leading-tight">
                For Verified Corporates
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-slate-900 leading-tight">
                15-Min Emergency SLA
              </span>
              <span className="block text-[11px] text-slate-500 leading-tight">
                Dedicated Resident Engineers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Wrench className="w-5 h-5 text-sky-600 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-slate-900 leading-tight">
                Nehru Place Chip Lab
              </span>
              <span className="block text-[11px] text-slate-500 leading-tight">
                BGA Rework &amp; Motherboard Lab
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
