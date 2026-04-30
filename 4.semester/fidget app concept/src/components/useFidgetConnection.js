import { ref } from 'vue'
import { skipGuide, toggleGuide } from '../audioStore.js'

// ─────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────
const SERVICE_UUID  = 'be83ebca-a930-4d57-a57d-784d322198cd'
const CHAR_UUID     = 'be83ebca-a930-4d57-a57d-784d322198ce'
const DEVICE_NAME   = 'FidgetToy'

// ─────────────────────────────────────────────
//  REACTIVE STATE (shared across all consumers)
// ─────────────────────────────────────────────
export const isConnected  = ref(false)
export const isConnecting = ref(false)
export const connectionType = ref(null) // 'serial' or 'ble'
export const lastCommand  = ref('')     // For debugging / UI feedback

// ─────────────────────────────────────────────
//  INTERNALS
// ─────────────────────────────────────────────
let serialPort   = null
let serialReader = null
let serialDone   = null
let keepReading  = false

let bleDeviceId  = null

// ─────────────────────────────────────────────
//  COMMAND HANDLER (shared by both paths)
// ─────────────────────────────────────────────
function handleCommand(command) {
  // Extract only the last letter from the string (ignoring escape codes and prefixes)
  // Regex: Find the last occurrence of L or R (case insensitive)
  const match = command.match(/[lr]$/i);
  
  if (!match) return; // No L or R found, ignore

  const cleanCmd = match[0].toLowerCase();
  
  console.log(`[Fidget] Detected command: "${cleanCmd}" from "${command}"`);

  if (cleanCmd === 'l') {
    console.log("→ Action: Skip Backwards 15s")
    skipGuide(-15)
  } else if (cleanCmd === 'r') {
    console.log("→ Action: Toggle Play/Pause")
    toggleGuide()
  }
}

// ─────────────────────────────────────────────
//  ENVIRONMENT DETECTION
// ─────────────────────────────────────────────
function isCapacitor() {
  return typeof window !== 'undefined' &&
    window.Capacitor &&
    window.Capacitor.isNativePlatform &&
    window.Capacitor.isNativePlatform()
}

function isWebSerialAvailable() {
  return typeof navigator !== 'undefined' && 'serial' in navigator
}

// ─────────────────────────────────────────────
//  WEB SERIAL (Browser / USB)
// ─────────────────────────────────────────────
async function connectSerial() {
  if (!isWebSerialAvailable()) {
    alert('Web Serial not supported. Use Chrome or Edge.')
    return
  }

  isConnecting.value = true

  try {
    serialPort = await navigator.serial.requestPort()
    await serialPort.open({ baudRate: 115200 })

    const textDecoder = new TextDecoderStream()
    serialDone = serialPort.readable.pipeTo(textDecoder.writable)
    serialReader = textDecoder.readable.getReader()

    keepReading = true
    isConnected.value = true
    connectionType.value = 'serial'
    isConnecting.value = false

    console.log('[Serial] Connected! Listening for button presses...')

    let buffer = ''

    while (keepReading) {
      const { value, done } = await serialReader.read()
      if (done) break

      if (value) {
        buffer += value

        let newlineIndex
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          const line = buffer.substring(0, newlineIndex).trim()
          buffer = buffer.substring(newlineIndex + 1)

          if (line) {
            console.log(`[Serial] Received: "${line}"`)
            handleCommand(line)
          }
        }
      }
    }
  } catch (error) {
    console.error('[Serial] Error:', error)
    isConnecting.value = false
  } finally {
    disconnectSerial()
  }
}

function disconnectSerial() {
  keepReading = false

  if (serialReader) {
    try { serialReader.cancel() } catch (e) { /* ignore */ }
    serialReader = null
  }

  if (serialDone) {
    try { serialDone.catch(() => {}) } catch (e) { /* ignore */ }
    serialDone = null
  }

  if (serialPort) {
    try { serialPort.close() } catch (e) { /* ignore */ }
    serialPort = null
  }

  if (connectionType.value === 'serial') {
    isConnected.value = false
    connectionType.value = null
  }
}

// ─────────────────────────────────────────────
//  BLE (Capacitor / Mobile)
// ─────────────────────────────────────────────
async function connectBLE() {
  isConnecting.value = true

  try {
    // Lazy import — only loads on mobile where Capacitor exists
    const { BleClient } = await import('@capacitor-community/bluetooth-le')

    // 1. Initialise
    await BleClient.initialize()

    // 2. Request permissions (Android 12+)
    try {
      const perm = await BleClient.requestPermissions()
      if (perm?.bluetooth !== 'granted') {
        console.warn('[BLE] Bluetooth permission not granted:', perm)
        isConnecting.value = false
        return
      }
    } catch (e) {
      // requestPermissions throws on iOS — safe to continue
      console.warn('[BLE] requestPermissions not supported on this platform, continuing.')
    }

    // 3. Request device (shows system picker)
    console.log('[BLE] Requesting device...')
    const device = await BleClient.requestDevice({
      name: DEVICE_NAME,
      services: [SERVICE_UUID]
    })

    if (!device || !device.deviceId) {
      console.warn('[BLE] No device selected.')
      isConnecting.value = false
      return
    }

    bleDeviceId = device.deviceId

    // 4. Connect
    console.log(`[BLE] Connecting to ${device.name || device.deviceId}...`)
    await BleClient.connect(device.deviceId, () => {
      // Disconnection callback
      console.log('[BLE] Device disconnected.')
      isConnected.value = false
      connectionType.value = null
      bleDeviceId = null
    })

    isConnected.value = true
    connectionType.value = 'ble'
    isConnecting.value = false

    console.log('[BLE] Connected! Subscribing to notifications...')

    // 5. Subscribe to button notifications
    await BleClient.startNotifications(
      device.deviceId,
      SERVICE_UUID,
      CHAR_UUID,
      (value) => {
        // value is a DataView — decode to string
        const decoder = new TextDecoder()
        const command = decoder.decode(value)
        console.log(`[BLE] Received: "${command}"`)
        handleCommand(command)
      }
    )

    console.log('[BLE] Notifications active. Ready for button presses!')

  } catch (error) {
    console.error('[BLE] Error:', error)
    isConnecting.value = false
    isConnected.value = false
    connectionType.value = null
  }
}

function disconnectBLE() {
  if (bleDeviceId) {
    // Lazy import
    import('@capacitor-community/bluetooth-le').then(({ BleClient }) => {
      BleClient.disconnect(bleDeviceId).catch(() => {})
    }).catch(() => {})
    bleDeviceId = null
  }

  if (connectionType.value === 'ble') {
    isConnected.value = false
    connectionType.value = null
  }
}

// ─────────────────────────────────────────────
//  PUBLIC API
// ─────────────────────────────────────────────
export async function connect() {
  if (isConnected.value) {
    console.log('[Fidget] Already connected.')
    return
  }

  if (isCapacitor()) {
    await connectBLE()
  } else if (isWebSerialAvailable()) {
    await connectSerial()
  } else {
    alert('Neither Web Serial nor BLE is available on this platform.')
  }
}

export function disconnect() {
  if (connectionType.value === 'serial') {
    disconnectSerial()
  } else if (connectionType.value === 'ble') {
    disconnectBLE()
  }
}

// ─────────────────────────────────────────────
//  COMPOSABLE (for use in components)
// ─────────────────────────────────────────────
export function useFidgetConnection() {
  return {
    isConnected,
    isConnecting,
    connectionType,
    lastCommand,
    connect,
    disconnect
  }
}