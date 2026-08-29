import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Music,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Shuffle,
  Sparkles,
  Leaf,
  Disc3,
  ExternalLink,
  X,
  Layers,
  ChevronDown,
  ChevronUp,
  Mountain,
  Wind,
  Radio,
  Play,
  Pause,
} from 'lucide-react';
import { soundEngine } from '../../lib/soundEngine';

export interface AmbientTrack {
  id: string;
  videoId: string;
  title: string;
  artist: string;
  mood: string;
}

// Internal array of curated YouTube video ambient URLs
export const YOUTUBE_AMBIENT_TRACKS: AmbientTrack[] = [
  {
    id: 'track-1',
    videoId: '4p0Yc5mW81I',
    title: 'Ethereal Morning Haze & Misty Hills',
    artist: 'Highland Sanctuary Ambience',
    mood: 'Serene · Misty Pines · Dawn Sunlight',
  },
  {
    id: 'track-2',
    videoId: 'yPEj9uyhWo0',
    title: 'Alpine Solitude & Frosted Ridge',
    artist: 'Mountain Meadow Soundscape',
    mood: 'Peaceful · Cool Frost · Stillness',
  },
  {
    id: 'track-3',
    videoId: '9j4ywcWhpm0',
    title: 'Gentle Fog Over Valley Groves',
    artist: 'Ethereal Forest & Breeze',
    mood: 'Contemplative · Rolling Mist · Quiet',
  },
  {
    id: 'track-4',
    videoId: 'GHlnPvitC8o',
    title: 'Dawn Awakening in the Highlands',
    artist: 'Morning Light Sanctuary',
    mood: 'Gentle Glow · Golden Sun Rays · Solitude',
  },
];

interface AmbientMusicPlayerProps {
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const AmbientMusicPlayer: React.FC<AmbientMusicPlayerProps> = ({
  isOpen,
  onToggleOpen,
}) => {
  const tracks = YOUTUBE_AMBIENT_TRACKS;

  // 1. Initial mount shuffle: select a random track from the array on initial load
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(() => {
    return Math.floor(Math.random() * YOUTUBE_AMBIENT_TRACKS.length);
  });

  const [isShuffle, setIsShuffle] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isExpandedTracklist, setIsExpandedTracklist] = useState<boolean>(false);
  const [proceduralActive, setProceduralActive] = useState(soundEngine.getIsPlaying());
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Helper to pick a random track index different from current
  const getRandomTrackIndex = useCallback(
    (currentIndex: number): number => {
      if (tracks.length <= 1) return 0;
      let nextIndex = Math.floor(Math.random() * tracks.length);
      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * tracks.length);
      }
      return nextIndex;
    },
    [tracks.length]
  );

  // 2. Shuffle / Next track handler (triggers when a video ends or user clicks shuffle)
  const handleShuffleNext = useCallback(() => {
    if (isShuffle) {
      setCurrentTrackIndex((prev) => getRandomTrackIndex(prev));
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
  }, [isShuffle, getRandomTrackIndex, tracks.length]);

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
  };

  const handleToggleProcedural = () => {
    const active = soundEngine.toggleMute();
    setProceduralActive(active);
  };

  // 3. Build embed URL with autoplay=1, loop=1, and playlist=[videoId] query parameters
  const origin = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';
  const embedUrl = `https://www.youtube.com/embed/${currentTrack.videoId}?autoplay=1&loop=1&playlist=${currentTrack.videoId}&enablejsapi=1&playsinline=1&rel=0&origin=${origin}`;

  // 4. Send play/pause commands to YouTube IFrame API
  const sendIframeCommand = useCallback((func: string, args: any = '') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      sendIframeCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      sendIframeCommand('playVideo');
      setIsPlaying(true);
    }
  };

  // 5. Automatic detection when video ends -> trigger shuffle next track
  useEffect(() => {
    const handleYouTubeMessage = (event: MessageEvent) => {
      try {
        if (!event.data) return;
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        // YouTube IFrame API state codes:
        // 0: ENDED (video finished)
        // 1: PLAYING
        // 2: PAUSED
        if (data) {
          if (data.event === 'onStateChange' || typeof data.info === 'number') {
            if (data.info === 0) {
              // Video has ended -> Trigger next shuffled track automatically
              handleShuffleNext();
            } else if (data.info === 1) {
              setIsPlaying(true);
            } else if (data.info === 2) {
              setIsPlaying(false);
            }
          }
        }
      } catch (e) {
        // Ignore non-json cross-origin messages
      }
    };

    window.addEventListener('message', handleYouTubeMessage);
    return () => {
      window.removeEventListener('message', handleYouTubeMessage);
    };
  }, [handleShuffleNext]);

  // 6. Guarantee autoplay upon active window / first user gesture on the website
  useEffect(() => {
    const triggerAutoplayOnGesture = () => {
      setHasUserInteracted(true);
      sendIframeCommand('playVideo');
      window.removeEventListener('pointerdown', triggerAutoplayOnGesture);
      window.removeEventListener('keydown', triggerAutoplayOnGesture);
      window.removeEventListener('touchstart', triggerAutoplayOnGesture);
    };

    window.addEventListener('pointerdown', triggerAutoplayOnGesture, { once: true });
    window.addEventListener('keydown', triggerAutoplayOnGesture, { once: true });
    window.addEventListener('touchstart', triggerAutoplayOnGesture, { once: true });

    // Also attempt immediate programmatic play command on mount
    const timer = setTimeout(() => {
      sendIframeCommand('playVideo');
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', triggerAutoplayOnGesture);
      window.removeEventListener('keydown', triggerAutoplayOnGesture);
      window.removeEventListener('touchstart', triggerAutoplayOnGesture);
    };
  }, [sendIframeCommand, currentTrackIndex]);

  return (
    <>
      {/* ─── Persistent Background Video Container (ALWAYS in DOM for seamless playback) ─── */}
      <div
        className={`fixed transition-all duration-300 z-50 ${
          isOpen
            ? 'bottom-20 right-6 w-[90vw] sm:w-[392px] h-[220px] rounded-2xl overflow-hidden shadow-2xl border border-[#78966A]/30 bg-black opacity-100 pointer-events-auto'
            : 'bottom-0 right-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden'
        }`}
        style={!isOpen ? { position: 'fixed', left: '-9999px', top: '-9999px' } : undefined}
      >
        <iframe
          ref={iframeRef}
          key={currentTrack.videoId}
          className="w-full h-full border-0"
          src={embedUrl}
          title={currentTrack.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* ─── Floating Mini Sanctuary Disc / Bar when Closed ─── */}
      {!isOpen && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="fixed bottom-6 right-6 z-40 flex items-center space-x-2"
        >
          {/* Quick Play/Pause on Mini Dock */}
          <button
            onClick={handleTogglePlay}
            className="p-2.5 rounded-full bg-[#FAF9F5]/95 text-[#2A3F35] backdrop-blur-md shadow-lg border border-[#78966A]/30 hover:bg-white hover:scale-105 transition-all cursor-pointer hidden sm:flex items-center justify-center"
            title={isPlaying ? 'Pause Ambient Stream' : 'Play Ambient Stream'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Quick Shuffle Button */}
          <button
            onClick={handleShuffleNext}
            className="p-2.5 rounded-full bg-[#FAF9F5]/95 text-[#3F6248] backdrop-blur-md shadow-lg border border-[#78966A]/30 hover:bg-white hover:scale-105 transition-all cursor-pointer hidden sm:flex items-center justify-center"
            title="Shuffle to Next Ambient Track"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          {/* Main Floating Deck Trigger */}
          <button
            onClick={onToggleOpen}
            className="p-3 rounded-full bg-[#2A3F35] text-[#F7F8F2] shadow-2xl hover:bg-[#1C2C25] hover:scale-105 transition-all flex items-center space-x-3 border border-[#E5B26E]/50 cursor-pointer group"
            title="Open Misty Alpine Music Sanctuary"
          >
            <div className="relative flex items-center justify-center">
              <Disc3
                className={`w-5 h-5 text-[#E5B26E] ${
                  isPlaying ? 'animate-spin [animation-duration:9s]' : ''
                }`}
              />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E5B26E] animate-ping" />
            </div>
            <div className="text-left hidden sm:block pr-1">
              <span className="text-[10px] font-mono text-[#E5B26E] uppercase tracking-wider block">
                Track {currentTrackIndex + 1}/{tracks.length} · {isShuffle ? 'Shuffled' : 'Sequential'}
              </span>
              <span className="text-xs font-serif-body italic text-[#F7F8F2] truncate max-w-[160px] block">
                {currentTrack.title}
              </span>
            </div>
          </button>
        </motion.div>
      )}

      {/* ─── Ambient Music Sanctuary Deck Drawer / Modal ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 w-[94vw] sm:w-[440px] max-h-[88vh] bg-[#FAF9F5]/98 backdrop-blur-2xl border border-[#78966A]/30 rounded-3xl shadow-2xl modern-paper overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* Header: Misty Alpine Aesthetic */}
            <div className="px-5 py-4 border-b border-[#78966A]/20 flex items-center justify-between bg-gradient-to-r from-[#2A3F35] to-[#3B5448] text-white">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#1C2C25] text-[#E5B26E] border border-[#E5B26E]/40 flex items-center justify-center shadow-inner">
                  <Mountain className="w-4 h-4 text-[#E5B26E]" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-medium text-[#FAF9F5] tracking-wide flex items-center space-x-1.5">
                    <span>Misty Highland Music</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#E5B26E]/20 text-[#E5B26E] text-[9px] font-mono uppercase">
                      Autoplay & Loop
                    </span>
                  </h4>
                  <p className="text-[10px] font-mono text-[#D8E2DC] uppercase tracking-wider flex items-center space-x-1">
                    <Radio className="w-3 h-3 text-[#E5B26E]" />
                    <span>Continuous Ambient Soundscape</span>
                  </p>
                </div>
              </div>

              <button
                onClick={onToggleOpen}
                className="p-1.5 rounded-full hover:bg-white/15 text-[#D8E2DC] hover:text-white transition-colors cursor-pointer"
                title="Minimize Sanctuary Deck"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(88vh-130px)]">
              {/* Spacer for the positioned persistent iframe above */}
              <div className="w-full aspect-video rounded-2xl bg-black/5 flex items-center justify-center border border-dashed border-[#78966A]/30">
                <div className="text-center p-4">
                  <Disc3 className="w-6 h-6 text-[#78966A] animate-spin mx-auto mb-2 [animation-duration:10s]" />
                  <span className="text-xs font-mono text-[#6B7B6C] uppercase tracking-wider block">
                    Highland Video Stream Active
                  </span>
                </div>
              </div>

              {/* Active Track Metadata & Controls */}
              <div className="p-4 rounded-2xl bg-white/90 border border-[#78966A]/20 shadow-sm space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#3F6248] uppercase tracking-widest font-semibold flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-[#E5B26E]" />
                      <span>
                        Track {currentTrackIndex + 1} of {tracks.length} · Auto-Shuffling
                      </span>
                    </span>
                    <h5 className="text-base font-display text-[#253326] font-medium leading-snug">
                      {currentTrack.title}
                    </h5>
                    <p className="text-xs font-serif-body italic text-[#6B7B6C]">
                      {currentTrack.mood}
                    </p>
                  </div>

                  <a
                    href={`https://www.youtube.com/watch?v=${currentTrack.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-[#78966A] hover:text-[#2A3F35] hover:bg-[#78966A]/10 transition-colors"
                    title="Open on YouTube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Playback Control Bar: Play/Pause, Shuffle, Prev, Next */}
                <div className="pt-2 border-t border-[#78966A]/15 flex items-center justify-between">
                  {/* Shuffle Toggle */}
                  <button
                    onClick={() => setIsShuffle(!isShuffle)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-sans-ui transition-all cursor-pointer ${
                      isShuffle
                        ? 'bg-[#2A3F35] text-[#E5B26E] shadow-sm font-semibold'
                        : 'bg-[#F3EEDC] text-[#6B7B6C] hover:text-[#253326]'
                    }`}
                    title="Toggle Random Shuffle on Finish"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Shuffle {isShuffle ? 'Active' : 'Off'}</span>
                  </button>

                  {/* Play & Skip Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handlePrevTrack}
                      className="p-2 rounded-full bg-[#FAF9F5] border border-[#78966A]/25 text-[#3F6248] hover:bg-[#3F6248] hover:text-white transition-all cursor-pointer"
                      title="Previous Track"
                    >
                      <SkipBack className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleTogglePlay}
                      className="p-2 rounded-full bg-[#FAF9F5] border border-[#78966A]/25 text-[#2A3F35] hover:bg-[#2A3F35] hover:text-white transition-all cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={handleShuffleNext}
                      className="px-3.5 py-1.5 rounded-full bg-[#3F6248] text-white hover:bg-[#2A3F35] transition-all flex items-center space-x-1 text-xs font-medium cursor-pointer shadow-sm"
                      title="Shuffle to Next Track"
                    >
                      <span>Next Shuffled</span>
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Shuffled Playlist Selector Accordion */}
              <div className="rounded-2xl border border-[#78966A]/20 bg-white/70 overflow-hidden">
                <button
                  onClick={() => setIsExpandedTracklist(!isExpandedTracklist)}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-mono uppercase text-[#3F6248] font-semibold hover:bg-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <Music className="w-3.5 h-3.5 text-[#E5B26E]" />
                    <span>Ambient Playlist ({tracks.length} Tracks)</span>
                  </div>
                  {isExpandedTracklist ? (
                    <ChevronUp className="w-4 h-4 text-[#78966A]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#78966A]" />
                  )}
                </button>

                {isExpandedTracklist && (
                  <div className="p-2 space-y-1.5 border-t border-[#78966A]/10 bg-white/90">
                    {tracks.map((track, idx) => {
                      const isSelected = idx === currentTrackIndex;
                      return (
                        <div
                          key={track.id}
                          onClick={() => handleSelectTrack(idx)}
                          className={`p-2.5 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#2A3F35] text-[#FAF9F5] shadow-sm'
                              : 'hover:bg-[#F3EEDC] text-[#253326]'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span
                              className={`w-5 h-5 rounded-full text-[10px] font-mono flex items-center justify-center font-bold ${
                                isSelected
                                  ? 'bg-[#E5B26E] text-[#2A3F35]'
                                  : 'bg-[#78966A]/15 text-[#3F6248]'
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <div>
                              <h6
                                className={`text-xs font-display font-medium line-clamp-1 ${
                                  isSelected ? 'text-[#FAF9F5]' : 'text-[#253326]'
                                }`}
                              >
                                {track.title}
                              </h6>
                              <p
                                className={`text-[10px] font-serif-body italic ${
                                  isSelected ? 'text-[#D8E2DC]' : 'text-[#6B7B6C]'
                                }`}
                              >
                                {track.mood}
                              </p>
                            </div>
                          </div>

                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#E5B26E] animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Multi-Layer Procedural Mist & Nature Sound Toggle */}
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#78966A]/20 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Layers className="w-4 h-4 text-[#78966A]" />
                  <div>
                    <span className="text-xs font-sans-ui text-[#253326] font-medium block">
                      Procedural Mountain Breeze
                    </span>
                    <span className="text-[10px] font-mono text-[#848D80]">
                      Layer ambient synthesis over music
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleToggleProcedural}
                  className={`px-3 py-1 rounded-full text-xs font-sans-ui font-medium transition-all cursor-pointer ${
                    proceduralActive
                      ? 'bg-[#2A3F35] text-[#E5B26E] shadow-sm'
                      : 'bg-white text-[#6B7B6C] border border-[#78966A]/25 hover:text-[#253326]'
                  }`}
                >
                  {proceduralActive ? 'Active' : 'Muted'}
                </button>
              </div>
            </div>

            {/* Botanical Footer Bar */}
            <div className="px-5 py-3 border-t border-[#78966A]/20 bg-white/80 flex items-center justify-between text-[10px] font-mono text-[#78966A]">
              <span className="flex items-center space-x-1">
                <Leaf className="w-3 h-3 text-[#78966A]" />
                <span>Autoplay & Continuous Loop Stream Active</span>
              </span>
              <button
                onClick={onToggleOpen}
                className="text-[#2A3F35] hover:underline font-semibold cursor-pointer"
              >
                Minimize Deck ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
