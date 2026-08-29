import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bookmark, Sparkles, Scroll, ArrowRight, BookOpen, CheckCircle, Search, Filter } from 'lucide-react';
import { ArchiveEntry } from '../../types';

interface DevotionalLibraryProps {
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
  onSelectScripture?: (scripture: string) => void;
}

export const DevotionalLibrary: React.FC<DevotionalLibraryProps> = ({
  entries,
  onSelectEntry,
  onSelectScripture,
}) => {
  const [filterOriginalOnly, setFilterOriginalOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const devotionalEntries = entries.filter((e) => e.type === 'devotional');

  const filtered = devotionalEntries.filter((e) => {
    if (filterOriginalOnly && !e.isTranscribedOriginal) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = e.title.toLowerCase().includes(q);
      const inScripture = e.scriptures.some((s) => s.toLowerCase().includes(q));
      const inText = e.content.toLowerCase().includes(q);
      const inVerse = (e.scriptureVerseText || '').toLowerCase().includes(q);
      if (!inTitle && !inScripture && !inText && !inVerse) return false;
    }
    return true;
  });

  return (
    <div className="space-y-12 pb-24 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-3 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#C9A96E]/20 bg-[#141310]/80 text-[10px] font-sans-ui uppercase tracking-[0.25em] text-[#C9A96E]">
          <Bookmark className="w-3 h-3" />
          <span>Sacred Library</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F0E8] font-normal tracking-wide">
          Devotionals & Transcriptions
        </h1>
        <p className="font-display italic text-[#918B80] max-w-xl mx-auto text-base">
          “Scripture reflections, handwritten notebook transcriptions, prayers, and lessons for the soul.”
        </p>
      </header>

      {/* Filter and Original Notebook Toggle */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Toggle original notebook */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={() => setFilterOriginalOnly(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans-ui transition-all ${
              !filterOriginalOnly
                ? 'bg-[#C9A96E] text-[#0B0B0A] font-bold'
                : 'bg-[#0B0B0A] text-[#918B80] border border-[#C9A96E]/15'
            }`}
          >
            All Devotionals ({devotionalEntries.length})
          </button>
          <button
            onClick={() => setFilterOriginalOnly(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans-ui transition-all flex items-center space-x-1.5 ${
              filterOriginalOnly
                ? 'bg-[#C9A96E] text-[#0B0B0A] font-bold'
                : 'bg-[#0B0B0A] text-[#C9A96E] border border-[#C9A96E]/30'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Notebook Transcriptions (9)</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#918B80]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verses or lessons..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0B0A] border border-[#C9A96E]/20 text-xs text-[#E8E1D5] focus:outline-none focus:border-[#C9A96E]"
          />
        </div>
      </div>

      {/* Grid of Devotional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((devotional, idx) => (
          <motion.div
            key={devotional.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            onClick={() => onSelectEntry(devotional)}
            className="group relative p-7 rounded-2xl bg-gradient-to-b from-[#161412] to-[#11100E] border border-[#C9A96E]/20 hover:border-[#C9A96E]/60 shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Header: Date, Memo Number, Scripture */}
              <div className="flex items-center justify-between border-b border-[#C9A96E]/15 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                    {devotional.month.slice(0, 3)} {devotional.day}, {devotional.year}
                  </span>
                  {devotional.memoNumber && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 font-bold">
                      {devotional.memoNumber}
                    </span>
                  )}
                </div>

                {devotional.isTranscribedOriginal && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0B0B0A] text-[#918B80] border border-[#918B80]/20">
                    Handwritten Page
                  </span>
                )}
              </div>

              {/* Scripture Verse Quote Header */}
              {devotional.scriptureVerseText && (
                <div className="p-3.5 rounded-xl bg-[#0B0B0A]/70 border border-[#C9A96E]/15">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#C9A96E] block mb-1">
                    Scripture: {devotional.scriptures.join(', ')}
                  </span>
                  <p className="font-display italic text-sm text-[#F4F0E8] line-clamp-2 leading-relaxed">
                    “{devotional.scriptureVerseText}”
                  </p>
                </div>
              )}

              {/* Title & Opening Thought */}
              <div>
                <h3 className="text-2xl font-display text-[#F4F0E8] group-hover:text-[#C9A96E] transition-colors leading-snug">
                  {devotional.title}
                </h3>
                <p className="mt-2 text-xs font-serif-body italic text-[#918B80] line-clamp-2 leading-relaxed">
                  {devotional.excerpt}
                </p>
              </div>
            </div>

            {/* Bottom Actions & Lesson Pill */}
            <div className="pt-4 border-t border-[#C9A96E]/15 space-y-3">
              {devotional.lesson && (
                <p className="text-[11px] font-display text-[#E8E1D5]/80 italic line-clamp-1">
                  <strong className="text-[#C9A96E] not-italic font-sans-ui text-[10px] uppercase mr-1">Lesson:</strong>
                  {devotional.lesson}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-[#C9A96E]">
                <div className="flex gap-1.5">
                  {devotional.topics.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] text-[#918B80] font-mono">
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center space-x-1.5 font-sans-ui uppercase tracking-wider text-[11px] group-hover:translate-x-1 transition-transform">
                  <span>Read Devotional</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
