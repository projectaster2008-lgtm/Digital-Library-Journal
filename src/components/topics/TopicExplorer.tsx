import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tag, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { Topic, ArchiveEntry } from '../../types';

interface TopicExplorerProps {
  topics: Topic[];
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
  initialSelectedTopic?: string | null;
}

export const TopicExplorer: React.FC<TopicExplorerProps> = ({
  topics,
  entries,
  onSelectEntry,
  initialSelectedTopic,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    initialSelectedTopic || 'waiting'
  );

  const currentTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  // Find entries for this topic
  const matchingEntries = entries.filter((e) =>
    e.topics.some((t) => t.toLowerCase() === currentTopic.id.toLowerCase() || t.toLowerCase() === currentTopic.name.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-24 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-3 pt-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#C9A96E]/20 bg-[#141310]/80 text-[10px] font-sans-ui uppercase tracking-[0.25em] text-[#C9A96E]">
          <Tag className="w-3 h-3" />
          <span>Thematic Archive</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F0E8] font-normal tracking-wide">
          Archive Topics
        </h1>
        <p className="font-display italic text-[#918B80] max-w-xl mx-auto text-base">
          “Follow key themes of faith, waiting, discipline, and grace across different years.”
        </p>
      </header>

      {/* Topics Pill Cloud */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
        {topics.map((topic) => {
          const isSelected = selectedTopicId === topic.id;
          const count = entries.filter((e) =>
            e.topics.some((t) => t.toLowerCase() === topic.id.toLowerCase() || t.toLowerCase() === topic.name.toLowerCase())
          ).length;

          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans-ui transition-all flex items-center space-x-2 uppercase tracking-wider ${
                isSelected
                  ? 'bg-[#C9A96E] text-[#0B0B0A] font-bold shadow-[0_0_15px_rgba(201,169,110,0.3)]'
                  : 'bg-[#141310] text-[#918B80] hover:text-[#F4F0E8] border border-[#C9A96E]/20 hover:border-[#C9A96E]/40'
              }`}
            >
              <span>#{topic.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-[#0B0B0A]/20 text-[#0B0B0A]' : 'bg-[#0B0B0A] text-[#C9A96E]'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Topic Editorial Header & Associated Writings */}
      {currentTopic && (
        <motion.div
          key={currentTopic.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#181613] to-[#12110E] border border-[#C9A96E]/25 shadow-xl text-center space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C9A96E]">
              Thematic Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-[#F4F0E8] uppercase tracking-wider">
              {currentTopic.name}
            </h2>
            <p className="text-sm font-display italic text-[#918B80] max-w-lg mx-auto">
              “{currentTopic.description}”
            </p>
          </div>

          {/* List of Connected Entries */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#C9A96E]/15 pb-2 text-xs font-mono text-[#918B80]">
              <span>{matchingEntries.length} {matchingEntries.length === 1 ? 'writing' : 'writings'} indexed</span>
              <span>Sorted Chronologically</span>
            </div>

            {matchingEntries.length === 0 ? (
              <div className="text-center py-12 text-[#918B80] font-serif-body italic">
                No entries specifically tagged with #{currentTopic.name} yet.
              </div>
            ) : (
              <div className="divide-y divide-[#C9A96E]/10">
                {matchingEntries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    onClick={() => onSelectEntry(entry)}
                    whileHover={{ x: 4 }}
                    className="py-4 px-3 rounded-lg hover:bg-[#141310] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex items-start sm:items-center space-x-4">
                      <span className="font-mono text-xs text-[#C9A96E] w-20 flex-shrink-0">
                        {entry.month.slice(0, 3)} {entry.year}
                      </span>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#0B0B0A] text-[#918B80]">
                            {entry.type}
                          </span>
                          <h3 className="text-base font-display text-[#F4F0E8] group-hover:text-[#C9A96E] transition-colors">
                            {entry.title}
                          </h3>
                        </div>
                        <p className="text-xs font-serif-body italic text-[#918B80] line-clamp-1 mt-0.5">
                          {entry.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-[#918B80] self-end sm:self-center font-sans-ui">
                      {entry.scriptures[0] && (
                        <span className="italic text-[#C9A96E]/70 font-serif-body hidden sm:inline">
                          {entry.scriptures[0]}
                        </span>
                      )}
                      <ArrowRight className="w-3.5 h-3.5 text-[#918B80] group-hover:text-[#C9A96E] group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
