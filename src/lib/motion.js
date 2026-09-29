/*
  Motion settings shared by every animation written in JavaScript.
  These mirror the --ease-* and --duration-* tokens in styles/tokens.css,
  so CSS and JS animations feel like one family.
  Motion uses seconds, CSS uses milliseconds.
*/

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
}

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  slower: 0.7,
}

// How far elements travel when they reveal. Small on purpose: subtle, never bouncy.
export const distance = {
  reveal: 16,
}

// Delay between items that reveal one after another (e.g. lines of an intro)
export const stagger = 0.08
