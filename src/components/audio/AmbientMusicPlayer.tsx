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
    id: 'user-track-1',
    videoId: 'i9Yz7v_3rrI',
    title: 'Peaceful Worship & Highland Reflections',
    artist: 'Highland Sanctuary Ambience',
    mood: 'Serene · Acoustic Praise · Deep Stillness',
  },
  {
    id: 'user-track-2',
    videoId: '-UIxUGbQDJw',
    title: 'Solitude in the Mist & Gentle Hymns',
    artist: 'Misty Forest Sanctuary',
    mood: 'Contemplative · Mountain Solitude · Dawn Light',
  },
  {
    id: 'user-track-3',
    videoId: '6zYYjSiLxKg',
    title: 'Quiet Valley Prayer & Deep Instrumental Peace',
    artist: 'Valley Groves Soundscape',
    mood: 'Peaceful · Rolling Clouds · Gentle Breeze',
  },
  {
    id: 'user-track-4',
    videoId: 'hRrn3IJjfoU',
    title: 'Eternal Sanctuary & Mountain Sunset Hymns',
    artist: 'Highland Sunset Acoustic',
    mood: 'Warm Gold · Restful Dusk · Eternal Security',
  },
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

  // 6. Guarantee autoplay upon active window / first user gesture / portal entry on mobile
  useEffect(() => {
    const triggerAutoplay = () => {
      setHasUserInteracted(true);
      sendIframeCommand('playVideo');
      setIsPlaying(true);
      // Also wake up sound engine Web Audio context if needed
      soundEngine.initAudioContext();
    };

    const handleGlobalGesture = () => {
      triggerAutoplay();
      window.removeEventListener('pointerdown', handleGlobalGesture);
      window.removeEventListener('keydown', handleGlobalGesture);
      window.removeEventListener('touchstart', handleGlobalGesture);
      window.removeEventListener('touchend', handleGlobalGesture);
      window.removeEventListener('touchmove', handleGlobalGesture);
      window.removeEventListener('scroll', handleGlobalGesture);
      window.removeEventListener('click', handleGlobalGesture);
    };

    const handlePortalEntryEvent = () => {
      triggerAutoplay();
    };

    window.addEventListener('pointerdown', handleGlobalGesture, { passive: true });
    window.addEventListener('keydown', handleGlobalGesture, { passive: true });
    window.addEventListener('touchstart', handleGlobalGesture, { passive: true });
    window.addEventListener('touchend', handleGlobalGesture, { passive: true });
    window.addEventListener('touchmove', handleGlobalGesture, { passive: true });
    window.addEventListener('scroll', handleGlobalGesture, { passive: true });
    window.addEventListener('click', handleGlobalGesture, { passive: true });
    window.addEventListener('trigger-audio-autoplay', handlePortalEntryEvent);

    // Also attempt immediate programmatic play commands on mount
    const timer1 = setTimeout(() => {
      sendIframeCommand('playVideo');
    }, 400);

    const timer2 = setTimeout(() => {
      sendIframeCommand('playVideo');
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('pointerdown', handleGlobalGesture);
      window.removeEventListener('keydown', handleGlobalGesture);
      window.removeEventListener('touchstart', handleGlobalGesture);
      window.removeEventListener('touchend', handleGlobalGesture);
      window.removeEventListener('touchmove', handleGlobalGesture);
      window.removeEventListener('scroll', handleGlobalGesture);
      window.removeEventListener('click', handleGlobalGesture);
      window.removeEventListener('trigger-audio-autoplay', handlePortalEntryEvent);
    };
  }, [sendIframeCommand, currentTrackIndex]);

  return (
    <>
      {/* ─── Persistent Background Video Container (ALWAYS in DOM for seamless playback) ─── */}
      <div
        className={`fixed transition-all duration-300 z-50 ${
          isOpen
            ? 'bottom-20 sm:bottom-24 right-3 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[392px] h-[200px] sm:h-[220px] rounded-2xl overflow-hidden shadow-2xl border border-[#78966A]/30 bg-black opacity-100 pointer-events-auto'
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

      {/* ─── Floating Mini Sanctuary Disc / Bar when Closed (Mobile-Optimized with perfect clearance) ─── */}
      {!isOpen && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="fixed bottom-[4.5rem] right-3 sm:bottom-6 sm:right-6 z-30 flex items-center space-x-1.5 sm:space-x-2"
        >
          {/* Quick Play/Pause on Mini Dock */}
          <button
            onClick={handleTogglePlay}
            className="p-2 sm:p-2.5 rounded-full bg-[#FAF9F5]/95 text-[#2A3F35] backdrop-blur-md shadow-lg border border-[#78966A]/30 hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center min-w-[38px] min-h-[38px]"
            title={isPlaying ? 'Pause Ambient Stream' : 'Play Ambient Stream'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Quick Shuffle Button */}
          <button
            onClick={handleShuffleNext}
            className="p-2 sm:p-2.5 rounded-full bg-[#FAF9F5]/95 text-[#3F6248] backdrop-blur-md shadow-lg border border-[#78966A]/30 hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer hidden xs:flex items-center justify-center min-w-[38px] min-h-[38px]"
            title="Shuffle to Next Ambient Track"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>

          {/* Main Floating Deck Trigger */}
          <button
            onClick={onToggleOpen}
            className="p-2 sm:p-2.5 rounded-full bg-[#2A3F35] text-[#F7F8F2] shadow-2xl hover:bg-[#1C2C25] hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 sm:space-x-3 border border-[#E5B26E]/50 cursor-pointer group"
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
            className="fixed bottom-2 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[440px] max-h-[88vh] bg-[#FAF9F5]/98 backdrop-blur-2xl border border-[#78966A]/30 rounded-3xl shadow-2xl modern-paper overflow-hidden flex flex-col pointer-events-auto"
          >
            {/* Header: Misty Alpine Aesthetic */}
            <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#78966A]/20 flex items-center justify-between bg-gradient-to-r from-[#2A3F35] to-[#3B5448] text-white flex-shrink-0">
              <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1C2C25] text-[#E5B26E] border border-[#E5B26E]/40 flex items-center justify-center shadow-inner flex-shrink-0">
                  <Mountain className="w-4 h-4 text-[#E5B26E]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-display font-medium text-[#FAF9F5] tracking-wide flex items-center space-x-1.5">
                    <span className="truncate">Highland Music</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#E5B26E]/20 text-[#E5B26E] text-[8px] sm:text-[9px] font-mono uppercase flex-shrink-0">
                      Autoplay
                    </span>
                  </h4>
                  <p className="text-[9px] sm:text-[10px] font-mono text-[#D8E2DC] uppercase tracking-wider flex items-center space-x-1 truncate">
                    <Radio className="w-3 h-3 text-[#E5B26E] flex-shrink-0" />
                    <span className="truncate">Continuous Ambient Stream</span>
                  </p>
                </div>
              </div>

              <button
                onClick={onToggleOpen}
                className="p-1.5 rounded-full hover:bg-white/15 text-[#D8E2DC] hover:text-white transition-colors cursor-pointer flex-shrink-0"
                title="Minimize Sanctuary Deck"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto max-h-[calc(88vh-130px)]">
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
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 border border-[#78966A]/20 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-mono text-[#3F6248] uppercase tracking-widest font-semibold flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-[#E5B26E] flex-shrink-0" />
                      <span className="truncate">
                        Track {currentTrackIndex + 1} of {tracks.length} · Auto-Shuffling
                      </span>
                    </span>
                    <h5 className="text-sm sm:text-base font-display text-[#253326] font-medium leading-snug truncate">
                      {currentTrack.title}
                    </h5>
                    <p className="text-xs font-serif-body italic text-[#6B7B6C] truncate">
                      {currentTrack.mood}
                    </p>
                  </div>

                  <a
                    href={`https://www.youtube.com/watch?v=${currentTrack.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-[#78966A] hover:text-[#2A3F35] hover:bg-[#78966A]/10 transition-colors flex-shrink-0"
                    title="Open on YouTube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Playback Control Bar: Play/Pause, Shuffle, Prev, Next */}
                <div className="pt-2 border-t border-[#78966A]/15 flex flex-wrap items-center justify-between gap-2">
                  {/* Shuffle Toggle */}
                  <button
                    onClick={() => setIsShuffle(!isShuffle)}
                    className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-sans-ui transition-all cursor-pointer ${
                      isShuffle
                        ? 'bg-[#2A3F35] text-[#E5B26E] shadow-sm font-semibold'
                        : 'bg-[#F3EEDC] text-[#6B7B6C] hover:text-[#253326]'
                    }`}
                    title="Toggle Random Shuffle on Finish"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Shuffle {isShuffle ? 'On' : 'Off'}</span>
                  </button>

                  {/* Play & Skip Controls */}
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
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
                      className="px-3 py-1.5 rounded-full bg-[#3F6248] text-white hover:bg-[#2A3F35] transition-all flex items-center space-x-1 text-xs font-medium cursor-pointer shadow-sm"
                      title="Shuffle to Next Track"
                    >
                      <span>Next</span>
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
                  <div className="p-2 space-y-1.5 border-t border-[#78966A]/10 bg-white/90 max-h-48 overflow-y-auto">
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
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <span
                              className={`w-5 h-5 rounded-full text-[10px] font-mono flex items-center justify-center font-bold flex-shrink-0 ${
                                isSelected
                                  ? 'bg-[#E5B26E] text-[#2A3F35]'
                                  : 'bg-[#78966A]/15 text-[#3F6248]'
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <h6
                                className={`text-xs font-display font-medium truncate ${
                                  isSelected ? 'text-[#FAF9F5]' : 'text-[#253326]'
                                }`}
                              >
                                {track.title}
                              </h6>
                              <p
                                className={`text-[10px] font-serif-body italic truncate ${
                                  isSelected ? 'text-[#D8E2DC]' : 'text-[#6B7B6C]'
                                }`}
                              >
                                {track.mood}
                              </p>
                            </div>
                          </div>

                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#E5B26E] animate-pulse flex-shrink-0 ml-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Multi-Layer Procedural Mist & Nature Sound Toggle */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#78966A]/20 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Layers className="w-4 h-4 text-[#78966A] flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-sans-ui text-[#253326] font-medium block truncate">
                      Procedural Mountain Breeze
                    </span>
                    <span className="text-[10px] font-mono text-[#848D80] truncate block">
                      Layer ambient synthesis over music
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleToggleProcedural}
                  className={`px-3 py-1 rounded-full text-xs font-sans-ui font-medium transition-all cursor-pointer flex-shrink-0 ${
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
            <div className="px-4 sm:px-5 py-2.5 sm:py-3 border-t border-[#78966A]/20 bg-white/80 flex items-center justify-between text-[10px] font-mono text-[#78966A] flex-shrink-0">
              <span className="flex items-center space-x-1 truncate mr-2">
                <Leaf className="w-3 h-3 text-[#78966A] flex-shrink-0" />
                <span className="truncate">Autoplay & Continuous Loop Active</span>
              </span>
              <button
                onClick={onToggleOpen}
                className="text-[#2A3F35] hover:underline font-semibold cursor-pointer whitespace-nowrap flex-shrink-0"
              >
                Minimize ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
