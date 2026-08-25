import { TrackData } from '../types';

export interface AudioPlayerState {
  isPlaying: boolean;
  activeTrackId: string | null;
  currentTime: number; // in seconds
  duration: number; // in seconds
  mode: 'pre' | 'final';
  progressPercent: number; // 0 to 100
}

type StateListener = (state: AudioPlayerState) => void;

class AudioEngine {
  private isPlaying = false;
  private activeTrack: TrackData | null = null;
  private mode: 'pre' | 'final' = 'final';
  private currentTime = 0; // seconds
  private duration = 180; // seconds

  // Real HTML5 Audio Element for playback
  private audioEl: HTMLAudioElement | null = null;
  private listeners: Set<StateListener> = new Set();
  private animFrameId: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioEl = new Audio();
      this.setupAudioListeners();
    }
  }

  private setupAudioListeners() {
    if (!this.audioEl) return;

    this.audioEl.onloadedmetadata = () => {
      if (this.audioEl && this.audioEl.duration && !isNaN(this.audioEl.duration) && isFinite(this.audioEl.duration)) {
        this.duration = this.audioEl.duration;
        this.notify();
      }
    };

    this.audioEl.ontimeupdate = () => {
      if (this.audioEl && this.isPlaying) {
        this.currentTime = this.audioEl.currentTime;
        this.notify();
      }
    };

    this.audioEl.onplay = () => {
      this.isPlaying = true;
      this.startSmoothLoop();
      this.notify();
    };

    this.audioEl.onpause = () => {
      this.isPlaying = false;
      this.stopSmoothLoop();
      this.notify();
    };

    this.audioEl.onended = () => {
      this.isPlaying = false;
      this.currentTime = 0;
      this.stopSmoothLoop();
      this.notify();
    };

    this.audioEl.onerror = (e) => {
      const error = this.audioEl?.error;
      console.error(
        `[AudioEngine] Error playing track "${this.activeTrack?.title || 'Unknown'}":`,
        error ? `code: ${error.code}, message: ${error.message}` : e
      );
      this.isPlaying = false;
      this.stopSmoothLoop();
      this.notify();
    };
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  public getState(): AudioPlayerState {
    const progressPercent = this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
    return {
      isPlaying: this.isPlaying,
      activeTrackId: this.activeTrack ? this.activeTrack.id : null,
      currentTime: this.currentTime,
      duration: this.duration,
      mode: this.mode,
      progressPercent: Math.min(Math.max(progressPercent, 0), 100)
    };
  }

  public setMode(newMode: 'pre' | 'final') {
    if (this.mode === newMode) return;
    this.mode = newMode;

    if (this.activeTrack && this.audioEl) {
      const targetSrc = this.mode === 'pre'
        ? (this.activeTrack.preMixSrc || this.activeTrack.finalMixSrc)
        : this.activeTrack.finalMixSrc;

      if (targetSrc) {
        const prevTime = this.audioEl.currentTime;
        const wasPlaying = !this.audioEl.paused;
        this.audioEl.src = targetSrc;
        this.audioEl.currentTime = prevTime;
        if (wasPlaying) {
          this.audioEl.play().catch((err) => {
            console.error(`[AudioEngine] Failed to resume on mode switch for track "${this.activeTrack?.title}":`, err);
          });
        }
      }
    }

    this.notify();
  }

  public playTrack(track: TrackData, mode: 'pre' | 'final' = 'final', startFromSec?: number) {
    if (!this.audioEl && typeof window !== 'undefined') {
      this.audioEl = new Audio();
      this.setupAudioListeners();
    }

    if (!this.audioEl) {
      console.error('[AudioEngine] HTMLAudioElement is not supported in this environment.');
      return;
    }

    // If same track is already playing, just seek or keep playing
    if (this.isPlaying && this.activeTrack?.id === track.id) {
      if (startFromSec !== undefined) {
        this.seek(startFromSec);
      }
      return;
    }

    // Stop any other active track immediately (Only 1 track can play at a time)
    this.audioEl.pause();
    this.stopSmoothLoop();

    this.activeTrack = track;
    this.duration = track.durationSeconds || 180;
    this.mode = mode;
    this.currentTime = startFromSec !== undefined ? startFromSec : 0;

    const audioSrc = mode === 'pre' && track.preMixSrc ? track.preMixSrc : track.finalMixSrc;

    if (!audioSrc) {
      console.error(`[AudioEngine] No audio source found for track "${track.title}" (ID: ${track.id})`);
      this.isPlaying = false;
      this.notify();
      return;
    }

    try {
      this.audioEl.src = audioSrc;
      this.audioEl.currentTime = this.currentTime;

      const playPromise = this.audioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.startSmoothLoop();
            this.notify();
          })
          .catch((err) => {
            console.error(`[AudioEngine] Playback failed for "${track.title}":`, err);
            this.isPlaying = false;
            this.stopSmoothLoop();
            this.notify();
          });
      }
    } catch (err) {
      console.error(`[AudioEngine] Exception during track setup for "${track.title}":`, err);
      this.isPlaying = false;
      this.stopSmoothLoop();
      this.notify();
    }

    this.notify();
  }

  public togglePlay(track: TrackData) {
    if (this.isPlaying && this.activeTrack?.id === track.id) {
      this.pause();
    } else if (!this.isPlaying && this.activeTrack?.id === track.id) {
      this.resume();
    } else {
      this.playTrack(track, 'final');
    }
  }

  public resume() {
    if (this.isPlaying) return;
    if (this.audioEl && this.activeTrack) {
      this.audioEl.currentTime = this.currentTime;
      this.audioEl
        .play()
        .then(() => {
          this.isPlaying = true;
          this.startSmoothLoop();
          this.notify();
        })
        .catch((err) => {
          console.error(`[AudioEngine] Failed to resume playback for "${this.activeTrack?.title}":`, err);
        });
    }
  }

  public pause() {
    if (!this.isPlaying) return;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    this.stopSmoothLoop();
    this.isPlaying = false;
    this.notify();
  }

  public seek(seconds: number) {
    this.currentTime = Math.min(Math.max(seconds, 0), this.duration);
    if (this.audioEl) {
      try {
        this.audioEl.currentTime = this.currentTime;
      } catch (err) {
        console.error('[AudioEngine] Seek error:', err);
      }
    }
    this.notify();
  }

  public seekPercent(percent: number) {
    const sec = (Math.min(Math.max(percent, 0), 100) / 100) * this.duration;
    this.seek(sec);
  }

  private startSmoothLoop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    const update = () => {
      if (this.audioEl && this.isPlaying) {
        this.currentTime = this.audioEl.currentTime;
        if (this.audioEl.duration && !isNaN(this.audioEl.duration) && isFinite(this.audioEl.duration)) {
          this.duration = this.audioEl.duration;
        }
        this.notify();
        this.animFrameId = requestAnimationFrame(update);
      }
    };
    this.animFrameId = requestAnimationFrame(update);
  }

  private stopSmoothLoop() {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  public stop() {
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.currentTime = 0;
    }
    this.stopSmoothLoop();
    this.activeTrack = null;
    this.currentTime = 0;
    this.isPlaying = false;
    this.notify();
  }
}

export const audioEngine = new AudioEngine();
