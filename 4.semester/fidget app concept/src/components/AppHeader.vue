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
      <button class="dark-toggle-btn" @click="$emit('toggle-dark')" :title="darkMode ? 'Switch to light mode' : 'Switch to dark mode'">
        <!-- Moon icon (shown in light mode) -->
        <svg v-if="!darkMode" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <!-- Sun icon (shown in dark mode) -->
        <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </button>
    </div>

    <h1 class="page-title">{{ activeTab === 'map' ? 'Venue Map' : 'Preferences' }}</h1>
  </header>
</template>

<script setup>
defineProps({
  activeTab: String,
  darkMode: Boolean
})
defineEmits(['switch-tab', 'toggle-dark'])
</script>

<style scoped>
.header-section {
  flex-shrink: 0;
  background: var(--surface);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: background 0.3s ease, box-shadow 0.3s ease;
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
.dark-toggle-btn {
  background: var(--bg-color);
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-main);
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
}
.dark-toggle-btn:hover { background: var(--primary-light); transform: scale(1.05); }
.page-title {
  font-size: 32px; font-weight: 700; letter-spacing: -1px;
  padding: 14px 24px 0; color: var(--text-main);
}
</style>