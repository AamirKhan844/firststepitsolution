import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { StatItem } from '@/types';

export interface StatCounterProps {
  stat: StatItem;
  icon?: LucideIcon;
  index?: number;
}

export const StatCounter: React.FC<StatCounterProps> = ({ stat, icon: Icon, index = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setDisplayValue(stat.value);
      return;
    }

    if (!isInView) {
      return;
    }

    const controls = animate(0, stat.value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, stat.value]);

  return (
    <div
      ref={ref}
      data-index={index}
      className="p-6 sm:p-7 rounded-2xl bg-[#0f284e]/70 border border-blue-800/60 hover:border-sky-400/60 shadow-lg text-center group transition-all duration-200"
    >
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-sky-300 mx-auto mb-4 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
          <Icon className="w-6 h-6" />
        </div>
      )}

      {/* Metric value with clean gradient */}
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
        {displayValue}
        <span className="text-sky-400">{stat.suffix}</span>
      </div>

      <div className="text-sm font-bold text-slate-100 mb-1.5">
        {stat.label}
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        {stat.description}
      </p>
    </div>
  );
};

export default StatCounter;
