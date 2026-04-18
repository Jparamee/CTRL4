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
        :locationStatus="locationStatus"
        @open-room="openModal"
        @open-museum-picker="showMuseumPicker = true"
      />
    </main>

    <RoomModal 
      v-if="modalActive" 
      :room="selectedRoom" 
      @close="closeModal" 
    />

    <div class="dock-wrap">
      <BottomDock :activeTab="activeTab" @switch-tab="switchTab" />
    </div>

    <!-- Welcome modal -->
    <Transition name="fade-scale">
      <WelcomeModal v-if="showWelcome" @close="dismissWelcome" />
    </Transition>

    <!-- Location permission denied modal -->
    <Transition name="fade-scale">
      <LocationPermissionModal 
        v-if="showLocationModal && !showWelcome"
        @close="showLocationModal = false"
        @search="openMuseumPickerFromModal"
      />
    </Transition>

    <!-- Museum picker bottom sheet -->
    <Transition name="slide-up">
      <MuseumPickerModal
        v-if="showMuseumPicker"
        :museums="museumList"
        :currentName="currentMuseumName"
        @close="showMuseumPicker = false"
        @select="selectMuseum"
      />
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Geolocation } from '@capacitor/geolocation'
import { museums } from './data/mapData.js'

import { changeRoomTheme } from './audioStore.js'

import AppHeader from './components/AppHeader.vue'
import AudioSettings from './components/AudioSettings.vue'
import VenueMap from './components/VenueMap.vue'
import RoomModal from './components/RoomModal.vue'
import BottomDock from './components/BottomDock.vue'
import WelcomeModal from './components/WelcomeModal.vue'
import LocationPermissionModal from './components/LocationPermissionModal.vue'
import MuseumPickerModal from './components/MuseumPickerModal.vue'

const activeTab = ref('map')
const modalActive = ref(false)
const selectedRoom = ref(null)

// --- DARK MODE ---
const darkMode = ref(localStorage.getItem('av_dark_mode') === 'true')

watch(darkMode, (isDark) => {
  localStorage.setItem('av_dark_mode', isDark)
  if (isDark) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}, { immediate: true })

// --- WELCOME ---
const showWelcome = ref(localStorage.getItem('av_hide_welcome') !== 'true')

function dismissWelcome() { 
  showWelcome.value = false 
  localStorage.setItem('av_hide_welcome', 'true')
}

// --- MUSEUM STATE ---
const currentMuseumName = ref('Locating museum...')
const currentMuseumFloors = ref([])

// Flat list of museums for the picker
const museumList = computed(() =>
  Object.entries(museums).map(([key, m]) => ({ key, name: m.name, floors: m.floors, lat: m.lat, lng: m.lng }))
)

// --- LOCATION STATE ---
// 'pending' | 'granted' | 'denied' | 'unavailable'
const locationStatus = ref('pending')
const showLocationModal = ref(false)
const showMuseumPicker = ref(false)

function openMuseumPickerFromModal() {
  showLocationModal.value = false
  showMuseumPicker.value = true
}

function selectMuseum(museum) {
  currentMuseumName.value = museum.name
  currentMuseumFloors.value = museum.floors
  showMuseumPicker.value = false
  showLocationModal.value = false
}

// --- DISTANCE HELPER ---
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
    let permissions;
    try {
      permissions = await Geolocation.requestPermissions();
    } catch (e) {
      // Permission API unavailable (e.g. browser without Capacitor)
      locationStatus.value = 'unavailable';
      currentMuseumName.value = 'Select a museum';
      showLocationModal.value = true;
      return;
    }

    if (permissions.location !== 'granted') {
      locationStatus.value = 'denied';
      currentMuseumName.value = 'Select a museum';
      showLocationModal.value = true;
      return; 
    }

    locationStatus.value = 'granted';

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

      if (closestMuseum && currentMuseumName.value !== closestMuseum.name) {
        currentMuseumName.value = closestMuseum.name;
        currentMuseumFloors.value = closestMuseum.floors;
      }
    });

  } catch (error) {
    console.error("GPS Tracking Error:", error);
    locationStatus.value = 'unavailable';
    currentMuseumName.value = 'Select a museum';
    showLocationModal.value = true;
  }
}

onMounted(() => {
  startTracking()
})

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

/* Stops colour bleeding through rounded corners and scroll bounce areas.
   Must be on html AND body — html is what the WebView paints behind everything,
   including through the rounded top corners of the bottom dock. */
html {
  background-color: #f4f6f8;
}
html.dark {
  background-color: #121212;
}
body {
  background-color: #f4f6f8;
  transition: background-color 0.3s ease;
}
html.dark body {
  background-color: #121212;
}

.app {
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
  height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease, color 0.3s ease;
}

/* Smooth pop-in animation for modals */
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
}
.fade-scale-enter-from .modal-content, .fade-scale-leave-to .modal-content {
  transform: scale(0.95);
}

/* Slide-up for the museum picker bottom sheet */
.slide-up-enter-active, .slide-up-leave-active {
  transition: opacity 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0;
}
.slide-up-enter-from .modal-content, .slide-up-leave-to .modal-content {
  transform: translateY(100%);
}
.slide-up-enter-active .modal-content, .slide-up-leave-active .modal-content {
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
}

/* 
  DARK MODE 
  FIX: --primary-light was #52796f (vivid green) — changed to #1e2d27 (very dark, barely-there tint)
  This fixes the green background appearing on the location badge and hover states in dark mode
*/
.app.dark {
  --bg-color: #121212;
  --surface: #1e1e1e;
  --text-main: #e0e0e0;
  --text-muted: #9e9e9e;
  --primary: #82ac97; 
  --primary-light: #1e2d27; /* WAS: #52796f — caused green backgrounds in dark mode */
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
  /* Explicit background prevents WebView/body colour bleeding through */
  background: var(--bg-color);
}
.main-content-scroll::-webkit-scrollbar {
  display: none; 
}

/* Fills the corner cutaways of the dock's border-radius with the correct bg colour.
   Must live here in App.vue so --bg-color is guaranteed to resolve. */
.dock-wrap {
  flex-shrink: 0;
  background: var(--bg-color);
}
</style>