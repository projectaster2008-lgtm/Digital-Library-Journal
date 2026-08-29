import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Calendar, Tag, Search, ArrowRight, Filter, Bookmark } from 'lucide-react';
import { ArchiveEntry, MoodType } from '../../types';

interface JournalArchiveProps {
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
}

export const JournalArchive: React.FC<JournalArchiveProps> = ({
  entries,
  onSelectEntry,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedMood, setSelectedMood] = useState<MoodType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="space-y-12 pb-24 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-3 pt-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#C9A96E]/20 bg-[#141310]/80 text-[10px] font-sans-ui uppercase tracking-[0.25em] text-[#C9A96E]">
          <BookOpen className="w-3 h-3" />
          <span>Chronological Index</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F0E8] font-normal tracking-wide">
          The Journal
        </h1>
        <p className="font-display italic text-[#918B80] max-w-xl mx-auto text-base">
          “Writings organized by seasons, months, and days. A record of thought through time.”
        </p>
      </header>

      {/* Filter & Year Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 backdrop-blur-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Year Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedYear === 'all'
                  ? 'bg-[#C9A96E] text-[#0B0B0A] font-bold'
                  : 'bg-[#0B0B0A] text-[#918B80] hover:text-[#E8E1D5] border border-[#C9A96E]/15'
              }`}
            >
              All Years ({entries.length})
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedYear === y
                    ? 'bg-[#C9A96E] text-[#0B0B0A] font-bold'
                    : 'bg-[#0B0B0A] text-[#918B80] hover:text-[#E8E1D5] border border-[#C9A96E]/15'
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {/* Search bar inside Journal */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#918B80]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chronicles..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0B0A] border border-[#C9A96E]/20 text-xs text-[#E8E1D5] focus:outline-none focus:border-[#C9A96E]"
            />
          </div>
        </div>

        {/* Mood filter chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-2 border-t border-[#C9A96E]/10">
          <span className="text-[10px] uppercase font-mono text-[#918B80] flex items-center space-x-1 flex-shrink-0">
            <Filter className="w-3 h-3 text-[#C9A96E]" />
            <span>Mood:</span>
          </span>
          <button
            onClick={() => setSelectedMood('all')}
            className={`px-2 py-1 rounded text-[11px] font-sans-ui ${
              selectedMood === 'all' ? 'text-[#C9A96E] underline' : 'text-[#918B80] hover:text-[#E8E1D5]'
            }`}
          >
            All
          </button>
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMood(m)}
              className={`px-2 py-1 rounded text-[11px] font-sans-ui ${
                selectedMood === m ? 'text-[#C9A96E] font-medium underline' : 'text-[#918B80] hover:text-[#E8E1D5]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Chronological Table of Entries */}
      {Object.keys(groupedEntries).length === 0 ? (
        <div className="text-center py-16 text-[#918B80] font-display italic text-lg">
          No entries found matching this filter in the archive.
        </div>
      ) : (
        <div className="space-y-16">
          {Object.entries(groupedEntries)
            .sort(([y1], [y2]) => Number(y2) - Number(y1))
            .map(([yearStr, monthsObj]) => (
              <section key={yearStr} className="space-y-8">
                {/* Year Header */}
                <div className="flex items-center space-x-4 border-b border-[#C9A96E]/25 pb-3">
                  <h2 className="text-3xl font-display text-[#C9A96E] font-light tracking-widest">
                    {yearStr}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#C9A96E]/30 to-transparent" />
                  <span className="text-xs font-mono text-[#918B80]">
                    {Object.values(monthsObj).flat().length} writings
                  </span>
                </div>

                {/* Months Breakdown */}
                {Object.entries(monthsObj).map(([monthName, monthEntries]) => (
                  <div key={monthName} className="space-y-4 pl-2 sm:pl-6">
                    <h3 className="text-sm font-sans-ui uppercase tracking-[0.2em] text-[#E8E1D5]/80 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                      <span>{monthName}</span>
                    </h3>

                    {/* Minimalist Day by Day Entries List */}
                    <div className="divide-y divide-[#C9A96E]/10 border-l border-[#C9A96E]/15 ml-1 pl-4 sm:pl-6 space-y-1">
                      {monthEntries
                        .sort((a, b) => b.day - a.day)
                        .map((entry) => (
                          <motion.div
                            key={entry.id}
                            onClick={() => onSelectEntry(entry)}
                            whileHover={{ x: 4 }}
                            className="py-3.5 px-3 rounded-lg hover:bg-[#141310] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
                          >
                            <div className="flex items-start sm:items-center space-x-4">
                              <span className="font-mono text-xs text-[#C9A96E] w-7 flex-shrink-0 pt-0.5 sm:pt-0">
                                {entry.day < 10 ? `0${entry.day}` : entry.day}
                              </span>

                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="text-base font-display text-[#F4F0E8] group-hover:text-[#C9A96E] transition-colors">
                                    {entry.title}
                                  </h4>
                                  {entry.isTranscribedOriginal && (
                                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C9A96E]/15 text-[#C9A96E] border border-[#C9A96E]/30 uppercase">
                                      Original
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs font-serif-body italic text-[#918B80] line-clamp-1 mt-0.5">
                                  {entry.excerpt}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 text-xs text-[#918B80] self-end sm:self-center font-sans-ui">
                              {entry.scriptures[0] && (
                                <span className="italic text-[#C9A96E]/70 font-serif-body hidden md:inline">
                                  {entry.scriptures[0]}
                                </span>
                              )}
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0B0B0A] border border-[#C9A96E]/10">
                                {entry.mood}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#918B80] group-hover:text-[#C9A96E] transition-colors" />
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
    </div>
  );
};
