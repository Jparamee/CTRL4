<template>
  <div class="bottom-dock">
    <div class="playback-section">
      <div class="track-meta">
        <div class="track-info">
          <span class="track-name">Museum Grand Tour</span>
          <span class="track-chapter">Chapter 4: The Renaissance</span>
        </div>
        <span class="track-dur">{{ formatTime(playbackPos) }} / 12:40</span>
      </div>
      
      <input 
        type="range" class="slider playback-slider" v-model="playbackPos" 
        min="0" max="760" step="1" 
        :style="{ '--p': (playbackPos / 760 * 100) + '%' }"
        @input="pauseForSeek"
        @change="resumeAfterSeek"
      />
      
      <div class="transport">
        <button class="tbtn" @click="playbackPos = Math.max(0, playbackPos - 15)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
          </svg>
        </button>
        <button class="tbtn play" @click="togglePlay">
          <svg v-if="!playing" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 4 20 12 6 20 6 4"/>
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="8" y1="5" x2="8" y2="19"/>
            <line x1="16" y1="5" x2="16" y2="19"/>
          </svg>
        </button>
        <button class="tbtn" @click="playbackPos = Math.min(760, playbackPos + 15)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-.49-3.5"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="bottom-nav">
      <button class="nav-tab" :class="{ active: activeTab === 'map' }" @click="$emit('switch-tab', 'map')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
          <line x1="8" y1="2" x2="8" y2="18"/>
          <line x1="16" y1="6" x2="16" y2="22"/>
        </svg>
        Map
      </button>
      <button class="nav-tab" :class="{ active: activeTab === 'audio' }" @click="$emit('switch-tab', 'audio')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        Audio
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

defineProps({
  activeTab: String
})
defineEmits(['switch-tab'])

const playbackPos = ref(266)
const playing = ref(false)
let timer = null
let wasPlayingBeforeSeek = false

function formatTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function togglePlay() {
  playing.value = !playing.value
}

watch(playing, (isPlaying) => {
  if (isPlaying) {
    timer = setInterval(() => {
      if (playbackPos.value < 760) {
        playbackPos.value++
      } else {
        playing.value = false
        playbackPos.value = 0
      }
    }, 1000)
  } else {
    clearInterval(timer)
  }
})

function pauseForSeek() {
  wasPlayingBeforeSeek = playing.value
  playing.value = false
}

function resumeAfterSeek() {
  if (wasPlayingBeforeSeek) {
    playing.value = true
  }
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.bottom-dock {
  flex-shrink: 0; background: var(--surface); border-radius: 24px 24px 0 0;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.04); padding: 24px 24px 16px;
  display: flex; flex-direction: column; gap: 24px;
}
.playback-section { display: flex; flex-direction: column; }
.track-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.track-info { display: flex; flex-direction: column; gap: 2px; }
.track-name { font-size: 16px; font-weight: 700; }
.track-chapter { font-size: 12px; color: var(--text-muted); }
.track-dur { font-size: 13px; font-weight: 600; color: var(--text-main); }
.playback-slider { height: 8px; margin-bottom: 20px; }

/* Reusing slider style locally since it's needed for the input range */
.slider {
  -webkit-appearance: none; appearance: none; width: 100%; height: 6px;
  border-radius: 6px; outline: none; cursor: pointer;
  background: linear-gradient(to right, var(--primary) 0%, var(--primary) var(--p, 0%), #dcdfe4 var(--p, 0%), #dcdfe4 100%);
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%;
  background: #fff; border: 2px solid var(--primary); box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: pointer; transition: transform 0.1s;
}

.transport { display: flex; justify-content: center; align-items: center; gap: 40px; }
.tbtn {
  background: none; border: none; cursor: pointer; color: var(--text-main);
  display: flex; align-items: center; justify-content: center; transition: transform 0.1s, opacity 0.2s;
}
.tbtn:hover { opacity: 0.7; }
.tbtn:active { transform: scale(0.9); }
.tbtn.play {
  width: 56px; height: 56px; background: var(--primary); color: #fff;
  border-radius: 50%; box-shadow: 0 8px 16px rgba(82, 121, 111, 0.25);
}
.tbtn.play:hover { opacity: 1; transform: scale(1.05); }
.tbtn.play:active { transform: scale(0.95); }

.bottom-nav { display: flex; gap: 12px; }
.nav-tab {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px; border-radius: 16px; border: 1px solid var(--border);
  background: var(--surface); font-family: inherit; font-size: 15px; font-weight: 600;
  color: var(--text-muted); cursor: pointer; transition: all 0.2s ease;
}
.nav-tab.active { background: var(--text-main); color: #fff; border-color: var(--text-main); }
.nav-tab:not(.active):hover { background: var(--bg-color); color: var(--text-main); }
</style>