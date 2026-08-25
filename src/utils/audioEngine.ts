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
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private activeTrack: TrackData | null = null;
  private mode: 'pre' | 'final' = 'final';
  private currentTime = 0; // seconds
  private duration = 180; // seconds
  private timerId: number | null = null;
  private animFrameId: number | null = null;
  private lastUpdateTime = 0;

  // Real HTML5 Audio Element for playback
  private audioEl: HTMLAudioElement | null = null;
  private isUsingRealAudio = false;

  // Web Audio Nodes for master & synth backup
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private bassBoostNode: BiquadFilterNode | null = null;
  private highShelfNode: BiquadFilterNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  private beatIndex = 0;
  private listeners: Set<StateListener> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
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

    if (this.activeTrack) {
      const targetSrc = this.mode === 'pre' ? (this.activeTrack.preMixSrc || this.activeTrack.finalMixSrc) : this.activeTrack.finalMixSrc;
      if (this.audioEl && targetSrc && this.isUsingRealAudio) {
        const prevTime = this.audioEl.currentTime;
        const wasPlaying = !this.audioEl.paused;
        this.audioEl.src = encodeURI(targetSrc);
        this.audioEl.currentTime = prevTime;
        if (wasPlaying) {
          this.audioEl.play().catch(() => {});
        }
      }
    }

    this.applyModeEffects();
    this.notify();
  }

  private applyModeEffects() {
    if (
      !this.ctx ||
      !this.filterNode ||
      !this.bassBoostNode ||
      !this.highShelfNode ||
      !this.compressor ||
      !this.masterGain
    ) {
      return;
    }

    const t = this.ctx.currentTime;
    if (this.mode === 'pre') {
      // Pre-mix effect: muffled high-end, less punch
      this.filterNode.frequency.setTargetAtTime(3200, t, 0.05);
      this.filterNode.Q.setTargetAtTime(1.2, t, 0.05);
      this.bassBoostNode.gain.setTargetAtTime(-3, t, 0.05);
      this.highShelfNode.gain.setTargetAtTime(-6, t, 0.05);
      this.compressor.threshold.setTargetAtTime(-10, t, 0.05);
      this.compressor.ratio.setTargetAtTime(2, t, 0.05);
      this.masterGain.gain.setTargetAtTime(0.2, t, 0.05);
    } else {
      // Final-mix effect: album-ready clarity and impact
      this.filterNode.frequency.setTargetAtTime(18500, t, 0.05);
      this.filterNode.Q.setTargetAtTime(0.7, t, 0.05);
      this.bassBoostNode.gain.setTargetAtTime(5.5, t, 0.05);
      this.highShelfNode.gain.setTargetAtTime(4.5, t, 0.05);
      this.compressor.threshold.setTargetAtTime(-24, t, 0.05);
      this.compressor.ratio.setTargetAtTime(6, t, 0.05);
      this.compressor.attack.setTargetAtTime(0.003, t, 0.05);
      this.compressor.release.setTargetAtTime(0.12, t, 0.05);
      this.masterGain.gain.setTargetAtTime(0.38, t, 0.05);
    }
  }

  public playTrack(track: TrackData, mode: 'pre' | 'final' = 'final', startFromSec?: number) {
    this.initContext();

    // If same track is already playing, just adjust position or keep playing
    if (this.isPlaying && this.activeTrack?.id === track.id) {
      if (startFromSec !== undefined) {
        this.seek(startFromSec);
      }
      return;
    }

    // Stop any other active track immediately (Only 1 track can play at a time)
    this.stopInternal(false);

    this.activeTrack = track;
    this.duration = track.durationSeconds || 180;
    this.mode = mode;
    this.currentTime = startFromSec !== undefined ? startFromSec : 0;
    this.isPlaying = true;
    this.lastUpdateTime = performance.now();

    const audioSrc = mode === 'pre' && track.preMixSrc ? track.preMixSrc : track.finalMixSrc;

    if (audioSrc && typeof window !== 'undefined') {
      if (!this.audioEl) {
        this.audioEl = new Audio();
      }

      this.audioEl.pause();
      this.audioEl.src = encodeURI(audioSrc);
      this.audioEl.currentTime = this.currentTime;

      this.audioEl.onloadedmetadata = () => {
        if (this.audioEl && this.audioEl.duration && !isNaN(this.audioEl.duration)) {
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

      this.audioEl.onended = () => {
        this.isPlaying = false;
        this.currentTime = 0;
        this.notify();
      };

      const playPromise = this.audioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isUsingRealAudio = true;
            this.notify();
          })
          .catch(() => {
            // If real audio playback is blocked or fails, fallback to synth engine
            this.isUsingRealAudio = false;
            this.startSynthPlayback(track);
          });
      } else {
        this.isUsingRealAudio = true;
      }
    } else {
      this.isUsingRealAudio = false;
      this.startSynthPlayback(track);
    }

    this.notify();
  }

  private startSynthPlayback(track: TrackData) {
    if (!this.ctx) return;

    this.masterGain = this.ctx.createGain();
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';

    this.bassBoostNode = this.ctx.createBiquadFilter();
    this.bassBoostNode.type = 'lowshelf';
    this.bassBoostNode.frequency.value = 85;

    this.highShelfNode = this.ctx.createBiquadFilter();
    this.highShelfNode.type = 'highshelf';
    this.highShelfNode.frequency.value = 6500;

    this.compressor = this.ctx.createDynamicsCompressor();

    this.masterGain.connect(this.bassBoostNode);
    this.bassBoostNode.connect(this.highShelfNode);
    this.highShelfNode.connect(this.filterNode);
    this.filterNode.connect(this.compressor);
    this.compressor.connect(this.ctx.destination);

    this.applyModeEffects();

    const bpm = track.bpm || 135;
    const intervalMs = (60 / bpm / 4) * 1000;
    this.beatIndex = Math.floor((this.currentTime * 1000) / intervalMs);

    this.timerId = window.setInterval(() => {
      this.scheduleStep();
    }, intervalMs);

    this.startAnimationLoop();
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
    if (this.activeTrack) {
      this.initContext();
      if (this.audioEl && this.isUsingRealAudio) {
        this.audioEl.currentTime = this.currentTime;
        this.audioEl
          .play()
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch(() => {
            this.playTrack(this.activeTrack, this.mode, this.currentTime);
          });
      } else {
        this.playTrack(this.activeTrack, this.mode, this.currentTime);
      }
    }
  }

  public pause() {
    if (!this.isPlaying) return;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    this.stopInternal(false);
    this.isPlaying = false;
    this.notify();
  }

  public seek(seconds: number) {
    this.currentTime = Math.min(Math.max(seconds, 0), this.duration);
    if (this.audioEl && this.isUsingRealAudio) {
      try {
        this.audioEl.currentTime = this.currentTime;
      } catch {
        // Safe seek
      }
    }
    if (this.activeTrack) {
      const bpm = this.activeTrack.bpm || 135;
      const intervalMs = (60 / bpm / 4) * 1000;
      this.beatIndex = Math.floor((this.currentTime * 1000) / intervalMs);
    }
    this.notify();
  }

  public seekPercent(percent: number) {
    const sec = (Math.min(Math.max(percent, 0), 100) / 100) * this.duration;
    this.seek(sec);
  }

  private startAnimationLoop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }

    const update = () => {
      if (!this.isPlaying) return;

      if (!this.isUsingRealAudio) {
        const now = performance.now();
        const delta = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;

        this.currentTime += delta;
        if (this.currentTime >= this.duration) {
          this.currentTime = 0;
        }
        this.notify();
      }

      this.animFrameId = requestAnimationFrame(update);
    };

    this.animFrameId = requestAnimationFrame(update);
  }

  private scheduleStep() {
    if (!this.ctx || !this.isPlaying || !this.masterGain || !this.activeTrack || this.isUsingRealAudio) return;

    const step = this.beatIndex % 16;
    const isFinal = this.mode === 'final';
    const now = this.ctx.currentTime;
    const baseFreq = this.activeTrack.audioFrequency || 125;

    if (step === 0 || step === 3 || step === 6 || step === 8 || step === 11) {
      this.playKick(now, isFinal);
    }

    if (step === 4 || step === 12) {
      this.playSnare(now, isFinal);
    }

    if (step % 2 === 0) {
      this.playCymbal(now, step === 0 || step === 8, isFinal);
    }

    const riffOffsets = [0, 0, 3, 0, 5, 0, 6, 5, 0, 0, 3, 0, 1, 0, 3, 1];
    const semitone = riffOffsets[step];
    this.playGuitarChug(now, baseFreq * Math.pow(2, semitone / 12), isFinal, step % 4 === 0);

    this.beatIndex++;
  }

  private playKick(time: number, isFinal: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = isFinal ? 165 : 120;
    const endFreq = isFinal ? 40 : 55;
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.09);

    const kickVolume = isFinal ? 0.95 : 0.45;
    gain.gain.setValueAtTime(kickVolume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + (isFinal ? 0.24 : 0.16));

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.26);

    if (isFinal) {
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(2600, time);
      clickOsc.frequency.exponentialRampToValueAtTime(300, time + 0.02);
      clickGain.gain.setValueAtTime(0.4, time);
      clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.025);
      clickOsc.connect(clickGain);
      clickGain.connect(this.masterGain);
      clickOsc.start(time);
      clickOsc.stop(time + 0.03);
    }
  }

  private playSnare(time: number, isFinal: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isFinal ? 210 : 175, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.12);
    oscGain.gain.setValueAtTime(isFinal ? 0.65 : 0.35, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(time);
    osc.stop(time + 0.16);

    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = isFinal ? 1250 : 800;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(isFinal ? 0.75 : 0.3, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + (isFinal ? 0.22 : 0.12));

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(time);
    noise.stop(time + 0.23);
  }

  private playCymbal(time: number, accent: boolean, isFinal: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = isFinal ? 7800 : 4500;

    const gain = this.ctx.createGain();
    const vol = accent ? (isFinal ? 0.26 : 0.12) : (isFinal ? 0.15 : 0.07);
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + (accent ? 0.12 : 0.06));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(time);
    noise.stop(time + 0.13);
  }

  private playGuitarChug(time: number, freq: number, isFinal: boolean, accent: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const waveshaper = this.ctx.createWaveShaper();

    const n_samples = 256;
    const curve = new Float32Array(n_samples);
    const k = isFinal ? 65 : 15;
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    waveshaper.curve = curve;

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(freq * 1.004, time);

    const duration = accent ? 0.18 : 0.09;
    const amp = accent ? (isFinal ? 0.36 : 0.2) : (isFinal ? 0.25 : 0.14);

    gain.gain.setValueAtTime(amp, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc1.connect(waveshaper);
    osc2.connect(waveshaper);
    waveshaper.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.02);
    osc2.stop(time + duration + 0.02);
  }

  private stopInternal(resetActiveTrack = true) {
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.02);
    }
    if (resetActiveTrack) {
      this.activeTrack = null;
      this.currentTime = 0;
    }
  }

  public stop() {
    this.stopInternal(true);
    this.isPlaying = false;
    this.notify();
  }
}

export const audioEngine = new AudioEngine();
