import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('Initializing PERN environment...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 18) + 12;
        if (next > 30 && next < 60) setStepText('Connecting PostgreSQL schema...');
        if (next >= 60 && next < 90) setStepText('Mounting interactive workspace...');
        if (next >= 90) setStepText('Ready.');
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -30,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090D16] text-white p-6 select-none"
    >
      {/* Background Subtle Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full space-y-6 text-center">
        {/* Animated Badge Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-glow-emerald relative"
        >
          <Terminal className="w-8 h-8" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            className="absolute inset-0 rounded-2xl border border-dashed border-emerald-500/40 pointer-events-none"
          ></motion.div>
        </motion.div>

        {/* Text Reveal */}
        <div className="space-y-1">
          <motion.h2
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white"
          >
            Tanya Somasundaram
          </motion.h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-xs font-mono text-emerald-400 uppercase tracking-wider"
          >
            Full-Stack Developer & Database Architect
          </motion.p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-2 pt-2">
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="truncate max-w-[220px]">{stepText}</span>
            <span className="text-emerald-400 font-semibold">{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

