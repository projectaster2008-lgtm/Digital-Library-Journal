import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ArrowRight, Calendar, Bookmark } from 'lucide-react';
import { ArchiveEntry } from '../../types';

interface OnThisDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
}

export const OnThisDayModal: React.FC<OnThisDayModalProps> = ({
  isOpen,
  onClose,
  entries,
  onSelectEntry,
}) => {
  if (!isOpen) return null;

  // Let's find entries matching current month (August) or vintage time capsule
  const matchingEntries = entries.filter((e) => e.month.toLowerCase().includes('august') || e.year === 2025);
  const featuredVintage = matchingEntries[0] || entries[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0A]/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#181613] to-[#12110E] border border-[#C9A96E]/30 shadow-2xl p-6 sm:p-8 space-y-6 text-center relative overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#918B80] hover:text-[#F4F0E8] hover:bg-[#1C1A17]"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Vintage Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 text-[10px] font-mono uppercase tracking-[0.25em] text-[#C9A96E]">
            <Sparkles className="w-3 h-3" />
            <span>Time Capsule</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-display text-[#F4F0E8] font-light">
              On This Day in the Archive
            </h2>
            <p className="text-xs font-mono text-[#C9A96E] tracking-widest uppercase">
              29 August · Retrospective
            </p>
          </div>

          {featuredVintage && (
            <div className="p-6 rounded-2xl bg-[#0B0B0A]/70 border border-[#C9A96E]/20 text-left space-y-4">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#918B80]">
                <span>{featuredVintage.month} {featuredVintage.day}, {featuredVintage.year}</span>
                <span className="uppercase text-[#C9A96E]">{featuredVintage.type}</span>
              </div>

              <h3 className="text-xl font-display text-[#F4F0E8]">
                {featuredVintage.title}
              </h3>

              <blockquote className="font-serif-body italic text-sm text-[#E8E1D5]/80 leading-relaxed border-l-2 border-[#C9A96E]/40 pl-3">
                “{featuredVintage.excerpt}”
              </blockquote>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    onSelectEntry(featuredVintage);
                    onClose();
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#C9A96E] text-[#0B0B0A] text-xs font-bold font-sans-ui uppercase tracking-wider hover:bg-[#D4B47B] transition-all cursor-pointer"
                >
                  <span>Read Full Memory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <p className="text-[11px] font-display italic text-[#918B80]">
            “The archive reminds you of who you were, so you can see how far God has brought you.”
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
