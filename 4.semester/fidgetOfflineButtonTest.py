import time
import board
import analogio
import busio
import adafruit_drv2605
from adafruit_ble import BLERadio
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement

# --- CONFIGURATION ---
LEFT_BUTTON_PIN = board.A0
RIGHT_BUTTON_PIN = board.A2

# Thresholds:
# Left: Idle ~3000-10000. Threshold 2500 is safe.
# Right: Idle ~0-1400 (based on logs).
#   *Note:* If Right idle is sometimes 0, we might need to adjust the logic or check wiring.
#   Let's start with a threshold of 1000. If it triggers on idle, we lower it or check the sensor.
LEFT_THRESHOLD = 2500
RIGHT_THRESHOLD = 200

# FILTER SETTINGS
SAMPLE_SIZE = 10       # Average of last 10 readings
DEBOUNCE_DELAY = 0.3   # Require low value for 0.3 seconds

# --- INITIALIZE SENSORS ---
left_button = analogio.AnalogIn(LEFT_BUTTON_PIN)
right_button = analogio.AnalogIn(RIGHT_BUTTON_PIN)

# Buffers for moving average
left_buffer = [0] * SAMPLE_SIZE
right_buffer = [0] * SAMPLE_SIZE
left_idx = 0
right_idx = 0

# --- INITIALIZE DRV2605 ---
i2c = board.STEMMA_I2C()
drv = adafruit_drv2605.DRV2605(i2c)
drv.mode = adafruit_drv2605.MODE_INTTRIG
drv.library = 1

print("DRV2605 initialized.")

# --- INITIALIZE BLE ---
ble = BLERadio()
ble.name = "FidgetToy"
print("BLE advertising...")

# State tracking
left_pressed = False
right_pressed = False
left_press_start = 0
right_press_start = 0

def get_smoothed_value(pin, buffer, idx):
    """Calculate moving average"""
    new_val = pin.value
    buffer[idx] = new_val
    idx = (idx + 1) % SAMPLE_SIZE
    return int(sum(buffer) / SAMPLE_SIZE), idx

def trigger_haptic(side):
    drv.set_waveform(0, 1)
    drv.set_waveform(1, 0)
    drv.play()
    print(f">>> {side.upper()} BUTTON: HAPTIC TRIGGERED <<<")

def main():
    global left_pressed, right_pressed, left_press_start, right_press_start, left_idx, right_idx

    print("--- BOTH BUTTONS TEST (With Noise Filtering) ---")

    while True:
        # Get smoothed values
        left_avg, left_idx = get_smoothed_value(left_button, left_buffer, left_idx)
        right_avg, right_idx = get_smoothed_value(right_button, right_buffer, right_idx)

        # Debug print (Optional: comment out if too spammy)
        # print(f"L: {left_avg}, R: {right_avg}")

        current_time = time.monotonic()

        # --- LEFT BUTTON LOGIC ---
        if left_avg < LEFT_THRESHOLD:
            if not left_pressed:
                left_press_start = current_time
                left_pressed = True

            if (current_time - left_press_start) > DEBOUNCE_DELAY:
                print(f"Left Press Confirmed (Avg: {left_avg})")
                trigger_haptic("Left")
                left_pressed = False # Reset to allow re-trigger
                left_press_start = 0
        else:
            left_pressed = False
            left_press_start = 0

        # --- RIGHT BUTTON LOGIC ---
        if right_avg < RIGHT_THRESHOLD:
            if not right_pressed:
                right_press_start = current_time
                right_pressed = True

            if (current_time - right_press_start) > DEBOUNCE_DELAY:
                print(f"Right Press Confirmed (Avg: {right_avg})")
                trigger_haptic("Right")
                right_pressed = False
                right_press_start = 0
        else:
            right_pressed = False
            right_press_start = 0

        time.sleep(0.02)

if __name__ == "__main__":
    main()
