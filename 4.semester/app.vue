<template>
  <div class="app">
    <AppHeader :activeTab="activeTab" @switch-tab="switchTab" />

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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AudioSettings from './components/AudioSettings.vue'
import VenueMap from './components/VenueMap.vue'
import RoomModal from './components/RoomModal.vue'
import BottomDock from './components/BottomDock.vue'

const activeTab = ref('map')
const modalActive = ref(false)
const selectedRoom = ref(null)

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
/* Global unscoped styles for the base app */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0; 
}

.app {
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
}

.main-content-scroll {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
</style><template>
  <div class="app">
    <AppHeader :activeTab="activeTab" @switch-tab="switchTab" />

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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AudioSettings from './components/AudioSettings.vue'
import VenueMap from './components/VenueMap.vue'
import RoomModal from './components/RoomModal.vue'
import BottomDock from './components/BottomDock.vue'

const activeTab = ref('map')
const modalActive = ref(false)
const selectedRoom = ref(null)

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
/* Global unscoped styles for the base app */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0; 
}

.app {
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
}

.main-content-scroll {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
</style>