import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Sparkles, AlertCircle, Music } from 'lucide-react';
import { Language, TrackData } from '../types';
import { TRACKS_DATA, TRANSLATIONS } from '../data/content';
import { audioEngine, AudioPlayerState } from '../utils/audioEngine';

interface AudioShowcaseProps {
  currentLang: Language;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export const AudioShowcase: React.FC<AudioShowcaseProps> = ({ currentLang }) => {
  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    isPlaying: false,
    activeTrackId: null,
    currentTime: 0,
    duration: 180,
    mode: 'final',
    progressPercent: 0
  });

  // Track-specific scrub preview positions when paused
  const [localPositions, setLocalPositions] = useState<Record<string, number>>({
    'track-kingdoms': 15,
    'track-bastion': 22,
    'track-acrid-curse': 18,
    'track-prophers-stand-tall': 30,
    'track-raised-with-wolves': 25,
    'track-sweaty-palms': 20,
    'track-illuminate-the-sky': 16
  });

  const t = TRANSLATIONS[currentLang].showcase;

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setPlayerState(state);
    });
    return () => {
      unsubscribe();
      audioEngine.stop();
    };
  }, []);

  const handleTogglePlay = (track: TrackData) => {
    if (playerState.isPlaying && playerState.activeTrackId === track.id) {
      audioEngine.pause();
    } else {
      // If switching to another track, start from the local position or 0
      const startSec =
        playerState.activeTrackId === track.id
          ? playerState.currentTime
          : ((localPositions[track.id] || 0) / 100) * track.durationSeconds;

      audioEngine.playTrack(track, 'final', startSec);
    }
  };

  const handleWaveformClick = (track: TrackData, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(Math.max((clickX / rect.width) * 100, 0), 100);

    setLocalPositions((prev) => ({ ...prev, [track.id]: percent }));

    if (playerState.activeTrackId === track.id) {
      audioEngine.seekPercent(percent);
    } else {
      // If not active, play this track directly from clicked position
      const startSec = (percent / 100) * track.durationSeconds;
      audioEngine.playTrack(track, 'final', startSec);
    }
  };

  return (
    <section
      id="showcase"
      className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t border-[#222228]"
    >
      {/* Section Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div
          id="showcase-tag"
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#222228] bg-[#16161A]/50 font-mono-tag text-xs text-[#A1A1A1] tracking-widest uppercase"
        >
          {t.tag}
        </div>

        <h2
          id="showcase-headline"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
        >
          {t.headline}
        </h2>

        <p
          id="showcase-description"
          className="text-[#C6C6C7] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          {t.description}
        </p>

        {playerState.isPlaying && (
          <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9F0A]/10 border border-[#FF9F0A]/30 text-[#FF9F0A] text-xs font-mono-tag animate-pulse">
            <Volume2 className="w-4 h-4" />
            <span>{t.nowPlaying}</span>
          </div>
        )}
      </div>

      {/* 7 Tracks Grid */}
      <div
        id="portfolio-grid"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
      >
        {TRACKS_DATA.map((track, index) => {
          const isActive = playerState.activeTrackId === track.id;
          const isPlaying = isActive && playerState.isPlaying;

          const currentPercent = isActive
            ? playerState.progressPercent
            : localPositions[track.id] ?? 0;

          const currentSeconds = isActive
            ? playerState.currentTime
            : (currentPercent / 100) * track.durationSeconds;

          const tags = currentLang === 'da' ? track.tagsDa : track.tags;

          return (
            <div
              key={track.id}
              id={`card-${track.id}`}
              className={`surface-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6 relative group transition-all duration-300 ${
                isPlaying
                  ? 'border-[#FF9F0A] shadow-[0_0_35px_-8px_rgba(255,159,10,0.3)] bg-[#121216]'
                  : 'hover:shadow-[0_0_30px_-10px_rgba(255,159,10,0.15)] bg-[#0E0E12]'
              }`}
            >
              {/* Top Row: Track Title, Artist, Tags & Play Button */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg sm:text-xl truncate tracking-tight">
                    {track.title}
                  </h3>

                  <p className="font-mono-tag text-xs sm:text-sm text-[#A1A1A1] mt-0.5 truncate">
                    {track.artist}
                  </p>

                  <p className="text-[10px] sm:text-[11px] text-[#FF9F0A]/95 mt-2 uppercase tracking-wider font-mono-tag leading-relaxed">
                    {tags}
                  </p>
                </div>

                {/* Circular Amber Play/Pause Button */}
                <button
                  id={`play-btn-${track.id}`}
                  onClick={() => handleTogglePlay(track)}
                  aria-label={isPlaying ? 'Pause track' : 'Play track'}
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-black font-bold shrink-0 transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-white shadow-[0_0_22px_rgba(255,255,255,0.7)] scale-105'
                      : 'bg-[#FF9F0A] hover:scale-110 shadow-[0_0_16px_rgba(255,159,10,0.45)]'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-black" />
                  ) : (
                    <Play className="w-5 h-5 fill-black translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* Waveform Player & Timeline */}
              <div
                className="relative cursor-pointer select-none"
                onClick={(e) => handleWaveformClick(track, e)}
                title="Click anywhere to scrub playback position"
              >
                {/* Waveform container */}
                <div className="h-16 flex items-end justify-center w-full overflow-hidden relative bg-[#09090C] rounded-lg px-3 py-2 border border-[#1E1E26]">
                  {/* Playhead vertical marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[#FF9F0A] z-10 shadow-[0_0_8px_rgba(255,159,10,0.9)] transition-all duration-75"
                    style={{ left: `${currentPercent}%` }}
                  >
                    <div className="absolute -top-1 -translate-x-1/2 w-2.5 h-2.5 bg-[#FF9F0A] rounded-full shadow-md" />
                  </div>

                  {/* Waveform Bars */}
                  <div className="flex items-end justify-between w-full h-full gap-[2px]">
                    {track.waveformBars.map((height, i) => {
                      const barPercent = (i / track.waveformBars.length) * 100;
                      const isPast = barPercent <= currentPercent;
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-sm transition-all duration-150"
                          style={{
                            height: `${height * 3.2}px`,
                            maxHeight: '100%',
                            backgroundColor: isPast ? '#FF9F0A' : '#2A2A32',
                            opacity: isPlaying && isPast ? 1 : isPast ? 0.85 : 0.5
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Timestamps */}
                <div className="flex justify-between mt-2 font-mono-tag text-xs text-[#A1A1A1]">
                  <span className={isPlaying ? 'text-[#FF9F0A] font-semibold' : ''}>
                    {formatTime(currentSeconds)}
                  </span>
                  <span>{track.duration}</span>
                </div>
              </div>

              {/* A/B Switcher Section with Disabled Pre-Mix & Active Final Mix */}
              <div className="flex justify-between items-center pt-3 border-t border-[#1C1C24]">
                <div className="flex items-center gap-2">
                  {/* Disabled Pre-Mix Button */}
                  <div className="relative group/prem">
                    <button
                      id={`btn-pre-${track.id}`}
                      disabled
                      aria-disabled="true"
                      className="px-3.5 py-1.5 rounded-full font-mono-tag text-xs border border-[#262630] bg-[#16161A]/60 text-[#686875] opacity-50 cursor-not-allowed flex items-center gap-1.5 transition-none select-none"
                    >
                      <AlertCircle className="w-3 h-3 text-[#52525B]" />
                      <span>{t.preMix}</span>
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/prem:flex flex-col items-center z-20 pointer-events-none">
                      <div className="bg-[#1C1C24] border border-[#2E2E3C] text-[#C6C6C7] text-[11px] font-mono-tag px-2.5 py-1 rounded shadow-lg whitespace-nowrap">
                        {t.preMixDisabledTooltip}
                      </div>
                      <div className="w-2 h-2 bg-[#1C1C24] rotate-45 -mt-1 border-r border-b border-[#2E2E3C]" />
                    </div>
                  </div>

                  {/* Active Final Mix Button */}
                  <button
                    id={`btn-final-${track.id}`}
                    className="px-4 py-1.5 rounded-full font-mono-tag text-xs bg-[#2E2E38] text-white font-semibold shadow-inner border border-[#3E3E4C] flex items-center gap-1.5 cursor-default select-none"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FF9F0A]" />
                    <span>{t.finalMix}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
