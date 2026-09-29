/*
  Dark / light theme.
  The first choice is made in index.html before the page paints. From then on:
  - the header toggle calls setTheme, which saves the choice for the next visit;
  - until the visitor picks one, the site follows their device setting, even if it changes while the page is open.
*/
const STORAGE_KEY = 'theme'
const themeColors = { dark: '#0e0f12', light: '#f4f2ee' }

export function getTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function savedTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function apply(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme])
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
}

// Switch with a short cross-fade of the whole page (where the browser supports it), instant otherwise
export function setTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Private mode: the choice lasts until the tab closes
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (document.startViewTransition && !reduceMotion) {
    document.documentElement.classList.add('theme-switching')
    const transition = document.startViewTransition(() => apply(theme))
    transition.finished.finally(() => document.documentElement.classList.remove('theme-switching'))
  } else {
    apply(theme)
  }
}

// Follow the device setting while the visitor hasn't chosen
export function watchSystemTheme() {
  const query = window.matchMedia('(prefers-color-scheme: light)')
  const onChange = (event) => {
    if (!savedTheme()) apply(event.matches ? 'light' : 'dark')
  }
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
