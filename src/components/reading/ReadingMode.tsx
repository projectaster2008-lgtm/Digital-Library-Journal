import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Sparkles,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  Sun,
  CloudRain,
  Moon,
  Cloud,
  Sunset,
  X,
  Maximize2,
} from 'lucide-react';
import { ArchiveEntry, GardenAtmosphere, RoomTheme } from '../../types';
import { soundEngine } from '../../lib/soundEngine';

interface ReadingModeProps {
  entry: ArchiveEntry;
  allEntries: ArchiveEntry[];
  theme: RoomTheme;
  onThemeChange: (theme: RoomTheme) => void;
  onClose: () => void;
  onSelectEntry: (entry: ArchiveEntry) => void;
  onSelectScripture?: (scripture: string) => void;
  onSelectTopic?: (topic: string) => void;
}

export const ReadingMode: React.FC<ReadingModeProps> = ({
  entry,
  allEntries,
  theme,
  onThemeChange,
  onClose,
  onSelectEntry,
  onSelectScripture,
  onSelectTopic,
}) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [copied, setCopied] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        const percent = Math.min(100, Math.max(0, Math.round((el.scrollTop / totalHeight) * 100)));
        setScrollPercent(percent);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentIndex = allEntries.findIndex((e) => e.id === entry.id);
  const prevEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const nextEntry = currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fontClasses = {
    normal: 'text-lg sm:text-xl leading-[1.85]',
    large: 'text-xl sm:text-2xl leading-[1.9]',
    larger: 'text-2xl sm:text-3xl leading-[1.95]',
  };

  // Map mood to emotional atmosphere description
  const moodAtmosphere = {
    Peaceful: 'Warm gentle sunlight',
    Difficult: 'Quiet rain on leaves',
    Hopeful: 'Morning sunrise',
    Uncertain: 'Misty afternoon',
    Grateful: 'Golden evening light',
    Contemplative: 'Night desk lamp',
    Vulnerable: 'Soft rain against the glass',
  }[entry.mood] || 'Peaceful sunlight';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen bg-[#F7F8F2] text-[#253326] transition-colors duration-700 relative selection:bg-[#78966A]/25 selection:text-[#253326]"
    >
      {/* Top Fixed Editorial Reading Bar & Progress */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-[#F7F8F2]/90 border-b border-[#78966A]/15 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            id="close-reading-mode-button"
            onClick={onClose}
            className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans-ui hover:text-[#3F6248] transition-colors py-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Garden</span>
          </button>

          {/* Center: Scroll progress indicator */}
          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="hidden sm:block w-28 h-1 bg-[#78966A]/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3F6248] transition-all duration-150"
                style={{ width: `${scrollPercent}%` }}
              />
            </div>
            <span className="text-[#3F6248] font-semibold">{scrollPercent}%</span>
          </div>

          {/* Right: Font size toggle & Share */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 border border-[#78966A]/30 rounded-lg px-2 py-0.5 text-xs font-mono bg-white/60">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === 'normal' ? 'text-[#3F6248] font-bold' : 'opacity-60'}`}
                title="Normal text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 rounded text-sm cursor-pointer ${fontSize === 'large' ? 'text-[#3F6248] font-bold' : 'opacity-60'}`}
                title="Large text"
              >
                A+
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-md hover:text-[#3F6248] transition-colors cursor-pointer"
              title="Share / Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-[#3F6248]" /> : <Share2 className="w-4 h-4 text-[#6B7B6C]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Modern Paper Container */}
      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-12">
        {/* Modern Paper Sheet Card */}
        <article className="p-8 sm:p-14 rounded-3xl modern-paper border border-[#C88F72]/25 shadow-2xl space-y-10">
          {/* Header Metadata */}
          <header className="text-center space-y-4 border-b border-[#78966A]/20 pb-8">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#78966A]">
              <span className="font-semibold">{entry.type}</span>
              <span>·</span>
              <span>
                {entry.day} {entry.month} {entry.year}
              </span>
              {entry.memoNumber && (
                <>
                  <span>·</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#78966A]/15 text-[#3F6248] font-bold">
                    {entry.memoNumber}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal text-[#253326] leading-tight tracking-normal">
              {entry.title}
            </h1>

            {/* Emotional Atmosphere Tag */}
            <div className="flex items-center justify-center space-x-2 text-xs font-mono text-[#848D80] pt-1">
              <span>Atmosphere:</span>
              <span className="text-[#3F6248] font-medium">{moodAtmosphere}</span>
            </div>

            {/* Scripture Anchor if present */}
            {entry.scriptureVerseText ? (
              <div className="mt-6 p-6 rounded-2xl border border-[#F2C96D]/40 bg-[#FFFBF0] text-center max-w-xl mx-auto space-y-2 shadow-sm">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#B5851D] block">
                  Scripture Anchor
                </span>
                <blockquote className="font-display italic text-lg sm:text-xl leading-relaxed text-[#2C2820]">
                  “{entry.scriptureVerseText}”
                </blockquote>
                <div className="flex justify-center gap-2 pt-1">
                  {entry.scriptures.map((s) => (
                    <button
                      key={s}
                      onClick={() => onSelectScripture && onSelectScripture(s)}
                      className="text-xs font-serif-body italic text-[#B5851D] hover:underline cursor-pointer"
                    >
                      — {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : entry.scriptures.length > 0 ? (
              <div className="flex justify-center gap-2 pt-2">
                {entry.scriptures.map((s) => (
                  <button
                    key={s}
                    onClick={() => onSelectScripture && onSelectScripture(s)}
                    className="px-3 py-1 rounded-full text-xs font-serif-body italic border border-[#78966A]/30 text-[#3F6248] hover:bg-[#78966A]/10 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
          </header>

          {/* Opening Thought Note */}
          {entry.openingThought && (
            <div className="p-6 rounded-2xl border-l-4 border-[#78966A] bg-[#FAF8F2] italic font-display text-lg text-[#3F6248] leading-relaxed">
              {entry.openingThought}
            </div>
          )}

          {/* Editorial Writing Body */}
          <div className={`font-serif-body ${fontClasses[fontSize]} text-[#253326] space-y-8 font-light tracking-wide`}>
            {entry.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('───') || paragraph.startsWith('---')) {
                return <hr key={idx} className="border-t border-[#78966A]/20 my-8" />;
              }
              if (paragraph === 'PERSONAL NOTES' || paragraph === 'PRAYER' || paragraph === 'WRITING THIS') {
                return (
                  <h3
                    key={idx}
                    className="font-display tracking-[0.2em] text-xs uppercase text-[#78966A] font-semibold pt-6 pb-2 border-b border-[#78966A]/20"
                  >
                    {paragraph}
                  </h3>
                );
              }
              return (
                <p key={idx} className="leading-relaxed whitespace-pre-line text-justify">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* 20 — Photos as Physical Prints Resting on Desk */}
          {entry.photos && entry.photos.length > 0 && (
            <section className="pt-8 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#78966A] block text-center">
                Visual Memories & Field Notes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {entry.photos.map((photo, pIdx) => {
                  const rotation = pIdx % 2 === 0 ? '-rotate-1' : 'rotate-1';
                  return (
                    <motion.div
                      key={pIdx}
                      whileHover={{ scale: 1.03, rotate: 0 }}
                      onClick={() => setActivePhotoModal(photo.url)}
                      className={`p-3 bg-white rounded-xl shadow-lg border border-[#E8E1D5] transform ${rotation} transition-all cursor-pointer group`}
                    >
                      <div className="overflow-hidden rounded-lg relative">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="p-2 rounded-full bg-white/90 shadow text-xs font-sans-ui flex items-center space-x-1">
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Expand</span>
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-center text-xs font-serif-body italic text-[#6B7B6C]">
                        {photo.caption} {photo.location && `· ${photo.location}`}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 21 — Handwritten Signature Margin Note */}
          <div className="pt-6 border-t border-[#78966A]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-handwriting text-2xl sm:text-3xl text-[#C88F72]">
              “Remembering the grace in the quiet.”
            </div>
            <span className="text-xs font-mono text-[#848D80]">
              Written by Hand
            </span>
          </div>

          {/* Core Lesson Application */}
          {entry.lesson && (
            <section className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F2] border border-[#78966A]/25 space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#78966A] font-semibold block">
                Core Spiritual Realization
              </span>
              <p className="font-display text-lg sm:text-xl italic text-[#253326] leading-relaxed">
                “{entry.lesson}”
              </p>
            </section>
          )}

          {/* Sanctuary Prayer Section */}
          {entry.prayer && (
            <section className="p-6 sm:p-8 rounded-2xl bg-[#FFFBF0] border border-[#F2C96D]/40 space-y-2">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#B5851D] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sanctuary Prayer</span>
              </div>
              <p className="font-serif-body text-base sm:text-lg italic text-[#2C2820] leading-relaxed">
                {entry.prayer}
              </p>
            </section>
          )}

          {/* Topics & Tags */}
          <div className="pt-6 border-t border-[#78966A]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#848D80] font-mono">Topics:</span>
              {entry.topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => onSelectTopic && onSelectTopic(topic)}
                  className="px-3 py-1 rounded-full text-xs font-sans-ui border border-[#78966A]/25 hover:border-[#3F6248] hover:bg-[#78966A]/15 transition-all uppercase tracking-wider text-[#3F6248] cursor-pointer"
                >
                  #{topic}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-[#848D80]">
              Reading Time: {entry.readingTimeMinutes} min
            </span>
          </div>
        </article>

        {/* Previous and Next Navigation */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevEntry ? (
            <button
              onClick={() => onSelectEntry(prevEntry)}
              className="p-5 rounded-2xl modern-paper border border-[#78966A]/20 hover:border-[#3F6248] text-left transition-all group cursor-pointer shadow-sm"
            >
              <span className="text-[10px] uppercase font-mono text-[#848D80] flex items-center space-x-1 font-semibold">
                <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Writing</span>
              </span>
              <h4 className="text-base font-display text-[#253326] group-hover:text-[#3F6248] transition-colors mt-1 line-clamp-1">
                {prevEntry.title}
              </h4>
            </button>
          ) : <div />}

          {nextEntry ? (
            <button
              onClick={() => onSelectEntry(nextEntry)}
              className="p-5 rounded-2xl modern-paper border border-[#78966A]/20 hover:border-[#3F6248] text-right transition-all group cursor-pointer ml-auto w-full shadow-sm"
            >
              <span className="text-[10px] uppercase font-mono text-[#848D80] flex items-center justify-end space-x-1 font-semibold">
                <span>Next Writing</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <h4 className="text-base font-display text-[#253326] group-hover:text-[#3F6248] transition-colors mt-1 line-clamp-1">
                {nextEntry.title}
              </h4>
            </button>
          ) : <div />}
        </nav>
      </main>

      {/* Lightbox Photo Modal */}
      <AnimatePresence>
        {activePhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoModal(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white p-3 shadow-2xl">
              <button
                onClick={() => setActivePhotoModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={activePhotoModal}
                alt="Expanded view"
                className="w-full h-auto max-h-[82vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
