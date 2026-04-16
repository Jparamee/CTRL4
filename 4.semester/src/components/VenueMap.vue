<template>
  <div class="map-container">
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

        <g v-for="room in floor.rooms" :key="room.id" class="map-room" @click="$emit('open-room', room)">
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
</template>

<script setup>
import { mapFloors } from '../data/mapData.js'

defineEmits(['open-room'])

function getBusyColor(busyState) {
  if (busyState === 'low') return '#cad2c5' 
  if (busyState === 'med') return '#82ac97' 
  return '#52796f' 
}
</script>

<style scoped>
.map-container { padding: 16px 24px; display: flex; flex-direction: column; }
.map-instruction {
  font-size: 13px; color: var(--text-muted); margin-bottom: 16px;
  text-align: center; font-weight: 500;
}
.floor-section { display: flex; flex-direction: column; margin-bottom: 24px; }
.floor-section:last-child { margin-bottom: 0; }
.floor-title { font-size: 20px; font-weight: 700; color: var(--text-main); margin-bottom: 16px; }
.floor-plan-detailed { width: 100%; height: auto; aspect-ratio: 16 / 10; margin-bottom: 20px; }

.map-room rect { cursor: pointer; transition: fill 0.3s ease, opacity 0.2s ease; }
.map-room text, .map-room circle { cursor: pointer; pointer-events: none;  }
.map-room:hover rect { opacity: 0.8; }
.wall-color { stroke: var(--border); stroke-width: 1.5; }

.map-legend {
  display: flex; flex-direction: column; gap: 12px; padding: 16px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 16px; width: 100%; margin-bottom: 24px;
}
.scale-item { font-size: 13px; color: var(--text-main); font-weight: 500; display: flex; align-items: center; gap: 8px; }
.legend-scale { display: flex; justify-content: center; gap: 16px; margin-bottom: 8px; }
.scale-item.low .legend-dot { background: #cad2c5; }
.scale-item.med .legend-dot { background: #82ac97; }
.scale-item.high .legend-dot { background: #52796f; }
.legend-item { display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 500; color: var(--text-main); }
.user-loc { justify-content: center; color: var(--text-main); }
.legend-dot { width: 16px; height: 16px; border: 2px solid var(--primary); border-radius: 50%; display: block; }
.pulsing-legend-dot { background: var(--text-main); border: 2px solid #ffffff; box-shadow: 0 0 0 2px var(--text-main); }
</style>