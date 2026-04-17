import { ref, watch } from 'vue'

export const isPlaying = ref(false)
export const currentTime = ref(0)
export const duration = ref(100) 
export const playbackSpeed = ref(1)
export const themeVolume = ref(50)
export const voiceVolume = ref(50)

const voiceTrack = new Audio('audio/christianSnakkerSort.mp3')
const themeTrack = new Audio('audio/softpop muzak.mp3')
themeTrack.loop = true 

let isFading = false // Keeps the sliders from breaking the fade!
let fadeInterval = null

voiceTrack.addEventListener('timeupdate', () => {
  currentTime.value = voiceTrack.currentTime
})
voiceTrack.addEventListener('loadedmetadata', () => {
  duration.value = voiceTrack.duration
})
voiceTrack.addEventListener('ended', () => {
  isPlaying.value = false
})

export function togglePlay() {
  if (isPlaying.value) {
    voiceTrack.pause()
    themeTrack.pause()
    isPlaying.value = false
  } else {
    const playPromise = voiceTrack.play()
    if (playPromise !== undefined) {
      playPromise.then(() => {
        themeTrack.play()
        isPlaying.value = true
      }).catch(err => {
        console.error("Audio failed to play:", err)
      })
    }
  }
}

// Watchers for the settings sliders
watch(themeVolume, (vol) => { 
  // Only change the volume if we aren't currently fading!
  if (!isFading) themeTrack.volume = vol / 100 
}, { immediate: true })

watch(voiceVolume, (vol) => { 
  voiceTrack.volume = vol / 100 
}, { immediate: true })

watch(playbackSpeed, (speed) => { 
  voiceTrack.playbackRate = speed 
})

// THE FADE TRANSITION LOGIC
export function changeRoomTheme(audioFileName) {
  if (!audioFileName) return; 

  const newSrc = `audio/${audioFileName}`;
  
  // If it's already playing this exact song, do nothing
  if (themeTrack.src.endsWith(newSrc)) return;

  if (isPlaying.value) {
    // 1. FADE OUT
    isFading = true;
    clearInterval(fadeInterval);
    let currentVol = themeTrack.volume;

    fadeInterval = setInterval(() => {
      currentVol = Math.max(0, currentVol - 0.05); // Drop volume
      themeTrack.volume = currentVol;

      // When fully faded out...
      if (currentVol <= 0) {
        clearInterval(fadeInterval);
        
        // 2. SWAP SONGS
        themeTrack.pause();
        themeTrack.src = newSrc;
        themeTrack.load();
        
        const playPromise = themeTrack.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            
            // 3. FADE IN
            let targetVol = themeVolume.value / 100;
            fadeInterval = setInterval(() => {
              currentVol = Math.min(targetVol, currentVol + 0.05); // Raise volume
              themeTrack.volume = currentVol;
              
              if (currentVol >= targetVol) {
                // Done fading!
                clearInterval(fadeInterval);
                isFading = false;
                themeTrack.volume = themeVolume.value / 100; // Lock to slider setting
              }
            }, 60); // Speed of fade in
          }).catch(e => console.log(e));
        }
      }
    }, 60); // Speed of fade out
  } else {
    // If paused, just swap it instantly without fading
    themeTrack.src = newSrc;
    themeTrack.load();
    themeTrack.volume = themeVolume.value / 100;
  }
}

export function skipAudio(amount) {
  voiceTrack.currentTime = Math.max(0, Math.min(voiceTrack.duration, voiceTrack.currentTime + amount))
}

export function seekAudio(seconds) {
  voiceTrack.currentTime = seconds
}