import imageSizes from '../data/image-sizes.json'

/*
  The srcset for a screen: its smaller copies (made by scripts/image-sizes.py) plus the original.
  Undefined when the screen has no copies, so it simply loads at full size.
*/
const BASE = import.meta.env.BASE_URL

export function srcSetFor(screen) {
  const widths = imageSizes[screen.src.startsWith(BASE) ? screen.src.slice(BASE.length) : screen.src]
  if (!widths) return undefined
  const copies = widths.map((width) => `${screen.src.replace(/\.webp$/, `-${width}.webp`)} ${width}w`)
  return [...copies, `${screen.src} ${screen.width}w`].join(', ')
}
