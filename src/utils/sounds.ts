// Sound effect utilities using Web Audio API

class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playCorrect() {
    if (!this.audioContext) return;
    
    // Happy ascending notes
    const notes = [523.25, 659.25, 783.99]; // C, E, G
    notes.forEach((note, i) => {
      setTimeout(() => {
        this.playTone(note, 0.15, 'sine', 0.2);
      }, i * 100);
    });
  }

  playWrong() {
    if (!this.audioContext) return;
    
    // Descending error sound
    this.playTone(300, 0.1, 'square', 0.15);
    setTimeout(() => {
      this.playTone(200, 0.2, 'square', 0.15);
    }, 100);
  }

  playClick() {
    if (!this.audioContext) return;
    this.playTone(800, 0.05, 'sine', 0.1);
  }

  playStart() {
    if (!this.audioContext) return;
    
    // Exciting start sound
    const notes = [392, 523.25, 659.25, 783.99]; // G, C, E, G
    notes.forEach((note, i) => {
      setTimeout(() => {
        this.playTone(note, 0.1, 'sine', 0.15);
      }, i * 80);
    });
  }

  playComplete() {
    if (!this.audioContext) return;
    
    // Victory fanfare
    const melody = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]; // C, D, E, G, A, C
    melody.forEach((note, i) => {
      setTimeout(() => {
        this.playTone(note, 0.2, 'sine', 0.2);
      }, i * 120);
    });
  }

  playHover() {
    if (!this.audioContext) return;
    this.playTone(600, 0.03, 'sine', 0.05);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export const soundManager = new SoundManager();
