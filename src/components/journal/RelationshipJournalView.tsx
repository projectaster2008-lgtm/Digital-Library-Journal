import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  BookOpen,
  Calendar,
  MessageCircle,
  Key,
  Shield,
  Sparkles,
  Quote,
  Layers,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  Lock,
  Compass,
} from 'lucide-react';
import { relationshipJournalData, RelationshipChapter } from '../../data/relationshipJournalData';
import { ArchiveEntry } from '../../types';
import { RelationshipRadialNetwork } from './RelationshipRadialNetwork';

interface RelationshipJournalViewProps {
  onSelectEntry?: (entry: ArchiveEntry) => void;
  masterEntry?: ArchiveEntry;
}

export const RelationshipJournalView: React.FC<RelationshipJournalViewProps> = ({
  onSelectEntry,
  masterEntry,
}) => {
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number | 'all'>('all');
  const [activeViewMode, setActiveViewMode] = useState<'network' | 'narrative' | 'lexicon'>('network');
  const [copiedQuote, setCopiedQuote] = useState(false);

  const { title, subtitle, authorship, timeframe, preamble, chapters, lexicon, conclusion } =
    relationshipJournalData;

  const handleJumpToChapter = (chapterNum: number) => {
    setSelectedChapterIdx(chapterNum - 1);
    setActiveViewMode('narrative');
    setTimeout(() => {
      const el = document.getElementById(`chapter-${chapterNum}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(
      `"Kita duha mo solve... Kita duha mo grow together." — The Chronicle of Grace & Loyalty (May 30 – July 2026)`
    );
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* ─── 01. Master Header Banner ─── */}
      <header className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#1B2E24] via-[#14241B] to-[#0D1812] text-white border-2 border-[#D4A359]/40 shadow-xl overflow-hidden">
        {/* Subtle decorative background watermark */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <Heart className="w-96 h-96 text-[#D4A359]" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FAF8F2]/15 text-[#E5B26E] border border-[#E5B26E]/40 text-[11px] font-mono uppercase tracking-widest font-semibold">
              <Heart className="w-3.5 h-3.5 text-[#E5B26E] fill-[#E5B26E]/20" />
              <span>Relationship Journal · Sub-Section</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/15 text-[11px] font-mono">
              <Calendar className="w-3 h-3 text-[#D4A359]" />
              <span>{timeframe}</span>
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-[#FAF8F2] leading-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base font-serif-body italic text-[#D8CFBC] max-w-2xl">
              {subtitle}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15 text-xs font-mono text-[#D8CFBC]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A359]" />
              <span className="text-white font-medium">{authorship}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-[#FAF8F2]/10 px-2.5 py-1 rounded-lg border border-white/10">
                7 Documented Chapters · Authentic Word-for-Word
              </span>
              {masterEntry && onSelectEntry && (
                <button
                  onClick={() => onSelectEntry(masterEntry)}
                  className="px-3 py-1.5 rounded-lg bg-[#D4A359] hover:bg-[#C29147] text-[#14241B] font-bold font-sans-ui text-xs transition-colors flex items-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Full Reading View</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── 02. Sub-View Mode Switcher: Radial Network vs Chronological Dialogues vs Lexicon ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-white border-2 border-[#2A3F35]/25 shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveViewMode('network')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 cursor-pointer border ${
              activeViewMode === 'network'
                ? 'bg-[#2A3F35] text-white border-[#2A3F35] shadow-sm'
                : 'bg-[#FAF8F2] text-[#2A3C30] border-[#78966A]/30 hover:bg-[#F3EEDC]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#D4A359]" />
            <span>Radial Network Graph (People & Groups)</span>
          </button>
          <button
            onClick={() => setActiveViewMode('narrative')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 cursor-pointer border ${
              activeViewMode === 'narrative'
                ? 'bg-[#2A3F35] text-white border-[#2A3F35] shadow-sm'
                : 'bg-[#FAF8F2] text-[#2A3C30] border-[#78966A]/30 hover:bg-[#F3EEDC]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#D4A359]" />
            <span>Chronological Dialogues (Chapters 1–7)</span>
          </button>
          <button
            onClick={() => setActiveViewMode('lexicon')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 cursor-pointer border ${
              activeViewMode === 'lexicon'
                ? 'bg-[#2A3F35] text-white border-[#2A3F35] shadow-sm'
                : 'bg-[#FAF8F2] text-[#2A3C30] border-[#78966A]/30 hover:bg-[#F3EEDC]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4A359]" />
            <span>Cultural Lexicon & Bedrock</span>
          </button>
        </div>
        <span className="text-[11px] font-mono text-[#6A7B6D] px-3">
          {activeViewMode === 'network' && '10 Mapped Entities · 7 Chapters Connected'}
          {activeViewMode === 'narrative' && 'Word-for-Word Bisaya & English Logs'}
          {activeViewMode === 'lexicon' && 'Nag-unongay · Treasure & Keys'}
        </span>
      </div>

      {/* ─── 03. RADIAL NETWORK VIEW ─── */}
      {activeViewMode === 'network' && (
        <div className="space-y-8">
          <RelationshipRadialNetwork
            onSelectChapter={handleJumpToChapter}
            onSelectEntry={onSelectEntry}
            masterEntry={masterEntry}
          />

          {/* Contextual Preamble in Network View */}
          <section className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#2A3F35]/25 shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-[#8F5A0E] text-xs font-mono font-bold uppercase tracking-wider">
              <Quote className="w-4 h-4 text-[#D4A359]" />
              <span>Preamble: The Anchor of Our Souls</span>
            </div>
            <p className="text-xs sm:text-sm font-serif-body text-[#2A3C30] leading-relaxed italic">
              {preamble.text}
            </p>
          </section>
        </div>
      )}

      {/* ─── 04. CHRONOLOGICAL NARRATIVE VIEW (CHAPTERS 1–7) ─── */}
      {activeViewMode === 'narrative' && (
        <div className="space-y-10">
          {/* Preamble Callout Container */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#2A3F35]/30 shadow-md space-y-3">
            <div className="flex items-center space-x-2 border-b border-[#78966A]/20 pb-3">
              <Quote className="w-5 h-5 text-[#D4A359]" />
              <h2 className="text-base sm:text-lg font-display font-semibold text-[#14241B] tracking-wide">
                PREAMBLE: {preamble.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-serif-body text-[#2A3C30] leading-relaxed italic">
              {preamble.text}
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#6A7B6D]">
              <span>Recorded in original Bisaya & English dialogues</span>
              <span className="font-bold text-[#8F5A0E]">Nag-unongay: Standing by each other</span>
            </div>
          </section>

          {/* Chapter Quick Filter Selector */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#2A3F35]/25 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#14241B] flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-[#D4A359]" />
                <span>Chapter Navigator ({chapters.length} Chronological Encounters)</span>
              </span>
              <span className="text-[11px] font-mono text-[#6A7B6D]">
                Select a chapter or read all
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedChapterIdx('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 cursor-pointer border ${
                  selectedChapterIdx === 'all'
                    ? 'bg-[#2A3F35] text-white border-[#2A3F35] font-bold shadow-sm'
                    : 'bg-[#FAF8F2] text-[#2A3C30] border-[#78966A]/30 hover:bg-[#F3EEDC]'
                }`}
              >
                All Chapters (1–7)
              </button>
              {chapters.map((ch, idx) => (
                <button
                  key={ch.chapterNumber}
                  onClick={() => setSelectedChapterIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 cursor-pointer border ${
                    selectedChapterIdx === idx
                      ? 'bg-[#2A3F35] text-white border-[#2A3F35] font-bold shadow-sm'
                      : 'bg-[#FAF8F2] text-[#2A3C30] border-[#78966A]/30 hover:bg-[#F3EEDC]'
                  }`}
                >
                  Ch. {ch.chapterNumber}: {ch.date}
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Display Cards */}
          <div className="space-y-10">
        {chapters
          .filter((_, idx) => selectedChapterIdx === 'all' || selectedChapterIdx === idx)
          .map((chapter) => (
            <article
              key={chapter.chapterNumber}
              id={`chapter-${chapter.chapterNumber}`}
              className="rounded-3xl bg-white border-2 border-[#2A3F35]/30 shadow-lg overflow-hidden space-y-6 p-6 sm:p-8 transition-all"
            >
              {/* Chapter Header */}
              <div className="border-b-2 border-[#78966A]/20 pb-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#8F5A0E] bg-[#FAF6E8] px-2.5 py-1 rounded-lg border border-[#E5B26E]/40">
                    {chapter.date}
                  </span>
                  {chapter.scriptures && chapter.scriptures.length > 0 && (
                    <div className="flex items-center space-x-1.5">
                      {chapter.scriptures.map((sc, scIdx) => (
                        <span
                          key={scIdx}
                          className="text-[10px] font-mono bg-[#FAF8F2] text-[#2A3F35] px-2 py-0.5 rounded border border-[#78966A]/30"
                        >
                          {sc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#14241B]">
                  {chapter.title}
                </h3>
                <p className="text-xs sm:text-sm font-serif-body italic text-[#4E6253]">
                  {chapter.subtitle}
                </p>
              </div>

              {/* Narrative Context (Before Messages) */}
              {chapter.narrativeBefore && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FCFDFB] border border-[#78966A]/25 text-xs sm:text-sm font-serif-body text-[#2C3E30] leading-relaxed shadow-xs">
                  {chapter.narrativeBefore}
                </div>
              )}

              {/* Word-for-word Dialogue Messages */}
              {chapter.messages && chapter.messages.length > 0 && (
                <div className="space-y-4 pt-1">
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-[#6A7B6D] uppercase tracking-wider pb-1">
                    <MessageCircle className="w-3.5 h-3.5 text-[#D4A359]" />
                    <span>Word-for-Word Transcription</span>
                  </div>

                  <div className="space-y-3.5">
                    {chapter.messages.map((msg, mIdx) => (
                      <div
                        key={mIdx}
                        className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed transition-all ${
                          msg.sender === 'maica'
                            ? 'bg-[#FFFBF5] border-2 border-[#E5B26E]/50 shadow-xs'
                            : 'bg-[#F4F8F4] border-2 border-[#2A3F35]/35 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/5">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                                msg.sender === 'maica'
                                  ? 'bg-[#E5B26E] text-[#4A2F08]'
                                  : 'bg-[#2A3F35] text-white'
                              }`}
                            >
                              {msg.sender === 'maica' ? 'M' : 'C'}
                            </span>
                            <span className="font-display font-bold text-xs text-[#14241B]">
                              {msg.senderName}
                              {msg.sender === 'maica' ? ' (Jamaica)' : ' (Clint)'}
                            </span>
                          </div>
                          {msg.timestamp && (
                            <span className="text-[10px] font-mono text-[#6A7B6D]">
                              {msg.timestamp}
                            </span>
                          )}
                        </div>

                        <p className="font-serif-body text-[#18261E] whitespace-pre-line">
                          {msg.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Narrative Context Middle */}
              {chapter.narrativeMiddle && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FCFDFB] border border-[#78966A]/25 text-xs sm:text-sm font-serif-body text-[#2C3E30] leading-relaxed shadow-xs whitespace-pre-line">
                  {chapter.narrativeMiddle}
                </div>
              )}

              {/* Second batch of messages (e.g. Chapter 1, Chapter 4) */}
              {'messagesSecondBatch' in chapter &&
                Array.isArray(chapter.messagesSecondBatch) &&
                chapter.messagesSecondBatch.length > 0 && (
                  <div className="space-y-3.5 pt-1">
                    {chapter.messagesSecondBatch.map((msg: any, sIdx: number) => (
                      <div
                        key={sIdx}
                        className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed transition-all ${
                          msg.sender === 'maica'
                            ? 'bg-[#FFFBF5] border-2 border-[#E5B26E]/50 shadow-xs'
                            : 'bg-[#F4F8F4] border-2 border-[#2A3F35]/35 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/5">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                                msg.sender === 'maica'
                                  ? 'bg-[#E5B26E] text-[#4A2F08]'
                                  : 'bg-[#2A3F35] text-white'
                              }`}
                            >
                              {msg.sender === 'maica' ? 'M' : 'C'}
                            </span>
                            <span className="font-display font-bold text-xs text-[#14241B]">
                              {msg.senderName}
                              {msg.sender === 'maica' ? ' (Jamaica)' : ' (Clint)'}
                            </span>
                          </div>
                          {msg.timestamp && (
                            <span className="text-[10px] font-mono text-[#6A7B6D]">
                              {msg.timestamp}
                            </span>
                          )}
                        </div>

                        <p className="font-serif-body text-[#18261E] whitespace-pre-line">
                          {msg.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              {/* Chapter Callout Box (e.g. Treasure & Keys, Nag-unongay) */}
              {chapter.calloutBox && (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F2] border-2 border-[#8F5A0E]/30 space-y-3 shadow-sm">
                  <div className="flex items-center space-x-2 border-b border-[#8F5A0E]/20 pb-2">
                    <Sparkles className="w-4 h-4 text-[#D4A359]" />
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-[#14241B]">
                        {chapter.calloutBox.title}
                      </h4>
                      <p className="text-[11px] font-serif-body text-[#614518]">
                        {chapter.calloutBox.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {chapter.calloutBox.points.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3 rounded-xl bg-white border border-[#78966A]/20 space-y-1 text-xs"
                      >
                        <span className="font-mono font-bold text-[#8F5A0E] block text-[11px]">
                          {pt.label}
                        </span>
                        <p className="font-serif-body text-[#2C3E30] text-[11px] leading-relaxed">
                          {pt.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
          </div>
        </div>
      )}

      {/* ─── 05. EPILOGUE & CULTURAL LEXICON VIEW ─── */}
      {(activeViewMode === 'lexicon' || activeViewMode === 'narrative') && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#2A3F35]/30 shadow-lg space-y-6">
          <div className="border-b-2 border-[#78966A]/20 pb-3 space-y-1">
            <div className="flex items-center space-x-2">
              <Bookmark className="w-5 h-5 text-[#D4A359]" />
              <h2 className="text-lg sm:text-xl font-display font-bold text-[#14241B]">
                Epilogue: The Lexicon of Our Love
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-serif-body italic text-[#4E6253]">
              The architectural terms shaping our shared journey and enduring loyalty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lexicon.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#FCFDFB] border-2 border-[#2A3F35]/20 space-y-2 hover:border-[#2A3F35] transition-all shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display font-bold text-sm text-[#14241B]">{item.term}</h4>
                  {item.scriptureOrRoot && (
                    <span className="text-[10px] font-mono bg-[#FAF6E8] text-[#8F5A0E] px-2 py-0.5 rounded border border-[#E5B26E]/30">
                      {item.scriptureOrRoot}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-[#6A7B6D] block font-semibold">
                  {item.subtitle}
                </span>
                <p className="text-xs font-serif-body text-[#2A3C30] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── 06. Journal Conclusion & Covenant ─── */}
      <footer className="rounded-3xl p-6 sm:p-8 bg-[#2A3F35] text-white border-2 border-[#D4A359]/40 shadow-xl space-y-5 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A359] block font-bold">
            Journal Conclusion
          </span>
          <p className="text-xs sm:text-sm font-serif-body text-[#E8E1D5] leading-relaxed">
            {conclusion.text}
          </p>
          <div className="pt-3 border-t border-white/15">
            <blockquote className="text-base sm:text-xl font-display italic text-[#FAF8F2] font-semibold">
              “{conclusion.quote}”
            </blockquote>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-center space-x-3">
          <button
            onClick={handleCopyQuote}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF8F2] border border-white/20 text-xs font-mono transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#D4A359]" />
            <span>{copiedQuote ? 'Quote Copied to Clipboard!' : 'Share Covenant Quote'}</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
