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
        :floors="currentMuseumFloors"
        :museumName="currentMuseumName"
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
// ADDED 'onUnmounted' so we can turn off GPS when the app closes
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Geolocation } from '@capacitor/geolocation'
import { museums } from './data/mapData.js'

import { changeRoomTheme } from './audioStore.js'

import AppHeader from './components/AppHeader.vue'
import AudioSettings from './components/AudioSettings.vue'
import VenueMap from './components/VenueMap.vue'
import RoomModal from './components/RoomModal.vue'
import BottomDock from './components/BottomDock.vue'
import WelcomeModal from './components/WelcomeModal.vue'

const activeTab = ref('map')
const modalActive = ref(false)
const selectedRoom = ref(null)

// --- MEMORY UPGRADES START ---
const darkMode = ref(localStorage.getItem('av_dark_mode') === 'true')

watch(darkMode, (isDark) => {
  localStorage.setItem('av_dark_mode', isDark)
  if (isDark) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}, { immediate: true })

const showWelcome = ref(localStorage.getItem('av_hide_welcome') !== 'true')

function dismissWelcome() { 
  showWelcome.value = false 
  localStorage.setItem('av_hide_welcome', 'true')
}
// --- MEMORY UPGRADES END ---

const currentMuseumName = ref('Locating museum...')
const currentMuseumFloors = ref([])

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

// --- CONTINUOUS GPS TRACKING ---
let gpsWatchId = null;

async function startTracking() {
  try {
    const permissions = await Geolocation.requestPermissions();
    if (permissions.location !== 'granted') return; 

    // watchPosition fires EVERY TIME the phone's GPS detects movement
    gpsWatchId = await Geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }, (position, err) => {
      if (err) {
        console.error("GPS Error:", err);
        return;
      }
      if (!position) return;

      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      let closestMuseum = null;
      let shortestDistance = Infinity;

      for (const key in museums) {
        const museum = museums[key];
        const distance = getDistance(userLat, userLng, museum.lat, museum.lng);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          closestMuseum = museum;
        }
      }

      // ONLY swap the UI if the closest museum has actually changed!
      if (closestMuseum && currentMuseumName.value !== closestMuseum.name) {
        currentMuseumName.value = closestMuseum.name;
        currentMuseumFloors.value = closestMuseum.floors;
      }
    });

  } catch (error) {
    console.error("GPS Tracking Error:", error);
  }
}

onMounted(() => {
  startTracking()
})

// Good practice: Stop the GPS battery drain if the app is closed
onUnmounted(() => {
  if (gpsWatchId != null) {
    Geolocation.clearWatch({ id: gpsWatchId });
  }
})

function switchTab(tabName) { activeTab.value = tabName; closeModal() }

function openModal(roomData) { 
  selectedRoom.value = roomData; 
  modalActive.value = true;
  
  if (roomData.themeAudio) {
    changeRoomTheme(roomData.themeAudio);
  }
}

function closeModal() { modalActive.value = false; selectedRoom.value = null }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after { 
  box-sizing: border-box; 
  margin: 0; 
  padding: 0; 
}

.app {
  /* Disables text highlighting */
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
  --room-icon-bg: #334155;
  --room-icon-text: #cdd2d8;
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