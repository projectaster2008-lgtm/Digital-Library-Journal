import React from 'react';
import { BookOpen, Sparkles, Droplets, Sun, Compass, Bookmark, Clock, Tag, Scroll, FileText, Info, Calendar, Home, Leaf } from 'lucide-react';

interface ArchiveNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  entryCounts: {
    journal: number;
    devotional: number;
    reflection: number;
    letter: number;
  };
}

export const ArchiveNav: React.FC<ArchiveNavProps> = ({
  currentTab,
  onSelectTab,
  entryCounts,
}) => {
  const navItems = [
    { id: 'home', label: 'Garden Index', num: '00', icon: Home },
    { id: 'journal', label: 'Journal (Leaves)', num: '01', icon: Leaf, count: entryCounts.journal },
    { id: 'devotionals', label: 'Devotionals (Light)', num: '02', icon: Sun, count: entryCounts.devotional },
    { id: 'reflections', label: 'Reflections (Water)', num: '03', icon: Droplets, count: entryCounts.reflection },
    { id: 'letters', label: 'Letters (Paper)', num: '04', icon: FileText, count: entryCounts.letter },
    { id: 'timeline', label: 'Life Timeline', num: '05', icon: Clock },
    { id: 'topics', label: 'Topics', num: '06', icon: Tag },
    { id: 'scriptures', label: 'Scripture Index', num: '07', icon: Scroll },
    { id: 'yearly', label: 'Yearly Chapters', num: '08', icon: Calendar },
    { id: 'about', label: 'Why I Write', num: '09', icon: Info },
  ];

  return (
    <>
      {/* Desktop Floating Side Botanical Book Index */}
      <aside className="hidden lg:block fixed left-6 top-24 bottom-10 w-64 z-30 pointer-events-auto">
        <div className="h-full flex flex-col justify-between p-4 rounded-2xl bg-[#0F1B16]/85 backdrop-blur-xl border border-white/15 shadow-2xl">
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
                        ? 'bg-[#2D5A3C] text-[#FAF8F2] font-semibold shadow-md border border-[#78C491]/40'
                        : 'text-[#C5D9CD] hover:text-[#FFFFFF] hover:bg-white/10'
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

                    {item.count !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'text-[#FAF8F2] bg-white/20'
                            : 'text-[#C5D9CD] bg-white/10 border border-white/10'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
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

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F1B16]/95 backdrop-blur-xl border-t border-white/15 px-2 py-1.5 shadow-2xl">
        <div className="flex items-center justify-around">
          {[
            { id: 'home', label: 'Garden', icon: Home },
            { id: 'journal', label: 'Journal', icon: Leaf },
            { id: 'devotionals', label: 'Light', icon: Sun },
            { id: 'timeline', label: 'Timeline', icon: Clock },
            { id: 'topics', label: 'Topics', icon: Tag },
            { id: 'scriptures', label: 'Verses', icon: Scroll },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] transition-colors cursor-pointer ${
                  isActive ? 'text-[#F2C96D] font-bold' : 'text-[#C5D9CD] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-[#F2C96D]' : 'text-[#A8C4B2]'}`} />
                <span className="tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
