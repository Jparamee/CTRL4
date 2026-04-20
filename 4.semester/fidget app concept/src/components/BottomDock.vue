<template>
  <div class="bottom-dock">

    <div class="dock-handle-area"
      @click="toggleCollapse"
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
      :title="collapsed
        ? t('Expand player', 'Udvid afspiller', 'Player erweitern')
        : t('Collapse player', 'Skjul afspiller', 'Player minimieren')"
    >
      <div class="handle-bar"></div>
      <svg class="chevron" :class="{ up: collapsed }" width="18" height="18" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>

    <div class="playback-wrapper" :style="wrapperStyle">
      <div class="playback-section" ref="sectionRef">

        <div class="ambient-row">
          <div class="ambient-icon-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          </div>

          <div class="ambient-info">
            <span class="ambient-label">{{ t('Ambient Music', 'Baggrundsmusik', 'Ambiente Musik') }}</span>
            <span class="ambient-room" :class="{ 'no-room': !currentRoomName }">
              {{ currentRoomName || t('Museum Ambiance', 'Museumsstemning', 'Museumsambiente') }}
            </span>
          </div>

          <button
            class="ambient-toggle"
            :class="{ playing: themeIsPlaying }"
            @click.stop="toggleTheme"
            :title="themeIsPlaying
              ? t('Pause music', 'Pause musik', 'Musik pausieren')
              : t('Play music', 'Afspil musik', 'Musik abspielen')"
          >
            <span v-if="themeIsPlaying" class="music-bars">
              <span></span><span></span><span></span>
            </span>
            <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 20 12 6 20 6 4"/>
            </svg>
          </button>
        </div>

        <div class="player-card guide-card">

          <div class="card-header">
            <div class="card-title-group">
              <div class="card-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
                  <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                </svg>
              </div>
              <div>
                <div class="card-name">{{ t('Audio Guide', 'Lydguide', 'Audioguide') }}</div>
                <div class="card-sub">{{ t('Museum Grand Tour', 'Museum Grand Tour', 'Museum Grand Tour') }}</div>
              </div>
            </div>

            <div class="lang-chips">
              <button
                v-for="l in langs" :key="l.code"
                class="lang-chip"
                :class="{ active: guideLang === l.code }"
                @click.stop="guideLang = l.code"
              >{{ l.label }}</button>
            </div>
          </div>

          <div class="progress-row">
            <span class="time-label">{{ formatTime(guideCurrentTime) }}</span>
            <input
              type="range" class="slider"
              :value="guideCurrentTime"
              min="0" :max="guideDuration || 100" step="1"
              :style="{ '--p': (guideCurrentTime / (guideDuration || 1) * 100) + '%' }"
              @mousedown.stop="pauseForSeek"
              @touchstart.stop="pauseForSeek"
              @input="handleSeek"
              @change="resumeAfterSeek"
            />
            <span class="time-label right">{{ formatTime(guideDuration) }}</span>
          </div>

          <div class="transport">
            <button class="tbtn" @click.stop="skipGuide(-15)" :title="t('Back 15s', 'Tilbage 15s', '15s zurück')">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
                <text x="12" y="12" text-anchor="middle" dominant-baseline="central"
                      stroke="none" fill="currentColor" font-size="7.5"
                      font-family="'DM Sans', sans-serif" font-weight="700" opacity="0.75">15</text>
              </svg>
            </button>

            <button class="tbtn play" @click.stop="toggleGuide">
              <svg v-if="!guideIsPlaying" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 4 20 12 6 20 6 4"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="8" y1="5" x2="8" y2="19"/>
                <line x1="16" y1="5" x2="16" y2="19"/>
              </svg>
            </button>

            <button class="tbtn" @click.stop="skipGuide(15)" :title="t('Forward 15s', 'Frem 15s', '15s vor')">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <text x="12" y="12" text-anchor="middle" dominant-baseline="central"
                      stroke="none" fill="currentColor" font-size="7.5"
                      font-family="'DM Sans', sans-serif" font-weight="700" opacity="0.75">15</text>
              </svg>
            </button>
          </div>

          <div class="speed-row">
            <span class="speed-label">{{ t('Speed', 'Hastighed', 'Tempo') }}</span>
            <div class="speed-chips">
              <button
                v-for="s in speeds" :key="s"
                class="speed-chip"
                :class="{ active: playbackSpeed === s }"
                @click.stop="playbackSpeed = s"
              >{{ s }}x</button>
            </div>
          </div>
        </div>

      </div></div><div class="bottom-nav">
      <button class="nav-tab" :class="{ active: activeTab === 'map' }"
              @click.stop="$emit('switch-tab', 'map')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
          <line x1="8" y1="2" x2="8" y2="18"/>
          <line x1="16" y1="6" x2="16" y2="22"/>
        </svg>
        {{ t('Map', 'Kort', 'Karte') }}
      </button>
      <button class="nav-tab" :class="{ active: activeTab === 'audio' }"
              @click.stop="$emit('switch-tab', 'audio')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        {{ t('Audio', 'Lyd', 'Audio') }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import {
  guideIsPlaying, guideCurrentTime, guideDuration, playbackSpeed,
  themeIsPlaying, currentRoomName,
  toggleGuide, skipGuide, seekGuide, toggleTheme,
  guideLang 
} from '../audioStore.js'
import { t } from '../langStore.js' 
const props = defineProps({ activeTab: String })
defineEmits(['switch-tab'])

const speeds = [0.75, 1, 1.25, 1.5, 2]
const langs  = [
  { code: 'en', label: 'EN' },
  { code: 'da', label: 'DA' },
  { code: 'de', label: 'DE' }
]

const collapsed        = ref(true)
const sectionRef       = ref(null)
const fullHeight       = ref(220)
const isDragging       = ref(false)
const dragOffset       = ref(0)
let   touchStartY      = 0
let   hasAutoExpanded  = false
let   wasPlayingBefore = false

watch(() => props.activeTab, (tab) => {
  if (tab === 'audio' && !hasAutoExpanded) {
    collapsed.value   = false
    hasAutoExpanded   = true
  }
})

onMounted(() => {
  if (sectionRef.value) fullHeight.value = sectionRef.value.offsetHeight || 220
})

watch(collapsed, async (isCollapsed) => {
  if (!isCollapsed && sectionRef.value) {
    await nextTick()
    fullHeight.value = sectionRef.value.offsetHeight || 220
  }
})

function toggleCollapse() { collapsed.value = !collapsed.value }

function onTouchStart(e) {
  isDragging.value = true
  touchStartY      = e.touches[0].clientY
  dragOffset.value = 0
  if (sectionRef.value) fullHeight.value = sectionRef.value.offsetHeight || 220
}
function onTouchMove(e) {
  if (!isDragging.value) return
  const delta = e.touches[0].clientY - touchStartY
  if (collapsed.value && delta > 0)  return
  if (!collapsed.value && delta < 0) return
  dragOffset.value = delta
}
function onTouchEnd() {
  if (!isDragging.value) return
  isDragging.value = false
  if (collapsed.value  && dragOffset.value < -40) collapsed.value = false
  else if (!collapsed.value && dragOffset.value > 40) collapsed.value = true
  dragOffset.value = 0
}

const wrapperStyle = computed(() => {
  let h = collapsed.value ? 0 : fullHeight.value
  if (isDragging.value) {
    h = collapsed.value
      ? Math.max(0, Math.min(fullHeight.value, -dragOffset.value))
      : Math.max(0, Math.min(fullHeight.value, fullHeight.value - dragOffset.value))
  }
  return {
    height: `${h}px`,
    opacity: Math.max(0, h / fullHeight.value),
    transition: isDragging.value
      ? 'none'
      : 'height 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s cubic-bezier(.4,0,.2,1)',
    overflow: 'hidden',
    width: '100%'
  }
})

function formatTime(s) {
  if (isNaN(s) || !isFinite(s)) return '0:00'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

function handleSeek(e)     { seekGuide(Number(e.target.value)) }
function pauseForSeek()    { wasPlayingBefore = guideIsPlaying.value; if (guideIsPlaying.value) toggleGuide() }
function resumeAfterSeek() { if (wasPlayingBefore && !guideIsPlaying.value) toggleGuide() }
</script>

<style scoped>
/* ── Shell ─────────────────────────────────────────────── */
.bottom-dock {
  flex-shrink: 0;
  background: var(--surface);
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.08);
  border-top: 1px solid var(--border);
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
}

/* ── Handle ─────────────────────────────────────────────── */
.dock-handle-area {
  display: flex; flex-direction: column; align-items: center;
  gap: 4px; width: 100%; cursor: pointer;
  padding: 12px 0 8px; color: var(--text-muted);
  -webkit-tap-highlight-color: transparent;
}
.handle-bar { width: 36px; height: 4px; background: var(--border); border-radius: 4px; }
.chevron { transition: transform 0.3s cubic-bezier(.4,0,.2,1); }
.chevron.up { transform: rotate(180deg); }

/* ── Player section wrapper ─────────────────────────────── */
.playback-section { display: flex; flex-direction: column; gap: 10px; padding-bottom: 14px; }

/* ── Guide card ─────────────────────────────────────────── */
.player-card {
  background: var(--bg-color);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 14px 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.card-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.card-icon {
  width: 34px; height: 34px;
  background: var(--primary-light);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
}
.card-name  { font-size: 14px; font-weight: 700; color: var(--text-main); line-height: 1.2; }
.card-sub   { font-size: 11px; color: var(--text-muted); margin-top: 1px; }

/* ── Language chips ─────────────────────────────────────── */
.lang-chips {
  display: flex;
  gap: 5px;
  flex-shrink: 0;
}
.lang-chip {
  padding: 4px 9px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.18s ease;
}
.lang-chip.active {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}
.lang-chip:not(.active):hover {
  background: var(--primary-light);
  color: var(--text-main);
  border-color: var(--primary-light);
}

/* ── Progress bar ───────────────────────────────────────── */
.progress-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.time-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  flex-shrink: 0;
}
.time-label.right { color: var(--text-muted); }

.slider {
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  height: 5px;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  background: linear-gradient(
    to right,
    var(--primary) 0%,
    var(--primary) var(--p, 0%),
    var(--border)  var(--p, 0%),
    var(--border)  100%
  );
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--primary);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 0.1s;
}
.slider::-webkit-slider-thumb:hover { transform: scale(1.15); }

/* ── Transport controls ─────────────────────────────────── */
.transport {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
}
.tbtn {
  background: none; border: none; cursor: pointer;
  color: var(--text-main);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.1s, opacity 0.2s;
  padding: 4px;
}
.tbtn:hover  { opacity: 0.7; }
.tbtn:active { transform: scale(0.9); }
.tbtn.play {
  width: 48px; height: 48px;
  background: var(--primary);
  color: #fff;
  border-radius: 50%;
  box-shadow: 0 4px 14px rgba(82,121,111,0.3);
}
.tbtn.play:hover  { opacity: 1; transform: scale(1.05); }
.tbtn.play:active { transform: scale(0.95); }

/* ── Speed chips ────────────────────────────────────────── */
.speed-row {
  display: flex; align-items: center;
  justify-content: center; gap: 8px;
  overflow-x: auto; scrollbar-width: none;
}
.speed-row::-webkit-scrollbar { display: none; }
.speed-label { font-size: 11px; font-weight: 600; color: var(--text-muted); white-space: nowrap; }
.speed-chips { display: flex; gap: 5px; }
.speed-chip {
  padding: 4px 9px; border-radius: 20px;
  border: 1px solid var(--border); background: var(--surface);
  font-family: inherit; font-size: 11px; font-weight: 600;
  color: var(--text-muted); cursor: pointer;
  transition: all 0.18s ease;
}
.speed-chip.active        { background: var(--primary); color: #fff; border-color: var(--primary); }
.speed-chip:not(.active):hover { background: var(--primary-light); color: var(--text-main); }

/* ── Ambient music row ──────────────────────────────────── */
.ambient-row {
  background: var(--bg-color);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 11px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.ambient-icon-wrap {
  width: 30px; height: 30px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-muted);
  flex-shrink: 0;
}
.ambient-info {
  display: flex; flex-direction: column;
  gap: 2px; flex: 1; min-width: 0;
}
.ambient-label { font-size: 11px; color: var(--text-muted); font-weight: 600; }
.ambient-room  {
  font-size: 13px; font-weight: 700; color: var(--text-main);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.ambient-room.no-room { color: var(--text-muted); font-weight: 400; font-style: italic; }

.ambient-toggle {
  width: 34px; height: 34px;
  border-radius: 10px;
  border: 1.5px solid var(--primary);
  background: transparent;
  color: var(--primary);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}
.ambient-toggle.playing { background: var(--primary); color: #fff; }
.ambient-toggle.disabled { opacity: 0.35; cursor: not-allowed; border-color: var(--border); color: var(--text-muted); }
.ambient-toggle:not(.disabled):hover { transform: scale(1.08); }

/* Animated bars (when theme is playing) */
.music-bars {
  display: flex; align-items: flex-end;
  gap: 2px; height: 14px;
}
.music-bars span {
  width: 3px;
  border-radius: 2px;
  background: currentColor;
  animation: bar-bounce 0.8s ease-in-out infinite;
}
.music-bars span:nth-child(1) { height: 8px;  animation-delay: 0s; }
.music-bars span:nth-child(2) { height: 14px; animation-delay: 0.15s; }
.music-bars span:nth-child(3) { height: 5px;  animation-delay: 0.3s; }

@keyframes bar-bounce {
  0%, 100% { transform: scaleY(0.5); }
  50%       { transform: scaleY(1); }
}

/* ── Bottom nav ─────────────────────────────────────────── */
.bottom-nav { display: flex; gap: 10px; margin-top: 4px; }
.nav-tab {
  flex: 1; display: flex; align-items: center;
  justify-content: center; gap: 8px; padding: 13px;
  border-radius: 16px; border: 1px solid var(--border);
  background: var(--bg-color);
  font-family: inherit; font-size: 14px; font-weight: 600;
  color: var(--text-muted); cursor: pointer;
  transition: all 0.2s ease;
}
.nav-tab.active         { background: var(--text-main); color: var(--surface); border-color: var(--text-main); }
.nav-tab:not(.active):hover { background: var(--primary-light); color: var(--text-main); }
</style>