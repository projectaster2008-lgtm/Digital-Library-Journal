import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scroll, BookOpen, ArrowRight, Sparkles, Search } from 'lucide-react';
import { ScriptureRecord, ArchiveEntry } from '../../types';

interface ScriptureExplorerProps {
  scriptures: ScriptureRecord[];
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
  initialSelectedReference?: string | null;
}

export const ScriptureExplorer: React.FC<ScriptureExplorerProps> = ({
  scriptures,
  entries,
  onSelectEntry,
  initialSelectedReference,
}) => {
  const [selectedRef, setSelectedRef] = useState<string>(
    initialSelectedReference || scriptures[0]?.reference || 'Romans 10:9'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const currentScripture = scriptures.find((s) => s.reference === selectedRef) || scriptures[0];

  // Find all entries that mention this scripture
  const connectedEntries = entries.filter((e) =>
    e.scriptures.some((s) => s.toLowerCase().includes(currentScripture?.reference.toLowerCase() || ''))
  );

  const filteredScriptures = scriptures.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.reference.toLowerCase().includes(q) || s.text.toLowerCase().includes(q) || s.theme.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-12 pb-24 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-3 pt-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#C9A96E]/20 bg-[#141310]/80 text-[10px] font-sans-ui uppercase tracking-[0.25em] text-[#C9A96E]">
          <Scroll className="w-3 h-3" />
          <span>Scripture Connection System</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F0E8] font-normal tracking-wide">
          The Living Word Index
        </h1>
        <p className="font-display italic text-[#918B80] max-w-xl mx-auto text-base">
          “Explore how eternal verses anchor and interconnect across your journal entries and devotionals.”
        </p>
      </header>

      {/* Main Grid: Left Scripture Selector & Right Connected Writings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Scripture Reference List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-[#141310]/80 border border-[#C9A96E]/15 space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#918B80]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reference or book..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B0B0A] border border-[#C9A96E]/20 text-xs text-[#E8E1D5] focus:outline-none focus:border-[#C9A96E]"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {filteredScriptures.map((s) => {
              const isSelected = selectedRef === s.reference;
              const matchesCount = entries.filter((e) =>
                e.scriptures.some((ref) => ref.toLowerCase().includes(s.reference.toLowerCase()))
              ).length;

              return (
                <button
                  key={s.reference}
                  onClick={() => setSelectedRef(s.reference)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between space-y-1.5 ${
                    isSelected
                      ? 'bg-[#1C1914] border-[#C9A96E] shadow-lg text-[#F4F0E8]'
                      : 'bg-[#141310]/60 border-[#C9A96E]/10 hover:border-[#C9A96E]/30 text-[#918B80] hover:text-[#E8E1D5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-medium text-base text-[#F4F0E8]">
                      {s.reference}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0B0A] text-[#C9A96E] border border-[#C9A96E]/20">
                      {matchesCount} {matchesCount === 1 ? 'writing' : 'writings'}
                    </span>
                  </div>
                  <p className="text-xs font-serif-body italic text-[#918B80] line-clamp-1">
                    “{s.text}”
                  </p>
                  <span className="text-[10px] text-[#918B80]/70 uppercase tracking-wider font-mono">
                    {s.theme}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Scripture Showcase & Linked Writings (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {currentScripture && (
            <motion.div
              key={currentScripture.reference}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-8 rounded-2xl bg-gradient-to-b from-[#181613] to-[#12110E] border border-[#C9A96E]/30 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#C9A96E]/15 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                  Holy Scripture · {currentScripture.book}
                </span>
                <span className="text-xs text-[#918B80] font-sans-ui">{currentScripture.theme}</span>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C9A96E]">
                  {currentScripture.reference}
                </span>
                <blockquote className="mt-3 font-display italic text-xl sm:text-2xl text-[#F4F0E8] leading-relaxed">
                  “{currentScripture.text}”
                </blockquote>
              </div>

              {/* Connected Writings Section */}
              <div className="pt-6 border-t border-[#C9A96E]/15 space-y-4">
                <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans-ui text-[#C9A96E]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Entries Connected to this Scripture ({connectedEntries.length})</span>
                </div>

                {connectedEntries.length === 0 ? (
                  <p className="text-xs font-serif-body italic text-[#918B80]">
                    No journal entries currently reference this verse.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {connectedEntries.map((entry) => (
                      <div
                        key={entry.id}
                        onClick={() => onSelectEntry(entry)}
                        className="group p-4 rounded-xl bg-[#0B0B0A]/80 border border-[#C9A96E]/15 hover:border-[#C9A96E]/50 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center space-x-2 text-[10px] font-mono text-[#918B80]">
                            <span className="uppercase">{entry.type}</span>
                            <span>·</span>
                            <span>{entry.month.slice(0, 3)} {entry.day}, {entry.year}</span>
                          </div>
                          <h4 className="text-base font-display text-[#F4F0E8] group-hover:text-[#C9A96E] transition-colors mt-0.5">
                            {entry.title}
                          </h4>
                          <p className="text-xs font-serif-body italic text-[#918B80] line-clamp-1 mt-0.5">
                            {entry.excerpt}
                          </p>
                        </div>

                        <ArrowRight className="w-4 h-4 text-[#918B80] group-hover:text-[#C9A96E] group-hover:translate-x-1 transition-all ml-4 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
