<template>
  <div class="app">
    <header class="header-section">
      <div class="status-bar">
        <span class="time">9:41</span>
        <div class="status-icons">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="4" width="3" height="8" rx="1" fill="currentColor"/>
            <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="currentColor"/>
            <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="currentColor"/>
            <rect x="13.5" y="0.5" width="3" height="11.5" rx="1" fill="currentColor" opacity="0.3"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 3C10.2 3 12.2 3.9 13.7 5.3L15.1 3.9C13.2 2.1 10.7 1 8 1C5.3 1 2.8 2.1 0.9 3.9L2.3 5.3C3.8 3.9 5.8 3 8 3Z" fill="currentColor"/>
            <path d="M8 6C9.4 6 10.7 6.6 11.6 7.5L13 6.1C11.7 4.8 9.9 4 8 4C6.1 4 4.3 4.8 3 6.1L4.4 7.5C5.3 6.6 6.6 6 8 6Z" fill="currentColor"/>
            <circle cx="8" cy="11" r="1.5" fill="currentColor"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" stroke-opacity="0.35"/>
            <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/>
            <path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6C24.5 5.6 23.8 4.8 23 4.5Z" fill="currentColor" fill-opacity="0.4"/>
          </svg>
        </div>
      </div>

      <div class="nav-bar">
        <div class="logo">AUDIOVERSE</div>
        <button class="settings-btn" @click="switchTab('audio')">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>

      <h1 class="page-title">{{ activeTab === 'map' ? 'Venue Map' : 'Preferences' }}</h1>
    </header>

    <main class="main-content-scroll">
      
      <div v-if="activeTab === 'audio'" class="settings-container">
        <div class="setting-row">
          <div class="setting-info-group">
            <div class="icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            </div>
            <div class="text-wrap">
              <span class="setting-label">Noise Suppression</span>
              <span class="setting-sub">{{ noiseSuppression ? 'Active' : 'Disabled' }}</span>
            </div>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="noiseSuppression" />
            <span class="track"><span class="thumb"></span></span>
          </label>
        </div>

        <div class="setting-row setting-row-slider">
          <div class="setting-info-group slider-header">
            <div class="icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </div>
            <div class="text-wrap">
              <span class="setting-label">Theme Music</span>
              <span class="setting-sub">Background ambiance</span>
            </div>
            <span class="slider-val">{{ themeMusic }}%</span>
          </div>
          <input 
            type="range" class="slider" v-model="themeMusic" 
            min="0" max="100" step="1" 
            :style="{ '--p': themeMusic + '%' }"
          />
        </div>

        <div class="setting-row setting-row-slider">
          <div class="setting-info-group slider-header">
            <div class="icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91"/>
                <path d="M15 1s3 2 3 6"/>
                <path d="M19 1s4 2.5 4 9"/>
              </svg>
            </div>
            <div class="text-wrap">
              <span class="setting-label">Voice Guide</span>
              <span class="setting-sub">Narration volume</span>
            </div>
            <span class="slider-val">{{ audioGuide }}%</span>
          </div>
          <input 
            type="range" class="slider" v-model="audioGuide" 
            min="0" max="100" step="1" 
            :style="{ '--p': audioGuide + '%' }"
          />
        </div>

        <div class="setting-row">
          <div class="setting-info-group">
            <div class="icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div class="text-wrap">
              <span class="setting-label">Density Alerts</span>
              <span class="setting-sub">{{ crowdWarning ? 'Notifications on' : 'Muted' }}</span>
            </div>
          </div>
          <label class="toggle">
            <input type="checkbox" v-model="crowdWarning" />
            <span class="track"><span class="thumb"></span></span>
          </label>
        </div>
      </div>

      <div v-if="activeTab === 'map'" class="map-container">
        
        <p class="map-instruction">👆 Tap any room for live density & info</p>

        <div class="map-legend">
          <div class="legend-scale">
            <span class="scale-item low"><span class="legend-dot"></span> Low Busy</span>
            <span class="scale-item med"><span class="legend-dot"></span> Med Busy</span>
            <span class="scale-item high"><span class="legend-dot"></span> High Busy</span>
          </div>
          <div class="legend-item user-loc">
            <span class="legend-dot pulsing-legend-dot"></span> You are here
          </div>
        </div>

        <div v-for="floor in mapFloors" :key="floor.id" class="floor-section">
          <h2 class="floor-title">{{ floor.title }}</h2>
          
          <svg class="floor-plan-detailed" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10 10 H 310 V 190 H 10 Z" fill="var(--surface)" />
            
            <defs>
              <pattern id="doorH" patternUnits="userSpaceOnUse" width="10" height="4">
                <rect width="10" height="1" fill="var(--surface)"/>
              </pattern>
            </defs>

            <g v-for="room in floor.rooms" :key="room.id" class="map-room" @click="openModal(room)">
              <rect v-bind:class="room.shapeClass" :fill="getBusyColor(room.busy)" :x="room.x" :y="room.y" :width="room.w" :height="room.h" rx="10" stroke="var(--border)" stroke-width="1.5"/>
              
              <text :x="room.x + room.w/2" :y="room.y + room.h/2 + 5" text-anchor="middle" font-family="'DM Sans', sans-serif" font-size="12" font-weight="600" fill="var(--text-main)" dominant-baseline="central">
                {{ room.label }}
              </text>
              
              <circle :cx="room.x + 14" :cy="room.y + 14" r="7" fill="#ffffff" opacity="0.6"/>
              <text :x="room.x + 14" :y="room.y + 15.5" font-family="'DM Sans', sans-serif" font-size="9" font-weight="700" fill="var(--text-main)" text-anchor="middle" dominant-baseline="central">i</text>

              <g v-for="door in room.doors" :key="door.id">
                <rect :x="door.x" :y="door.y" :width="door.w" :height="door.h" fill="var(--surface)"/>
              </g>
            </g>

            <g v-if="floor.user_loc" class="user-marker">
              <circle :cx="floor.user_loc.x" :cy="floor.user_loc.y" r="10" fill="var(--text-main)" opacity="0.2">
                <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle :cx="floor.user_loc.x" :cy="floor.user_loc.y" r="5" fill="var(--text-main)" stroke="#ffffff" stroke-width="2"/>
            </g>
          </svg>
        </div>

      </div>
    </main>

    <div v-if="modalActive" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">INFO: {{ currentModalRoom }}</h3>
          <button class="close-btn" @click="closeModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <div v-if="triggerWarnings.length > 0" class="modal-section trigger-section">
            <div class="section-header">
              <svg class="section-icon trigger-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <h4>Trigger Warnings</h4>
            </div>
            <ul class="trigger-list">
              <li v-for="warning in triggerWarnings" :key="warning">{{ warning }}</li>
            </ul>
          </div>

          <div class="divider"></div>

          <div class="modal-section crowd-section">
            <div class="section-header">
              <svg class="section-icon info-icon-small" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <h4>Crowd Size</h4>
            </div>
            <p class="crowd-amount">People Present: <strong>{{ crowdSize }}</strong></p>
            <div class="segmented-control">
              <button class="segment" :class="{ active: crowdBusyState === 'low' }">Low</button>
              <button class="segment" :class="{ active: crowdBusyState === 'med' }">Med</button>
              <button class="segment" :class="{ active: crowdBusyState === 'high' }">High</button>
            </div>
          </div>
        </div>
      </div>
    </div>

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
        <button class="nav-tab" :class="{ active: activeTab === 'map' }" @click="switchTab('map')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
            <line x1="8" y1="2" x2="8" y2="18"/>
            <line x1="16" y1="6" x2="16" y2="22"/>
          </svg>
          Map
        </button>
        <button class="nav-tab" :class="{ active: activeTab === 'audio' }" @click="switchTab('audio')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
          Audio
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const activeTab = ref('map') 

function switchTab(tabName) {
  activeTab.value = tabName
  closeModal()
}

const noiseSuppression = ref(true)
const themeMusic = ref(45)
const audioGuide = ref(60)
const crowdWarning = ref(true)

const mapFloors = ref([
  { id: 'floor1', title: 'Floor 1', user_loc: {x: 70, y: 50}, rooms: [
    { id: 'hall_a', label: 'Hall A', x: 20, y: 20, w: 100, h: 60, shapeClass: 'hallway-main', busy: 'med', trigger_warnings: ['Loud noises (from machinery)'], population: 15, doors: [{id: 'd1_hA_in', x: 20, y: 35, w: 2, h: 30}] },
    { id: 'hall_b', label: 'Hall B', x: 20, y: 120, w: 100, h: 60, shapeClass: 'hallway-alt', busy: 'low', trigger_warnings: [], population: 4, doors: [{id: 'd1_hB_out', x: 118, y: 135, w: 2, h: 30}] },
    { id: 'gallery_main', label: 'Main Gallery', x: 140, y: 20, w: 160, h: 160, shapeClass: 'room-main-shape', busy: 'high', trigger_warnings: ['Flashing light (exhibition display)', 'Strong smells (industrial exhibit)'], population: 35, doors: [{id: 'd1_mg_in', x: 140, y: 80, w: 2, h: 40}] }
  ]},
  { id: 'floor2', title: 'Floor 2', rooms: [
    { id: 'theatre_1', label: 'Theatre 1', x: 20, y: 20, w: 140, h: 160, shapeClass: 'room-theatre', busy: 'high', trigger_warnings: ['Flashing lights (performance)', 'Loud music'], population: 120, doors: [{id: 'd2_t1_main', x: 158, y: 80, w: 2, h: 40}] },
    { id: 'cafe', label: 'Cafe', x: 180, y: 20, w: 120, h: 80, shapeClass: 'room-main-shape', busy: 'low', trigger_warnings: [], population: 5, doors: [{id: 'd2_cafe_side', x: 240, y: 98, w: 30, h: 2}] },
    { id: 'exhibition_b', label: 'Hall B (Upstairs)', x: 180, y: 120, w: 120, h: 60, shapeClass: 'hallway-alt', busy: 'med', trigger_warnings: [], population: 10, doors: [{id: 'd2_hb_up', x: 180, y: 135, w: 2, h: 30}] }
  ]},
  { id: 'floor3', title: 'Floor 3', rooms: [
    { id: 'rooftop', label: 'Rooftop Garden', x: 20, y: 20, w: 280, h: 100, shapeClass: 'room-main-shape', busy: 'low', trigger_warnings: ['Open air (heights)', 'Sunlight exposure'], population: 8, doors: [{id: 'd3_roof', x: 140, y: 118, w: 40, h: 2}] },
    { id: 'lounge', label: 'VIP Lounge', x: 60, y: 140, w: 200, h: 40, shapeClass: 'room-alt', busy: 'med', trigger_warnings: [], population: 12, doors: [{id: 'd3_lounge', x: 140, y: 138, w: 40, h: 2}] }
  ]}
])

function getBusyColor(busyState) {
  if (busyState === 'low') return '#cad2c5' 
  if (busyState === 'med') return '#82ac97' 
  return '#52796f' 
}

const modalActive = ref(false)
const currentModalRoom = ref('')
const triggerWarnings = ref([])
const crowdSize = ref(0)
const crowdBusyState = ref('low')

function openModal(roomData) {
  currentModalRoom.value = roomData.label
  triggerWarnings.value = roomData.trigger_warnings
  crowdSize.value = roomData.population
  crowdBusyState.value = roomData.busy
  modalActive.value = true
}

function closeModal() {
  modalActive.value = false
}

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
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0; 
}

.app {
  --bg-color: #f4f6f8;
  --surface: #ffffff;
  --text-main: #2c3e50;
  --text-muted: #7f8c8d;
  --primary: #52796f; 
  --primary-light: #cad2c5;
  --border: #e2e8f0;
  
  font-family: 'DM Sans', sans-serif;
  background: var(--bg-color);
  color: var(--text-main);
  width: 100%;
  max-width: 390px;
  height: 100dvh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.header-section {
  flex-shrink: 0;
  background: var(--bg-color);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px 0;
  height: 44px;
}
.time { font-size: 15px; font-weight: 600; }
.status-icons { display: flex; align-items: center; gap: 6px; }

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 0;
}
.logo { 
  font-size: 12px; 
  font-weight: 700; 
  letter-spacing: 2px; 
  color: var(--text-muted); 
}
.settings-btn {
  background: none; border: none; cursor: pointer;
  color: var(--text-main);
  transition: transform 0.3s ease;
}
.settings-btn:hover { transform: rotate(45deg); }

.page-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -1px;
  padding: 16px 24px 0;
  color: var(--text-main);
}

.main-content-scroll {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.settings-container {
  padding: 10px 24px 20px;
  display: flex;
  flex-direction: column;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
}
.setting-row:last-child {
  border-bottom: none;
}
.setting-row-slider {
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
}

.setting-info-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.slider-header {
  width: 100%;
}

.icon-wrap {
  width: 40px; 
  height: 40px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  color: var(--text-main);
  flex-shrink: 0;
}

.text-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.setting-label {
  font-size: 16px;
  font-weight: 600;
}
.setting-sub {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 400;
}
.slider-val {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
}

.toggle { position: relative; cursor: pointer; display: flex; align-items: center;}
.toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
.track {
  display: block;
  width: 48px; height: 28px;
  background: #dcdfe4;
  border-radius: 30px;
  transition: background 0.3s ease;
  position: relative;
}
.thumb {
  position: absolute;
  top: 3px; left: 3px;
  width: 22px; height: 22px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
}
.toggle input:checked + .track { background: var(--primary); }
.toggle input:checked + .track .thumb { transform: translateX(20px); }

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  background: linear-gradient(
    to right,
    var(--primary) 0%,
    var(--primary) var(--p, 0%),
    #dcdfe4 var(--p, 0%),
    #dcdfe4 100%
  );
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--primary);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 0.1s;
}
.slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
.slider::-moz-range-thumb {
  width: 20px; height: 20px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--primary);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: pointer;
}

.map-container {
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
}

.map-instruction {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 16px;
  text-align: center;
  font-weight: 500;
}

.floor-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}
.floor-section:last-child {
  margin-bottom: 0;
}

.floor-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 16px;
}

.floor-plan-detailed {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  margin-bottom: 20px;
}

.map-room rect {
  cursor: pointer;
  transition: fill 0.3s ease, opacity 0.2s ease;
}
.map-room text, .map-room circle {
  cursor: pointer;
  pointer-events: none; 
}
.map-room:hover rect {
  opacity: 0.8;
}

.wall-color {
  stroke: var(--border);
  stroke-width: 1.5;
}

.map-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  width: 100%;
  margin-bottom: 24px;
}

.scale-item {
  font-size: 13px;
  color: var(--text-main);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-scale {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 8px;
}

.scale-item.low .legend-dot { background: #cad2c5; }
.scale-item.med .legend-dot { background: #82ac97; }
.scale-item.high .legend-dot { background: #52796f; }

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-main);
}
.user-loc {
  justify-content: center;
  color: var(--text-main);
}

.legend-dot {
  width: 16px;
  height: 16px;
  border: 2px solid var(--primary);
  border-radius: 50%;
  display: block;
}
.pulsing-legend-dot {
  background: var(--text-main);
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 2px var(--text-main);
}

.modal-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.modal-content {
  background: var(--surface);
  border-radius: 24px;
  width: 100%;
  max-width: 320px;
  padding: 24px;
  box-shadow: 0 16px 32px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
}

.close-btn {
  background: none; border: none; cursor: pointer;
  color: var(--text-muted);
  transition: opacity 0.2s ease;
}
.close-btn:hover { opacity: 0.7; }

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-icon {
  width: 36px; height: 36px;
  background: #fdf2f1; 
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.trigger-icon {
  color: #ff4757; 
}
.info-icon-small {
  background: var(--bg-color);
  color: var(--primary);
}

.trigger-list {
  list-style: disc;
  padding-left: 20px;
  font-size: 13px;
  color: var(--text-muted);
}
.crowd-amount {
  font-size: 15px;
  color: var(--text-main);
}

.segmented-control {
  display: flex;
  background: var(--bg-color);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
}

.segment {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: none;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}
.segment.active {
  background: var(--surface);
  color: var(--text-main);
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}

.divider {
  height: 1px;
  background: var(--border);
  margin: 10px -24px;
}

.bottom-dock {
  flex-shrink: 0;
  background: var(--surface);
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.04);
  padding: 24px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.playback-section {
  display: flex;
  flex-direction: column;
}

.track-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.track-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.track-name { 
  font-size: 16px; 
  font-weight: 700; 
}
.track-chapter {
  font-size: 12px;
  color: var(--text-muted);
}
.track-dur { 
  font-size: 13px; 
  font-weight: 600; 
  color: var(--text-main); 
}

.playback-slider {
  height: 8px;
  margin-bottom: 20px;
}

.transport {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
.tbtn {
  background: none; border: none; cursor: pointer;
  color: var(--text-main);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.1s, opacity 0.2s;
}
.tbtn:hover { opacity: 0.7; }
.tbtn:active { transform: scale(0.9); }

.tbtn.play {
  width: 56px; height: 56px;
  background: var(--primary); 
  color: #fff;
  border-radius: 50%;
  box-shadow: 0 8px 16px rgba(82, 121, 111, 0.25);
}
.tbtn.play:hover { opacity: 1; transform: scale(1.05); }
.tbtn.play:active { transform: scale(0.95); }

.bottom-nav {
  display: flex;
  gap: 12px;
}
.nav-tab {
  flex: 1;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 8px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-family: inherit;
  font-size: 15px; 
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}
.nav-tab.active {
  background: var(--text-main);
  color: #fff;
  border-color: var(--text-main);
}
.nav-tab:not(.active):hover {
  background: var(--bg-color);
  color: var(--text-main);
}
</style>