import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from 'lenis';
import { initialEntries } from './data/entries';
import { archiveTopics } from './data/topics';
import { archiveScriptures } from './data/scriptures';
import { lifeTimeline } from './data/timeline';
import { ArchiveEntry, RoomTheme, GardenAtmosphere, Season } from './types';
import { getCurrentDateSeason } from './lib/seasonUtils';
import { Header } from './components/navigation/Header';
import { ArchiveNav } from './components/navigation/ArchiveNav';
import { OpeningPortal } from './components/home/OpeningPortal';
import { HomeGardenLandscape } from './components/home/HomeGardenLandscape';
import { JournalArchive } from './components/journal/JournalArchive';
import { DevotionalLibrary } from './components/devotional/DevotionalLibrary';
import { ScriptureExplorer } from './components/scripture/ScriptureExplorer';
import { TopicExplorer } from './components/topics/TopicExplorer';
import { LifeTimeline } from './components/timeline/LifeTimeline';
import { YearlyChapters } from './components/yearly/YearlyChapters';
import { ReflectionsArchive } from './components/reflections/ReflectionsArchive';
import { AboutArchive } from './components/about/AboutArchive';
import { ReadingMode } from './components/reading/ReadingMode';
import { ArchiveSearchModal } from './components/modals/ArchiveSearchModal';
import { OnThisDayModal } from './components/modals/OnThisDayModal';
import { RandomEntryModal } from './components/modals/RandomEntryModal';
import { PrivateCMS } from './components/admin/PrivateCMS';
import { AmbientMusicPlayer } from './components/audio/AmbientMusicPlayer';
import { Garden3DScene } from './scenes/Garden3DScene';

export function App() {
  // Opening state
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    const saved = localStorage.getItem('personal_archive_entered');
    return saved === 'true';
  });

  // Navigation tab state: 'home' | 'journal' | 'devotionals' | 'reflections' | 'letters' | 'timeline' | 'topics' | 'scriptures' | 'yearly' | 'about'
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Active reading entry
  const [activeReadingEntry, setActiveReadingEntry] = useState<ArchiveEntry | null>(null);

  // Deep linking topics / scriptures from other screens
  const [selectedScriptureFilter, setSelectedScriptureFilter] = useState<string | null>(null);
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string | null>(null);

  // Modals & Audio Player state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOnThisDayOpen, setIsOnThisDayOpen] = useState(false);
  const [isRandomOpen, setIsRandomOpen] = useState(false);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);

  // Atmosphere / Theme state: 'morning' | 'afternoon' | 'evening' | 'night' | 'rain'
  const [atmosphere, setAtmosphere] = useState<GardenAtmosphere>(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  });

  // Season state dynamically calculated from current date with manual override capability
  const [season, setSeason] = useState<Season>(() => {
    const saved = localStorage.getItem('personal_archive_season') as Season;
    if (saved && (saved === 'spring' || saved === 'summer' || saved === 'autumn' || saved === 'winter')) {
      return saved;
    }
    return getCurrentDateSeason(new Date());
  });

  const handleSeasonChange = (newSeason: Season) => {
    setSeason(newSeason);
    localStorage.setItem('personal_archive_season', newSeason);
  };

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Entries collection state (initialized with authentic transcribed devotionals & local storage persistence)
  const [entries, setEntries] = useState<ArchiveEntry[]>(() => {
    const saved = localStorage.getItem('personal_archive_custom_entries');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...initialEntries.filter((ie) => !parsed.some((p: ArchiveEntry) => p.id === ie.id))];
      } catch (err) {
        console.error('Error parsing stored entries', err);
      }
    }
    return initialEntries;
  });

  const handleEnterPortal = () => {
    setHasEntered(true);
    localStorage.setItem('personal_archive_entered', 'true');
  };

  const handleSelectEntry = (entry: ArchiveEntry) => {
    setActiveReadingEntry(entry);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseReading = () => {
    setActiveReadingEntry(null);
  };

  const handleSaveNewEntry = (newEntry: ArchiveEntry) => {
    setEntries((prev) => {
      const updated = [newEntry, ...prev];
      localStorage.setItem('personal_archive_custom_entries', JSON.stringify(updated.filter((e) => e.id.startsWith('entry-'))));
      return updated;
    });
    setActiveReadingEntry(newEntry);
  };

  const handleNavigateToScripture = (scriptureRef: string) => {
    setSelectedScriptureFilter(scriptureRef);
    setActiveReadingEntry(null);
    setCurrentTab('scriptures');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTopic = (topicName: string) => {
    setSelectedTopicFilter(topicName);
    setActiveReadingEntry(null);
    setCurrentTab('topics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const entryCounts = {
    journal: entries.filter((e) => e.type === 'journal').length,
    devotional: entries.filter((e) => e.type === 'devotional').length,
    reflection: entries.filter((e) => e.type === 'reflection').length,
    letter: entries.filter((e) => e.type === 'letter').length,
  };

  return (
    <div className={`min-h-screen text-[#253326] font-sans-ui bg-[#F7F8F2] relative selection:bg-[#78966A]/25 selection:text-[#253326] theme-${atmosphere} season-${season}`}>
      {/* ─── 01. Opening Portal Experience ─── */}
      {!hasEntered && <OpeningPortal onEnter={handleEnterPortal} />}

      {/* ─── 02. Reading Mode (Distraction-Free, 3D disabled) ─── */}
      <AnimatePresence>
        {activeReadingEntry && (
          <ReadingMode
            entry={activeReadingEntry}
            allEntries={entries}
            theme={atmosphere}
            onThemeChange={(t) => {
              if (t === 'morning' || t === 'afternoon' || t === 'evening' || t === 'night' || t === 'rain') {
                setAtmosphere(t);
              }
            }}
            onClose={handleCloseReading}
            onSelectEntry={handleSelectEntry}
            onSelectScripture={handleNavigateToScripture}
            onSelectTopic={handleNavigateToTopic}
          />
        )}
      </AnimatePresence>

      {/* ─── 03. Main Archive Garden Interface (When NOT in Reading Mode) ─── */}
      {!activeReadingEntry && (
        <div className="relative min-h-screen flex flex-col">
          {/* Background 3D Living Nature Environment (Sky, Clouds, Sun, Tree, Landscape, Seasonal Particles) */}
          <Garden3DScene atmosphere={atmosphere} season={season} isReadingMode={false} />

          {/* Navigation Header */}
          <Header
            currentTab={currentTab}
            theme={atmosphere}
            season={season}
            onThemeChange={(t) => {
              if (t === 'morning' || t === 'afternoon' || t === 'evening' || t === 'night' || t === 'rain') {
                setAtmosphere(t);
              }
            }}
            onSeasonChange={handleSeasonChange}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenRandom={() => setIsRandomOpen(true)}
            onOpenOnThisDay={() => setIsOnThisDayOpen(true)}
            onOpenCMS={() => setIsCMSOpen(true)}
            onOpenMusicPlayer={() => setIsMusicPlayerOpen(true)}
            onNavigate={setCurrentTab}
          />

          {/* Main Layout Container with Desktop Side Index */}
          <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
            {/* Desktop Side Botanical-Index Navigation */}
            <ArchiveNav
              currentTab={currentTab}
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              entryCounts={entryCounts}
            />

            {/* Dynamic Center Canvas */}
            <main className="lg:pl-72 py-6 transition-all duration-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {currentTab === 'home' && (
                    <HomeGardenLandscape
                      entries={entries}
                      currentAtmosphere={atmosphere}
                      currentSeason={season}
                      onAtmosphereChange={setAtmosphere}
                      onSeasonChange={handleSeasonChange}
                      onSelectEntry={handleSelectEntry}
                      onNavigate={setCurrentTab}
                      onOpenRandom={() => setIsRandomOpen(true)}
                      onOpenOnThisDay={() => setIsOnThisDayOpen(true)}
                      onOpenMusicPlayer={() => setIsMusicPlayerOpen(true)}
                    />
                  )}

                  {currentTab === 'journal' && (
                    <JournalArchive
                      entries={entries}
                      onSelectEntry={handleSelectEntry}
                    />
                  )}

                  {currentTab === 'devotionals' && (
                    <DevotionalLibrary
                      entries={entries}
                      onSelectEntry={handleSelectEntry}
                      onSelectScripture={handleNavigateToScripture}
                    />
                  )}

                  {currentTab === 'reflections' && (
                    <ReflectionsArchive
                      entries={entries}
                      type="reflection"
                      onSelectEntry={handleSelectEntry}
                    />
                  )}

                  {currentTab === 'letters' && (
                    <ReflectionsArchive
                      entries={entries}
                      type="letter"
                      onSelectEntry={handleSelectEntry}
                    />
                  )}

                  {currentTab === 'timeline' && (
                    <LifeTimeline
                      milestones={lifeTimeline}
                      entries={entries}
                      onSelectEntry={handleSelectEntry}
                    />
                  )}

                  {currentTab === 'topics' && (
                    <TopicExplorer
                      topics={archiveTopics}
                      entries={entries}
                      onSelectEntry={handleSelectEntry}
                      initialSelectedTopic={selectedTopicFilter}
                    />
                  )}

                  {currentTab === 'scriptures' && (
                    <ScriptureExplorer
                      scriptures={archiveScriptures}
                      entries={entries}
                      onSelectEntry={handleSelectEntry}
                      initialSelectedReference={selectedScriptureFilter}
                    />
                  )}

                  {currentTab === 'yearly' && <YearlyChapters />}

                  {currentTab === 'about' && <AboutArchive />}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

          {/* Minimalist Botanical Footer */}
          <footer className="relative z-10 border-t border-[#78966A]/20 py-8 text-center text-xs text-[#6B7B6C] font-mono lg:pl-72 bg-[#F7F8F2]/80 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="tracking-widest uppercase text-[#3F6248] font-medium">The Personal Journal · Digital Garden</span>
              <span className="italic font-serif-body text-sm text-[#4E5C4F]">
                “Nature + Light + Growth + Paper + Time.”
              </span>
              <span>Anno Domini 2026</span>
            </div>
          </footer>
        </div>
      )}

      {/* ─── Ambient Nature Vibes YouTube Music Player Sanctuary ─── */}
      <AmbientMusicPlayer
        isOpen={isMusicPlayerOpen}
        onToggleOpen={() => setIsMusicPlayerOpen(!isMusicPlayerOpen)}
      />

      {/* ─── Modals ─── */}
      <ArchiveSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        entries={entries}
        onSelectEntry={handleSelectEntry}
      />

      <OnThisDayModal
        isOpen={isOnThisDayOpen}
        onClose={() => setIsOnThisDayOpen(false)}
        entries={entries}
        onSelectEntry={handleSelectEntry}
      />

      <RandomEntryModal
        isOpen={isRandomOpen}
        onClose={() => setIsRandomOpen(false)}
        entries={entries}
        onSelectEntry={handleSelectEntry}
      />

      <PrivateCMS
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        onSaveEntry={handleSaveNewEntry}
        existingEntries={entries}
      />
    </div>
  );
}

export default App;
