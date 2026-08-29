import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Feather, BookOpen, Compass, ShieldCheck, Heart } from 'lucide-react';

export const AboutArchive: React.FC = () => {
  return (
    <div className="space-y-16 pb-24 max-w-3xl mx-auto pt-6">
      {/* Header */}
      <header className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#C9A96E]/20 bg-[#141310]/80 text-[10px] font-sans-ui uppercase tracking-[0.25em] text-[#C9A96E]">
          <Feather className="w-3 h-3" />
          <span>The Manifesto</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F4F0E8] font-normal tracking-wide">
          Why I Write
        </h1>
        <p className="font-display italic text-[#C9A96E] text-lg sm:text-xl">
          “A record of thought, discipleship, and becoming.”
        </p>
      </header>

      {/* Literary Essay Canvas */}
      <motion.article
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#181613] to-[#12110E] border border-[#C9A96E]/25 shadow-2xl space-y-8 font-serif-body text-lg sm:text-xl leading-[1.9] text-[#E8E1D5]/90 font-light"
      >
        <p className="first-letter:text-5xl first-letter:font-display first-letter:font-normal first-letter:mr-3 first-letter:float-left first-letter:text-[#C9A96E]">
          I don't write because I have everything figured out.
        </p>

        <p>
          I write because the world is loud, and I need a sanctuary where things are quiet enough to make sense. 
          When thoughts remain unwritten, they collide and tangle. But when they are inked onto paper, or shaped 
          into honest devotionals, they reveal what God has been whispering all along.
        </p>

        <blockquote className="my-8 p-6 rounded-2xl border-l-2 border-[#C9A96E] bg-[#0B0B0A]/60 font-display italic text-xl sm:text-2xl text-[#F4F0E8] leading-relaxed">
          “This archive is not a showcase. It is a slow, quiet testament to seasons of silence, spiritual battles, mountain hikes, and grace.”
        </blockquote>

        <p>
          Within these rooms, you will find handwritten notebook transcriptions, unpolished journal chronicles from 
          difficult mornings, prayers composed in trembling faith, and reflections on scriptures that anchored me 
          when everything else was shaking.
        </p>

        <p>
          If you are wandering through these entries, my hope is not that you admire the writing, but that you find 
          permission to slow down, to breathe, and to remember that your own story is still being written by a faithful Author.
        </p>

        <div className="pt-8 border-t border-[#C9A96E]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#918B80]">
          <div>
            <span className="text-[#C9A96E]">Written in the Sanctuary</span>
            <span> · Anno Domini 2026</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Solemnly Dedicated to Christ</span>
          </div>
        </div>
      </motion.article>

      {/* 3 Core Pillars of the Archive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 space-y-2">
          <span className="text-xs font-mono text-[#C9A96E] uppercase tracking-widest block">01 / Quietness</span>
          <h3 className="text-lg font-display text-[#F4F0E8]">Unhurried Space</h3>
          <p className="text-xs font-serif-body text-[#918B80] leading-relaxed">
            No algorithms, no likes, no metric vanity. Just pure typography and contemplative silence.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 space-y-2">
          <span className="text-xs font-mono text-[#C9A96E] uppercase tracking-widest block">02 / Sacredness</span>
          <h3 className="text-lg font-display text-[#F4F0E8]">Grounded in the Word</h3>
          <p className="text-xs font-serif-body text-[#918B80] leading-relaxed">
            Every struggle and realization is anchored back into timeless Biblical truth and prayer.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#141310]/80 border border-[#C9A96E]/15 space-y-2">
          <span className="text-xs font-mono text-[#C9A96E] uppercase tracking-widest block">03 / Honesty</span>
          <h3 className="text-lg font-display text-[#F4F0E8]">Vulnerable Record</h3>
          <p className="text-xs font-serif-body text-[#918B80] leading-relaxed">
            Recording not only the answers, but the questions, the doubts, and the waiting.
          </p>
        </div>
      </div>
    </div>
  );
};
