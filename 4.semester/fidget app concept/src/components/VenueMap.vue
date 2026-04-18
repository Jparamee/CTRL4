<template>
  <div class="map-container">

    <div class="location-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      {{ museumName }}
    </div>

    <Transition name="fade">
      <div v-if="showInstruction" class="map-instruction">
        <span>{{ t('Tap any room for live density and info', 'Tryk på et rum for at se tæthed og info', 'Tippen Sie auf einen Raum für Live-Dichte und Infos') }}</span>
        <button class="dismiss-btn" @click="dismissInstruction" aria-label="Dismiss">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </Transition>

    <div class="map-legend">
      <div class="legend-item user-loc">
        <span class="legend-dot pulsing-legend-dot"></span>
        <span>{{ t('You are here', 'Du er her', 'Sie sind hier') }}</span>
      </div>
      <div class="legend-divider"></div>
      
      <div class="legend-density">
        <span class="density-label">{{ t('Amount of people', 'Antal personer', 'Anzahl der Personen') }}</span>
        
        <div class="legend-scale" style="justify-content: center; width: 100%;">
          <span class="scale-item low"><span class="legend-dot"></span> {{ t('Low', 'Lav', 'Niedrig') }}</span>
          <span class="scale-item med"><span class="legend-dot"></span> {{ t('Medium', 'Medium', 'Mittel') }}</span>
          <span class="scale-item high"><span class="legend-dot"></span> {{ t('High', 'Høj', 'Hoch') }}</span>
        </div>
      </div>
    </div>

    <div v-for="floor in floors" :key="floor.id" class="floor-section">
      <h2 class="floor-title">{{ floor.title }}</h2>
      
      <svg class="floor-plan-detailed" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="room-shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#2c3e50" flood-opacity="0.10"/>
          </filter>
        </defs>

        <path d="M 10 10 H 310 V 190 H 10 Z" fill="var(--surface)" />

        <g v-for="room in floor.rooms" :key="room.id" class="map-room" @click="$emit('open-room', room)">
          <rect 
            :fill="getBusyColor(room.busy)" 
            :x="room.x" :y="room.y" :width="room.w" :height="room.h" 
            rx="10" 
            stroke="var(--border)" stroke-width="1"
            filter="url(#room-shadow)"
          />
          
          <text :x="room.x + room.w/2" :y="room.y + room.h/2" text-anchor="middle" 
            font-family="'DM Sans', sans-serif" 
            :font-size="room.w < 140 ? 9 : 11" 
            font-weight="700" 
            fill="#1a1a1a" dominant-baseline="central">
            {{ room.label }}
          </text>
          
          <circle :cx="room.x + room.w - 12" :cy="room.y + 12" r="7" fill="var(--room-icon-bg, #ffffff)" opacity="0.95"/>
          <text :x="room.x + room.w - 12" :y="room.y + 12" font-family="'DM Sans', sans-serif" 
            font-size="9" font-weight="800" fill="var(--room-icon-text, #1a1a1a)" 
            text-anchor="middle" dominant-baseline="central">i</text>

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
</template>

<script setup>
import { ref } from 'vue'

// IMPORT THE NEW LANGUAGE STORE
import { t } from '../langStore.js'

defineProps({
  floors: {
    type: Array,
    required: true
  },
  museumName: {
    type: String,
    required: true
  }
})

defineEmits(['open-room'])

let initialShow = true
try {
  if (localStorage.getItem('audioverse_hide_instruction') === 'true') {
    initialShow = false
  }
} catch (e) {
  // Ignore error
}

const showInstruction = ref(initialShow)

function dismissInstruction() {
  showInstruction.value = false
  try {
    localStorage.setItem('audioverse_hide_instruction', 'true')
  } catch (e) { }
}

function getBusyColor(busyState) {
  if (busyState === 'low') return '#cad2c5' 
  if (busyState === 'med') return '#82ac97' 
  return '#52796f' 
}
</script>

<style scoped>
.map-container { padding: 16px 16px; display: flex; flex-direction: column; }

.location-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--primary-light);
  color: var(--text-main);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 12px;
  align-self: flex-start;
}

.map-instruction {
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  font-size: 13px; color: var(--text-muted); font-weight: 500;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 12px; padding: 10px 14px; margin-bottom: 12px;
}
.dismiss-btn {
  background: none; border: none; cursor: pointer; color: var(--text-muted);
  display: flex; align-items: center; justify-content: center;
  padding: 2px; border-radius: 6px; flex-shrink: 0; transition: color 0.15s;
}
.dismiss-btn:hover { color: var(--text-main); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-4px); }

.map-legend {
  display: flex; flex-direction: column; gap: 10px; padding: 14px 16px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 16px; margin-bottom: 18px;
}
.legend-divider { height: 1px; background: var(--border); }
.legend-item { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; color: var(--text-main); }
.user-loc { justify-content: flex-start; }

.legend-density { display: flex; flex-direction: column; gap: 6px; }
.density-label { font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }

.legend-scale { display: flex; gap: 18px; }
.scale-item { font-size: 13px; color: var(--text-main); font-weight: 500; display: flex; align-items: center; gap: 7px; }
.scale-item.low .legend-dot { background: #cad2c5; }
.scale-item.med .legend-dot { background: #82ac97; }
.scale-item.high .legend-dot { background: #52796f; }
.legend-dot {
  width: 14px; height: 14px; border: 2px solid var(--primary);
  border-radius: 50%; display: block; flex-shrink: 0;
}
.pulsing-legend-dot {
  background: var(--text-main); border: 2px solid var(--surface); box-shadow: 0 0 0 2px var(--text-main);
}

.floor-section { display: flex; flex-direction: column; margin-bottom: 20px; }
.floor-section:last-child { margin-bottom: 0; }
.floor-title { font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 12px; }
.floor-plan-detailed { width: 100%; height: auto; aspect-ratio: 16 / 10; }

.map-room rect { cursor: pointer; transition: opacity 0.2s ease, filter 0.2s ease; }
.map-room text, .map-room circle { cursor: pointer; pointer-events: none; }
.map-room:hover rect { opacity: 0.82; filter: url(#room-shadow) brightness(0.97); }
</style>