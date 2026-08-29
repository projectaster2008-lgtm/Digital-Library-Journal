import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Leaf, Droplets, Sun, ArrowRight, Bookmark } from 'lucide-react';
import { ArchiveEntry } from '../../types';

interface LivingArchiveTreeProps {
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
}

export const LivingArchiveTree: React.FC<LivingArchiveTreeProps> = ({
  entries,
  onSelectEntry,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [hoveredEntry, setHoveredEntry] = useState<ArchiveEntry | null>(null);

  // Group entries by year
  const years = Array.from(new Set(entries.map((e) => e.year))).sort((a, b) => b - a);

  // Filter entries if a branch/year is focused
  const displayedEntries = selectedYear
    ? entries.filter((e) => e.year === selectedYear)
    : entries;

  return (
    <div className="relative p-6 sm:p-10 rounded-3xl bg-[#F3EEDC]/80 border border-[#78966A]/20 backdrop-blur-md shadow-xl modern-paper space-y-8 overflow-hidden">
      {/* Subtle organic background foliage glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#78966A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F2C96D]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#78966A]/20 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#78966A]/15 text-[#3F6248] text-xs font-sans-ui uppercase tracking-widest mb-2 font-medium">
            <Leaf className="w-3.5 h-3.5" />
            <span>The Living Metaphor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display text-[#253326] font-normal tracking-wide">
            The Living Archive Tree
          </h2>
          <p className="mt-1 text-sm font-serif-body text-[#6B7B6C] max-w-xl">
            Every major year is a branch. Every writing is a leaf, point of illumination, or ripple of water that has grown over time.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-sans-ui text-[#4E5C4F]">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#78966A] inline-block shadow-sm" />
            <span>Journal Leaf</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#F2C96D] inline-block shadow-sm" />
            <span>Devotional Light</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#8EC5C1] inline-block shadow-sm" />
            <span>Reflection Ripple</span>
          </div>
        </div>
      </div>

      {/* Year Branches Selector */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs uppercase font-mono text-[#6B7B6C] mr-2">Branches:</span>
        <button
          onClick={() => setSelectedYear(null)}
          className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all ${
            selectedYear === null
              ? 'bg-[#3F6248] text-[#F7F8F2] shadow-md scale-105'
              : 'bg-white/60 text-[#3F6248] hover:bg-white border border-[#78966A]/20'
          }`}
        >
          All Branches ({entries.length})
        </button>
        {years.map((year) => {
          const count = entries.filter((e) => e.year === year).length;
          return (
            <button
              key={year}
              onClick={() => setSelectedYear(year === selectedYear ? null : year)}
              className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all ${
                selectedYear === year
                  ? 'bg-[#3F6248] text-[#F7F8F2] shadow-md scale-105'
                  : 'bg-white/60 text-[#3F6248] hover:bg-white border border-[#78966A]/20'
              }`}
            >
              Branch {year} ({count})
            </button>
          );
        })}
      </div>

      {/* Interactive Canopy Matrix of Leaves & Lights */}
      <div className="relative z-10 min-h-[280px] p-6 rounded-2xl bg-white/70 border border-[#78966A]/25 backdrop-blur-sm shadow-inner flex flex-wrap items-center justify-center gap-3">
        {displayedEntries.map((entry, idx) => {
          const isDevotional = entry.type === 'devotional';
          const isReflection = entry.type === 'reflection';
          const isJournal = entry.type === 'journal';

          const bgColor = isDevotional
            ? 'bg-[#F2C96D] text-[#5A4010] shadow-[0_0_12px_rgba(242,201,109,0.6)]'
            : isReflection
            ? 'bg-[#8EC5C1] text-[#1D4A47] shadow-[0_0_10px_rgba(142,197,193,0.5)]'
            : 'bg-[#78966A] text-[#1E301F] shadow-[0_0_8px_rgba(120,150,106,0.4)]';

          return (
            <motion.button
              key={entry.id}
              whileHover={{ scale: 1.25, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredEntry(entry)}
              onMouseLeave={() => setHoveredEntry(null)}
              onClick={() => onSelectEntry(entry)}
              className={`relative group p-2.5 rounded-full transition-all duration-300 cursor-pointer ${bgColor}`}
              title={`${entry.title} (${entry.year})`}
            >
              {isDevotional && <Sun className="w-4 h-4" />}
              {isReflection && <Droplets className="w-4 h-4" />}
              {isJournal && <Leaf className="w-4 h-4" />}
            </motion.button>
          );
        })}
      </div>

      {/* Active Hover / Inspection Floating Card */}
      <AnimatePresence>
        {hoveredEntry ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#78966A]/30 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#78966A]">
                <span>{hoveredEntry.type}</span>
                <span>·</span>
                <span>{hoveredEntry.day} {hoveredEntry.month} {hoveredEntry.year}</span>
                {hoveredEntry.scriptures[0] && (
                  <>
                    <span>·</span>
                    <span className="italic font-serif-body text-[#3F6248]">{hoveredEntry.scriptures[0]}</span>
                  </>
                )}
              </div>
              <h4 className="text-xl font-display text-[#253326]">
                {hoveredEntry.title}
              </h4>
              <p className="text-xs font-serif-body text-[#6B7B6C] line-clamp-1 max-w-xl">
                “{hoveredEntry.excerpt}”
              </p>
            </div>

            <button
              onClick={() => onSelectEntry(hoveredEntry)}
              className="px-4 py-2 rounded-full bg-[#3F6248] text-[#F7F8F2] text-xs font-sans-ui uppercase tracking-wider flex items-center space-x-2 hover:bg-[#2A4431] transition-colors shadow-sm self-end sm:self-center cursor-pointer"
            >
              <span>Read Leaf</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          <div className="text-center py-2 text-xs font-mono text-[#848D80]">
            Hover over any growing leaf or light node to reveal its inscription, or click to open.
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
