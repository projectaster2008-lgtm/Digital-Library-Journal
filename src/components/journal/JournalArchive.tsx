import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Tag, Search, ArrowRight, Filter, Bookmark, Heart, Sparkles } from 'lucide-react';
import { ArchiveEntry, MoodType } from '../../types';
import { RelationshipJournalView } from './RelationshipJournalView';

interface JournalArchiveProps {
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
  defaultSubSection?: 'general' | 'relationship';
}

export const JournalArchive: React.FC<JournalArchiveProps> = ({
  entries,
  onSelectEntry,
  defaultSubSection = 'general',
}) => {
  const [activeSubSection, setActiveSubSection] = useState<'general' | 'relationship'>(defaultSubSection);
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedMood, setSelectedMood] = useState<MoodType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const relationshipMasterEntry = entries.find((e) => e.id === 'chronicle-of-grace-and-loyalty');

  const years = Array.from(new Set(entries.map((e) => e.year))).sort((a, b) => b - a);
  const moods: MoodType[] = ['Peaceful', 'Difficult', 'Hopeful', 'Uncertain', 'Grateful', 'Contemplative', 'Vulnerable'];

  const filteredEntries = entries.filter((entry) => {
    if (selectedYear !== 'all' && entry.year !== selectedYear) return false;
    if (selectedMood !== 'all' && entry.mood !== selectedMood) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = entry.title.toLowerCase().includes(q);
      const matchContent = entry.content.toLowerCase().includes(q);
      const matchTopics = entry.topics.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchContent && !matchTopics) return false;
    }
    return true;
  });

  // Group entries by year and month
  const groupedEntries: Record<number, Record<string, ArchiveEntry[]>> = {};
  filteredEntries.forEach((entry) => {
    if (!groupedEntries[entry.year]) {
      groupedEntries[entry.year] = {};
    }
    if (!groupedEntries[entry.year][entry.month]) {
      groupedEntries[entry.year][entry.month] = [];
    }
    groupedEntries[entry.year][entry.month].push(entry);
  });

  return (
    <div className="space-y-10 pb-24 max-w-5xl mx-auto">
      {/* ─── Sub-Section Selector Bar ─── */}
      <div className="p-2 sm:p-2.5 rounded-2xl bg-white border-2 border-[#2A3F35]/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveSubSection('general')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
              activeSubSection === 'general'
                ? 'bg-[#2A3F35] text-white border-[#2A3F35] font-bold shadow-sm'
                : 'bg-[#FAF8F2] text-[#2A3C30] border-[#78966A]/30 hover:bg-[#F3EEDC]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Personal & General Journal ({entries.length})</span>
          </button>

          <button
            onClick={() => setActiveSubSection('relationship')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center justify-center space-x-2 cursor-pointer border ${
              activeSubSection === 'relationship'
                ? 'bg-[#8F5A0E] text-white border-[#8F5A0E] font-bold shadow-sm'
                : 'bg-[#FAF6E8] text-[#8F5A0E] border-[#E5B26E]/50 hover:bg-[#F7EED3]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#E5B26E] fill-[#E5B26E]/30" />
            <span className="font-semibold">Relationship Journal & Radial Network</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/30 font-bold ml-1">
              Visual Map
            </span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-[#6A7B6D] hidden md:block px-2">
          {activeSubSection === 'general'
            ? 'Chronological Index · Personal Reflections & Daily Records'
            : 'The Chronicle of Grace & Loyalty · Radial Connections & Chapter Logs'}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSubSection === 'relationship' ? (
          <motion.div
            key="relationship-journal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <RelationshipJournalView
              onSelectEntry={onSelectEntry}
              masterEntry={relationshipMasterEntry}
            />
          </motion.div>
        ) : (
          <motion.div
            key="general-journal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-10"
          >
            {/* Header */}
            <header className="text-center space-y-3 pt-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border-2 border-[#78966A]/30 bg-white text-[11px] font-mono uppercase tracking-[0.2em] text-[#2A3F35] font-bold">
                <BookOpen className="w-3.5 h-3.5 text-[#8F5A0E]" />
                <span>Chronological Index</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl text-[#14241B] font-bold tracking-tight">
                The Journal
              </h1>
              <p className="font-serif-body italic text-[#4E6253] max-w-xl mx-auto text-sm sm:text-base">
                “Writings organized by seasons, months, and days. A record of thought through time.”
              </p>
            </header>

            {/* Relationship Journal Feature Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#1B2E24] to-[#254233] text-white border-2 border-[#D4A359]/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F2]/15 text-[#E5B26E] text-[10px] font-mono uppercase tracking-wider font-bold">
                    Featured Sub-Section
                  </span>
                  <span className="text-xs font-mono text-[#D8CFBC]">May 30 – July 2026</span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#FAF8F2]">
                  The Chronicle of Grace & Loyalty
                </h3>
                <p className="text-xs font-serif-body text-[#D8CFBC] leading-relaxed">
                  A Word-by-Word Relationship Journal & Spiritual Dialogue Archive. Capturing mountain reunions at Pangilatan, practical dreams, the &apos;Treasure & Keys&apos; metaphor, and the Bisayan bedrock of Nag-unongay.
                </p>
              </div>

              <button
                onClick={() => setActiveSubSection('relationship')}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-[#D4A359] hover:bg-[#C29147] text-[#14241B] text-xs font-mono font-bold transition-all shadow-md flex items-center space-x-2 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-[#14241B]" />
                <span>Explore Relationship Journal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Filter & Year Toolbar */}
            <div className="p-5 rounded-2xl bg-white border-2 border-[#2A3F35]/30 shadow-md space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Year Buttons */}
                <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                  <button
                    onClick={() => setSelectedYear('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                      selectedYear === 'all'
                        ? 'bg-[#2A3F35] text-white border-[#2A3F35] font-bold shadow-xs'
                        : 'bg-[#FAF8F2] text-[#2A3C30] border-[#78966A]/30 hover:bg-[#F3EEDC]'
                    }`}
                  >
                    All Years ({entries.length})
                  </button>
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => setSelectedYear(y)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                        selectedYear === y
                          ? 'bg-[#2A3F35] text-white border-[#2A3F35] font-bold shadow-xs'
                          : 'bg-[#FAF8F2] text-[#2A3C30] border-[#78966A]/30 hover:bg-[#F3EEDC]'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>

                {/* Search bar inside Journal */}
                <div className="relative w-full md:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#6A7B6D]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chronicles..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF8F2] border-2 border-[#78966A]/30 text-xs text-[#14241B] placeholder-[#6A7B6D] focus:outline-none focus:border-[#2A3F35]"
                  />
                </div>
              </div>

              {/* Mood filter chips */}
              <div className="flex items-center space-x-2 overflow-x-auto pt-2 border-t border-[#78966A]/15">
                <span className="text-[10px] uppercase font-mono text-[#6A7B6D] flex items-center space-x-1 flex-shrink-0 font-bold">
                  <Filter className="w-3 h-3 text-[#8F5A0E]" />
                  <span>Mood:</span>
                </span>
                <button
                  onClick={() => setSelectedMood('all')}
                  className={`px-2 py-1 rounded-md text-[11px] font-mono ${
                    selectedMood === 'all'
                      ? 'text-[#8F5A0E] font-bold underline'
                      : 'text-[#6A7B6D] hover:text-[#14241B]'
                  }`}
                >
                  All
                </button>
                {moods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMood(m)}
                    className={`px-2 py-1 rounded-md text-[11px] font-mono ${
                      selectedMood === m
                        ? 'text-[#8F5A0E] font-bold underline'
                        : 'text-[#6A7B6D] hover:text-[#14241B]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Chronological Table of Entries */}
            {Object.keys(groupedEntries).length === 0 ? (
              <div className="text-center py-16 text-[#6A7B6D] font-display italic text-lg bg-white rounded-3xl border-2 border-[#2A3F35]/20">
                No entries found matching this filter in the archive.
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(groupedEntries)
                  .sort(([y1], [y2]) => Number(y2) - Number(y1))
                  .map(([yearStr, monthsObj]) => (
                    <section key={yearStr} className="space-y-6">
                      {/* Year Header */}
                      <div className="flex items-center space-x-4 border-b-2 border-[#2A3F35]/25 pb-3">
                        <h2 className="text-2xl sm:text-3xl font-display text-[#14241B] font-bold tracking-tight">
                          {yearStr}
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-[#2A3F35]/30 to-transparent" />
                        <span className="text-xs font-mono text-[#6A7B6D]">
                          {Object.values(monthsObj).flat().length} writings
                        </span>
                      </div>

                      {/* Months Breakdown */}
                      {Object.entries(monthsObj).map(([monthName, monthEntries]) => (
                        <div key={monthName} className="space-y-4 pl-2 sm:pl-6">
                          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#2A3F35] font-bold flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-[#8F5A0E]" />
                            <span>{monthName}</span>
                          </h3>

                          {/* Day by Day Entries List */}
                          <div className="divide-y divide-[#78966A]/20 border-l-2 border-[#2A3F35]/20 ml-1 pl-4 sm:pl-6 space-y-1">
                            {monthEntries
                              .sort((a, b) => b.day - a.day)
                              .map((entry) => (
                                <motion.div
                                  key={entry.id}
                                  onClick={() => onSelectEntry(entry)}
                                  whileHover={{ x: 4 }}
                                  className="py-3.5 px-3 rounded-xl bg-white hover:bg-[#FAF8F2] border border-[#78966A]/15 hover:border-[#2A3F35]/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 group shadow-2xs mb-2"
                                >
                                  <div className="flex items-start sm:items-center space-x-4">
                                    <span className="font-mono text-xs font-bold text-[#8F5A0E] w-7 flex-shrink-0 pt-0.5 sm:pt-0">
                                      {entry.day < 10 ? `0${entry.day}` : entry.day}
                                    </span>

                                    <div>
                                      <div className="flex flex-wrap items-center gap-1.5">
                                        <h4 className="text-sm sm:text-base font-display font-bold text-[#14241B] group-hover:text-[#8F5A0E] transition-colors">
                                          {entry.title}
                                        </h4>
                                        {entry.collection === 'Relationship Journal' && (
                                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FAF6E8] text-[#8F5A0E] border border-[#E5B26E]/50 uppercase font-bold flex items-center space-x-1">
                                            <Heart className="w-2.5 h-2.5 fill-[#8F5A0E]" />
                                            <span>Relationship</span>
                                          </span>
                                        )}
                                        {entry.isTranscribedOriginal && (
                                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FAF8F2] text-[#2A3F35] border border-[#78966A]/30 uppercase font-bold">
                                            Original
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs font-serif-body italic text-[#4E6253] line-clamp-1 mt-0.5">
                                        {entry.excerpt}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-3 text-xs text-[#6A7B6D] self-end sm:self-center font-mono">
                                    {entry.scriptures[0] && (
                                      <span className="italic text-[#8F5A0E] font-serif-body hidden md:inline">
                                        {entry.scriptures[0]}
                                      </span>
                                    )}
                                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FAF8F2] border border-[#78966A]/20 text-[#2A3C30]">
                                      {entry.mood}
                                    </span>
                                    <ArrowRight className="w-3.5 h-3.5 text-[#6A7B6D] group-hover:text-[#8F5A0E] transition-colors" />
                                  </div>
                                </motion.div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </section>
                  ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

