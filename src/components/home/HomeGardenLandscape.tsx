import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sun,
  Cloud,
  Moon,
  CloudRain,
  Sunset,
  Sparkles,
  ArrowRight,
  BookOpen,
  Bookmark,
  Droplets,
  Compass,
  Calendar,
  Leaf,
  Clock,
  Volume2,
  VolumeX,
  Music,
  Flower2,
  Trees,
  CloudSnow,
  Radio,
} from 'lucide-react';
import { ArchiveEntry, GardenAtmosphere, RoomTheme, Season } from '../../types';
import { LivingArchiveTree } from '../tree/LivingArchiveTree';
import { soundEngine } from '../../lib/soundEngine';
import { SEASONS_DATA } from '../../lib/seasonUtils';

interface HomeGardenLandscapeProps {
  entries: ArchiveEntry[];
  currentAtmosphere: GardenAtmosphere;
  currentSeason: Season;
  onAtmosphereChange: (atmosphere: GardenAtmosphere) => void;
  onSeasonChange: (season: Season) => void;
  onSelectEntry: (entry: ArchiveEntry) => void;
  onNavigate: (tab: string) => void;
  onOpenRandom: () => void;
  onOpenOnThisDay: () => void;
  onOpenMusicPlayer: () => void;
}

export const HomeGardenLandscape: React.FC<HomeGardenLandscapeProps> = ({
  entries,
  currentAtmosphere,
  currentSeason,
  onAtmosphereChange,
  onSeasonChange,
  onSelectEntry,
  onNavigate,
  onOpenRandom,
  onOpenOnThisDay,
  onOpenMusicPlayer,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(soundEngine.getIsPlaying());

  const featuredEntry = entries.find((e) => e.isFeatured) || entries[0];
  const devotionals = entries.filter((e) => e.type === 'devotional');
  const reflections = entries.filter((e) => e.type === 'reflection');
  const journals = entries.filter((e) => e.type === 'journal');

  const handleToggleSound = () => {
    const active = soundEngine.toggleMute();
    setIsPlayingAudio(active);
  };

  const weatherOptions: { id: GardenAtmosphere; label: string; icon: React.ReactNode }[] = [
    { id: 'morning', label: 'Morning', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'afternoon', label: 'Afternoon', icon: <Cloud className="w-3.5 h-3.5" /> },
    { id: 'evening', label: 'Golden Hour', icon: <Sunset className="w-3.5 h-3.5" /> },
    { id: 'night', label: 'Night', icon: <Moon className="w-3.5 h-3.5" /> },
    { id: 'rain', label: 'Rain', icon: <CloudRain className="w-3.5 h-3.5" /> },
  ];

  const seasonalCards: { id: Season; icon: React.ReactNode }[] = [
    { id: 'spring', icon: <Flower2 className="w-4 h-4 text-[#84B082]" /> },
    { id: 'summer', icon: <Sun className="w-4 h-4 text-[#F2C96D]" /> },
    { id: 'autumn', icon: <Trees className="w-4 h-4 text-[#D97736]" /> },
    { id: 'winter', icon: <CloudSnow className="w-4 h-4 text-[#8EC5C1]" /> },
  ];

  return (
    <div className="space-y-24 pb-28">
      {/* ─── 05. The Hero ─── */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-4 pt-12 pb-16">
        {/* Environmental Atmosphere Pill & Sound Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {/* Weather Buttons */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#0F1B16]/80 border border-white/20 backdrop-blur-xl shadow-lg">
            {weatherOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  onAtmosphereChange(opt.id);
                  if (soundEngine.getIsPlaying()) {
                    const mappedAmbience = opt.id === 'afternoon' || opt.id === 'evening' ? 'forest' : opt.id;
                    soundEngine.setPreset(mappedAmbience);
                  }
                }}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-sans-ui transition-all cursor-pointer ${
                  currentAtmosphere === opt.id
                    ? 'bg-[#2D5A3C] text-[#FAF8F2] font-semibold shadow-md border border-[#78C491]/40'
                    : 'text-[#C5D9CD] hover:text-[#FFFFFF] hover:bg-white/10'
                }`}
              >
                {opt.icon}
                <span className="hidden sm:inline">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* YouTube Highland Nature Music Player Trigger */}
          <button
            onClick={onOpenMusicPlayer}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#23382D]/90 text-[#FAF9F5] hover:bg-[#2D483A] transition-all shadow-lg cursor-pointer text-xs font-medium border border-[#F2C96D]/50"
            title="Listen to Misty Highland Shuffled Ambient Tracks"
          >
            <Music className="w-3.5 h-3.5 text-[#F2C96D]" />
            <span className="tracking-wide">Highland Music</span>
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-full border transition-all cursor-pointer backdrop-blur-md ${
              isPlayingAudio
                ? 'bg-[#2D5A3C] text-[#FAF8F2] border-[#78C491]/50 shadow-md'
                : 'bg-[#0F1B16]/80 text-[#C5D9CD] border-white/20 hover:text-white hover:bg-white/15'
            }`}
            title={isPlayingAudio ? 'Mute procedural nature sounds' : 'Listen to procedural nature sounds'}
          >
            {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </motion.div>

        {/* Hero Title & Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.15 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0F1B16]/75 border border-white/20 backdrop-blur-md text-[11px] font-mono text-[#E8F0E9] uppercase tracking-widest shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#78C491] animate-pulse" />
            <span className="font-medium text-[#FAF8F2]">Active Season: {SEASONS_DATA[currentSeason].name}</span>
            <span className="text-[#A8C4B2]">·</span>
            <span className="text-[#C5D9CD]">{SEASONS_DATA[currentSeason].particleDescription}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-normal text-[#FAF8F2] tracking-tight leading-none drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]">
            THE JOURNAL
          </h1>

          <p className="font-display italic text-xl sm:text-2xl text-[#E8F0E9] max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            Thoughts gathered along the way.
          </p>
        </motion.div>

        {/* Enter Archive Scroll Cue */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-12 flex flex-col items-center space-y-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('landscape-paper');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-full bg-[#2D5A3C] text-[#FAF8F2] font-sans-ui text-xs uppercase tracking-widest hover:bg-[#39724C] transition-all shadow-xl flex items-center space-x-2 cursor-pointer font-semibold border border-[#78C491]/40"
            >
              <span>Wander the Garden</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenRandom}
              className="px-5 py-2.5 rounded-full bg-[#0F1B16]/75 border border-white/25 text-[#FAF8F2] font-sans-ui text-xs uppercase tracking-widest hover:bg-[#182C22] transition-all shadow-lg backdrop-blur-md flex items-center space-x-2 cursor-pointer font-medium"
            >
              <Compass className="w-3.5 h-3.5 text-[#F2C96D]" />
              <span>Discover Something</span>
            </button>

            <button
              onClick={onOpenMusicPlayer}
              className="px-5 py-2.5 rounded-full bg-[#0F1B16]/75 border border-[#F2C96D]/50 text-[#FAF8F2] font-sans-ui text-xs uppercase tracking-widest hover:bg-[#182C22] transition-all shadow-lg backdrop-blur-md flex items-center space-x-2 cursor-pointer font-medium"
            >
              <Music className="w-3.5 h-3.5 text-[#F2C96D]" />
              <span>Nature Ambience</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-[#D8E6DC] tracking-widest uppercase flex items-center space-x-1 pt-2 drop-shadow-sm font-medium">
            <span>Scroll to travel</span>
            <span>↓</span>
          </span>
        </motion.div>
      </section>

      {/* ─── 09. Landscape 1: The Latest Writing (Paper on Wooden Table) ─── */}
      <section id="landscape-paper" className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/20 pb-3">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-[#E8F0E9] drop-shadow-sm font-semibold">
            <BookOpen className="w-4 h-4 text-[#F2C96D]" />
            <span>The Latest Writing · Fresh Ink</span>
          </div>
          <span className="text-xs font-mono text-[#C5D9CD] drop-shadow-sm">
            {featuredEntry.month} {featuredEntry.day}, {featuredEntry.year}
          </span>
        </div>

        {/* Paper Sheet Resting on Desk */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onSelectEntry(featuredEntry)}
          className="relative p-8 sm:p-12 rounded-2xl bg-[#FAF8F2]/95 backdrop-blur-md border border-[#78966A]/30 shadow-2xl cursor-pointer overflow-hidden transition-all group"
        >
          {/* Subtle paper fold top right corner */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-transparent via-[#E8E1D5]/40 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-[#78966A]/15 text-[#2D5A3C] text-[10px] font-mono uppercase tracking-widest font-bold border border-[#78966A]/30">
                {featuredEntry.type}
              </span>
              {featuredEntry.scriptures[0] && (
                <span className="text-xs text-[#B86E4B] font-serif-body italic font-medium">
                  {featuredEntry.scriptures[0]}
                </span>
              )}
              <span className="text-xs text-[#6B7B6C] font-sans-ui">· {featuredEntry.readingTimeMinutes} min read</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#18261E] font-normal leading-tight group-hover:text-[#2D5A3C] transition-colors">
                {featuredEntry.title}
              </h2>
              <p className="mt-4 text-base sm:text-lg font-serif-body text-[#3B4C3F] leading-relaxed max-w-3xl line-clamp-3">
                {featuredEntry.excerpt}
              </p>
            </div>

            {/* Handwritten Signature Annotation */}
            <div className="pt-2 font-handwriting text-xl sm:text-2xl text-[#B86E4B]">
              “I want to remember this season.”
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[#78966A]/15">
              <div className="flex flex-wrap gap-2">
                {featuredEntry.topics.map((t) => (
                  <span key={t} className="text-xs text-[#526B57] font-mono uppercase bg-[#78966A]/10 px-2 py-0.5 rounded-md border border-[#78966A]/15">
                    #{t}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans-ui text-[#2D5A3C] font-bold group-hover:translate-x-1 transition-transform">
                <span>Open Paper</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── 10 & 11. The Living Archive Tree (Writings as Leaves) ─── */}
      <section className="space-y-4">
        <LivingArchiveTree entries={entries} onSelectEntry={onSelectEntry} />
      </section>

      {/* ─── 12 & 13. Content Metaphors: Devotionals as Light & Reflections as Water ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Devotionals as Light */}
        <div className="p-8 rounded-3xl bg-[#0F1B16]/85 backdrop-blur-xl border border-[#F2C96D]/40 shadow-2xl space-y-6 text-[#FAF8F2]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#F2C96D] font-bold">
              <Sun className="w-4 h-4" />
              <span>Devotionals as Light</span>
            </div>
            <span className="text-xs font-mono text-[#C5D9CD]">{devotionals.length} Sacred Lights</span>
          </div>

          <h3 className="text-2xl font-display text-[#FAF8F2]">
            The Illuminations
          </h3>
          <p className="text-xs font-serif-body text-[#D4E3DA] leading-relaxed">
            Each devotional is a small point of light. The more truth gathered, the brighter the sanctuary becomes.
          </p>

          <div className="space-y-3 pt-2">
            {devotionals.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                onClick={() => onSelectEntry(entry)}
                className="group p-4 rounded-xl bg-[#182C22]/80 border border-[#F2C96D]/30 hover:border-[#F2C96D] transition-all cursor-pointer flex items-center justify-between shadow-md"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#F2C96D] uppercase font-semibold">
                    {entry.scriptures[0] || 'Scripture'}
                  </span>
                  <h4 className="text-sm font-display text-[#FAF8F2] group-hover:text-[#F2C96D] transition-colors font-medium">
                    {entry.title}
                  </h4>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#F2C96D] group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('devotionals')}
            className="w-full py-2.5 rounded-xl border border-[#F2C96D]/50 text-xs font-sans-ui uppercase tracking-wider text-[#F2C96D] hover:bg-[#F2C96D]/20 transition-all text-center font-bold cursor-pointer shadow-sm"
          >
            Enter Devotional Library →
          </button>
        </div>

        {/* Reflections as Water */}
        <div className="p-8 rounded-3xl bg-[#0D2020]/85 backdrop-blur-xl border border-[#8EC5C1]/40 shadow-2xl space-y-6 text-[#FAF8F2]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8EC5C1] font-bold">
              <Droplets className="w-4 h-4" />
              <span>Reflections as Water</span>
            </div>
            <span className="text-xs font-mono text-[#C5D9CD]">{reflections.length} Tranquil Ripples</span>
          </div>

          <h3 className="text-2xl font-display text-[#FAF8F2]">
            The Rippling Pond
          </h3>
          <p className="text-xs font-serif-body text-[#C6E2DF] leading-relaxed">
            Shorter thoughts and deep contemplation cast into the water, sending subtle ripples through memory.
          </p>

          <div className="space-y-3 pt-2">
            {reflections.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                onClick={() => onSelectEntry(entry)}
                className="group p-4 rounded-xl bg-[#152E2E]/80 border border-[#8EC5C1]/30 hover:border-[#8EC5C1] transition-all cursor-pointer flex items-center justify-between shadow-md"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#8EC5C1] uppercase font-semibold">
                    {entry.month} {entry.year}
                  </span>
                  <h4 className="text-sm font-display text-[#FAF8F2] group-hover:text-[#8EC5C1] transition-colors font-medium">
                    {entry.title}
                  </h4>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#8EC5C1] group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('reflections')}
            className="w-full py-2.5 rounded-xl border border-[#8EC5C1]/50 text-xs font-sans-ui uppercase tracking-wider text-[#8EC5C1] hover:bg-[#8EC5C1]/20 transition-all text-center font-bold cursor-pointer shadow-sm"
          >
            Visit The Pond →
          </button>
        </div>
      </section>

      {/* ─── 15. The Dynamic Seasons of the Garden ─── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/20 pb-3">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-[#E8F0E9] drop-shadow-sm font-semibold">
            <Sparkles className="w-4 h-4 text-[#F2C96D]" />
            <span>Living Seasonal Atmospheres</span>
          </div>
          <span className="text-xs font-mono text-[#C5D9CD] drop-shadow-sm">
            Click any season to adjust 3D particles & foliage
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seasonalCards.map(({ id, icon }) => {
            const data = SEASONS_DATA[id];
            const isSelected = currentSeason === id;

            return (
              <motion.div
                key={id}
                whileHover={{ y: -3 }}
                onClick={() => onSeasonChange(id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden backdrop-blur-xl ${
                  isSelected
                    ? 'bg-[#182C22]/95 shadow-2xl ring-2'
                    : 'bg-[#0F1B16]/80 hover:bg-[#182C22]/85 border-white/15'
                }`}
                style={{
                  borderColor: isSelected ? data.accentColor : undefined,
                  boxShadow: isSelected ? `0 12px 30px -5px ${data.accentColor}44` : undefined,
                }}
              >
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: data.accentColor }}
                  />
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {icon}
                    <span
                      className="text-xs font-mono uppercase tracking-widest font-bold"
                      style={{ color: isSelected ? data.accentColor : '#FAF8F2' }}
                    >
                      {data.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#A8C4B2]">
                    {data.months}
                  </span>
                </div>

                <h4 className="text-sm font-display text-[#FAF8F2] font-semibold">
                  {data.subtitle}
                </h4>

                <p className="text-xs font-serif-body text-[#C5D9CD] mt-1.5 line-clamp-2 leading-relaxed">
                  {data.themePhrase}
                </p>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#A8C4B2] truncate max-w-[170px]">
                    {data.particleDescription}
                  </span>
                  {isSelected && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] uppercase font-bold text-white tracking-wider shadow-sm"
                      style={{ backgroundColor: data.accentColor }}
                    >
                      Active
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── 25. Discover Something & Time-Capsule Exploration ─── */}
      <section className="p-8 rounded-3xl bg-[#0F1B16]/85 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-[#FAF8F2]">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-[#F2C96D] font-bold">
            Exploratory Wandering
          </span>
          <h3 className="text-2xl font-display text-[#FAF8F2] font-semibold">
            Let the garden surprise you
          </h3>
          <p className="text-xs font-serif-body text-[#C5D9CD] max-w-md leading-relaxed">
            Wander back to an unexpected day or season from your archive history.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onOpenRandom}
            className="px-6 py-3 rounded-full bg-[#2D5A3C] text-[#FAF8F2] text-xs font-sans-ui uppercase tracking-wider hover:bg-[#39724C] transition-all shadow-xl flex items-center space-x-2 cursor-pointer font-bold border border-[#78C491]/40"
          >
            <Compass className="w-4 h-4 text-[#F2C96D]" />
            <span>Discover Something</span>
          </button>

          <button
            onClick={onOpenOnThisDay}
            className="px-6 py-3 rounded-full bg-[#182C22] border border-white/25 text-[#FAF8F2] text-xs font-sans-ui uppercase tracking-wider hover:bg-[#23382D] transition-all shadow-lg flex items-center space-x-2 cursor-pointer font-bold"
          >
            <Calendar className="w-4 h-4 text-[#78C491]" />
            <span>On This Day</span>
          </button>
        </div>
      </section>
    </div>
  );
};
