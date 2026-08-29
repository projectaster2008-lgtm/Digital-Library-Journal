import React from 'react';
import { motion } from 'motion/react';
import { Clock, Sparkles, Milestone, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { TimelineMilestone, ArchiveEntry } from '../../types';

interface LifeTimelineProps {
  milestones: TimelineMilestone[];
  entries: ArchiveEntry[];
  onSelectEntry: (entry: ArchiveEntry) => void;
}

export const LifeTimeline: React.FC<LifeTimelineProps> = ({
  milestones,
  entries,
  onSelectEntry,
}) => {
  // Group milestones by year
  const groupedMilestones: Record<number, TimelineMilestone[]> = {};
  milestones.forEach((m) => {
    if (!groupedMilestones[m.year]) {
      groupedMilestones[m.year] = [];
    }
    groupedMilestones[m.year].push(m);
  });

  const categoryBadges: Record<string, { label: string; color: string }> = {
    realization: { label: 'Realization', color: 'text-amber-300 bg-amber-950/40 border-amber-800/40' },
    spiritual: { label: 'Spiritual', color: 'text-yellow-400 bg-yellow-950/40 border-yellow-800/40' },
    growth: { label: 'Growth', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40' },
    season: { label: 'Season', color: 'text-stone-300 bg-stone-900/60 border-stone-700/40' },
    milestone: { label: 'Milestone', color: 'text-[#C9A96E] bg-[#141310] border-[#C9A96E]/40' },
  };

  return (
    <div className="space-y-12 pb-24 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-3 pt-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#C9A96E]/20 bg-[#141310]/80 text-[10px] font-sans-ui uppercase tracking-[0.25em] text-[#C9A96E]">
          <Clock className="w-3 h-3" />
          <span>Spatial Journey</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F0E8] font-normal tracking-wide">
          Life Timeline
        </h1>
        <p className="font-display italic text-[#918B80] max-w-xl mx-auto text-base">
          “Key turning points, spiritual awakenings, difficult battles, and quiet growth across the years.”
        </p>
      </header>

      {/* Timeline Path */}
      <div className="relative border-l-2 border-[#C9A96E]/25 ml-4 sm:ml-12 pl-6 sm:pl-10 space-y-16 py-6">
        {Object.entries(groupedMilestones)
          .sort(([y1], [y2]) => Number(y2) - Number(y1))
          .map(([yearStr, yearMilestones]) => (
            <div key={yearStr} className="space-y-8 relative">
              {/* Year Marker Badge on Spine */}
              <div className="flex items-center space-x-3 -ml-12 sm:-ml-16 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#141310] border-2 border-[#C9A96E] flex items-center justify-center font-display font-bold text-sm text-[#C9A96E] shadow-[0_0_15px_rgba(201,169,110,0.3)]">
                  {yearStr.slice(2)}
                </div>
                <span className="font-display text-2xl text-[#F4F0E8] font-light tracking-widest">
                  Anno Domini {yearStr}
                </span>
              </div>

              {/* Milestones inside this year */}
              <div className="space-y-8">
                {yearMilestones.map((m, idx) => {
                  const relatedEntry = entries.find((e) => e.id === m.relatedEntryId);
                  const badge = categoryBadges[m.category] || categoryBadges.milestone;

                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="relative group"
                    >
                      {/* Node Dot on spine */}
                      <div className="absolute -left-[31px] sm:-left-[47px] top-4 w-3.5 h-3.5 rounded-full bg-[#0B0B0A] border-2 border-[#C9A96E] group-hover:bg-[#C9A96E] transition-colors" />

                      {/* Milestone Card */}
                      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#161412] to-[#11100E] border border-[#C9A96E]/15 group-hover:border-[#C9A96E]/50 shadow-xl transition-all space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A96E]">
                            {m.date}
                          </span>
                          <span
                            className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        </div>

                        <h3 className="text-xl font-display text-[#F4F0E8] group-hover:text-[#C9A96E] transition-colors">
                          {m.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-serif-body text-[#E8E1D5]/80 leading-relaxed">
                          {m.description}
                        </p>

                        {m.quote && (
                          <blockquote className="border-l-2 border-[#C9A96E]/40 pl-3 py-1 font-display italic text-xs text-[#C9A96E]/90">
                            “{m.quote}”
                          </blockquote>
                        )}

                        {relatedEntry && (
                          <div className="pt-3 border-t border-[#C9A96E]/10 flex justify-end">
                            <button
                              onClick={() => onSelectEntry(relatedEntry)}
                              className="inline-flex items-center space-x-1.5 text-xs text-[#C9A96E] hover:underline font-sans-ui uppercase tracking-wider"
                            >
                              <span>Read Entry: {relatedEntry.title}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
