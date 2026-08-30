import { AmbienceType } from '../types';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private currentPreset: AmbienceType = 'silent';
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private birdsInterval: number | null = null;
  private cricketsInterval: number | null = null;
  private rainDropsInterval: number | null = null;

  public initAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private initContext() {
    this.initAudioContext();
  }

  public setPreset(preset: AmbienceType) {
    this.currentPreset = preset;
    if (this.isMuted) return;
    this.playCurrentPreset();
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAll();
    } else {
      if (this.currentPreset === 'silent') {
        this.currentPreset = 'morning'; // default peaceful garden morning
      }
      this.playCurrentPreset();
    }
    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted && this.currentPreset !== 'silent';
  }

  public getCurrentPreset(): AmbienceType {
    return this.currentPreset;
  }

  public stopAll() {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
    if (this.birdsInterval) {
      window.clearInterval(this.birdsInterval);
      this.birdsInterval = null;
    }
    if (this.cricketsInterval) {
      window.clearInterval(this.cricketsInterval);
      this.cricketsInterval = null;
    }
    if (this.rainDropsInterval) {
      window.clearInterval(this.rainDropsInterval);
      this.rainDropsInterval = null;
    }
    setTimeout(() => {
      this.activeNodes.forEach(node => {
        if (typeof node === 'object' && 'stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          try { (node as AudioScheduledSourceNode).stop(); } catch {}
        }
        if (typeof node === 'object' && 'disconnect' in node) {
          try { node.disconnect(); } catch {}
        }
      });
      this.activeNodes = [];
    }, 500);
  }

  private playCurrentPreset() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stopAll();

    setTimeout(() => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      this.masterGain.gain.setTargetAtTime(0.2, this.ctx.currentTime, 0.8);

      switch (this.currentPreset) {
        case 'morning':
          this.createMorningSound();
          break;
        case 'rain':
          this.createRainSound();
          break;
        case 'forest':
          this.createForestSound();
          break;
        case 'night':
          this.createNightSound();
          break;
        case 'library':
          this.createLibrarySound();
          break;
        case 'silent':
        default:
          this.stopAll();
          break;
      }
    }, 550);
  }

  private createNoiseBuffer(duration = 5): AudioBuffer {
    if (!this.ctx) throw new Error('No audio context');
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02; // Pink noise filter
      lastOut = data[i];
      data[i] *= 3.2;
    }
    return buffer;
  }

  private createMorningSound() {
    if (!this.ctx || !this.masterGain) return;
    // Gentle morning breeze
    const noiseBuffer = this.createNoiseBuffer(6);
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start();
    this.activeNodes.push(noise, filter, gain);

    // Procedural chirping birds at random intervals
    const playChirp = () => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const osc = this.ctx.createOscillator();
      const chirpGain = this.ctx.createGain();
      const startFreq = 2400 + Math.random() * 800;
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(startFreq + 600, this.ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(startFreq - 200, this.ctx.currentTime + 0.18);

      chirpGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      chirpGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 0.04);
      chirpGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.22);

      osc.connect(chirpGain);
      chirpGain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    };

    this.birdsInterval = window.setInterval(() => {
      if (Math.random() > 0.4) playChirp();
    }, 3800);
  }

  private createRainSound() {
    if (!this.ctx || !this.masterGain) return;

    // 1. Continuous Low Downpour / Rain Bed Noise
    const noiseBuffer = this.createNoiseBuffer(6);
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(680, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(0.7, this.ctx.currentTime);

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(1400, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    noise.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(rainGain);
    rainGain.connect(this.masterGain);
    noise.start();
    this.activeNodes.push(noise, bandpass, lowpass, rainGain);

    // 2. Secondary High-Frequency Misty Drizzle Hiss
    const hissNoise = this.ctx.createBufferSource();
    hissNoise.buffer = noiseBuffer;
    hissNoise.loop = true;

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(2200, this.ctx.currentTime);

    const hissGain = this.ctx.createGain();
    hissGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    hissNoise.connect(highpass);
    highpass.connect(hissGain);
    hissGain.connect(this.masterGain);
    hissNoise.start();
    this.activeNodes.push(hissNoise, highpass, hissGain);

    // 3. Procedural Rain Pitter-Patter (Droplets tapping on garden leaves and glass)
    const playRainDropTap = () => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const osc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      const pitch = 950 + Math.random() * 1200;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.45, this.ctx.currentTime + 0.04);

      dropGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.015 + Math.random() * 0.02, this.ctx.currentTime + 0.008);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(dropGain);
      dropGain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    };

    this.rainDropsInterval = window.setInterval(() => {
      if (Math.random() > 0.25) {
        playRainDropTap();
        if (Math.random() > 0.5) {
          setTimeout(playRainDropTap, 35 + Math.random() * 65);
        }
      }
    }, 180);
  }

  private createForestSound() {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createNoiseBuffer(6);
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    lfo.start();
    this.activeNodes.push(noise, filter, lfo, lfoGain, gain);
  }

  private createNightSound() {
    if (!this.ctx || !this.masterGain) return;
    const noiseBuffer = this.createNoiseBuffer(5);
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start();
    this.activeNodes.push(noise, filter, gain);

    // Subtle cricket chirps
    const playCricket = () => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      const osc = this.ctx.createOscillator();
      const cricketGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(4600, this.ctx.currentTime);

      cricketGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      cricketGain.gain.exponentialRampToValueAtTime(0.02, this.ctx.currentTime + 0.03);
      cricketGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(cricketGain);
      cricketGain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    };

    this.cricketsInterval = window.setInterval(() => {
      if (Math.random() > 0.5) playCricket();
    }, 2400);
  }

  private createLibrarySound() {
    if (!this.ctx || !this.masterGain) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(110, this.ctx.currentTime);
    osc2.frequency.setValueAtTime(164.81, this.ctx.currentTime);

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(240, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);

    osc1.connect(lowpass);
    osc2.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    this.activeNodes.push(osc1, osc2, lowpass, gain);
  }
}

export const soundEngine = new SoundEngine();
