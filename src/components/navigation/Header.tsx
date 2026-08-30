import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Search,
  Sparkles,
  Feather,
  Compass,
  Sun,
  Moon,
  CloudRain,
  Cloud,
  Sunset,
  Leaf,
  Flower2,
  Trees,
  CloudSnow,
  Music,
  Disc3,
} from 'lucide-react';
import { RoomTheme, AmbienceType, GardenAtmosphere, Season } from '../../types';
import { soundEngine } from '../../lib/soundEngine';
import { SEASONS_DATA } from '../../lib/seasonUtils';

interface HeaderProps {
  currentTab: string;
  theme: RoomTheme;
  season: Season;
  onThemeChange: (theme: RoomTheme) => void;
  onSeasonChange: (season: Season) => void;
  onOpenSearch: () => void;
  onOpenRandom: () => void;
  onOpenOnThisDay: () => void;
  onOpenCMS: () => void;
  onOpenMusicPlayer: () => void;
  onNavigate: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  theme,
  season,
  onThemeChange,
  onSeasonChange,
  onOpenSearch,
  onOpenRandom,
  onOpenOnThisDay,
  onOpenCMS,
  onOpenMusicPlayer,
  onNavigate,
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(soundEngine.getIsPlaying());
  const [currentAmbience, setCurrentAmbience] = useState<AmbienceType>(soundEngine.getCurrentPreset());
  const [isAmbienceMenuOpen, setIsAmbienceMenuOpen] = useState(false);
  const [isSeasonMenuOpen, setIsSeasonMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const isNowPlaying = soundEngine.toggleMute();
    setIsPlayingSound(isNowPlaying);
    setCurrentAmbience(soundEngine.getCurrentPreset());
  };

  const handleSelectAmbience = (preset: AmbienceType) => {
    soundEngine.setPreset(preset);
    setCurrentAmbience(preset);
    setIsPlayingSound(preset !== 'silent');
    setIsAmbienceMenuOpen(false);
  };

  const weatherOptions: { id: RoomTheme; label: string; icon: React.ReactNode }[] = [
    { id: 'morning', label: 'Morning', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'afternoon', label: 'Afternoon', icon: <Cloud className="w-3.5 h-3.5" /> },
    { id: 'evening', label: 'Golden Hour', icon: <Sunset className="w-3.5 h-3.5" /> },
    { id: 'night', label: 'Night', icon: <Moon className="w-3.5 h-3.5" /> },
    { id: 'rain', label: 'Rain', icon: <CloudRain className="w-3.5 h-3.5" /> },
  ];

  const seasonOptions: { id: Season; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'spring', label: 'Spring', icon: <Flower2 className="w-3.5 h-3.5" />, color: '#84B082' },
    { id: 'summer', label: 'Summer', icon: <Sun className="w-3.5 h-3.5" />, color: '#F2C96D' },
    { id: 'autumn', label: 'Autumn', icon: <Trees className="w-3.5 h-3.5" />, color: '#D97736' },
    { id: 'winter', label: 'Winter', icon: <CloudSnow className="w-3.5 h-3.5" />, color: '#8EC5C1' },
  ];

  const activeSeasonData = SEASONS_DATA[season];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0F1B16]/85 border-b border-white/15 transition-colors duration-500 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Leaf Icon and Journal Title */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 min-w-0">
          <button
            id="brand-home-button"
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-display font-semibold text-lg text-[#78C491] bg-[#182C22] shadow-md group-hover:border-[#78C491] transition-colors flex-shrink-0">
              <Leaf className="w-4 h-4 text-[#78C491]" />
            </div>
            <div className="min-w-0">
              <span className="font-display tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm text-[#FAF8F2] uppercase block font-semibold group-hover:text-[#F2C96D] transition-colors whitespace-nowrap">
                The Journal
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-wider text-[#A8C4B2] uppercase font-sans-ui font-medium truncate hidden xs:block">
                A Living Garden
              </span>
            </div>
          </button>
        </div>

        {/* Center: Current Space Breadcrumb */}
        <div className="hidden md:flex items-center space-x-2 text-xs text-[#A8C4B2] font-sans-ui tracking-wider uppercase">
          <span className="text-[#78C491] font-semibold">Garden //</span>
          <span className="text-[#FAF8F2] font-bold tracking-widest">{currentTab.replace('-', ' ')}</span>
        </div>

        {/* Right: Seasons Selector, Nature Music, Atmosphere, Search, Write */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 flex-shrink-0">
          {/* Season Selector Pill */}
          <div className="relative">
            <button
              id="season-selector-button"
              onClick={() => setIsSeasonMenuOpen(!isSeasonMenuOpen)}
              className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-full text-xs font-sans-ui bg-[#182C22]/90 border border-white/20 text-[#FAF8F2] hover:border-[#78C491] shadow-md transition-all cursor-pointer"
              title={`Current Season: ${activeSeasonData.name}. Click to change season`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeSeasonData.accentColor }} />
              <span className="font-semibold capitalize text-[11px] tracking-wide hidden sm:inline">
                {season}
              </span>
              <span className="text-[10px] text-[#A8C4B2]">▾</span>
            </button>

            {/* Season Dropdown Menu */}
            {isSeasonMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0F1B16] border border-white/20 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 backdrop-blur-2xl">
                <div className="text-[10px] tracking-widest uppercase text-[#F2C96D] px-2.5 py-1 border-b border-white/10 font-bold flex items-center justify-between">
                  <span>Nature Seasons</span>
                  <span className="text-[9px] text-[#A8C4B2]">3D Particles</span>
                </div>
                <div className="py-1 space-y-1">
                  {seasonOptions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        onSeasonChange(s.id);
                        setIsSeasonMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        season === s.id
                          ? 'bg-[#2D5A3C] text-[#FAF8F2] font-semibold border border-[#78C491]/40'
                          : 'text-[#C5D9CD] hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span style={{ color: s.color }}>{s.icon}</span>
                        <div>
                          <span className="capitalize block font-medium">{s.label}</span>
                          <span className="text-[9px] text-[#A8C4B2] font-mono">
                            {SEASONS_DATA[s.id].months}
                          </span>
                        </div>
                      </div>
                      {season === s.id && (
                        <span className="w-2 h-2 rounded-full bg-[#F2C96D]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* YouTube Highland Nature Music Player Sanctuary Button */}
          <button
            id="nature-music-header-button"
            onClick={onOpenMusicPlayer}
            className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-full text-xs font-sans-ui bg-[#23382D] text-[#FAF9F5] hover:bg-[#2D483A] border border-[#F2C96D]/50 shadow-md transition-all cursor-pointer group"
            title="Open Misty Highland Shuffled Ambient Music Sanctuary"
          >
            <Music className="w-3.5 h-3.5 text-[#F2C96D] group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline tracking-wider uppercase text-[11px] font-bold">
              Highland Music
            </span>
          </button>

          {/* Ambience Procedural Soundscape Pill */}
          <div className="relative">
            <button
              id="ambience-control-pill"
              onClick={() => setIsAmbienceMenuOpen(!isAmbienceMenuOpen)}
              className={`flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-full text-xs font-sans-ui transition-all border cursor-pointer backdrop-blur-md ${
                isPlayingSound
                  ? 'bg-[#2D5A3C] text-[#FAF8F2] border-[#78C491]/50 shadow-md'
                  : 'bg-[#182C22]/90 text-[#C5D9CD] border-white/20 hover:text-white hover:bg-[#23382D]'
              }`}
              title="Layer Procedural Soundscape"
            >
              <span className={`inline-block w-2 h-2 rounded-full ${isPlayingSound ? 'bg-[#78C491] animate-pulse' : 'bg-[#E5849E]'}`} />
              <span className="hidden lg:inline tracking-wider uppercase text-[11px] font-medium">
                {isPlayingSound ? currentAmbience : 'Sounds'}
              </span>
              {isPlayingSound ? <Volume2 className="w-3.5 h-3.5 ml-0.5" /> : <VolumeX className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            {/* Ambience Dropdown Menu */}
            {isAmbienceMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0F1B16] border border-white/20 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 backdrop-blur-2xl">
                <div className="text-[10px] tracking-widest uppercase text-[#F2C96D] px-2 py-1 border-b border-white/10 font-bold">
                  Procedural Ambience
                </div>
                <div className="py-1 space-y-0.5">
                  {(['morning', 'rain', 'forest', 'night', 'library', 'silent'] as AmbienceType[]).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleSelectAmbience(preset)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs capitalize flex items-center justify-between transition-colors cursor-pointer ${
                        currentAmbience === preset && isPlayingSound
                          ? 'bg-[#2D5A3C] text-[#FAF8F2] font-semibold border border-[#78C491]/40'
                          : 'text-[#C5D9CD] hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{preset}</span>
                      {currentAmbience === preset && isPlayingSound && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F2C96D]" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="pt-1.5 border-t border-white/10 flex justify-between items-center px-1">
                  <span className="text-[10px] text-[#A8C4B2]">Sound Engine</span>
                  <button
                    onClick={handleToggleSound}
                    className="text-[10px] text-[#F2C96D] font-bold hover:underline cursor-pointer"
                  >
                    {isPlayingSound ? 'Mute' : 'Turn On'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Weather / Atmosphere Switcher */}
          <div className="hidden sm:flex items-center rounded-full bg-[#182C22]/90 border border-white/20 p-0.5 shadow-md">
            {weatherOptions.map((w) => (
              <button
                key={w.id}
                onClick={() => onThemeChange(w.id)}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === w.id
                    ? 'bg-[#2D5A3C] text-[#FAF8F2] shadow-sm border border-[#78C491]/40'
                    : 'text-[#C5D9CD] hover:text-white hover:bg-white/10'
                }`}
                title={`Switch atmosphere to ${w.label}`}
              >
                {w.icon}
              </button>
            ))}
          </div>

          {/* Discover Something Trigger */}
          <button
            id="random-entry-header-button"
            onClick={onOpenRandom}
            className="p-1.5 rounded-full bg-[#182C22]/90 border border-white/20 text-[#FAF8F2] hover:bg-[#23382D] hover:border-[#78C491] transition-colors shadow-md cursor-pointer"
            title="Discover Something (Random Wander)"
          >
            <Compass className="w-4 h-4 text-[#F2C96D]" />
          </button>

          {/* Search Trigger */}
          <button
            id="search-header-button"
            onClick={onOpenSearch}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#182C22]/90 border border-white/20 text-[#C5D9CD] hover:text-white hover:border-[#78C491] transition-colors shadow-md cursor-pointer"
            title="Search Archive"
          >
            <Search className="w-3.5 h-3.5 text-[#78C491]" />
            <span className="text-xs font-sans-ui hidden lg:inline font-medium">Search...</span>
            <kbd className="hidden xl:inline text-[10px] bg-black/40 px-1.5 py-0.5 rounded border border-white/15 text-[#A8C4B2] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* New Entry / Write Button */}
          <button
            id="new-entry-header-button"
            onClick={onOpenCMS}
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#2D5A3C] text-[#FAF8F2] hover:bg-[#39724C] transition-all text-xs font-bold shadow-lg border border-[#78C491]/40 cursor-pointer"
            title="Open Private CMS / Write Entry"
          >
            <Feather className="w-3.5 h-3.5 text-[#F2C96D]" />
            <span className="hidden sm:inline">Write</span>
          </button>
        </div>
      </div>
    </header>
  );
};
