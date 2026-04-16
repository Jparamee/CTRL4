<template>
  <div class="settings-container">
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
</template>

<script setup>
import { ref } from 'vue'

const noiseSuppression = ref(true)
const themeMusic = ref(45)
const audioGuide = ref(60)
const crowdWarning = ref(true)
</script>

<style scoped>
.settings-container {
  padding: 10px 24px 20px; display: flex; flex-direction: column;
}
.setting-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 0; border-bottom: 1px solid var(--border);
}
.setting-row:last-child { border-bottom: none; }
.setting-row-slider { flex-direction: column; align-items: stretch; gap: 16px; }
.setting-info-group { display: flex; align-items: center; gap: 16px; }
.slider-header { width: 100%; }
.icon-wrap {
  width: 40px; height: 40px; background: var(--surface); border: 1px solid var(--border);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: var(--text-main); flex-shrink: 0;
}
.text-wrap { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.setting-label { font-size: 16px; font-weight: 600; }
.setting-sub { font-size: 13px; color: var(--text-muted); font-weight: 400; }
.slider-val { font-size: 14px; font-weight: 600; color: var(--primary); }

.toggle { position: relative; cursor: pointer; display: flex; align-items: center;}
.toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
.track {
  display: block; width: 48px; height: 28px; background: #dcdfe4;
  border-radius: 30px; transition: background 0.3s ease; position: relative;
}
.thumb {
  position: absolute; top: 3px; left: 3px; width: 22px; height: 22px;
  background: #fff; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
}
.toggle input:checked + .track { background: var(--primary); }
.toggle input:checked + .track .thumb { transform: translateX(20px); }

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
.slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
.slider::-moz-range-thumb {
  width: 20px; height: 20px; border-radius: 50%; background: #fff;
  border: 2px solid var(--primary); box-shadow: 0 2px 6px rgba(0,0,0,0.15); cursor: pointer;
}
</style>