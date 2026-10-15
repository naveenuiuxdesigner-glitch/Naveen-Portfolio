import { useSyncExternalStore } from 'react'
import { getTheme, setTheme, watchSystemTheme } from '../lib/theme'

/*
  The current theme ('dark' or 'light') and a function to switch it.
  Pre-rendered HTML can't know the visitor's theme, so it assumes dark;
  the real theme takes over the moment the page starts (useSyncExternalStore handles the switch).
*/
function subscribe(onChange) {
  window.addEventListener('themechange', onChange)
  const stopWatching = watchSystemTheme()
  return () => {
    window.removeEventListener('themechange', onChange)
    stopWatching()
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark')
  return [theme, setTheme]
}
