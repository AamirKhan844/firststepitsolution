import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, MapPin } from 'lucide-react';
import { testimonialsData } from '@/data/testimonialsData';

export interface TestimonialsSectionProps {
  id?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  id = 'testimonials',
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const total = testimonialsData.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (idx: number) => {
    setCurrentIndex(Math.max(0, Math.min(total - 1, idx)));
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, total]);

  const current = testimonialsData[currentIndex];

  return (
    <section
      id={id}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client Testimonials"
      className="py-24 bg-white border-t border-slate-200 relative overflow-hidden scroll-mt-20 sm:scroll-mt-28 lg:scroll-mt-36"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsHovered(false);
        }
      }}
    >
      <div className="section-wrap relative z-10">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>CLIENT REVIEWS &amp; VERIFICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by IT Directors &amp; Business Leaders Across Delhi NCR
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Discover why corporate companies, factories, BPOs, and media agencies depend on First Step Solutions for commercial hardware procurement, rentals, and SLA maintenance.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
            <Quote className="absolute top-6 right-8 w-20 h-20 text-blue-100 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6 relative z-10"
              >
                {/* Star rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    5.0 Verified Corporate Client
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-slate-800 text-base sm:text-lg lg:text-xl font-medium leading-relaxed italic">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-sky-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                      {current.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        {current.name}
                      </h4>
                      <p className="text-xs text-blue-600 font-semibold">
                        {current.role} &bull; {current.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{current.location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial Slide Indicators">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={currentIndex === idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-blue-600'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 shadow-sm flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 shadow-sm flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
