<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">INFO: {{ room.label }}</h3>
        <button class="close-btn" @click="$emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <div v-if="room.trigger_warnings.length > 0" class="modal-section trigger-section">
          <div class="section-header">
            <svg class="section-icon trigger-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <h4>Trigger Warnings</h4>
          </div>
          <ul class="trigger-list">
            <li v-for="warning in room.trigger_warnings" :key="warning">{{ warning }}</li>
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
          <p class="crowd-amount">People Present: <strong>{{ room.population }}</strong></p>
          <div class="segmented-control">
            <button class="segment" :class="{ active: room.busy === 'low' }">Low</button>
            <button class="segment" :class="{ active: room.busy === 'med' }">Med</button>
            <button class="segment" :class="{ active: room.busy === 'high' }">High</button>
          </div>
        </div>
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
  background: rgba(0,0,0,0.5); display: flex; align-items: center;
  justify-content: center; z-index: 1000; padding: 24px;
}
.modal-content {
  background: var(--surface); border-radius: 24px; width: 100%;
  max-width: 320px; padding: 24px; box-shadow: 0 16px 32px rgba(0,0,0,0.15);
  display: flex; flex-direction: column;
}
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.modal-title { font-size: 18px; font-weight: 700; }
.close-btn {
  background: none; border: none; cursor: pointer; color: var(--text-muted); transition: opacity 0.2s ease;
}
.close-btn:hover { opacity: 0.7; }
.modal-body { display: flex; flex-direction: column; gap: 16px; }
.modal-section { display: flex; flex-direction: column; gap: 12px; }
.section-header { display: flex; align-items: center; gap: 12px; }
.section-icon {
  width: 36px; height: 36px; background: #fdf2f1; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.trigger-icon { color: #ff4757; }
.info-icon-small { background: var(--bg-color); color: var(--primary); }
.trigger-list { list-style: disc; padding-left: 20px; font-size: 13px; color: var(--text-muted); }
.crowd-amount { font-size: 15px; color: var(--text-main); }
.segmented-control { display: flex; background: var(--bg-color); border-radius: 12px; padding: 4px; gap: 4px; }
.segment {
  flex: 1; padding: 10px; border-radius: 10px; border: none; background: none;
  font-size: 13px; font-weight: 600; color: var(--text-muted); cursor: pointer; transition: all 0.2s ease;
}
.segment.active { background: var(--surface); color: var(--text-main); box-shadow: 0 4px 8px rgba(0,0,0,0.05); }
.divider { height: 1px; background: var(--border); margin: 10px -24px; }
</style><template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">INFO: {{ room.label }}</h3>
        <button class="close-btn" @click="$emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <div v-if="room.trigger_warnings.length > 0" class="modal-section trigger-section">
          <div class="section-header">
            <svg class="section-icon trigger-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <h4>Trigger Warnings</h4>
          </div>
          <ul class="trigger-list">
            <li v-for="warning in room.trigger_warnings" :key="warning">{{ warning }}</li>
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
          <p class="crowd-amount">People Present: <strong>{{ room.population }}</strong></p>
          <div class="segmented-control">
            <button class="segment" :class="{ active: room.busy === 'low' }">Low</button>
            <button class="segment" :class="{ active: room.busy === 'med' }">Med</button>
            <button class="segment" :class="{ active: room.busy === 'high' }">High</button>
          </div>
        </div>
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
  background: rgba(0,0,0,0.5); display: flex; align-items: center;
  justify-content: center; z-index: 1000; padding: 24px;
}
.modal-content {
  background: var(--surface); border-radius: 24px; width: 100%;
  max-width: 320px; padding: 24px; box-shadow: 0 16px 32px rgba(0,0,0,0.15);
  display: flex; flex-direction: column;
}
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.modal-title { font-size: 18px; font-weight: 700; }
.close-btn {
  background: none; border: none; cursor: pointer; color: var(--text-muted); transition: opacity 0.2s ease;
}
.close-btn:hover { opacity: 0.7; }
.modal-body { display: flex; flex-direction: column; gap: 16px; }
.modal-section { display: flex; flex-direction: column; gap: 12px; }
.section-header { display: flex; align-items: center; gap: 12px; }
.section-icon {
  width: 36px; height: 36px; background: #fdf2f1; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.trigger-icon { color: #ff4757; }
.info-icon-small { background: var(--bg-color); color: var(--primary); }
.trigger-list { list-style: disc; padding-left: 20px; font-size: 13px; color: var(--text-muted); }
.crowd-amount { font-size: 15px; color: var(--text-main); }
.segmented-control { display: flex; background: var(--bg-color); border-radius: 12px; padding: 4px; gap: 4px; }
.segment {
  flex: 1; padding: 10px; border-radius: 10px; border: none; background: none;
  font-size: 13px; font-weight: 600; color: var(--text-muted); cursor: pointer; transition: all 0.2s ease;
}
.segment.active { background: var(--surface); color: var(--text-main); box-shadow: 0 4px 8px rgba(0,0,0,0.05); }
.divider { height: 1px; background: var(--border); margin: 10px -24px; }
</style>