import { useEffect, useState } from 'react'
import { getTheme, setTheme, watchSystemTheme } from '../lib/theme'

// The current theme ('dark' or 'light') and a function to switch it
export function useTheme() {
  const [theme, setState] = useState(getTheme)

  useEffect(() => {
    const onChange = (event) => setState(event.detail)
    window.addEventListener('themechange', onChange)
    const stopWatching = watchSystemTheme()
    return () => {
      window.removeEventListener('themechange', onChange)
      stopWatching()
    }
  }, [])

  return [theme, setTheme]
}
