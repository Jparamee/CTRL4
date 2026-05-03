import { ref, watch } from 'vue'

// ─────────────────────────────────────────────
//  GUIDE TRACK STATE
// ─────────────────────────────────────────────
export const guideIsPlaying   = ref(false)
export const guideCurrentTime = ref(0)
export const guideDuration    = ref(0)
// NEW: Independent language state just for the audio guide
export const guideLang        = ref(localStorage.getItem('av_guide_lang') || 'en')

watch(guideLang, (val) => localStorage.setItem('av_guide_lang', val))

// ─────────────────────────────────────────────
//  THEME TRACK STATE
// ─────────────────────────────────────────────
export const themeIsPlaying   = ref(false)
export const currentRoomName  = ref('')
export const currentThemeFile = ref('')

// ─────────────────────────────────────────────
//  SHARED SETTINGS (persisted)
// ─────────────────────────────────────────────
export const playbackSpeed = ref(Number(localStorage.getItem('av_speed')) || 1)
export const themeVolume   = ref(Number(localStorage.getItem('av_theme_vol')) || 50)
export const voiceVolume   = ref(Number(localStorage.getItem('av_voice_vol')) || 50)

watch(themeVolume,   (v) => localStorage.setItem('av_theme_vol', v))
watch(voiceVolume,   (v) => localStorage.setItem('av_voice_vol', v))
watch(playbackSpeed, (v) => localStorage.setItem('av_speed', v))

// ─────────────────────────────────────────────
//  GUIDE AUDIO  (language-dependent)
//
//  Files are in public/audio/ and served at /audio/
//    EN → english hyena speak.mp3
//    DA → christianSnakkerSort.mp3
//    DE → deutsch Hyänen speak.mp3
// ─────────────────────────────────────────────
function getGuideFile(lang) {
  if (lang === 'da') return 'audio/christianSnakkerSort.mp3'
  if (lang === 'de') return 'audio/deutsch Hyänen speak.wav'
  return 'audio/english hyena speak.mp3'
}

// UPDATED: Now uses our independent guideLang instead of the UI language
const guideTrack = new Audio(getGuideFile(guideLang.value))
guideTrack.loop = false

const savedPosition = localStorage.getItem('av_position')
if (savedPosition) {
  guideTrack.currentTime = Number(savedPosition)
  guideCurrentTime.value = Number(savedPosition)
}

guideTrack.addEventListener('timeupdate', () => {
  guideCurrentTime.value = guideTrack.currentTime
  localStorage.setItem('av_position', guideTrack.currentTime)
})

guideTrack.addEventListener('loadedmetadata', () => {
  guideDuration.value = guideTrack.duration
  if (savedPosition) guideTrack.currentTime = Number(savedPosition)
})

guideTrack.addEventListener('ended', () => {
  // Guide finished — stop guide only. Theme music keeps playing!
  guideIsPlaying.value = false
})

// UPDATED: Watch the independent guideLang to switch tracks
watch(guideLang, (newLang) => {
  const wasPlaying = guideIsPlaying.value
  const savedTime  = guideTrack.currentTime

  if (wasPlaying) guideTrack.pause()

  guideTrack.src = getGuideFile(newLang)
  guideTrack.load()

  guideTrack.addEventListener('loadedmetadata', () => {
    guideTrack.playbackRate = playbackSpeed.value  // re-apply — load() resets it on Safari/WebKit
    guideTrack.currentTime  = Math.min(savedTime, guideTrack.duration)
    if (wasPlaying) {
      guideTrack.play()
        .then(() => { guideIsPlaying.value = true })
        .catch(console.error)
    }
  }, { once: true })
})

// ─────────────────────────────────────────────
//  THEME AUDIO  (room-based, auto-changes via GPS)
//  All files live in public/audio/
// ─────────────────────────────────────────────
const themeTrack = new Audio()
themeTrack.loop = true

// --- NEW DEFAULT AMBIENT LOGIC ---
const defaultThemeSrc = 'audio/default_ambient.mp3' 

const savedThemeSrc = localStorage.getItem('av_theme_src')
if (savedThemeSrc) {
  themeTrack.src = savedThemeSrc
  currentThemeFile.value = savedThemeSrc.split('/').pop()
} else {
  // If no room is saved, load the default track!
  themeTrack.src = defaultThemeSrc
  currentThemeFile.value = 'default_ambient.mp3'
}
themeTrack.load()

const savedRoomName = localStorage.getItem('av_room_name')
if (savedRoomName) currentRoomName.value = savedRoomName

let isFading     = false
let fadeInterval = null

// ─────────────────────────────────────────────
//  TAB VISIBILITY  (fix: browser throttles
//  setInterval in hidden tabs, breaking fades)
// ─────────────────────────────────────────────
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (isFading) {
      clearInterval(fadeInterval)
      isFading = false
      themeTrack.volume = themeVolume.value / 100
    }
  } else {
    if (!isFading) {
      themeTrack.volume = themeIsPlaying.value ? themeVolume.value / 100 : 0
    }
  }
})

// ─────────────────────────────────────────────
//  WATCHERS: Volume / Speed sliders → Audio API
// ─────────────────────────────────────────────
watch(themeVolume, (vol) => {
  if (!isFading) themeTrack.volume = vol / 100
}, { immediate: true })

watch(voiceVolume, (vol) => {
  guideTrack.volume = vol / 100
}, { immediate: true })

watch(playbackSpeed, (speed) => {
  guideTrack.playbackRate = speed
}, { immediate: true })

// ─────────────────────────────────────────────
//  GUIDE CONTROLS
// ─────────────────────────────────────────────
export function toggleGuide() {
  if (guideIsPlaying.value) {
    guideTrack.pause()
    guideIsPlaying.value = false
  } else {
    guideTrack.play()
      .then(() => { guideIsPlaying.value = true })
      .catch((err) => console.error('Guide play failed:', err))
  }
}

export function skipGuide(amount) {
  guideTrack.currentTime = Math.max(
    0,
    Math.min(guideTrack.duration || 0, guideTrack.currentTime + amount)
  )
  localStorage.setItem('av_position', guideTrack.currentTime)
}

export function seekGuide(seconds) {
  guideTrack.currentTime = seconds
  localStorage.setItem('av_position', seconds)
}

// ─────────────────────────────────────────────
//  THEME CONTROLS  (independent toggle)
// ─────────────────────────────────────────────
export function toggleTheme() {
  if (themeIsPlaying.value) {
    themeTrack.pause()
    themeIsPlaying.value = false
  } else {
    if (!themeTrack.src) return
    themeTrack.play()
      .then(() => { themeIsPlaying.value = true })
      .catch((err) => console.error('Theme play failed:', err))
  }
}

// ─────────────────────────────────────────────
//  CHANGE ROOM THEME  (called from GPS / map tap)
// ─────────────────────────────────────────────
export function changeRoomTheme(audioFileName, roomLabel = '') {
  if (!audioFileName) return

  const newSrc = `audio/${audioFileName}`
  currentRoomName.value = roomLabel || currentRoomName.value
  localStorage.setItem('av_room_name', currentRoomName.value)
  localStorage.setItem('av_theme_src', newSrc)
  currentThemeFile.value = audioFileName

  if (themeTrack.src && themeTrack.src.includes(audioFileName)) return

  if (themeIsPlaying.value) {
    isFading = true
    clearInterval(fadeInterval)
    let vol = themeTrack.volume

    fadeInterval = setInterval(() => {
      vol = Math.max(0, vol - 0.05)
      themeTrack.volume = vol

      if (vol <= 0) {
        clearInterval(fadeInterval)
        themeTrack.pause()
        themeTrack.src = newSrc
        themeTrack.load()

        themeTrack.play()
          .then(() => {
            let targetVol = themeVolume.value / 100
            fadeInterval = setInterval(() => {
              vol = Math.min(targetVol, vol + 0.05)
              themeTrack.volume = vol
              if (vol >= targetVol) {
                clearInterval(fadeInterval)
                isFading = false
                themeTrack.volume = targetVol
              }
            }, 60)
          })
          .catch(console.error)
      }
    }, 60)
  } else {
    themeTrack.src = newSrc
    themeTrack.load()
    themeTrack.volume = themeVolume.value / 100
  }
}

// ─────────────────────────────────────────────
//  BACKWARD COMPATIBILITY ALIASES
// ─────────────────────────────────────────────
export const isPlaying   = guideIsPlaying
export const currentTime = guideCurrentTime
export const duration    = guideDuration

export function togglePlay() { toggleGuide() }
export function skipAudio(n) { skipGuide(n) }
export function seekAudio(n) { seekGuide(n) }