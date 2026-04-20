<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">{{ room.label }}</h3>
        <button class="close-btn" @click="$emit('close')" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="modal-body">

        <!-- ── Room description ──────────────────────────── -->
        <div v-if="roomDescription" class="modal-section">
          <p class="room-description">{{ roomDescription }}</p>
        </div>

        <div v-if="roomDescription" class="divider"></div>

        <!-- ── Crowd size ────────────────────────────────── -->
        <div class="modal-section">
          <div class="section-header">
            <div class="section-icon-wrap crowd-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </div>
            <h4 class="section-title">{{ t('Crowd Size', 'Besøgende', 'Besuchermenge') }}</h4>
          </div>
          <p class="crowd-amount">
            {{ t('People present:', 'Tilstedeværende:', 'Anwesende Personen:') }}
            <strong>{{ room.population }}</strong>
          </p>
          <div class="status-indicators">
            <div class="indicator low"  :class="{ active: room.busy === 'low'  }">{{ t('Low',    'Lav',    'Niedrig') }}</div>
            <div class="indicator med"  :class="{ active: room.busy === 'med'  }">{{ t('Medium', 'Medium', 'Mittel')  }}</div>
            <div class="indicator high" :class="{ active: room.busy === 'high' }">{{ t('High',   'Høj',    'Hoch')    }}</div>
          </div>
        </div>

        <!-- ── Content advisory ─────────────────────────── -->
        <template v-if="room.trigger_warnings && room.trigger_warnings.length > 0">
          <div class="divider"></div>
          <div class="modal-section">
            <div class="section-header">
              <div class="section-icon-wrap trigger-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h4 class="section-title">{{ t('Content Advisory', 'Indholdsadvarsel', 'Inhaltswarnung') }}</h4>
            </div>
            <ul class="trigger-list">
              <li v-for="warning in room.trigger_warnings" :key="warning">{{ warning }}</li>
            </ul>
          </div>
        </template>

        <!-- ── Ambient music ─────────────────────────────── -->
        <template v-if="room.themeAudio">
          <div class="divider"></div>
          <div class="music-row">
            <div class="music-row-left">
              <div class="music-icon-wrap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18V5l12-2v13"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <div class="music-text">
                <span class="music-label">{{ t('Ambient Music', 'Baggrundsmusik', 'Ambiente Musik') }}</span>
                <span class="music-sub">{{ t('Auto · tap to play now', 'Auto · tryk for at afspille', 'Auto · Tippen zum Abspielen') }}</span>
              </div>
            </div>
            <button class="music-play-btn" @click="playTheme" :class="{ playing: themeIsPlaying }" :aria-label="themeIsPlaying ? 'Pause' : 'Play'">
              <!-- Animated bars when playing -->
              <span v-if="themeIsPlaying" class="music-bars">
                <span></span><span></span><span></span>
              </span>
              <!-- Play triangle when paused -->
              <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 4 20 12 6 20 6 4"/>
              </svg>
            </button>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { t, currentLang } from '../langStore.js'
import { changeRoomTheme, toggleTheme, themeIsPlaying } from '../audioStore.js'

const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const roomDescription = computed(() => {
  if (!props.room.description) return null
  return props.room.description[currentLang.value]
    || props.room.description.en
    || null
})

function playTheme() {
  // Make sure the correct room track is loaded, then toggle play/pause
  if (props.room.themeAudio) {
    changeRoomTheme(props.room.themeAudio, props.room.label)
  }
  toggleTheme()
}
</script>

<style scoped>
.modal-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(44, 62, 80, 0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 24px;
  backdrop-filter: blur(2px);
}

.modal-content {
  background: var(--surface); border-radius: 24px;
  box-sizing: border-box;
  max-width: 90vw; width: 340px;
  padding: 22px 22px 24px;
  box-shadow: 0 16px 40px rgba(0,0,0,0.14);
  display: flex; flex-direction: column;
  animation: pop-in 0.22s cubic-bezier(.4,0,.2,1);
  overflow-x: hidden;
  /* Allow internal scrolling if content is tall */
  max-height: 80dvh;
  overflow-y: auto;
}

/* Clean scrollbar inside the modal */
.modal-content::-webkit-scrollbar { width: 4px; }
.modal-content::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

@keyframes pop-in {
  from { opacity: 0; transform: scale(0.96) translateY(6px); }
  to   { opacity: 1; transform: scale(1)    translateY(0); }
}

.modal-header {
  display: flex; justify-content: space-between;
  align-items: flex-start; margin-bottom: 18px; gap: 10px;
}
.modal-title {
  font-size: 18px; font-weight: 700; color: var(--text-main);
  line-height: 1.3;
}
.close-btn {
  background: var(--bg-color); border: 1px solid var(--border);
  border-radius: 8px; cursor: pointer; color: var(--text-muted);
  width: 30px; height: 30px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.close-btn:hover { background: var(--primary-light); color: var(--text-main); }

.modal-body { display: flex; flex-direction: column; gap: 14px; }
.modal-section { display: flex; flex-direction: column; gap: 12px; }

/* ── Description ───────────────────────────────────────── */
.room-description {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-muted);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* ── Section headers ───────────────────────────────────── */
.section-header { display: flex; align-items: center; gap: 10px; }
.section-icon-wrap {
  width: 34px; height: 34px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.crowd-icon   { background: var(--primary-light); color: var(--primary); }
.trigger-icon { background: var(--primary-light); color: var(--primary); }
.section-title { font-size: 15px; font-weight: 700; color: var(--text-main); }

.crowd-amount { font-size: 14px; color: var(--text-main); }

/* ── Crowd meter ───────────────────────────────────────── */
.status-indicators { display: flex; gap: 6px; }
.indicator {
  flex: 1; padding: 8px; border-radius: 8px;
  background: transparent; text-align: center;
  font-size: 13px; font-weight: 600; color: var(--text-muted);
  opacity: 0.5; transition: all 0.2s ease;
}
.indicator.active { opacity: 1; }
.indicator.low.active,
:global(.app.dark) .indicator.low.active  { background: #cad2c5; color: #121212; }
.indicator.med.active,
:global(.app.dark) .indicator.med.active  { background: #82ac97; color: #121212; }
.indicator.high.active,
:global(.app.dark) .indicator.high.active { background: #52796f; color: #ffffff; }

/* ── Divider ───────────────────────────────────────────── */
.divider { height: 1px; background: var(--border); }

/* ── Trigger warnings ──────────────────────────────────── */
.trigger-list {
  list-style: none; padding: 0;
  display: flex; flex-direction: column; gap: 6px;
}
.trigger-list li {
  font-size: 13px; color: var(--text-muted);
  padding: 8px 12px;
  background: var(--bg-color);
  border-radius: 8px;
  border-left: 3px solid var(--primary-light);
}

/* ── Ambient music row ─────────────────────────────────── */
.music-row {
  display: flex; align-items: center;
  justify-content: space-between; gap: 10px;
}
.music-row-left {
  display: flex; align-items: center; gap: 10px; min-width: 0;
}
.music-icon-wrap {
  width: 30px; height: 30px; flex-shrink: 0;
  background: var(--primary-light);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
}
.music-text {
  display: flex; flex-direction: column; gap: 1px; min-width: 0;
}
.music-label {
  font-size: 13px; font-weight: 700; color: var(--text-main);
}
.music-sub {
  font-size: 11px; color: var(--text-muted);
}
.music-play-btn {
  width: 34px; height: 34px; flex-shrink: 0;
  border-radius: 10px;
  border: 1.5px solid var(--primary);
  background: transparent;
  color: var(--primary);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.18s ease;
}
.music-play-btn.playing {
  background: var(--primary);
  color: #fff;
}
.music-play-btn:hover { transform: scale(1.08); }
.music-play-btn:active { transform: scale(0.94); }

.music-bars {
  display: flex; align-items: flex-end; gap: 2px; height: 13px;
}
.music-bars span {
  width: 3px; border-radius: 2px; background: currentColor;
  animation: bar-bounce 0.8s ease-in-out infinite;
}
.music-bars span:nth-child(1) { height: 7px;  animation-delay: 0s; }
.music-bars span:nth-child(2) { height: 13px; animation-delay: 0.15s; }
.music-bars span:nth-child(3) { height: 5px;  animation-delay: 0.3s; }
@keyframes bar-bounce {
  0%, 100% { transform: scaleY(0.5); }
  50%       { transform: scaleY(1); }
}
</style>