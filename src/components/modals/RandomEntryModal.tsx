import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, X, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';
import { ArchiveEntry } from '../../types';

interface RandomEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
}

export const RandomEntryModal: React.FC<RandomEntryModalProps> = ({
  isOpen,
  onClose,
  entries,
  onSelectEntry,
}) => {
  const [randomEntry, setRandomEntry] = useState<ArchiveEntry | null>(null);
  const [daysAgo, setDaysAgo] = useState(247);
  const [isSpinning, setIsSpinning] = useState(false);

  const pickRandom = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * entries.length);
      const chosen = entries[idx];
      setRandomEntry(chosen);

      // Calculate approximate days elapsed from reference date 2026-08-29
      const entryDate = new Date(chosen.date).getTime();
      const today = new Date('2026-08-29').getTime();
      const diffDays = Math.max(1, Math.round((today - entryDate) / (1000 * 60 * 60 * 24)));
      setDaysAgo(diffDays);
      setIsSpinning(false);
    }, 450);
  };

  useEffect(() => {
    if (isOpen) {
      pickRandom();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0A]/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#181613] to-[#12110E] border border-[#C9A96E]/30 shadow-2xl p-6 sm:p-8 space-y-6 text-center relative overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#918B80] hover:text-[#F4F0E8] hover:bg-[#1C1A17]"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 text-[10px] font-mono uppercase tracking-[0.25em] text-[#C9A96E]">
            <Compass className="w-3 h-3" />
            <span>Random Memory Wander</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-display text-[#F4F0E8] font-light">
              Something You Wrote
            </h2>
            <p className="text-xs font-mono text-[#C9A96E] tracking-wider">
              {isSpinning ? 'Consulting the archive...' : `You penned this ${daysAgo} days ago`}
            </p>
          </div>

          {randomEntry && !isSpinning ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[#0B0B0A]/70 border border-[#C9A96E]/20 text-left space-y-4"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#918B80]">
                <span>{randomEntry.month} {randomEntry.day}, {randomEntry.year}</span>
                <span className="uppercase text-[#C9A96E]">{randomEntry.type}</span>
              </div>

              <h3 className="text-xl font-display text-[#F4F0E8]">
                {randomEntry.title}
              </h3>

              <blockquote className="font-serif-body italic text-sm text-[#E8E1D5]/80 leading-relaxed border-l-2 border-[#C9A96E]/40 pl-3">
                “{randomEntry.excerpt}”
              </blockquote>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={pickRandom}
                  className="inline-flex items-center space-x-1.5 text-xs text-[#918B80] hover:text-[#E8E1D5] font-sans-ui"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Another Memory</span>
                </button>

                <button
                  onClick={() => {
                    onSelectEntry(randomEntry);
                    onClose();
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#C9A96E] text-[#0B0B0A] text-xs font-bold font-sans-ui uppercase tracking-wider hover:bg-[#D4B47B] transition-all cursor-pointer"
                >
                  <span>Open Entry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-6 h-6 text-[#C9A96E] animate-spin" />
              <span className="text-xs font-mono text-[#918B80]">Searching the volumes...</span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
