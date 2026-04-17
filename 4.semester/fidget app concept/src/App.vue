<template>
  <div class="app" :class="{ dark: darkMode }">
    <AppHeader 
      :activeTab="activeTab" 
      :darkMode="darkMode" 
      @switch-tab="switchTab" 
      @toggle-dark="darkMode = !darkMode" 
    />

    <main class="main-content-scroll">
      <AudioSettings v-if="activeTab === 'audio'" />
      
      <VenueMap 
        v-if="activeTab === 'map'" 
        @open-room="openModal" 
      />
    </main>

    <RoomModal 
      v-if="modalActive" 
      :room="selectedRoom" 
      @close="closeModal" 
    />

    <BottomDock :activeTab="activeTab" @switch-tab="switchTab" />

    <Transition name="fade-scale">
      <WelcomeModal v-if="showWelcome" @close="dismissWelcome" />
    </Transition>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AudioSettings from './components/AudioSettings.vue'
import VenueMap from './components/VenueMap.vue'
import RoomModal from './components/RoomModal.vue'
import BottomDock from './components/BottomDock.vue'
import WelcomeModal from './components/WelcomeModal.vue'

const activeTab = ref('map')
const modalActive = ref(false)
const selectedRoom = ref(null)
const darkMode = ref(false)

// --- TESTING MODE: Always true on page refresh ---
const showWelcome = ref(true)

function dismissWelcome() {
  showWelcome.value = false
}
// -------------------------------------------------

function switchTab(tabName) {
  activeTab.value = tabName
  closeModal()
}

function openModal(roomData) {
  selectedRoom.value = roomData
  modalActive.value = true
}

function closeModal() {
  modalActive.value = false
  selectedRoom.value = null
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0; 
}

.app {
/* Add these two lines to disable text highlighting */
  -webkit-user-select: none; 
  user-select: none;

  --bg-color: #f4f6f8;
  --surface: #ffffff;
  --text-main: #2c3e50;
  --text-muted: #7f8c8d;
  --primary: #52796f; 
  --primary-light: #cad2c5;
  --border: #e2e8f0;
  
  font-family: 'DM Sans', sans-serif;
  background: var(--bg-color);
  color: var(--text-main);
  width: 100%;
  max-width: 390px;
  height: 100dvh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease, color 0.3s ease;
}

/* Smooth pop-in animation for the welcome modal */
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
}
.fade-scale-enter-from .modal-content, .fade-scale-leave-to .modal-content {
  transform: scale(0.95);
}

.app.dark {
  --bg-color: #121212;
  --surface: #1e1e1e;
  --text-main: #e0e0e0;
  --text-muted: #9e9e9e;
  --primary: #82ac97; 
  --primary-light: #52796f;
  --border: #333333;
}

.main-content-scroll {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: none; 
  -ms-overflow-style: none; 
}
.main-content-scroll::-webkit-scrollbar {
  display: none; 
}
</style>