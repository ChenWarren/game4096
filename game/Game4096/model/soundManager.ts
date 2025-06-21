class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {}
  private enabled: boolean = true

  constructor() {
    this.loadSounds()
  }

  private loadSounds() {
    const soundFiles = {
      slide: '/sounds/slide.mp3',
      merge: '/sounds/merge.mp3',
      spawn: '/sounds/spawn.mp3',
      win: '/sounds/win.mp3',
      gameover: '/sounds/gameover.mp3',
      noway: '/sounds/noway.mp3'
    }

    Object.entries(soundFiles).forEach(([key, path]) => {
      const audio = new Audio(path)
      audio.preload = 'auto'
      audio.volume = 0.5
      this.sounds[key] = audio
    })
  }

  play(soundName: string) {
    if (!this.enabled || !this.sounds[soundName]) return

    const sound = this.sounds[soundName]
    sound.currentTime = 0
    sound.play().catch(() => {
      // Ignore autoplay policy errors
    })
  }

  setVolume(volume: number) {
    Object.values(this.sounds).forEach(sound => {
      sound.volume = Math.max(0, Math.min(1, volume))
    })
  }

  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }

  isEnabled() {
    return this.enabled
  }
}

export default SoundManager