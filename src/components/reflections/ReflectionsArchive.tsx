import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, FileText, ArrowRight, Search, Heart } from 'lucide-react';
import { ArchiveEntry, EntryType } from '../../types';

interface ReflectionsArchiveProps {
  entries: ArchiveEntry[];
  type: 'reflection' | 'letter';
  onSelectEntry: (entry: ArchiveEntry) => void;
}

export const ReflectionsArchive: React.FC<ReflectionsArchiveProps> = ({
  entries,
  type,
  onSelectEntry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const targetEntries = entries.filter((e) => e.type === type);

  const filtered = targetEntries.filter((e) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return e.title.toLowerCase().includes(q) || e.content.toLowerCase().includes(q) || e.topics.some((t) => t.toLowerCase().includes(q));
  });

  const isLetter = type === 'letter';

  return (
    <div className="space-y-12 pb-24 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-3 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#C9A96E]/20 bg-[#141310]/80 text-[10px] font-sans-ui uppercase tracking-[0.25em] text-[#C9A96E]">
          {isLetter ? <FileText className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
          <span>{isLetter ? 'Epistolary Archives' : 'Introspective Sanctuary'}</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F0E8] font-normal tracking-wide">
          {isLetter ? 'Letters & Notes' : 'Reflections'}
        </h1>
        <p className="font-display italic text-[#918B80] max-w-xl mx-auto text-base">
          {isLetter
            ? '“Letters written to future selves, quiet letters of gratitude, and personal memos.”'
            : '“In-depth philosophical inquiries, surrender, and lessons learned through stillness.”'}
        </p>
      </header>

      {/* Search Toolbar */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#918B80]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${isLetter ? 'letters' : 'reflections'}...`}
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#141310] border border-[#C9A96E]/20 text-xs text-[#E8E1D5] focus:outline-none focus:border-[#C9A96E]"
        />
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((entry, idx) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06, duration: 0.4 }}
            onClick={() => onSelectEntry(entry)}
            className="group p-7 rounded-2xl bg-gradient-to-b from-[#161412] to-[#11100E] border border-[#C9A96E]/20 hover:border-[#C9A96E]/60 shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#C9A96E]/15 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                  {entry.month} {entry.day}, {entry.year}
                </span>
                <span className="text-xs font-mono text-[#918B80]">
                  {entry.readingTimeMinutes} min read
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-display text-[#F4F0E8] group-hover:text-[#C9A96E] transition-colors leading-snug">
                  {entry.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm font-serif-body text-[#E8E1D5]/80 line-clamp-3 leading-relaxed">
                  {entry.excerpt}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#C9A96E]/15 flex items-center justify-between text-xs text-[#C9A96E]">
              <div className="flex gap-1.5">
                {entry.topics.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] text-[#918B80] font-mono uppercase">
                    #{t}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center space-x-1.5 font-sans-ui uppercase tracking-wider text-[11px] group-hover:translate-x-1 transition-transform">
                <span>Read Full {isLetter ? 'Letter' : 'Reflection'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
