<template>
  <header class="header-section">
    <div class="status-bar">
      <span class="time">9:41</span>
      <div class="status-icons">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="4" width="3" height="8" rx="1" fill="currentColor"/>
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="currentColor"/>
          <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="currentColor"/>
          <rect x="13.5" y="0.5" width="3" height="11.5" rx="1" fill="currentColor" opacity="0.3"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 3C10.2 3 12.2 3.9 13.7 5.3L15.1 3.9C13.2 2.1 10.7 1 8 1C5.3 1 2.8 2.1 0.9 3.9L2.3 5.3C3.8 3.9 5.8 3 8 3Z" fill="currentColor"/>
          <path d="M8 6C9.4 6 10.7 6.6 11.6 7.5L13 6.1C11.7 4.8 9.9 4 8 4C6.1 4 4.3 4.8 3 6.1L4.4 7.5C5.3 6.6 6.6 6 8 6Z" fill="currentColor"/>
          <circle cx="8" cy="11" r="1.5" fill="currentColor"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" stroke-opacity="0.35"/>
          <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/>
          <path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6C24.5 5.6 23.8 4.8 23 4.5Z" fill="currentColor" fill-opacity="0.4"/>
        </svg>
      </div>
    </div>

    <div class="nav-bar">
      <div class="logo">AUDIOVERSE</div>
      <button class="settings-btn" @click="$emit('switch-tab', 'audio')">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
    </div>

    <h1 class="page-title">{{ activeTab === 'map' ? 'Venue Map' : 'Preferences' }}</h1>
  </header>
</template>

<script setup>
defineProps({
  activeTab: String
})
defineEmits(['switch-tab'])
</script>

<style scoped>
.header-section {
  flex-shrink: 0;
  background: var(--bg-color);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px 0;
  height: 44px;
}
.time { font-size: 15px; font-weight: 600; }
.status-icons { display: flex; align-items: center; gap: 6px; }
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 0;
}
.logo { 
  font-size: 12px; font-weight: 700; letter-spacing: 2px; color: var(--text-muted); 
}
.settings-btn {
  background: none; border: none; cursor: pointer; color: var(--text-main);
  transition: transform 0.3s ease;
}
.settings-btn:hover { transform: rotate(45deg); }
.page-title {
  font-size: 32px; font-weight: 700; letter-spacing: -1px;
  padding: 16px 24px 0; color: var(--text-main);
}
</style>