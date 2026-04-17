<template>
  <div class="bottom-dock">
    
    <div class="dock-handle-area" 
      @click="toggleCollapse" 
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
      :title="collapsed ? 'Expand player' : 'Collapse player'"
    >
      <div class="handle-bar"></div>
      <svg class="chevron" :class="{ up: collapsed }" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>

    <div class="playback-wrapper" :style="wrapperStyle">
      <div class="playback-section" ref="sectionRef">
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
          @mousedown.stop="pauseForSeek"
          @touchstart.stop="pauseForSeek"
          @touchmove.stop
          @touchend.stop
          @change="resumeAfterSeek"
        />
        
        <div class="transport">
          <button class="tbtn" @click.stop="skip(-15)">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <text x="12" y="12" text-anchor="middle" dominant-baseline="central" stroke="none" fill="currentColor" font-size="7.5" font-family="'DM Sans', sans-serif" font-weight="700" opacity="0.75">15</text>
            </svg>
          </button>

          <button class="tbtn play" @click.stop="togglePlay">
            <svg v-if="!playing" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 20 12 6 20 6 4"/>
            </svg>
            <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="8" y1="5" x2="8" y2="19"/>
              <line x1="16" y1="5" x2="16" y2="19"/>
            </svg>
          </button>

          <button class="tbtn" @click.stop="skip(15)">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <text x="12" y="12" text-anchor="middle" dominant-baseline="central" stroke="none" fill="currentColor" font-size="7.5" font-family="'DM Sans', sans-serif" font-weight="700" opacity="0.75">15</text>
            </svg>
          </button>
        </div>

        <div class="speed-row">
          <span class="speed-label">Speed</span>
          <div class="speed-chips">
            <button 
              v-for="s in speeds" :key="s"
              class="speed-chip" 
              :class="{ active: speed === s }"
              @click.stop="speed = s"
            >{{ s }}x</button>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-nav">
      <button class="nav-tab" :class="{ active: activeTab === 'map' }" @click.stop="$emit('switch-tab', 'map')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
          <line x1="8" y1="2" x2="8" y2="18"/>
          <line x1="16" y1="6" x2="16" y2="22"/>
        </svg>
        Map
      </button>
      <button class="nav-tab" :class="{ active: activeTab === 'audio' }" @click.stop="$emit('switch-tab', 'audio')">
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
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({ activeTab: String })
defineEmits(['switch-tab'])

const playbackPos = ref(0)
const playing = ref(false)
// 1. Player now starts collapsed!
const collapsed = ref(true) 
const speed = ref(1)

const speeds = [0.75, 1, 1.25, 1.5, 2] 
let timer = null
let wasPlayingBeforeSeek = false

// 2. Track if it has been auto-expanded yet
let hasAutoExpanded = false

// 3. Watch the tab prop to trigger the auto-expand
watch(() => props.activeTab, (newTab) => {
  if (newTab === 'audio' && !hasAutoExpanded) {
    collapsed.value = false
    hasAutoExpanded = true
  }
})

// --- Responsive Swipe & Drag Logic ---
const sectionRef = ref(null)
const fullHeight = ref(190) // Fallback height

const isDragging = ref(false)
const dragOffset = ref(0)
let touchStartY = 0

onMounted(() => {
  if (sectionRef.value) {
    fullHeight.value = sectionRef.value.offsetHeight || 190
  }
})

// Ensures accurate height measurement when un-collapsing
watch(collapsed, async (isCollapsed) => {
  if (!isCollapsed && sectionRef.value) {
    await nextTick()
    fullHeight.value = sectionRef.value.offsetHeight || 190
  }
})

function toggleCollapse() {
  collapsed.value = !collapsed.value
}

function onTouchStart(e) {
  isDragging.value = true
  touchStartY = e.touches[0].clientY
  dragOffset.value = 0
  
  if (sectionRef.value) {
    fullHeight.value = sectionRef.value.offsetHeight || 190
  }
}

function onTouchMove(e) {
  if (!isDragging.value) return
  const currentY = e.touches[0].clientY
  const delta = currentY - touchStartY
  
  if (collapsed.value && delta > 0) return 
  if (!collapsed.value && delta < 0) return
  
  dragOffset.value = delta
}

function onTouchEnd() {
  if (!isDragging.value) return
  isDragging.value = false
  
  if (collapsed.value && dragOffset.value < -40) {
    collapsed.value = false
  } else if (!collapsed.value && dragOffset.value > 40) {
    collapsed.value = true
  }
  
  dragOffset.value = 0
}

const wrapperStyle = computed(() => {
  let currentHeight = collapsed.value ? 0 : fullHeight.value
  
  if (isDragging.value) {
    if (collapsed.value) {
      currentHeight = Math.max(0, Math.min(fullHeight.value, -dragOffset.value))
    } else {
      currentHeight = Math.max(0, Math.min(fullHeight.value, fullHeight.value - dragOffset.value))
    }
  }
  
  return {
    height: `${currentHeight}px`,
    opacity: Math.max(0, currentHeight / fullHeight.value),
    transition: isDragging.value ? 'none' : 'height 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s cubic-bezier(.4,0,.2,1)',
    overflow: 'hidden',
    width: '100%'
  }
})
// -------------------------------------

function formatTime(s) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

function togglePlay() {
  playing.value = !playing.value
}

function skip(secs) {
  playbackPos.value = Math.max(0, Math.min(760, playbackPos.value + secs))
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
    }, 1000 / speed.value)
  } else {
    clearInterval(timer)
  }
})

watch(speed, () => {
  if (playing.value) {
    clearInterval(timer)
    timer = setInterval(() => {
      if (playbackPos.value < 760) {
        playbackPos.value++
      } else {
        playing.value = false
        playbackPos.value = 0
      }
    }, 1000 / speed.value)
  }
})

function pauseForSeek() {
  wasPlayingBeforeSeek = playing.value
  playing.value = false
}

function resumeAfterSeek() {
  if (wasPlayingBeforeSeek) playing.value = true
}

onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<style scoped>
.bottom-dock {
  flex-shrink: 0; background: var(--surface); border-radius: 24px 24px 0 0;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.08); border-top: 1px solid var(--border);
  padding: 0 20px 16px; display: flex; flex-direction: column; gap: 0;
}

.dock-handle-area {
  display: flex; flex-direction: column; align-items: center; gap: 4px; width: 100%;
  cursor: pointer; padding: 14px 0 10px; color: var(--text-muted);
  -webkit-tap-highlight-color: transparent; 
}
.handle-bar { width: 36px; height: 4px; background: var(--border); border-radius: 4px; }
.chevron { transition: transform 0.3s cubic-bezier(.4,0,.2,1); transform: rotate(0deg); }
.chevron.up { transform: rotate(180deg); }

.playback-section { display: flex; flex-direction: column; padding-bottom: 16px; }

.track-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.track-info { display: flex; flex-direction: column; gap: 2px; }
.track-name { font-size: 15px; font-weight: 700; color: var(--text-main); }
.track-chapter { font-size: 12px; color: var(--text-muted); }
.track-dur {
  font-size: 13px; font-weight: 600; color: var(--text-main);
  font-variant-numeric: tabular-nums; min-width: 60px; text-align: right;
}

.slider {
  -webkit-appearance: none; appearance: none; width: 100%; height: 6px;
  border-radius: 6px; outline: none; cursor: pointer;
  background: linear-gradient(to right, var(--primary) 0%, var(--primary) var(--p, 0%), var(--border) var(--p, 0%), var(--border) 100%);
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%;
  background: #fff; border: 2px solid var(--primary); box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: pointer; transition: transform 0.1s;
}
.slider::-webkit-slider-thumb:hover { transform: scale(1.15); }

.playback-slider { margin-bottom: 18px; }

.transport { display: flex; justify-content: center; align-items: center; gap: 40px; margin-bottom: 14px; }
.tbtn {
  background: none; border: none; cursor: pointer; color: var(--text-main);
  display: flex; align-items: center; justify-content: center; transition: transform 0.1s, opacity 0.2s; padding: 4px;
}
.tbtn:hover { opacity: 0.7; }
.tbtn:active { transform: scale(0.9); }
.tbtn.play {
  width: 52px; height: 52px; background: var(--primary); color: #fff;
  border-radius: 50%; box-shadow: 0 6px 16px rgba(82, 121, 111, 0.28);
}
.tbtn.play:hover { opacity: 1; transform: scale(1.05); }
.tbtn.play:active { transform: scale(0.95); }

.speed-row { display: flex; align-items: center; gap: 10px; overflow-x: auto; scrollbar-width: none; }
.speed-row::-webkit-scrollbar { display: none; }
.speed-label { font-size: 12px; font-weight: 600; color: var(--text-muted); white-space: nowrap; }
.speed-chips { display: flex; gap: 6px; }
.speed-chip {
  padding: 5px 10px; border-radius: 20px; border: 1px solid var(--border);
  background: var(--bg-color); font-family: inherit; font-size: 12px; font-weight: 600;
  color: var(--text-muted); cursor: pointer; transition: all 0.18s ease;
}
.speed-chip.active { background: var(--primary); color: #fff; border-color: var(--primary); }
.speed-chip:not(.active):hover { background: var(--primary-light); color: var(--text-main); border-color: var(--primary-light); }

.bottom-nav { display: flex; gap: 12px; margin-top: 4px; }
.nav-tab {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 13px; border-radius: 16px; border: 1px solid var(--border);
  background: var(--bg-color); font-family: inherit; font-size: 15px; font-weight: 600;
  color: var(--text-muted); cursor: pointer; transition: all 0.2s ease;
}
.nav-tab.active { background: var(--text-main); color: var(--surface); border-color: var(--text-main); }
.nav-tab:not(.active):hover { background: var(--primary-light); color: var(--text-main); }
</style>