from pathlib import Path
from PIL import Image, ImageOps
import json

root = Path('assets/gallery')
manifest = {}
count = 0
for event_dir in sorted(p for p in root.iterdir() if p.is_dir()):
    pg_dir = event_dir / 'PG'
    pg_dir.mkdir(exist_ok=True)
    names = []
    for source in sorted(event_dir.iterdir()):
        if not source.is_file() or source.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
            continue
        target = pg_dir / (source.stem + '.webp')
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened)
            if image.mode not in ('RGB', 'RGBA'):
                image = image.convert('RGB')
            image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
            image.save(target, 'WEBP', quality=88, method=6)
        names.append(target.name)
        count += 1
    if names:
        manifest[event_dir.name] = names
Path('assets/gallery-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(f'Converted {count} PG gallery images to WebP.')
