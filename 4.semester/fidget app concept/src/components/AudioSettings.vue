<template>
  <div class="settings-container">

    <!-- NEW: Fidget Toy Test Connection Button -->
    <div class="fidget-connect-row">
      <button 
        class="fidget-btn" 
        :class="{ 'connected': isConnected }"
        @click="isConnected ? disconnect() : connect()"
        :disabled="isConnecting"
      >
        <span v-if="isConnecting">Connecting...</span>
        <span v-else-if="isConnected">🟢 Connected</span>
        <span v-else>🔌 Connect Fidget Toy</span>
      </button>
    </div>
    <!-- END NEW -->

    <div class="toggles-row">
      <div class="toggle-card">
        <div class="icon-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        </div>
        <div class="text-wrap">
          <span class="setting-label">{{ t('Noise Suppression', 'Støjreduktion', 'Rauschunterdrückung') }}</span>
          <span class="setting-sub">{{ noiseSuppression ? t('Active', 'Aktiv', 'Aktiv') : t('Off', 'Fra', 'Aus') }}</span>
        </div>
        <label class="toggle">
          <input type="checkbox" v-model="noiseSuppression"/>
          <span class="track"><span class="thumb"></span></span>
        </label>
      </div>

      <div class="toggle-card">
        <div class="icon-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div class="text-wrap">
          <span class="setting-label">{{ t('Density Alerts', 'Tæthedsadvarsler', 'Dichtewarnungen') }}</span>
          <span class="setting-sub">{{ crowdWarning ? t('On', 'Til', 'Ein') : t('Off', 'Fra', 'Aus') }}</span>
        </div>
        <label class="toggle">
          <input type="checkbox" v-model="crowdWarning"/>
          <span class="track"><span class="thumb"></span></span>
        </label>
      </div>
    </div>

    <div class="sliders-card">

      <div class="setting-row-slider">
        <div class="slider-header">
          <div class="icon-wrap">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
              <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
            </svg>
          </div>
          <div class="text-wrap">
            <span class="setting-label">{{ t('Voice Guide', 'Lydguide', 'Sprachführer') }}</span>
            <span class="setting-sub">{{ t('Narration volume', 'Fortællervolumen', 'Erzähllautstärke') }}</span>
          </div>
          <span class="slider-val">{{ voiceVolume }}%</span>
        </div>
        <input type="range" class="slider" v-model="voiceVolume"
               min="0" max="100" step="1" :style="{ '--p': voiceVolume + '%' }"/>
      </div>

      <div class="slider-divider"></div>

      <div class="setting-row-slider">
        <div class="slider-header">
          <div class="icon-wrap">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          </div>
          <div class="text-wrap">
            <span class="setting-label">{{ t('Ambient Music', 'Baggrundsmusik', 'Ambiente Musik') }}</span>
            <span class="setting-sub">{{ t('Room ambiance volume', 'Rummets stemningsvolumen', 'Raumambiente Lautstärke') }}</span>
          </div>
          <span class="slider-val">{{ themeVolume }}%</span>
        </div>
        <input type="range" class="slider" v-model="themeVolume"
               min="0" max="100" step="1" :style="{ '--p': themeVolume + '%' }"/>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { themeVolume, voiceVolume } from '../audioStore.js'
import { t } from '../langStore.js'
import { useFidgetConnection } from './useFidgetConnection.js'

// Destructure the functions
const { isConnected, isConnecting, connect, disconnect } = useFidgetConnection()

const noiseSuppression = ref(localStorage.getItem('av_noise') !== 'false')
const crowdWarning     = ref(localStorage.getItem('av_crowd') !== 'false')

watch(noiseSuppression, (val) => localStorage.setItem('av_noise', val))
watch(crowdWarning,     (val) => localStorage.setItem('av_crowd', val))
</script>

<style scoped>
.settings-container { padding: 16px 16px 20px; display: flex; flex-direction: column; gap: 14px; }

/* ── Toggles ────────────────────────────────────────────── */
.toggles-row { display: flex; gap: 12px; }
.toggle-card {
  flex: 1; background: var(--surface); border: 1px solid var(--border);
  border-radius: 18px; padding: 14px 12px;
  display: flex; flex-direction: column; gap: 10px; align-items: flex-start;
}
.toggle-card .icon-wrap { width: 36px; height: 36px; background: var(--bg-color); border: 1px solid var(--border); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--text-main); flex-shrink: 0; }
.toggle-card .text-wrap { display: flex; flex-direction: column; gap: 2px; width: 100%; }
.toggle-card .toggle   { align-self: flex-end; }

/* ── Sliders card ───────────────────────────────────────── */
.sliders-card { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 18px 16px; display: flex; flex-direction: column; }
.slider-divider { height: 1px; background: var(--border); margin: 18px 0; }
.setting-row-slider { display: flex; flex-direction: column; gap: 14px; }
.slider-header { display: flex; align-items: center; gap: 14px; width: 100%; }
.icon-wrap { width: 36px; height: 36px; background: var(--bg-color); border: 1px solid var(--border); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--text-main); flex-shrink: 0; }
.text-wrap  { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.setting-label { font-size: 15px; font-weight: 600; color: var(--text-main); }
.setting-sub   { font-size: 12px; color: var(--text-muted); font-weight: 400; }
.slider-val    { font-size: 13px; font-weight: 600; color: var(--primary); min-width: 36px; text-align: right; font-variant-numeric: tabular-nums; }
.slider {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 6px; border-radius: 6px; outline: none; cursor: pointer;
  background: linear-gradient(to right, var(--primary) 0%, var(--primary) var(--p, 0%), var(--border) var(--p, 0%), var(--border) 100%);
}
.slider::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #fff; border: 2px solid var(--primary); box-shadow: 0 2px 6px rgba(0,0,0,0.15); cursor: pointer; transition: transform 0.1s; }
.slider::-webkit-slider-thumb:hover { transform: scale(1.15); }

/* ── Toggle switch ──────────────────────────────────────── */
.toggle { position: relative; cursor: pointer; display: flex; align-items: center; }
.toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
.track  { display: block; width: 44px; height: 26px; background: #dcdfe4; border-radius: 30px; transition: background 0.3s ease; position: relative; }
.thumb  { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; background: #fff; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.15); transition: transform 0.3s cubic-bezier(.4,0,.2,1); }
.toggle input:checked + .track          { background: var(--primary); }
.toggle input:checked + .track .thumb  { transform: translateX(18px); }

/* ── Fidget Connect Button ───────────────────────────────── */
.fidget-connect-row {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.fidget-btn {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border); /* Subtle grey outline */
  background: var(--surface);      /* White background */
  color: var(--text-main);         /* Main text color */
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;                /* Slightly lighter weight */
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04); /* Very subtle shadow */
}

/* Hover state: slightly lift and darken border */
.fidget-btn:hover:not(:disabled) {
  background: var(--bg-color);     /* Light grey bg on hover */
  border-color: var(--primary);    /* Highlight border */
  color: var(--primary);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.06);
}

/* Active state: press down */
.fidget-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}

.fidget-btn.connected {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-light); /* Very light green bg */
}

.fidget-btn.connected:hover:not(:disabled) {
  background: var(--primary);
  color: #fff;
}

/* Disabled state */
.fidget-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--bg-color);
  color: var(--text-muted);
  border-color: var(--border);
  box-shadow: none;
}

</style>