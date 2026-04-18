<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">

      <div class="perm-icon-wrap">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
          <line x1="2" y1="2" x2="22" y2="22"/>
        </svg>
      </div>

      <h2 class="perm-title">Location is Turned Off</h2>

      <p class="perm-text">
        AudioVerse uses your location to automatically detect which museum you're in and guide you through it. 
        Enable location in your device settings for the best experience — or search for a museum to get started now.
      </p>

      <div class="hint-row">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>Go to <strong>Settings → Privacy → Location</strong> and enable it for AudioVerse</span>
      </div>

      <button class="search-btn" @click="$emit('search')">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        Search for a Museum
      </button>

      <button class="dismiss-btn" @click="$emit('close')">
        Continue without location
      </button>

    </div>
  </div>
</template>

<script setup>
defineEmits(['close', 'search'])
</script>

<style scoped>
.modal-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.6); display: flex; align-items: center;
  justify-content: center; z-index: 2000; padding: 24px;
}
.modal-content {
  background: var(--surface); border-radius: 28px; width: 100%;
  max-width: 320px; padding: 32px 24px; box-shadow: 0 16px 40px rgba(0,0,0,0.2);
  display: flex; flex-direction: column; align-items: center; text-align: center;
  border: 1px solid var(--border);
}
.perm-icon-wrap {
  width: 64px; height: 64px;
  background: var(--bg-color);
  border: 1.5px solid var(--border);
  color: var(--text-muted);
  border-radius: 20px; display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
}
.perm-title {
  font-size: 22px; font-weight: 700; color: var(--text-main); margin-bottom: 12px;
  letter-spacing: -0.5px;
}
.perm-text {
  font-size: 14px; color: var(--text-muted); line-height: 1.55; margin-bottom: 16px;
}
.hint-row {
  display: flex; align-items: flex-start; gap: 8px; text-align: left;
  background: var(--bg-color); border: 1px solid var(--border); border-radius: 12px;
  padding: 10px 12px; margin-bottom: 20px; width: 100%;
  font-size: 12px; color: var(--text-muted); line-height: 1.5;
  flex-shrink: 0;
}
.hint-row svg { flex-shrink: 0; margin-top: 1px; }
.hint-row strong { color: var(--text-main); font-weight: 600; }

.search-btn {
  width: 100%; padding: 15px; border-radius: 16px; border: none;
  background: var(--text-main); color: var(--surface); font-family: inherit;
  font-size: 15px; font-weight: 700; cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  margin-bottom: 10px;
}
.search-btn:active { transform: scale(0.96); }

.dismiss-btn {
  width: 100%; padding: 12px; border-radius: 16px;
  border: 1px solid var(--border); background: transparent;
  font-family: inherit; font-size: 14px; font-weight: 600;
  color: var(--text-muted); cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}
.dismiss-btn:active { transform: scale(0.96); background: var(--bg-color); }
</style>
