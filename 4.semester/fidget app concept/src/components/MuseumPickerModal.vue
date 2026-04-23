<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">

      <div class="picker-header">
        <h2 class="picker-title">Choose a Museum</h2>
        <button class="close-btn" @click="$emit('close')" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input 
          ref="searchInput"
          :value="query"
          @input="query = $event.target.value"
          class="search-input"
          type="text"
          placeholder="Search museums..."
          autocomplete="off"
          spellcheck="false"
        />
        <button v-if="query" class="clear-btn" @click="query = ''" aria-label="Clear search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="museum-list">
        <div v-if="filteredMuseums.length === 0" class="empty-state">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span>No museums found for "{{ query }}"</span>
        </div>

        <button
          v-for="museum in filteredMuseums"
          :key="museum.key"
          class="museum-row"
          :class="{ active: museum.name === currentName }"
          @click="$emit('select', museum)"
        >
          <div class="museum-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div class="museum-info">
            <span class="museum-name">{{ museum.name }}</span>
            <span class="museum-sub" v-if="museum.floors">{{ museum.floors.length }} floor{{ museum.floors.length !== 1 ? 's' : '' }}</span>
          </div>
          <div class="active-check" v-if="museum.name === currentName">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-right">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <p class="picker-footer">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Enable location for automatic detection
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  museums: {
    type: Array,
    required: true
  },
  currentName: {
    type: String,
    default: ''
  }
})

defineEmits(['close', 'select'])

const query = ref('')
const searchInput = ref(null)

onMounted(() => {
  // Auto-focus the search input
  setTimeout(() => searchInput.value?.focus(), 150)
})

const filteredMuseums = computed(() => {
  if (!query.value.trim()) return props.museums
  const q = query.value.toLowerCase()
  return props.museums.filter(m => m.name.toLowerCase().includes(q))
})
</script>

<style scoped>
.modal-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.6); display: flex; align-items: flex-end;
  justify-content: center; z-index: 2000; padding: 0;
}
.modal-content {
  background: var(--surface); border-radius: 28px 28px 0 0; width: 100%;
  max-height: 80vh; padding: 24px 20px 36px;
  box-shadow: 0 -8px 40px rgba(0,0,0,0.25);
  display: flex; flex-direction: column; gap: 0;
  border-top: 1px solid var(--border);
  overflow: hidden;
}

/* Drag handle visual cue */
.modal-content::before {
  content: ''; display: block; width: 36px; height: 4px;
  background: var(--border); border-radius: 4px;
  margin: 0 auto 20px; flex-shrink: 0;
}

.picker-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 16px; flex-shrink: 0;
}
.picker-title {
  font-size: 20px; font-weight: 700; color: var(--text-main); letter-spacing: -0.5px;
}
.close-btn {
  width: 34px; height: 34px; border-radius: 10px;
  background: var(--bg-color); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-muted); cursor: pointer; transition: background 0.2s;
}
.close-btn:active { background: var(--border); }

.search-wrap {
  position: relative; display: flex; align-items: center;
  background: var(--bg-color); border: 1px solid var(--border);
  border-radius: 14px; padding: 0 14px; margin-bottom: 14px; flex-shrink: 0;
}
.search-icon { color: var(--text-muted); flex-shrink: 0; }
.search-input {
  flex: 1; border: none; background: transparent; outline: none;
  font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
  color: var(--text-main); padding: 13px 10px; min-width: 0;
}
.search-input::placeholder { color: var(--text-muted); }
.clear-btn {
  background: none; border: none; cursor: pointer; color: var(--text-muted);
  display: flex; align-items: center; padding: 4px; border-radius: 6px;
  transition: color 0.15s;
}
.clear-btn:active { color: var(--text-main); }

.museum-list {
  flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;
  scrollbar-width: none;
}
.museum-list::-webkit-scrollbar { display: none; }

.empty-state {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 32px 0; color: var(--text-muted); font-size: 14px; font-weight: 500;
  text-align: center;
}

.museum-row {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 14px; border-radius: 16px;
  background: var(--bg-color); border: 1px solid var(--border);
  cursor: pointer; transition: background 0.15s, border-color 0.15s;
  font-family: inherit; text-align: left; width: 100%;
}
.museum-row:active { transform: scale(0.98); }
.museum-row.active {
  background: var(--surface);
  border-color: var(--primary);
}

.museum-icon {
  width: 38px; height: 38px; border-radius: 12px;
  background: var(--primary-light); color: var(--primary);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.museum-row.active .museum-icon {
  background: var(--primary); color: #fff;
}

.museum-info {
  flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0;
}
.museum-name {
  font-size: 15px; font-weight: 600; color: var(--text-main);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.museum-sub {
  font-size: 12px; color: var(--text-muted); font-weight: 400;
}

.active-check {
  width: 26px; height: 26px; border-radius: 50%;
  background: var(--primary); color: #fff;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.chevron-right { color: var(--text-muted); flex-shrink: 0; }

.picker-footer {
  display: flex; align-items: center; gap: 6px; justify-content: center;
  font-size: 12px; color: var(--text-muted); font-weight: 500;
  margin-top: 16px; flex-shrink: 0;
}
</style>