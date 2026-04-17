import { ref } from 'vue'

// The global language state (Defaults to English)
export const currentLang = ref('en')

// A super simple translation helper function!
// It takes 3 words: (English, Danish, German) and returns the right one.
export function t(en, da, de) {
  if (currentLang.value === 'da') return da || en
  if (currentLang.value === 'de') return de || en
  return en
}