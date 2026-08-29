import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Sparkles, CheckCircle2, HelpCircle, Flame, ShieldAlert, Award } from 'lucide-react';
import { YearlyReview } from '../../types';
import { archiveYearlyReviews } from '../../data/yearlyReviews';

export const YearlyChapters: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const review = archiveYearlyReviews.find((r) => r.year === selectedYear) || archiveYearlyReviews[0];

  return (
    <div className="space-y-12 pb-24 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-3 pt-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#C9A96E]/20 bg-[#141310]/80 text-[10px] font-sans-ui uppercase tracking-[0.25em] text-[#C9A96E]">
          <Calendar className="w-3 h-3" />
          <span>Annual Retrospectives</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[#F4F0E8] font-normal tracking-wide">
          Yearly Chapters
        </h1>
        <p className="font-display italic text-[#918B80] max-w-xl mx-auto text-base">
          “End-of-year spiritual summaries, answered prayers, lessons forged in trials, and reflections.”
        </p>
      </header>

      {/* Year Switcher */}
      <div className="flex justify-center space-x-3">
        {archiveYearlyReviews.map((r) => (
          <button
            key={r.year}
            onClick={() => setSelectedYear(r.year)}
            className={`px-5 py-2 rounded-full text-xs font-mono transition-all ${
              selectedYear === r.year
                ? 'bg-[#C9A96E] text-[#0B0B0A] font-bold shadow-lg scale-105'
                : 'bg-[#141310] text-[#918B80] hover:text-[#F4F0E8] border border-[#C9A96E]/20'
            }`}
          >
            {r.year} · {r.themeTitle}
          </button>
        ))}
      </div>

      {review && (
        <motion.div
          key={review.year}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {/* Top Banner Metric Summary */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#181613] to-[#12110E] border border-[#C9A96E]/25 shadow-2xl text-center space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C9A96E]">
              Anno Domini {review.year}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-[#F4F0E8] font-normal">
              {review.themeTitle}
            </h2>
            <div className="flex justify-center">
              <div className="w-16 h-px bg-[#C9A96E]/40" />
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-2">
              <div className="p-3 rounded-xl bg-[#0B0B0A]/70 border border-[#C9A96E]/10">
                <span className="block text-xl font-display text-[#C9A96E]">{review.totalWritings}</span>
                <span className="text-[9px] uppercase font-mono text-[#918B80]">Writings</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B0B0A]/70 border border-[#C9A96E]/10">
                <span className="block text-sm font-display text-[#F4F0E8] font-medium pt-1 line-clamp-1">{review.mostWrittenTopic}</span>
                <span className="text-[9px] uppercase font-mono text-[#918B80]">Top Topic</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B0B0A]/70 border border-[#C9A96E]/10">
                <span className="block text-xs font-serif-body text-[#F4F0E8] font-medium pt-1 line-clamp-1">{review.mostReferencedScripture}</span>
                <span className="text-[9px] uppercase font-mono text-[#918B80]">Top Scripture</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B0B0A]/70 border border-[#C9A96E]/10">
                <span className="block text-base font-display text-[#C9A96E] pt-0.5">{review.mostActiveMonth}</span>
                <span className="text-[9px] uppercase font-mono text-[#918B80]">Active Month</span>
              </div>
            </div>
          </div>

          {/* 4 Thematic Pillars: Learned, Struggled, Prayers Answered, Still Questioning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Things I Learned */}
            <div className="p-6 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C9A96E]">
                <Award className="w-4 h-4" />
                <span>Things I Learned</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm font-serif-body text-[#E8E1D5]/90">
                {review.lessonsLearned.map((l, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <span className="text-[#C9A96E] font-mono text-xs mt-0.5">0{i + 1}.</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Things I Struggled With */}
            <div className="p-6 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-300">
                <ShieldAlert className="w-4 h-4" />
                <span>Things I Struggled With</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm font-serif-body text-[#E8E1D5]/90">
                {review.strugglesFaced.map((s, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <span className="text-amber-400 font-mono text-xs mt-0.5">0{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prayers Answered */}
            <div className="p-6 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Prayers Answered</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm font-serif-body text-[#E8E1D5]/90">
                {review.prayersAnswered.map((p, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <span className="text-emerald-400 font-mono text-xs mt-0.5">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Things I Still Don't Understand */}
            <div className="p-6 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#918B80]">
                <HelpCircle className="w-4 h-4" />
                <span>Questions Still Carried</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm font-serif-body text-[#E8E1D5]/90">
                {review.thingsStillQuestioning.map((q, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <span className="text-[#918B80] font-mono text-xs mt-0.5">?</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Personal Yearly Reflection Essay */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#181613] to-[#12110E] border border-[#C9A96E]/20 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C9A96E] block">
              Personal End of Year Reflection
            </span>
            <p className="font-serif-body text-base sm:text-lg leading-relaxed text-[#E8E1D5]/90 whitespace-pre-line italic">
              {review.personalReflection}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
