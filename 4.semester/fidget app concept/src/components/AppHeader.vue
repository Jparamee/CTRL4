<template>
  <header class="header-section">
    <div class="nav-bar">

      <!-- Logo: icon + wordmark -->
      <div class="logo">
        <img :src="iconUrl" alt="" class="logo-icon" aria-hidden="true" />
        AUDIOVERSE
      </div>

      <div class="header-actions">

        <!-- Language selector -->
        <div class="lang-wrapper">
          <button class="dark-toggle-btn" @click="showLangMenu = !showLangMenu" aria-label="Language">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </button>

          <Transition name="pop">
            <div v-if="showLangMenu" class="lang-popup">
              <button :class="{ active: currentLang === 'en' }" @click="setLang('en')">English</button>
              <button :class="{ active: currentLang === 'da' }" @click="setLang('da')">Dansk</button>
              <button :class="{ active: currentLang === 'de' }" @click="setLang('de')">Deutsch</button>
            </div>
          </Transition>
        </div>

        <!-- Dark mode toggle -->
        <button class="dark-toggle-btn" @click="$emit('toggle-dark')"
                :title="darkMode ? 'Switch to light mode' : 'Switch to dark mode'">
          <svg v-if="!darkMode" width="22" height="22" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1"  x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1"  y1="12" x2="3"  y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
            <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
          </svg>
        </button>

      </div>
    </div>

    <h1 class="page-title">
      {{ activeTab === 'map' ? t('Venue Map', 'Kort', 'Karte') : t('Audio', 'Lyd', 'Audio') }}
    </h1>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { currentLang, t } from '../langStore.js'

// ── Icon import ──────────────────────────────────────────────────────────────
// The icon.png lives in the root-level `assets/` folder (used by Capacitor).
// Vite can import it with a relative path from this component's location.
// src/components/AppHeader.vue  →  ../../assets/icon.png
import iconUrl from '../../assets/icon.png'

defineProps({
  activeTab: String,
  darkMode:  Boolean
})
defineEmits(['switch-tab', 'toggle-dark'])

const showLangMenu = ref(false)

function setLang(lang) {
  currentLang.value  = lang
  showLangMenu.value = false
}
</script>

<style scoped>
.header-section {
  flex-shrink: 0;
  background: var(--surface);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px 0;
}

/* ── Logo ── */
.logo {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-muted);
}

.logo-icon {
  width: 22px;
  height: 22px;
  border-radius: 5px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.dark-toggle-btn {
  background: var(--bg-color);
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
  color: var(--text-main);
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
}
.dark-toggle-btn:hover { background: var(--primary-light); transform: scale(1.05); }

.page-title {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -1px;
  padding: 10px 24px 10px;
  color: var(--text-main);
  margin: 0;
}

/* ── Language popup ── */
.lang-wrapper { position: relative; }

.lang-popup {
  position: absolute; top: 100%; right: 0; margin-top: 8px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.15);
  display: flex; flex-direction: column;
  overflow: hidden; min-width: 120px; z-index: 100;
}
.lang-popup button {
  background: transparent; border: none; padding: 12px 16px;
  text-align: left; font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 600; color: var(--text-muted);
  cursor: pointer; transition: background 0.2s, color 0.2s;
}
.lang-popup button:hover  { background: var(--primary-light); color: var(--text-main); }
.lang-popup button.active { background: var(--primary); color: #fff; }

.pop-enter-active, .pop-leave-active {
  transition: transform 0.2s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease;
  transform-origin: top right;
}
.pop-enter-from, .pop-leave-to { transform: scale(0.9); opacity: 0; }
</style>