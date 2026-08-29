import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Bookmark, Sparkles, FileText, ArrowRight, Tag, Scroll } from 'lucide-react';
import { ArchiveEntry } from '../../types';

interface ArchiveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
}

export const ArchiveSearchModal: React.FC<ArchiveSearchModalProps> = ({
  isOpen,
  onClose,
  entries,
  onSelectEntry,
}) => {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'journal' | 'devotional' | 'reflection' | 'letter'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = entries.filter((e) => {
    if (typeFilter !== 'all' && e.type !== typeFilter) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const matchTitle = e.title.toLowerCase().includes(q);
    const matchContent = e.content.toLowerCase().includes(q);
    const matchScripture = e.scriptures.some((s) => s.toLowerCase().includes(q));
    const matchTopics = e.topics.some((t) => t.toLowerCase().includes(q));
    const matchVerse = (e.scriptureVerseText || '').toLowerCase().includes(q);
    return matchTitle || matchContent || matchScripture || matchTopics || matchVerse;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#0B0B0A]/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl rounded-2xl bg-[#141310] border border-[#C9A96E]/30 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Top Search Input */}
          <div className="p-4 border-b border-[#C9A96E]/15 flex items-center space-x-3">
            <Search className="w-5 h-5 text-[#C9A96E]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, passage, topics (e.g., 'waiting', 'Romans 10:9', 'faith')..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[#F4F0E8] placeholder-[#918B80] focus:outline-none font-serif-body"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#918B80] hover:text-[#F4F0E8] hover:bg-[#1C1A17]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Type Filter Pills */}
          <div className="px-4 py-2.5 bg-[#0B0B0A]/60 border-b border-[#C9A96E]/10 flex items-center space-x-2 overflow-x-auto text-xs">
            <span className="text-[10px] uppercase font-mono text-[#918B80] mr-1">Filter:</span>
            {(['all', 'journal', 'devotional', 'reflection', 'letter'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1 rounded-full capitalize text-[11px] transition-colors ${
                  typeFilter === t
                    ? 'bg-[#C9A96E] text-[#0B0B0A] font-bold'
                    : 'text-[#918B80] hover:text-[#E8E1D5]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#C9A96E]/10 space-y-1">
            <div className="text-[10px] font-mono text-[#918B80] uppercase tracking-widest pb-2">
              {results.length} {results.length === 1 ? 'Result' : 'Results'} Found
            </div>

            {results.length === 0 ? (
              <div className="py-12 text-center text-sm font-serif-body italic text-[#918B80]">
                No writings in the archive matched “{query}”.
              </div>
            ) : (
              results.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => {
                    onSelectEntry(entry);
                    onClose();
                  }}
                  className="group py-3 px-2 rounded-lg hover:bg-[#1C1A17] transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-[#918B80]">
                      <span className="uppercase text-[#C9A96E] font-medium">{entry.type}</span>
                      <span>·</span>
                      <span>
                        {entry.month.slice(0, 3)} {entry.day}, {entry.year}
                      </span>
                      {entry.scriptures[0] && (
                        <>
                          <span>·</span>
                          <span className="italic text-[#C9A96E]/80">{entry.scriptures[0]}</span>
                        </>
                      )}
                    </div>
                    <h4 className="text-sm font-display text-[#F4F0E8] group-hover:text-[#C9A96E] transition-colors">
                      {entry.title}
                    </h4>
                    <p className="text-xs font-serif-body text-[#918B80] line-clamp-1">
                      {entry.excerpt}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#918B80] group-hover:text-[#C9A96E] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
