import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bookmark, Sparkles, Scroll, ArrowRight, BookOpen, Search, Feather } from 'lucide-react';
import { ArchiveEntry } from '../../types';

interface DevotionalLibraryProps {
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
  onSelectScripture?: (scripture: string) => void;
}

type FilterMode = 'all' | 'volume-1' | 'volume-2' | 'notebook';

export const DevotionalLibrary: React.FC<DevotionalLibraryProps> = ({
  entries,
  onSelectEntry,
  onSelectScripture,
}) => {
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const devotionalEntries = entries.filter((e) => e.type === 'devotional');
  const vol1Entries = devotionalEntries.filter((e) => e.volume === 'Volume I' || (!e.volume && e.collection?.includes('Volume I')) || (!e.volume && !e.id.startsWith('vol2')));
  const vol2Entries = devotionalEntries.filter((e) => e.volume === 'Volume II' || e.id.startsWith('vol2') || e.collection?.includes('Volume II'));
  const notebookEntries = devotionalEntries.filter((e) => e.isTranscribedOriginal);

  const filtered = devotionalEntries.filter((e) => {
    if (filterMode === 'volume-1' && !(e.volume === 'Volume I' || (!e.volume && !e.id.startsWith('vol2')))) return false;
    if (filterMode === 'volume-2' && !(e.volume === 'Volume II' || e.id.startsWith('vol2'))) return false;
    if (filterMode === 'notebook' && !e.isTranscribedOriginal) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = e.title.toLowerCase().includes(q);
      const inScripture = e.scriptures.some((s) => s.toLowerCase().includes(q));
      const inText = e.content.toLowerCase().includes(q);
      const inVerse = (e.scriptureVerseText || '').toLowerCase().includes(q);
      const inAuthor = (e.author || '').toLowerCase().includes(q);
      const inDevotionNum = (e.devotionNumber || '').toLowerCase().includes(q);
      const inTopics = e.topics.some((t) => t.toLowerCase().includes(q));
      if (!inTitle && !inScripture && !inText && !inVerse && !inAuthor && !inDevotionNum && !inTopics) return false;
    }
    return true;
  });

  return (
    <div className="space-y-12 pb-24 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-3 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#C9A96E]/20 bg-[#141310]/80 text-[10px] font-sans-ui uppercase tracking-[0.25em] text-[#C9A96E]">
          <Bookmark className="w-3 h-3" />
          <span>Scripture & Reflection</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F0E8] font-normal tracking-wide">
          Personal Devotions
        </h1>
        <p className="font-display italic text-[#918B80] max-w-2xl mx-auto text-base leading-relaxed">
          “A Journal of Scripture, handwritten notebooks, and spiritual reflections — written by Clint Aldwin Maurin.”
        </p>
      </header>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#141310]/95 border-2 border-[#C9A96E]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl backdrop-blur-xl">
        {/* Toggle filter tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans-ui transition-all ${
              filterMode === 'all'
                ? 'bg-[#C9A96E] text-[#0B0B0A] font-bold shadow-md'
                : 'bg-[#0B0B0A] text-[#FAF8F2] border border-[#C9A96E]/30 hover:border-[#C9A96E]'
            }`}
          >
            All Devotions ({devotionalEntries.length})
          </button>
          <button
            onClick={() => setFilterMode('volume-1')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans-ui transition-all ${
              filterMode === 'volume-1'
                ? 'bg-[#C9A96E] text-[#0B0B0A] font-bold shadow-md'
                : 'bg-[#0B0B0A] text-[#FAF8F2] border border-[#C9A96E]/30 hover:border-[#C9A96E]'
            }`}
          >
            Volume I ({vol1Entries.length})
          </button>
          <button
            onClick={() => setFilterMode('volume-2')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans-ui transition-all ${
              filterMode === 'volume-2'
                ? 'bg-[#C9A96E] text-[#0B0B0A] font-bold shadow-md'
                : 'bg-[#0B0B0A] text-[#FAF8F2] border border-[#C9A96E]/30 hover:border-[#C9A96E]'
            }`}
          >
            Volume II ({vol2Entries.length})
          </button>
          <button
            onClick={() => setFilterMode('notebook')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-sans-ui transition-all flex items-center space-x-1.5 ${
              filterMode === 'notebook'
                ? 'bg-[#C9A96E] text-[#0B0B0A] font-bold shadow-md'
                : 'bg-[#0B0B0A] text-[#FAF8F2] border border-[#C9A96E]/30 hover:border-[#C9A96E]'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Transcriptions ({notebookEntries.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#C9A96E]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verses, titles, or lessons..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0B0A] border-2 border-[#C9A96E]/30 text-xs text-[#FAF8F2] placeholder-[#A8C4B2] focus:outline-none focus:border-[#C9A96E]"
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
            transition={{ delay: Math.min(idx * 0.04, 0.4), duration: 0.4 }}
            onClick={() => onSelectEntry(devotional)}
            className="group relative p-7 rounded-2xl bg-gradient-to-b from-[#181614]/95 to-[#12110F]/95 backdrop-blur-xl border-2 border-[#C9A96E]/30 hover:border-[#C9A96E]/80 shadow-2xl transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Header: Date, Memo Number / Devotion Number, Scripture */}
              <div className="flex items-center justify-between border-b border-[#C9A96E]/20 pb-3">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E] font-bold">
                    {devotional.month.slice(0, 3)} {devotional.day}, {devotional.year}
                  </span>
                  {devotional.devotionNumber && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 font-bold">
                      {devotional.devotionNumber}
                    </span>
                  )}
                  {devotional.memoNumber && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 font-bold">
                      {devotional.memoNumber}
                    </span>
                  )}
                </div>

                {devotional.collection && devotional.collection !== 'Personal Devotions' ? (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#C9A96E]/15 text-[#C9A96E] border border-[#C9A96E]/40 font-medium">
                    {devotional.collection}
                  </span>
                ) : devotional.isTranscribedOriginal ? (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0B0B0A] text-[#FAF8F2] border border-[#C9A96E]/30">
                    Handwritten Page
                  </span>
                ) : (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#C9A96E]/15 text-[#C9A96E] border border-[#C9A96E]/40 font-medium">
                    Devotional Chapter
                  </span>
                )}
              </div>

              {/* Scripture Verse Quote Header */}
              {devotional.scriptureVerseText && (
                <div className="p-3.5 rounded-xl bg-[#0B0B0A]/90 border border-[#C9A96E]/30">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#C9A96E] block mb-1 font-bold">
                    Scripture: {devotional.scriptures.join(', ')}
                  </span>
                  <p className="font-display italic text-sm text-[#FAF8F2] line-clamp-2 leading-relaxed">
                    {devotional.scriptureVerseText}
                  </p>
                </div>
              )}

              {/* Title & Opening Thought */}
              <div>
                <h3 className="text-2xl font-display text-[#FAF8F2] group-hover:text-[#C9A96E] transition-colors leading-snug">
                  {devotional.title}
                </h3>
                {devotional.author && (
                  <p className="text-[11px] font-sans-ui text-[#D4E3DA] mt-0.5">
                    By <span className="text-[#C9A96E] font-medium">{devotional.author}</span>
                  </p>
                )}
                <p className="mt-2 text-xs font-serif-body italic text-[#D4E3DA] line-clamp-2 leading-relaxed">
                  {devotional.excerpt}
                </p>
              </div>
            </div>

            {/* Bottom Actions & Lesson Pill */}
            <div className="pt-4 border-t border-[#C9A96E]/20 space-y-3">
              {devotional.lesson && (
                <p className="text-[11px] font-display text-[#FAF8F2]/90 italic line-clamp-1">
                  <strong className="text-[#C9A96E] not-italic font-sans-ui text-[10px] uppercase mr-1">Lesson:</strong>
                  {devotional.lesson}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-[#C9A96E]">
                <div className="flex gap-1.5 flex-wrap">
                  {devotional.topics.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] text-[#D4E3DA] font-mono bg-white/10 px-1.5 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center space-x-1.5 font-sans-ui uppercase tracking-wider text-[11px] group-hover:translate-x-1 transition-transform shrink-0 font-bold">
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

