import React from 'react';
import { motion, type Variants } from 'framer-motion';

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
  className?: string;
}

// Container variants for kinetic word stagger
const headingContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.08,
    },
  },
};

// Word-level reveal animation with subtle upward lift and blur dissipation
const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  theme = 'dark',
  className = '',
}) => {
  const isCenter = align === 'center';
  const isDark = theme === 'dark';
  const titleWords = title ? title.trim().split(/\s+/) : [];
  const highlightWords = highlight ? highlight.trim().split(/\s+/) : [];

  return (
    <div
      className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} mb-16 ${className}`}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <span className="eyebrow">{badge}</span>
        </motion.div>
      )}

      <motion.h2
        variants={headingContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}
        aria-label={`${title} ${highlight || ''}`.trim()}
      >
        <span className="inline">
          {titleWords.map((word, idx) => (
            <motion.span
              key={`tw-${idx}`}
              variants={wordVariants}
              className="inline-block mr-[0.28em] will-change-transform"
            >
              {word}
            </motion.span>
          ))}
        </span>{' '}
        {highlightWords.length > 0 && (
          <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-sky-300">
            {highlightWords.map((word, idx) => (
              <motion.span
                key={`hw-${idx}`}
                variants={wordVariants}
                className="inline-block mr-[0.28em] will-change-transform"
              >
                {word}
              </motion.span>
            ))}
          </span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className={`text-sm sm:text-base lg:text-lg leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
