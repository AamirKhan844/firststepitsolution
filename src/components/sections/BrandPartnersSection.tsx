import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { partnersData } from '@/data/partnersData';
import { ShieldCheck, Cpu, HardDrive, Network, Cloud, Laptop, Lock } from 'lucide-react';

export interface BrandPartnersSectionProps {
  id?: string;
}

const partnerIconMap: Record<string, React.ReactNode> = {
  hp: <Laptop className="w-5 h-5 text-blue-600" />,
  dell: <HardDrive className="w-5 h-5 text-sky-600" />,
  cisco: <Network className="w-5 h-5 text-emerald-600" />,
  microsoft: <Cloud className="w-5 h-5 text-blue-600" />,
  aws: <Cloud className="w-5 h-5 text-amber-600" />,
  lenovo: <Cpu className="w-5 h-5 text-red-600" />,
  fortinet: <ShieldCheck className="w-5 h-5 text-purple-600" />,
  sonicwall: <Lock className="w-5 h-5 text-orange-600" />,
};

export const BrandPartnersSection: React.FC<BrandPartnersSectionProps> = ({ id = 'partners' }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const marqueeItems = [...partnersData, ...partnersData];

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shouldAnimate = !isHovered && !prefersReducedMotion;

  return (
    <section
      id={id}
      className="py-16 bg-white border-y border-slate-200 overflow-hidden relative"
    >
      <div className="section-wrap text-center mb-10 relative z-10">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
          AUTHORIZED OEM TECHNOLOGY ECOSYSTEM
        </p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Direct Authorized Sourcing from Global OEM Leaders
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
          We maintain direct relationships with premier enterprise computing, networking, and security brands to guarantee 100% genuine hardware and direct warranty support.
        </p>
      </div>

      {/* Marquee */}
      <div
        className="relative w-full overflow-hidden py-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsHovered(false);
          }
        }}
      >
        {/* Left & Right gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-5 w-max cursor-pointer"
          animate={{ x: shouldAnimate ? ['0%', '-50%'] : undefined }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 32,
              ease: 'linear',
            },
          }}
        >
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white hover:shadow-md transition-all duration-200 shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                {partnerIconMap[partner.id] || <Laptop className="w-4 h-4 text-blue-600" />}
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm tracking-tight block">
                  {partner.name}
                </span>
                <span className="text-[10px] text-blue-600 font-semibold block">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandPartnersSection;
