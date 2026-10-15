"""
Makes smaller copies of large screenshots, so phones download a small image instead of the full one.

  python scripts/image-sizes.py        (needs Pillow: python -m pip install pillow)

For every .webp in public/images/work wider than 700px it writes name-480.webp (plus name-720.webp and
name-960.webp when the image is wide enough) next to it, then lists them in src/data/image-sizes.json.
The site's device frames read that list to build srcset. An image that isn't listed simply loads
at full size, so new images keep working before this is run again.
"""
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / 'public' / 'images' / 'work'
MANIFEST = ROOT / 'src' / 'data' / 'image-sizes.json'
STEPS = [(480, 700), (720, 900), (960, 1100)]  # (copy width, only for images wider than this)

manifest = {}
for path in sorted(IMAGES.rglob('*.webp')):
    if any(path.stem.endswith(f'-{width}') for width, _ in STEPS):
        continue
    with Image.open(path) as image:
        width, height = image.size
        made = []
        for target, minimum in STEPS:
            if width <= minimum:
                continue
            out = path.with_name(f'{path.stem}-{target}.webp')
            if not out.exists() or out.stat().st_mtime < path.stat().st_mtime:
                image.resize((target, round(height * target / width)), Image.LANCZOS).save(out, 'WEBP', quality=82, method=6)
            made.append(target)
    if made:
        manifest[f'images/work/{path.relative_to(IMAGES).as_posix()}'] = made

MANIFEST.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(f'{len(manifest)} images have smaller copies; list written to {MANIFEST.relative_to(ROOT)}')
