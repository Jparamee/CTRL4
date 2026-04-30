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
        :activeRoomId="activeRoomId"
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

    <Transition name="fade-scale">
      <WelcomeModal v-if="showWelcome" @close="dismissWelcome" />
    </Transition>

    <Transition name="fade-scale">
      <LocationPermissionModal
        v-if="showLocationModal && !showWelcome"
        @close="showLocationModal = false"
        @search="openMuseumPickerFromModal"
      />
    </Transition>

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
// 1. ADD 'reactive' to the end of this line
import { ref, computed, watch, onMounted, onUnmounted, reactive } from 'vue'
import { Geolocation } from '@capacitor/geolocation'
import { BleClient } from '@capacitor-community/bluetooth-le'

// 2. RENAME the import to rawMuseums
import { museums as rawMuseums } from './data/mapData.js'
import { changeRoomTheme } from './audioStore.js'

// 3. WRAP it in reactive so Vue updates the map colors instantly
const museums = reactive(rawMuseums)

import AppHeader             from './components/AppHeader.vue'
import AudioSettings         from './components/AudioSettings.vue'
import VenueMap              from './components/VenueMap.vue'
import RoomModal             from './components/RoomModal.vue'
import BottomDock            from './components/BottomDock.vue'
import WelcomeModal          from './components/WelcomeModal.vue'
import LocationPermissionModal from './components/LocationPermissionModal.vue'
import MuseumPickerModal     from './components/MuseumPickerModal.vue'




// At the top of <script setup>, replace the serial variables and functions with:
import { useFidgetConnection } from './components/useFidgetConnection.js'

const { isConnected, isConnecting, connectionType, connect, disconnect } = useFidgetConnection()

// Remove: serialPort, reader, inputDone, keepReading, connectToFidgetToy, disconnectFromFidgetToy
// Remove: window.connectToFidgetToy = connectToFidgetToy




// ─────────────────────────────────────────────────────────────
//  UI STATE
// ─────────────────────────────────────────────────────────────
const activeTab   = ref('map')
const modalActive = ref(false)

// CHANGE: We now store the ID of the selected room instead of the whole object
const selectedRoomId = ref(null)

// NEW: This computed property always finds the LIVE room data from our reactive 'museums' object
const selectedRoom = computed(() => {
  if (!selectedRoomId.value) return null
  
  // Find the room in our flat beaconMap (which points to the reactive museum objects)
  for (const entry of beaconMap.values()) {
    if (entry.room.id === selectedRoomId.value) {
      return entry.room
    }
  }
  return null
})

// ─────────────────────────────────────────────────────────────
//  MUSEUM STATE
// ─────────────────────────────────────────────────────────────
const currentMuseumName   = ref('Locating museum...')
const currentMuseumFloors = ref([])
const isManualOverride    = ref(false)

const museumList = computed(() =>
  Object.entries(museums).map(([key, m]) => ({
    key, name: m.name, floors: m.floors, lat: m.lat, lng: m.lng
  }))
)

const locationStatus    = ref('pending')
const showLocationModal = ref(false)
const showMuseumPicker  = ref(false)

function openMuseumPickerFromModal() {
  showLocationModal.value = false
  showMuseumPicker.value  = true
}

function selectMuseum(museum) {
  isManualOverride.value    = true
  currentMuseumName.value   = museum.name
  currentMuseumFloors.value = museum.floors
  showMuseumPicker.value    = false
  showLocationModal.value   = false
}

// ─────────────────────────────────────────────────────────────
//  BUILD A FLAT BEACON → ROOM LOOKUP
//  Scans every museum, every floor, every room for a beaconId.
//  Returns: Map<string, { room, themeAudio, label }>
// ─────────────────────────────────────────────────────────────
function buildBeaconMap() {
  const map = new Map()
  for (const museum of Object.values(museums)) {
    for (const floor of museum.floors) {
      for (const room of floor.rooms) {
        if (room.beaconId) {
          map.set(room.beaconId, {
            label:      room.label,
            themeAudio: room.themeAudio || null,
            room
          })
        }
      }
    }
  }
  return map
}

const beaconMap = buildBeaconMap()

// ─────────────────────────────────────────────────────────────
//  LIVE API FETCHING (GLOBAL CLOUD VERSION)
// ─────────────────────────────────────────────────────────────
async function fetchLiveCrowdData() {
  try {
    const supabaseUrl = 'https://mdjgwhnhugpiuxbkywrp.supabase.co/rest/v1/rooms';
    const supabaseKey = 'sb_publishable_0fYKMBrC7NiJRV-ei28jfA_j4upaf4n';

    // Fetch the data from the cloud using your keys
    const response = await fetch(supabaseUrl, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    // Supabase returns an array of rows: [ { beacon_id: '...', population: 42 } ]
    const liveData = await response.json();

    // Loop through the cloud data and update our map!
    for (const row of liveData) {
      const entry = beaconMap.get(row.beacon_id);
      
      if (entry && entry.room) {
        // 1. Update the raw population number
        entry.room.population = row.population;

        // 2. Dynamically calculate the busy status to update the colors
        if (row.population < 15) {
          entry.room.busy = 'low';
        } else if (row.population <= 40) {
          entry.room.busy = 'med';
        } else {
          entry.room.busy = 'high';
        }
      }
    }
  } catch (error) {
    console.warn("[API] Could not reach Supabase.", error);
  }
}
// ─────────────────────────────────────────────────────────────
//  BLE SCANNING
//
//  Strategy:
//   • Scan continuously — each advertisement gives us a fresh RSSI
//   • Keep a rolling 4-second window of (rssi, timestamp) per beacon
//   • Every 2 seconds, pick the beacon with the highest average RSSI
//     (= closest one that has been seen recently)
//   • Only switch if it's different from the current room AND
//     the strongest beacon is above a minimum signal threshold
// ─────────────────────────────────────────────────────────────
const RSSI_MIN        = -85   // Ignore anything weaker than this (probably a different room)
const RSSI_WINDOW_MS  = 4000  // How long to keep a reading "fresh"
const POLL_INTERVAL   = 2000  // How often to decide which room is closest

let bleInitialised  = false
let bleScanActive   = false
let bleEvalInterval = null
let currentBeaconId = null   // plain ref — just for dedup checks

// Reactive — drives the "you are here" dot in VenueMap
const activeRoomId = ref(null)

// rolling RSSI store:  Map<beaconId, Array<{rssi, ts}>>
const rssiStore = new Map()

function recordRssi(beaconId, rssi) {
  if (!rssiStore.has(beaconId)) rssiStore.set(beaconId, [])
  rssiStore.get(beaconId).push({ rssi, ts: Date.now() })
}

function averageRssi(readings) {
  if (!readings.length) return -Infinity
  return readings.reduce((sum, r) => sum + r.rssi, 0) / readings.length
}

function evaluateClosestRoom() {
  const now = Date.now()

  let bestBeacon = null
  let bestAvg    = -Infinity

  for (const [beaconId, readings] of rssiStore.entries()) {
    // Drop stale readings
    const fresh = readings.filter(r => now - r.ts < RSSI_WINDOW_MS)
    rssiStore.set(beaconId, fresh)

    if (!fresh.length) continue

    const avg = averageRssi(fresh)

    if (avg > RSSI_MIN && avg > bestAvg) {
      bestAvg    = avg
      bestBeacon = beaconId
    }
  }

  // ── No beacon in range — clear the dot ─────────────────
  if (!bestBeacon) {
    if (currentBeaconId !== null) {
      currentBeaconId    = null
      activeRoomId.value = null
    }
    return
  }

  // ── Same room as before — nothing to do ────────────────
  if (bestBeacon === currentBeaconId) return

  const entry = beaconMap.get(bestBeacon)
  if (!entry) return  // Not one of our beacons — ignore

  console.log(`[BLE] Switched to room: ${entry.label} (beacon: ${bestBeacon}, avg RSSI: ${bestAvg.toFixed(1)})`)

  currentBeaconId    = bestBeacon
  activeRoomId.value = entry.room.id   // ← drives the map dot

  if (entry.themeAudio) {
    changeRoomTheme(entry.themeAudio, entry.label)
  }
}

async function startBleScan() {
  if (bleScanActive) return

  // ── Step 1: initialise the plugin ──────────────────────
  try {
    await BleClient.initialize() // <-- Removed the androidNeverForLocation restriction
    bleInitialised = true
  } catch (e) {
    console.warn('[BLE] BleClient.initialize failed — BLE unavailable on this device:', e)
    return
  }

  // ── Step 2: explicitly request runtime permissions ──────
  // This is what actually triggers the system dialog on Android 12+.
  // Without this call the scan silently fails the first time.
  try {
    const permission = await BleClient.requestPermissions()
    // 'granted' means all required permissions were accepted.
    // Any other value (denied / prompt-denied) means we can't scan.
    if (permission?.bluetooth !== 'granted') {
      console.warn('[BLE] Bluetooth permission not granted:', permission)
      return
    }
  } catch (e) {
    // requestPermissions throws on platforms that don't support it (e.g. iOS
    // handles permissions differently — safe to continue there).
    console.warn('[BLE] requestPermissions not supported on this platform, continuing:', e)
  }

  // ── Step 3: start scanning ──────────────────────────────
  try {
    await BleClient.requestLEScan(
      { allowDuplicates: true },
      (result) => {
        const name = result.localName || result.device?.name || ''
        if (!name.startsWith('AudioVerse-')) return
        const rssi = result.rssi
        if (typeof rssi !== 'number') return
        recordRssi(name, rssi)
      }
    )

    bleScanActive = true
    bleEvalInterval = setInterval(evaluateClosestRoom, POLL_INTERVAL)
    console.log('[BLE] Scanning started')
  } catch (e) {
    console.warn('[BLE] Failed to start BLE scan:', e)
  }
}

async function stopBleScan() {
  clearInterval(bleEvalInterval)
  bleEvalInterval = null

  if (bleScanActive) {
    try {
      await BleClient.stopLEScan()
    } catch (e) {
      console.warn('[BLE] stopLEScan error:', e)
    }
    bleScanActive = false
  }
}

// ─────────────────────────────────────────────────────────────
//  GPS  (museum-level detection, unchanged)
// ─────────────────────────────────────────────────────────────
let gpsWatchId = null

function getDistance(lat1, lon1, lat2, lon2) {
  const R    = 6371
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

async function startTracking() {
  try {
    let permissions
    try {
      permissions = await Geolocation.requestPermissions()
    } catch (e) {
      locationStatus.value    = 'unavailable'
      currentMuseumName.value = 'Select a museum'
      showLocationModal.value = true
      return
    }

    if (permissions.location !== 'granted') {
      locationStatus.value    = 'denied'
      currentMuseumName.value = 'Select a museum'
      showLocationModal.value = true
      return
    }

    locationStatus.value = 'granted'

    gpsWatchId = await Geolocation.watchPosition(
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      (position, err) => {
        if (err || !position) return

        const { latitude: userLat, longitude: userLng } = position.coords

        let closestMuseum   = null
        let shortestDistance = Infinity

        for (const museum of Object.values(museums)) {
          const d = getDistance(userLat, userLng, museum.lat, museum.lng)
          if (d < shortestDistance) {
            shortestDistance = d
            closestMuseum    = museum
          }
        }

        if (
          !isManualOverride.value &&
          closestMuseum &&
          currentMuseumName.value !== closestMuseum.name
        ) {
          currentMuseumName.value   = closestMuseum.name
          currentMuseumFloors.value = closestMuseum.floors
        }
      }
    )
  } catch (error) {
    console.error('[GPS] Error:', error)
    locationStatus.value    = 'unavailable'
    currentMuseumName.value = 'Select a museum'
    showLocationModal.value = true
  }
}

// ─────────────────────────────────────────────────────────────
//  LIFECYCLE
// ─────────────────────────────────────────────────────────────
onMounted(async () => {
  await startTracking()
  await startBleScan()

  // Start polling the API every 3 seconds for live crowd updates!
  setInterval(fetchLiveCrowdData, 3000)
})

onUnmounted(() => {
  if (gpsWatchId != null) Geolocation.clearWatch({ id: gpsWatchId })
  stopBleScan()
})

// ─────────────────────────────────────────────────────────────
//  MODAL / TAB HELPERS
// ─────────────────────────────────────────────────────────────
function switchTab(tabName) { activeTab.value = tabName; closeModal() }

function openModal(roomData) {
  selectedRoomId.value = roomData.id // Store the ID
  modalActive.value    = true
  
  if (roomData.themeAudio) {
    changeRoomTheme(roomData.themeAudio, roomData.label)
  }
}

function closeModal() {
  modalActive.value    = false
  selectedRoomId.value = null // Clear the ID
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html            { background-color: #f4f6f8; }
html.dark       { background-color: #121212; }
body            { background-color: #f4f6f8; transition: background-color 0.3s ease; }
html.dark body  { background-color: #121212; }

.app {
  -webkit-user-select: none; user-select: none;
  --bg-color:      #f4f6f8;
  --surface:       #ffffff;
  --text-main:     #2c3e50;
  --text-muted:    #7f8c8d;
  --primary:       #52796f;
  --primary-light: #cad2c5;
  --border:        #e2e8f0;
  font-family: 'DM Sans', sans-serif;
  background: var(--bg-color);
  color: var(--text-main);
  width: 100%; height: 100dvh;
  display: flex; flex-direction: column;
  position: relative; overflow: hidden;
  transition: background 0.3s ease, color 0.3s ease;
}

.fade-scale-enter-active, .fade-scale-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-scale-enter-from,   .fade-scale-leave-to     { opacity: 0; }
.fade-scale-enter-from .modal-content, .fade-scale-leave-to .modal-content { transform: scale(0.95); }

.slide-up-enter-active, .slide-up-leave-active { transition: opacity 0.3s ease; }
.slide-up-enter-from,   .slide-up-leave-to     { opacity: 0; }
.slide-up-enter-from .modal-content, .slide-up-leave-to .modal-content { transform: translateY(100%); }
.slide-up-enter-active .modal-content, .slide-up-leave-active .modal-content { transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1); }

.app.dark {
  --bg-color:      #121212;
  --surface:       #1e1e1e;
  --text-main:     #e0e0e0;
  --text-muted:    #9e9e9e;
  --primary:       #82ac97;
  --primary-light: #1e2d27;
  --border:        #333333;
  --room-icon-bg:  #334155;
  --room-icon-text:#cdd2d8;
}

.main-content-scroll {
  flex: 1; overflow-y: auto; display: flex; flex-direction: column;
  scrollbar-width: none; -ms-overflow-style: none;
  background: var(--bg-color);
}
.main-content-scroll::-webkit-scrollbar { display: none; }

.dock-wrap { flex-shrink: 0; background: var(--bg-color); }
</style>