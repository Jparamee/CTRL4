# BUZZ TEST: needs vibration motor
# FOR A SUCCESFUL TEST: 2 buzzes in the beginning, followed by a buzz every 5 seconds to make sure there isn't a brownout.
# MIXED RESULTS: 1 buzz, followed by fx a buzz every 5 seconds. Either WiFi or Bluetooth didn't connect properly.
# DEADLY SILENCE: Either the board died, or QTPY failed to connect and now just cries.
# BROWNOUT: Partial or inconsistent buzzes => board has trouble powering components to both buzz and connect.   

import time
import board
import busio
import adafruit_drv2605
import wifi
from adafruit_ble import BLERadio
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement
from adafruit_ble.services import Service
from adafruit_ble.uuid import VendorUUID

# --- CONFIGURATION ---
SSID = "ENTER SSID OF WIFI OR HOTSPOT DEVICE HERE"
PASSWORD = "ENTER PASSWORD HERE"
SERVICE_UUID = "be83ebca-a930-4d57-a57d-784d322198cd" # UUID for my particular QTPY board.

# --- BLE SETUP ---
ble = BLERadio()
ble.name = "FidgetToyTest" # what to look out for when checking fx your phones BT connections

class FidgetService(Service):
    uuid = VendorUUID(SERVICE_UUID)

service = FidgetService()
advertisement = ProvideServicesAdvertisement(service)
ble.start_advertising(advertisement)
ble_ready = True  # Advertising started successfully

# --- WIFI SETUP ---
wifi_connected = False
try:
    wifi.radio.connect(SSID, PASSWORD, timeout=15)
    wifi_connected = True
except:
    wifi_connected = False

# --- DRV2605 SETUP ---
i2c = board.STEMMA_I2C()
drv = adafruit_drv2605.DRV2605(i2c)
drv.mode = adafruit_drv2605.MODE_INTTRIG
drv.library = 1

# --- HELPER FUNCTION ---
def buzz(duration_ms=150):
    """Trigger a short buzz"""
    drv.set_waveform(0, 1)
    drv.set_waveform(1, 0)
    drv.play()
    time.sleep(duration_ms / 1000.0)

# --- MAIN LOGIC ---
# 1. Initial Handshake Check
#    Now checks: Is BLE advertising? AND Is Wi-Fi connected?
if wifi_connected and ble_ready:
    # Success! Double buzz
    buzz(200)
    time.sleep(0.3)
    buzz(200)
elif wifi_connected:
    # Wi-Fi only
    buzz(200)
elif ble_ready:
    # BLE only
    buzz(100)
    time.sleep(0.3)
    buzz(100)
    time.sleep(0.3)
    buzz(100)  # Triple buzz = BLE only
else:
    pass  # Silence = total failure

# 2. The "Alive" Loop
last_buzz_time = time.monotonic()

try:
    while True:
        current_time = time.monotonic()
        
        # Re-check Wi-Fi status
        if wifi_connected and not wifi.radio.connected:
            wifi_connected = False
        
        # If both are good, buzz every 5 seconds
        if wifi_connected and ble_ready:
            if current_time - last_buzz_time >= 5.0:
                buzz(150)
                last_buzz_time = current_time
        
        time.sleep(0.1)

except KeyboardInterrupt:
    pass