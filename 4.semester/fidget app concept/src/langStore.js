import { ref, watch } from 'vue'

// 1. Check phone storage FIRST, default to 'en' if nothing is saved
const savedLang = localStorage.getItem('audioverse_lang') || 'en'
export const currentLang = ref(savedLang)

// 2. Automatically save to phone storage whenever it changes
watch(currentLang, (newLang) => {
  localStorage.setItem('audioverse_lang', newLang)
})

export function t(en, da, de) {
  if (currentLang.value === 'da') return da || en
  if (currentLang.value === 'de') return de || en
  return en
}