// Web Audio API engine for AuDHD focus sounds and sensory alerts
import { FocusTrackId } from '../types';

class AuDHDAudioEngine {
  private ctx: AudioContext | null = null;
  private currentTrack: FocusTrackId = 'lofi';
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private activeNodes: { stop: () => void }[] = [];
  private volume: number = 0.45;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getTrack(): FocusTrackId {
    return this.currentTrack;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public stopSoundtrack() {
    this.activeNodes.forEach(node => {
      try {
        node.stop();
      } catch (e) {
        // ignore already stopped
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public playSoundtrack(track: FocusTrackId) {
    this.initContext();
    this.stopSoundtrack();
    this.currentTrack = track;

    if (track === 'mute' || !this.ctx || !this.masterGain) {
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;

    switch (track) {
      case 'brown_noise':
        this.startBrownNoise();
        break;
      case 'pink_noise':
        this.startPinkNoise();
        break;
      case 'ambient_432':
        this.start432HzAmbient();
        break;
      case 'chiptune':
        this.startChiptuneMotivator();
        break;
      case 'binaural_alpha':
        this.startBinauralAlpha();
        break;
      case 'lofi':
      default:
        this.startLoFiChillBeat();
        break;
    }
  }

  // Brown noise (Deep sensory blanket, highly recommended for ADHD)
  private startBrownNoise() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain compensation
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Filter to make it soft and warm
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start();
    this.activeNodes.push({
      stop: () => {
        try { noiseSource.stop(); } catch (e) {}
      }
    });
  }

  // Pink noise (Balanced frequencies like a soft rainfall)
  private startPinkNoise() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.45, this.ctx.currentTime);

    source.connect(gain);
    gain.connect(this.masterGain);

    source.start();
    this.activeNodes.push({
      stop: () => {
        try { source.stop(); } catch (e) {}
      }
    });
  }

  // 432 Hz Ambient Drone (Harmonic relaxation & flow state)
  private start432HzAmbient() {
    if (!this.ctx || !this.masterGain) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();

    // 432Hz base, plus subtle fifth (648Hz) and lower octave (216Hz)
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(216, this.ctx.currentTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(432, this.ctx.currentTime);

    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(324, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    // Warm low-pass
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);

    osc1.connect(gain);
    osc2.connect(gain);
    osc3.connect(gain);
    gain.connect(filter);
    filter.connect(this.masterGain);

    osc1.start();
    osc2.start();
    osc3.start();

    this.activeNodes.push({
      stop: () => {
        try {
          osc1.stop();
          osc2.stop();
          osc3.stop();
        } catch (e) {}
      }
    });
  }

  // Binaural Alpha (10 Hz beat difference)
  private startBinauralAlpha() {
    if (!this.ctx || !this.masterGain) return;
    // Create stereo panners or splitter
    const merger = this.ctx.createChannelMerger(2);

    const oscLeft = this.ctx.createOscillator();
    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(200, this.ctx.currentTime); // 200 Hz

    const oscRight = this.ctx.createOscillator();
    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(210, this.ctx.currentTime); // 210 Hz -> 10 Hz alpha wave

    const gainL = this.ctx.createGain();
    gainL.gain.setValueAtTime(0.2, this.ctx.currentTime);
    const gainR = this.ctx.createGain();
    gainR.gain.setValueAtTime(0.2, this.ctx.currentTime);

    oscLeft.connect(gainL);
    oscRight.connect(gainR);

    gainL.connect(merger, 0, 0); // channel 0 (left)
    gainR.connect(merger, 0, 1); // channel 1 (right)

    merger.connect(this.masterGain);

    oscLeft.start();
    oscRight.start();

    this.activeNodes.push({
      stop: () => {
        try {
          oscLeft.stop();
          oscRight.stop();
        } catch (e) {}
      }
    });
  }

  // Lo-Fi Chill Beat (Generative mellow chords with soothing rhythm)
  private startLoFiChillBeat() {
    if (!this.ctx || !this.masterGain) return;

    // Chords (Jazz-inspired Major7 & Minor9)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23], // G7
    ];

    let chordIdx = 0;
    let timerId: any = null;
    let isStopped = false;

    const playChordStep = () => {
      if (isStopped || !this.ctx || !this.masterGain) return;

      const currentNotes = chords[chordIdx % chords.length];
      chordIdx++;

      const chordGain = this.ctx.createGain();
      chordGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      chordGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.4);
      chordGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.8);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, this.ctx.currentTime);

      currentNotes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.connect(chordGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 3.9);
      });

      // Subtle warm lo-fi vinyl hiss pulse
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();
      kickOsc.frequency.setValueAtTime(100, this.ctx.currentTime);
      kickOsc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
      kickGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      kickGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      kickOsc.connect(kickGain);
      kickGain.connect(this.masterGain);
      kickOsc.start();
      kickOsc.stop(this.ctx.currentTime + 0.25);

      chordGain.connect(filter);
      filter.connect(this.masterGain);

      timerId = setTimeout(playChordStep, 4000);
    };

    playChordStep();

    this.activeNodes.push({
      stop: () => {
        isStopped = true;
        if (timerId) clearTimeout(timerId);
      }
    });
  }

  // 8-bit Upbeat Chiptune Motivator
  private startChiptuneMotivator() {
    if (!this.ctx || !this.masterGain) return;

    const melody = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00];
    let noteIdx = 0;
    let timerId: any = null;
    let isStopped = false;

    const playNote = () => {
      if (isStopped || !this.ctx || !this.masterGain) return;
      const freq = melody[noteIdx % melody.length];
      noteIdx++;

      const osc = this.ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(filter);
      filter.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);

      timerId = setTimeout(playNote, 320);
    };

    playNote();

    this.activeNodes.push({
      stop: () => {
        isStopped = true;
        if (timerId) clearTimeout(timerId);
      }
    });
  }

  // Gentle celebration chime when 15-minute task finishes!
  // Uses soft uplifting pentatonic chime rather than a piercing alarm.
  public playTaskCompleteChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Pentatonic ascending chime: C5, E5, G5, A5, C6
    const notes = [523.25, 659.25, 783.99, 880.00, 1046.50];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.15);

      gain.gain.setValueAtTime(0.001, now + idx * 0.15);
      gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.15 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.15 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.15);
      osc.stop(now + idx * 0.15 + 1.3);
    });
  }

  // Pop feedback sound for button clicks/checkboxes
  public playPopSound() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {
      // Audio not initialized or permitted yet
    }
  }
}

export const audioEngine = new AuDHDAudioEngine();
