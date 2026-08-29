import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Bookmark, Sparkles, Clock, Scroll, ArrowRight, Compass, Flame, Shield, Calendar } from 'lucide-react';
import { ArchiveEntry } from '../../types';

interface HomeDashboardProps {
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
  onNavigate: (tab: string) => void;
  onOpenRandom: () => void;
  onOpenOnThisDay: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  entries,
  onSelectEntry,
  onNavigate,
  onOpenRandom,
  onOpenOnThisDay,
}) => {
  const featuredEntry = entries.find((e) => e.isFeatured) || entries[0];
  const recentEntries = entries.slice(0, 5);
  const oldArchiveEntry = entries.find((e) => e.id === 'memo-1-sa-ngalan-ni-hesus') || entries[entries.length - 1];

  const totalDevotionals = entries.filter((e) => e.type === 'devotional').length;
  const totalJournals = entries.filter((e) => e.type === 'journal').length;
  const totalReflections = entries.filter((e) => e.type === 'reflection').length;
  const totalLetters = entries.filter((e) => e.type === 'letter').length;

  return (
    <div className="space-y-16 pb-20">
      {/* ─── Hero Section: Archive Identity & Inscription ─── */}
      <section className="text-center pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#C9A96E]/20 bg-[#141310]/80 text-[11px] font-sans-ui uppercase tracking-[0.25em] text-[#C9A96E] mb-5"
        >
          <Sparkles className="w-3 h-3" />
          <span>Sanctuary & Archive</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F4F0E8] font-normal tracking-wide max-w-2xl mx-auto leading-tight"
        >
          The Archive
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-4 font-display italic text-lg sm:text-xl text-[#918B80] max-w-xl mx-auto leading-relaxed"
        >
          “A collection of things I have learned, lived, questioned and remembered.”
        </motion.p>
      </section>

      {/* ─── The Archive as a Living Object (Record of a Life) ─── */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="p-6 rounded-2xl bg-[#141310]/70 border border-[#C9A96E]/15 backdrop-blur-sm shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <span className="text-[10px] tracking-[0.25em] text-[#C9A96E] uppercase font-mono">
              Living Archive
            </span>
            <h3 className="text-xl font-display text-[#F4F0E8]">
              A Record of a Life Being Written
            </h3>
            <p className="text-xs text-[#918B80] max-w-md font-sans-ui leading-relaxed">
              Every page is a testament to seasons of silence, spiritual battles, mountain hikes, and grace.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
            <div className="p-3.5 rounded-xl bg-[#0B0B0A]/80 border border-[#C9A96E]/10 text-center">
              <span className="block text-2xl font-display text-[#C9A96E]">137</span>
              <span className="text-[10px] text-[#918B80] uppercase tracking-wider font-mono">Writings</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0B0B0A]/80 border border-[#C9A96E]/10 text-center">
              <span className="block text-2xl font-display text-[#F4F0E8]">42</span>
              <span className="text-[10px] text-[#918B80] uppercase tracking-wider font-mono">Devotionals</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0B0B0A]/80 border border-[#C9A96E]/10 text-center">
              <span className="block text-2xl font-display text-[#F4F0E8]">81</span>
              <span className="text-[10px] text-[#918B80] uppercase tracking-wider font-mono">Journals</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0B0B0A]/80 border border-[#C9A96E]/10 text-center">
              <span className="block text-2xl font-display text-[#C9A96E]">2025+</span>
              <span className="text-[10px] text-[#918B80] uppercase tracking-wider font-mono">Timeline</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── Featured Editorial Entry ─── */}
      {featuredEntry && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#C9A96E]/15 pb-2">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] uppercase text-[#C9A96E]">
              Featured Editorial
            </span>
            <span className="text-xs text-[#918B80] font-mono">Aug 29, 2026</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={() => onSelectEntry(featuredEntry)}
            className="group relative p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#181613] to-[#12110E] border border-[#C9A96E]/25 hover:border-[#C9A96E]/60 shadow-2xl transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C9A96E]/10 transition-colors" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-[#C9A96E]/20 text-[#C9A96E] text-[10px] font-mono uppercase tracking-widest border border-[#C9A96E]/30">
                  {featuredEntry.type}
                </span>
                {featuredEntry.scriptures[0] && (
                  <span className="text-xs text-[#C9A96E]/80 font-serif-body italic">
                    {featuredEntry.scriptures[0]}
                  </span>
                )}
                <span className="text-xs text-[#918B80] font-sans-ui">· {featuredEntry.readingTimeMinutes} min read</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#F4F0E8] font-normal leading-tight group-hover:text-[#C9A96E] transition-colors">
                  {featuredEntry.title}
                </h2>
                <p className="mt-4 text-base sm:text-lg font-serif-body text-[#E8E1D5]/80 leading-relaxed max-w-3xl line-clamp-3">
                  {featuredEntry.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#C9A96E]/10">
                <div className="flex flex-wrap gap-2">
                  {featuredEntry.topics.map((t) => (
                    <span key={t} className="text-[11px] text-[#918B80] font-sans-ui tracking-wider uppercase">
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans-ui text-[#C9A96E] group-hover:translate-x-1 transition-transform">
                  <span>Open Entry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── Archive Rooms / Metaphorical Gateways ─── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#C9A96E]/15 pb-2">
          <span className="text-[11px] font-sans-ui tracking-[0.2em] uppercase text-[#C9A96E]">
            Explore the Sanctuary Rooms
          </span>
          <span className="text-xs text-[#918B80]">5 Spatial Compartments</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Room 1: Journal */}
          <div
            onClick={() => onNavigate('journal')}
            className="group p-6 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 hover:border-[#C9A96E]/40 hover:bg-[#1A1814] transition-all cursor-pointer space-y-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#918B80] uppercase tracking-widest font-mono">01 // Room</span>
              <h3 className="text-xl font-display text-[#F4F0E8] group-hover:text-[#C9A96E] transition-colors">
                The Journal
              </h3>
              <p className="mt-1.5 text-xs text-[#918B80] leading-relaxed">
                Rain against the window. Honest chronicles, unhurried thoughts, and vulnerability.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs text-[#C9A96E]">
              <span>{totalJournals} Chronicles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Room 2: Devotionals */}
          <div
            onClick={() => onNavigate('devotionals')}
            className="group p-6 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 hover:border-[#C9A96E]/40 hover:bg-[#1A1814] transition-all cursor-pointer space-y-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#918B80] uppercase tracking-widest font-mono">02 // Room</span>
              <h3 className="text-xl font-display text-[#F4F0E8] group-hover:text-[#C9A96E] transition-colors">
                Devotional Library
              </h3>
              <p className="mt-1.5 text-xs text-[#918B80] leading-relaxed">
                Morning light and sacred verses. Handwritten notebook transcriptions & prayers.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs text-[#C9A96E]">
              <span>{totalDevotionals} Transcriptions</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Room 3: Reflections */}
          <div
            onClick={() => onNavigate('reflections')}
            className="group p-6 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 hover:border-[#C9A96E]/40 hover:bg-[#1A1814] transition-all cursor-pointer space-y-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#918B80] uppercase tracking-widest font-mono">03 // Room</span>
              <h3 className="text-xl font-display text-[#F4F0E8] group-hover:text-[#C9A96E] transition-colors">
                Reflections
              </h3>
              <p className="mt-1.5 text-xs text-[#918B80] leading-relaxed">
                Night desk lamp. In-depth contemplation on surrender, control, and wisdom.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs text-[#C9A96E]">
              <span>{totalReflections} Essays</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Two-Column Layout: Recently Written & From The Archive ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recently Written (8 cols) */}
        <section className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between border-b border-[#C9A96E]/15 pb-2">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] uppercase text-[#C9A96E]">
              Recently Written
            </span>
            <button
              onClick={() => onNavigate('journal')}
              className="text-xs text-[#918B80] hover:text-[#E8E1D5] transition-colors font-sans-ui"
            >
              View Full Index →
            </button>
          </div>

          <div className="divide-y divide-[#C9A96E]/10">
            {recentEntries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => onSelectEntry(entry)}
                className="group py-4 px-3 -mx-3 rounded-lg hover:bg-[#141310] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="text-center w-12 flex-shrink-0 pt-0.5 sm:pt-0">
                    <span className="block text-sm font-mono text-[#F4F0E8] font-medium leading-none">
                      {entry.day < 10 ? `0${entry.day}` : entry.day}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-[#918B80] tracking-wider">
                      {entry.month.slice(0, 3)}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#0B0B0A] text-[#918B80] border border-[#C9A96E]/10">
                        {entry.type}
                      </span>
                      {entry.isTranscribedOriginal && (
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#C9A96E]/15 text-[#C9A96E] border border-[#C9A96E]/30">
                          Original Notebook
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-display text-[#E8E1D5] group-hover:text-[#C9A96E] transition-colors mt-1">
                      {entry.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs text-[#918B80] self-end sm:self-center font-sans-ui">
                  {entry.scriptures[0] && (
                    <span className="italic text-[#C9A96E]/70 font-serif-body hidden sm:inline">
                      {entry.scriptures[0]}
                    </span>
                  )}
                  <span className="text-[11px] font-mono">{entry.readingTimeMinutes} min</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#918B80] group-hover:text-[#C9A96E] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: From the Archive Time-Capsule & Actions (4 cols) */}
        <section className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between border-b border-[#C9A96E]/15 pb-2">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] uppercase text-[#C9A96E]">
              From the Archive
            </span>
            <span className="text-xs text-[#918B80] font-mono">Memory</span>
          </div>

          {/* Time-Capsule Card */}
          {oldArchiveEntry && (
            <div
              onClick={() => onSelectEntry(oldArchiveEntry)}
              className="group p-6 rounded-2xl bg-gradient-to-b from-[#181613] to-[#12110E] border border-[#C9A96E]/20 hover:border-[#C9A96E]/50 transition-all cursor-pointer space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#918B80] uppercase tracking-widest">
                <span>Transcribed Memo No. 1</span>
                <span className="text-[#C9A96E]">Dec 25, 2025</span>
              </div>

              <h4 className="text-lg font-display text-[#F4F0E8] group-hover:text-[#C9A96E] transition-colors leading-snug">
                {oldArchiveEntry.title}
              </h4>

              <p className="text-xs font-serif-body italic text-[#918B80] line-clamp-3 leading-relaxed">
                “{oldArchiveEntry.excerpt}”
              </p>

              <div className="pt-2 flex items-center justify-between text-xs text-[#C9A96E] font-sans-ui">
                <span className="uppercase tracking-wider text-[11px]">Read Vintage Entry</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}

          {/* Random Entry & On This Day Quick Triggers */}
          <div className="space-y-2.5">
            <button
              onClick={onOpenRandom}
              className="w-full group p-4 rounded-xl bg-[#141310] border border-[#C9A96E]/15 hover:border-[#C9A96E]/40 hover:bg-[#1C1A17] text-left transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Compass className="w-4 h-4 text-[#C9A96E]" />
                <div>
                  <span className="text-xs font-display text-[#F4F0E8] uppercase tracking-wider block">
                    Show Me Something I Wrote
                  </span>
                  <span className="text-[10px] text-[#918B80]">Random wander through memories</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#918B80] group-hover:text-[#C9A96E] group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={onOpenOnThisDay}
              className="w-full group p-4 rounded-xl bg-[#141310] border border-[#C9A96E]/15 hover:border-[#C9A96E]/40 hover:bg-[#1C1A17] text-left transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-[#C9A96E]" />
                <div>
                  <span className="text-xs font-display text-[#F4F0E8] uppercase tracking-wider block">
                    On This Day Retrospective
                  </span>
                  <span className="text-[10px] text-[#918B80]">What you were learning a year ago</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#918B80] group-hover:text-[#C9A96E] group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
