<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      
      <div class="welcome-icon-wrap">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      </div>

      <h2 class="welcome-title">Welcome to AudioVerse</h2>
      
      <p class="welcome-text">
        Your interactive guide to the museum. Explore the venue map to see live room densities, and listen to the synchronized audio and tour as you go.
      </p>

      <button class="start-btn" @click="$emit('close')">
        Let's Go
      </button>

    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.6); display: flex; align-items: center;
  justify-content: center; z-index: 2000; padding: 24px;
}
.modal-content {
  background: var(--surface); border-radius: 28px; width: 100%;
  max-width: 320px; padding: 32px 24px; box-shadow: 0 16px 40px rgba(0,0,0,0.2);
  display: flex; flex-direction: column; align-items: center; text-align: center;
  border: 1px solid var(--border);
}
.welcome-icon-wrap {
  width: 64px; height: 64px; background: var(--primary); color: #fff;
  border-radius: 20px; display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px; box-shadow: 0 8px 16px rgba(82, 121, 111, 0.25);
}
.welcome-title {
  font-size: 22px; font-weight: 700; color: var(--text-main); margin-bottom: 12px;
  letter-spacing: -0.5px;
}
.welcome-text {
  font-size: 15px; color: var(--text-muted); line-height: 1.5; margin-bottom: 28px;
}
.start-btn {
  width: 100%; padding: 16px; border-radius: 16px; border: none;
  background: var(--text-main); color: var(--surface); font-family: inherit;
  font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.2s ease, opacity 0.2s ease;
}
.start-btn:active { transform: scale(0.96); }
</style>