<template>
  <header class="header-section">
    <div class="nav-bar">
      <div class="logo">AUDIOVERSE</div>
      <button class="dark-toggle-btn" @click="$emit('toggle-dark')" :title="darkMode ? 'Switch to light mode' : 'Switch to dark mode'">
        <svg v-if="!darkMode" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
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

    <h1 class="page-title">{{ activeTab === 'map' ? 'Venue Map' : 'Audio' }}</h1>
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
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px 0; /* Adjusted padding since status bar is gone */
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