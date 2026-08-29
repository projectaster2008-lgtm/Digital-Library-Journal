import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Leaf } from 'lucide-react';
import { Garden3DScene } from '../../scenes/Garden3DScene';

interface OpeningPortalProps {
  onEnter: () => void;
}

export const OpeningPortal: React.FC<OpeningPortalProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnterClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px] overflow-hidden text-center select-none px-6">
      {/* Background 3D Living Nature Environment */}
      <Garden3DScene atmosphere="morning" isReadingMode={false} />

      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-xl mx-auto flex flex-col items-center p-8 sm:p-12 rounded-3xl bg-white/75 backdrop-blur-md border border-[#78966A]/25 shadow-2xl modern-paper"
          >
            {/* Top Minimalist Leaf Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-12 h-12 rounded-full border border-[#78966A]/30 flex items-center justify-center text-[#3F6248] font-display text-xl mb-6 bg-white shadow-sm"
            >
              <Leaf className="w-5 h-5 text-[#78966A]" />
            </motion.div>

            {/* Tiny Opening Line */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="text-xs font-sans-ui uppercase text-[#78966A] mb-2 tracking-[0.3em] font-semibold"
            >
              The Personal Archive
            </motion.div>

            {/* Main Subtitle */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.0 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-[#253326] font-normal leading-tight tracking-tight mb-4"
            >
              A Living Garden of Thoughts, <br />
              <span className="italic font-serif-body text-[#3F6248]">Prayers & Lessons.</span>
            </motion.h1>

            {/* Subtle Divider */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 48, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-[#78966A]/50 to-transparent mb-6"
            />

            {/* Philosophical Opening Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.9 }}
              className="text-sm font-serif-body italic text-[#5C6E5E] max-w-md leading-relaxed mb-8"
            >
              “Nature + Light + Growth + Paper + Time. A sanctuary where writing grows alongside the person who writes it.”
            </motion.p>

            {/* Enter Button */}
            <motion.button
              id="enter-archive-portal-button"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEnterClick}
              className="group relative inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-[#3F6248] text-[#F7F8F2] text-xs uppercase tracking-[0.25em] font-sans-ui hover:bg-[#2A4431] shadow-lg transition-all cursor-pointer font-medium"
            >
              <span>Wander the Garden</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F2C96D] group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Ambient hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-8 text-[11px] text-[#78966A] font-mono tracking-widest uppercase flex items-center space-x-2"
            >
              <Sparkles className="w-3 h-3 text-[#F2C96D]" />
              <span>Quiet · Atmospheric · Living</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Soft fade effect when entering */}
      {isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[#F7F8F2]/90 backdrop-blur-lg z-20 pointer-events-none"
        />
      )}
    </div>
  );
};
