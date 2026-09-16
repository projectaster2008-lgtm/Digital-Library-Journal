import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Droplets,
  Sun,
  Compass,
  Bookmark,
  Clock,
  Tag,
  Scroll,
  FileText,
  Info,
  Calendar,
  Home,
  Leaf,
  Grid,
  X,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArchiveNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  entryCounts: {
    journal: number;
    devotional: number;
    reflection: number;
    letter: number;
    blueprint: number;
  };
}

export const ArchiveNav: React.FC<ArchiveNavProps> = ({
  currentTab,
  onSelectTab,
  entryCounts,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isVaultUnlocked = typeof window !== 'undefined' && localStorage.getItem('sovereign_architect_unlocked') === 'true';

  const navItems = [
    { id: 'home', label: 'Garden Index', num: '00', icon: Home, desc: 'Living 3D environment & latest reflections' },
    { id: 'blueprint', label: 'Sovereign Architect', num: '★', icon: isVaultUnlocked ? Compass : Lock, count: isVaultUnlocked ? entryCounts.blueprint : undefined, desc: isVaultUnlocked ? 'A Blueprint for a Life Well-Built · Decrypted' : '🔒 Encrypted Architecture · Passcode Protected' },
    { id: 'journal', label: 'Journal (Leaves)', num: '01', icon: Leaf, count: entryCounts.journal, desc: 'Personal reflections & Relationship Journal' },
    { id: 'devotionals', label: 'Personal Devotions', num: '02', icon: Sun, count: entryCounts.devotional, desc: 'Scripture-grounded handwritten meditations & lessons' },
    { id: 'reflections', label: 'Reflections (Water)', num: '03', icon: Droplets, count: entryCounts.reflection, desc: 'Thematic contemplative spiritual notes' },
    { id: 'letters', label: 'Letters (Paper)', num: '04', icon: FileText, count: entryCounts.letter, desc: 'Unsent prayers and epistolary thoughts' },
    { id: 'timeline', label: 'Life Timeline', num: '05', icon: Clock, desc: 'Chronological faith milestones' },
    { id: 'topics', label: 'Topics', num: '06', icon: Tag, desc: 'Index by grace, faith, surrender & peace' },
    { id: 'scriptures', label: 'Scripture Index', num: '07', icon: Scroll, desc: 'Verses from Romans, Psalms, Thessalonians' },
    { id: 'yearly', label: 'Yearly Chapters', num: '08', icon: Calendar, desc: 'Annual reviews and chapter summaries' },
    { id: 'about', label: 'Why I Write', num: '09', icon: Info, desc: 'Sanctuary philosophy and digital garden' },
  ];

  const primaryMobileTabs = [
    { id: 'home', label: 'Garden', icon: Home },
    { id: 'blueprint', label: 'Blueprint', icon: isVaultUnlocked ? Compass : Lock },
    { id: 'journal', label: 'Journal', icon: Leaf },
    { id: 'devotionals', label: 'Devotions', icon: Sun },
    { id: 'timeline', label: 'Timeline', icon: Clock },
  ];

  const isCurrentTabInMore = !primaryMobileTabs.some((t) => t.id === currentTab);

  return (
    <>
      {/* Desktop Floating Side Botanical Book Index */}
      <aside className="hidden lg:block fixed left-6 top-24 bottom-10 w-64 z-30 pointer-events-auto">
        <div className="h-full flex flex-col justify-between p-4 rounded-2xl bg-[#0B1510]/98 backdrop-blur-2xl border-2 border-white/25 shadow-2xl">
          {/* Top Header of Index */}
          <div>
            <div className="px-3 pb-3 mb-2 border-b border-white/15 flex items-center justify-between">
              <span className="text-[10px] tracking-[0.25em] font-sans-ui uppercase text-[#F2C96D] font-bold">
                Table of Contents
              </span>
              <span className="text-[9px] text-[#A8C4B2] uppercase tracking-wider font-mono">Archive Garden</span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full group text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#2D5A3C] text-[#FAF8F2] font-semibold shadow-md border border-[#78C491]/60'
                        : 'text-[#D4E3DA] hover:text-[#FFFFFF] hover:bg-white/15 border border-transparent hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={`text-[10px] font-mono ${isActive ? 'text-[#F2C96D]' : 'text-[#78C491]'}`}>
                        {item.num}
                      </span>
                      <span className="font-display tracking-wider text-xs uppercase font-medium">
                        {item.label}
                      </span>
                    </div>

                    {item.count !== undefined ? (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'text-[#FAF8F2] bg-white/20'
                            : 'text-[#C5D9CD] bg-white/10 border border-white/10'
                        }`}
                      >
                        {item.count}
                      </span>
                    ) : item.id === 'blueprint' && !isVaultUnlocked ? (
                      <span className="text-[10px] text-[#F2C96D]">🔒</span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Metaphor Quote */}
          <div className="pt-4 border-t border-white/15 px-3">
            <p className="text-[11px] font-display italic text-[#C5D9CD] leading-relaxed">
              “Nature + Light + Growth + Paper + Time.”
            </p>
            <div className="mt-2 flex items-center justify-between text-[9px] text-[#8EA898] uppercase tracking-widest font-mono">
              <span>Digital Garden</span>
              <span>Anno Domini 2026</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Optimized for thumb reach, safe areas & clean 6-column alignment) */}
      <div 
        id="mobile-bottom-nav"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07110B]/98 backdrop-blur-2xl border-t-2 border-white/20 px-1 py-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
      >
        <div className="grid grid-cols-6 items-center justify-items-center max-w-md mx-auto gap-1">
          {primaryMobileTabs.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-tab-${item.id}`}
                onClick={() => {
                  onSelectTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl min-h-[46px] transition-all cursor-pointer border ${
                  isActive
                    ? 'text-[#F2C96D] font-bold bg-[#2D5A3C] border-[#78C491]/60 shadow-md ring-1 ring-[#F2C96D]/40'
                    : 'text-[#D4E3DA] border-transparent hover:text-white hover:bg-white/10 active:scale-95'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-[#F2C96D]' : 'text-[#A8C4B2]'}`} />
                <span className="tracking-tight text-[10px] truncate max-w-full text-center leading-none">{item.label}</span>
              </button>
            );
          })}

          {/* Mobile All Sections Trigger */}
          <button
            id="mobile-tab-more"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`w-full flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl min-h-[46px] transition-all cursor-pointer border ${
              isMobileMenuOpen || isCurrentTabInMore
                ? 'text-[#F2C96D] font-bold bg-[#2D5A3C] border-[#78C491]/60 shadow-md ring-1 ring-[#F2C96D]/40'
                : 'text-[#D4E3DA] border-transparent hover:text-white hover:bg-white/10 active:scale-95'
            }`}
          >
            <Grid className={`w-4 h-4 mb-0.5 ${isMobileMenuOpen || isCurrentTabInMore ? 'text-[#F2C96D]' : 'text-[#A8C4B2]'}`} />
            <span className="tracking-tight text-[10px] truncate max-w-full text-center leading-none">
              {isCurrentTabInMore ? 'Active' : 'More'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Full Index Modal Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm">
            {/* Backdrop Tap to Close */}
            <div
              className="flex-1"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="bg-[#09140E] border-t-2 border-white/25 rounded-t-3xl p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] max-h-[85vh] overflow-y-auto shadow-2xl space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <div className="flex items-center space-x-2">
                  <Leaf className="w-4 h-4 text-[#78C491]" />
                  <span className="text-xs font-display tracking-widest text-[#FAF8F2] uppercase font-bold">
                    Garden Index & Archives
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 text-[#C5D9CD] hover:text-white border border-white/15 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-2 py-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#2D5A3C] text-[#FAF8F2] font-semibold border-[#78C491]/70 shadow-lg ring-1 ring-[#F2C96D]/40'
                          : 'bg-[#14261D] text-[#D4E3DA] border-white/15 hover:bg-[#1A3125] hover:border-white/25 active:scale-[0.99]'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className={`p-2 rounded-xl flex-shrink-0 ${isActive ? 'bg-[#182C22] text-[#F2C96D]' : 'bg-white/10 text-[#78C491]'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2 flex-wrap">
                            <span className={`text-[10px] font-mono ${isActive ? 'text-[#F2C96D]' : 'text-[#78C491]'}`}>
                              {item.num}
                            </span>
                            <span className="text-xs font-display uppercase font-medium tracking-wide">
                              {item.label}
                            </span>
                            {item.count !== undefined && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-white/15 text-[#FAF8F2]">
                                {item.count}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-serif-body italic text-[#A8C4B2] truncate mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 flex-shrink-0 ml-2 ${isActive ? 'text-[#F2C96D]' : 'text-[#A8C4B2]/60'}`} />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
