import time
import board
import analogio
import busio
import adafruit_drv2605
from adafruit_ble import BLERadio
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement
from adafruit_ble.services import Service
from adafruit_ble.characteristics import Characteristic
from adafruit_ble.uuid import VendorUUID

# --- CONFIGURATION ---
LEFT_BUTTON_PIN = board.A0
RIGHT_BUTTON_PIN = board.A2

# OLD VALS
#LEFT_THRESHOLD = 2500
#RIGHT_THRESHOLD = 200

# NEW CALLIBRATED VALS
LEFT_THRESHOLD = 10
RIGHT_THRESHOLD = 10


SAMPLE_SIZE = 10
DEBOUNCE_DELAY = 0.3

# --- BLE UUIDs ---
SERVICE_UUID = "be83ebca-a930-4d57-a57d-784d322198cd"
BUTTON_CHAR_UUID = "be83ebca-a930-4d57-a57d-784d322198ce"

# --- DEFINE BLE SERVICE WITH NOTIFY CHARACTERISTIC ---
class FidgetToyService(Service):
    uuid = VendorUUID(SERVICE_UUID)

    # Explicitly set max_length to 2 bytes (1 char + safety)
    button_data = Characteristic(
        uuid=VendorUUID(BUTTON_CHAR_UUID),
        properties=Characteristic.NOTIFY | Characteristic.READ,
        max_length=2
    )

# --- BLE SETUP ---
ble = BLERadio()
ble.name = "FidgetToy"

service = FidgetToyService()
advertisement = ProvideServicesAdvertisement(service)

# Start advertising
ble.start_advertising(advertisement)
print("BLE advertising as 'FidgetToy'...")

# --- SENSOR SETUP ---
left_button = analogio.AnalogIn(LEFT_BUTTON_PIN)
right_button = analogio.AnalogIn(RIGHT_BUTTON_PIN)

left_buffer = [0] * SAMPLE_SIZE
right_buffer = [0] * SAMPLE_SIZE
left_idx = 0
right_idx = 0

# --- DRV2605 SETUP ---
i2c = board.STEMMA_I2C()
drv = adafruit_drv2605.DRV2605(i2c)
drv.mode = adafruit_drv2605.MODE_INTTRIG
drv.library = 1
print("DRV2605 initialized.")

# --- STATE TRACKING ---
left_pressed = False
right_pressed = False
left_press_start = 0
right_press_start = 0

def get_smoothed_value(pin, buffer, idx):
    new_val = pin.value
    buffer[idx] = new_val
    idx = (idx + 1) % SAMPLE_SIZE
    return int(sum(buffer) / SAMPLE_SIZE), idx

def trigger_haptic():
    drv.set_waveform(0, 1)
    drv.set_waveform(1, 0)
    drv.play()

def send_button_command(command):
    """Send button command via BOTH serial and BLE"""
    # Map full words to single letters for minimal data size
    if command == "left":
        code = "L"
    elif command == "right":
        code = "R"
    else:
        code = command

    print(f"Sending: {code}")

    if ble.connected:
        try:
            # Encode to bytes
            data = code.encode('utf-8')

            # Direct assignment triggers notification
            service.button_data = data

            print(f"Sent BLE: {code} ({len(data)} bytes)")
        except Exception as e:
            print(f"BLE error: {e}")

def main():
    global left_pressed, right_pressed, left_press_start, right_press_start, left_idx, right_idx

    print("--- Ready: Press a button ---")

    while True:
        left_avg, left_idx = get_smoothed_value(left_button, left_buffer, left_idx)
        right_avg, right_idx = get_smoothed_value(right_button, right_buffer, right_idx)

        current_time = time.monotonic()

        # --- LEFT BUTTON ---
        if left_avg < LEFT_THRESHOLD:
            if not left_pressed:
                left_press_start = current_time
                left_pressed = True
            if (current_time - left_press_start) > DEBOUNCE_DELAY:
                send_button_command("left")
                trigger_haptic()
                left_pressed = False
                left_press_start = 0
        else:
            left_pressed = False
            left_press_start = 0

        # --- RIGHT BUTTON ---
        if right_avg < RIGHT_THRESHOLD:
            if not right_pressed:
                right_press_start = current_time
                right_pressed = True
            if (current_time - right_press_start) > DEBOUNCE_DELAY:
                send_button_command("right")
                trigger_haptic()
                right_pressed = False
                right_press_start = 0
        else:
            right_pressed = False
            right_press_start = 0

        time.sleep(0.02)

if __name__ == "__main__":
    main()
