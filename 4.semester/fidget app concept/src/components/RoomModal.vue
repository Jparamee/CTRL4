<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">{{ room.label }}</h3>
        <button class="close-btn" @click="$emit('close')" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">

        <!-- Crowd Size first -->
        <div class="modal-section">
          <div class="section-header">
            <div class="section-icon-wrap crowd-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </div>
            <h4 class="section-title">Crowd Size</h4>
          </div>
          <p class="crowd-amount">People present: <strong>{{ room.population }}</strong></p>
          <div class="segmented-control">
            <button class="segment" :class="{ active: room.busy === 'low' }">Low</button>
            <button class="segment" :class="{ active: room.busy === 'med' }">Medium</button>
            <button class="segment" :class="{ active: room.busy === 'high' }">High</button>
          </div>
        </div>

        <!-- Trigger warnings below crowd, only if any -->
        <template v-if="room.trigger_warnings && room.trigger_warnings.length > 0">
          <div class="divider"></div>
          <div class="modal-section">
            <div class="section-header">
              <div class="section-icon-wrap trigger-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h4 class="section-title">Content Advisory</h4>
            </div>
            <ul class="trigger-list">
              <li v-for="warning in room.trigger_warnings" :key="warning">{{ warning }}</li>
            </ul>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  room: {
    type: Object,
    required: true
  }
})
defineEmits(['close'])
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
  background: var(--surface); border-radius: 24px; width: 100%;
  max-width: 320px; padding: 22px 22px 24px;
  box-shadow: 0 16px 40px rgba(0,0,0,0.14);
  display: flex; flex-direction: column;
  animation: pop-in 0.22s cubic-bezier(.4,0,.2,1);
}

@keyframes pop-in {
  from { opacity: 0; transform: scale(0.96) translateY(6px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;
}
.modal-title { font-size: 18px; font-weight: 700; color: var(--text-main); }
.close-btn {
  background: var(--bg-color); border: 1px solid var(--border);
  border-radius: 8px; cursor: pointer; color: var(--text-muted);
  width: 30px; height: 30px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.close-btn:hover { background: var(--primary-light); color: var(--text-main); }

.modal-body { display: flex; flex-direction: column; gap: 14px; }
.modal-section { display: flex; flex-direction: column; gap: 12px; }

.section-header { display: flex; align-items: center; gap: 10px; }
.section-icon-wrap {
  width: 34px; height: 34px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
/* Crowd icon — same green palette */
.crowd-icon { background: var(--primary-light); color: var(--primary); }
/* Trigger icon — muted teal/sage instead of red */
.trigger-icon { background: var(--primary-light); color: var(--primary); }

.section-title { font-size: 15px; font-weight: 700; color: var(--text-main); }

.crowd-amount { font-size: 14px; color: var(--text-main); }

.segmented-control {
  display: flex; background: var(--bg-color); border-radius: 12px; padding: 4px; gap: 4px;
}
.segment {
  flex: 1; padding: 9px; border-radius: 9px; border: none; background: none;
  font-family: inherit; font-size: 13px; font-weight: 600; color: var(--text-muted);
  cursor: default; transition: all 0.2s ease;
}
.segment.active {
  background: var(--surface); color: var(--primary); box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.divider { height: 1px; background: var(--border); }

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
</style>