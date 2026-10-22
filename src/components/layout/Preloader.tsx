import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || (typeof document !== 'undefined' && document.hidden)) {
      setProgress(100);
      setIsFinished(true);
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    const startTime = performance.now();
    const duration = 1000; // 1.0s clean corporate sequence

    let animationFrameId: number;
    let finishTimer1: ReturnType<typeof setTimeout> | undefined;
    let finishTimer2: ReturnType<typeof setTimeout> | undefined;
    let failsafe: ReturnType<typeof setTimeout> | undefined;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        if (failsafe) {
          clearTimeout(failsafe);
          failsafe = undefined;
        }

        finishTimer1 = setTimeout(() => {
          setIsFinished(true);
          finishTimer2 = setTimeout(() => {
            if (onCompleteRef.current) onCompleteRef.current();
          }, 400);
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    // Failsafe safety timeout: guarantees removal even if browser freezes RAF
    failsafe = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      setProgress(100);
      setIsFinished(true);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 2200);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
        setProgress(100);
        setIsFinished(true);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (failsafe) clearTimeout(failsafe);
      if (finishTimer1) clearTimeout(finishTimer1);
      if (finishTimer2) clearTimeout(finishTimer2);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          id="site-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.35, ease: 'easeOut' },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-slate-900 px-4 select-none"
          role="status"
          aria-live="polite"
          aria-label="Loading First Step Solutions Corporate Portal"
        >
          {/* Central Corporate Emblem */}
          <div className="flex flex-col items-center max-w-xs text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#002d62] via-[#004b99] to-[#0066cc] flex items-center justify-center shadow-lg">
              <span className="font-extrabold text-white text-2xl tracking-tight">FS</span>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                First Step Solutions
              </h2>
              <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                <span>Authorized HP Commercial Partner</span>
              </div>
            </div>

            {/* Corporate Progress Bar */}
            <div className="w-64 space-y-1.5 pt-2">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-sky-500 rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                <span>Enterprise Portal</span>
                <span className="text-blue-600 font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
