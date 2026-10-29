from pathlib import Path
from PIL import Image, ImageOps
import json

root = Path('assets/gallery')
manifest = {}
count = 0

# Existing PG workflow: convert images stored directly in each event folder
# into that event's PG/ directory.
for event_dir in sorted(p for p in root.iterdir() if p.is_dir() and p.name != 'ug-upload'):
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
            image.thumbnail((2000, 2000), Image.Resampling.LANCZOS)
            image.save(target, 'WEBP', quality=82, method=6)
        names.append(target.name)
        source.unlink()
        count += 1
    if names:
        manifest[event_dir.name] = names

Path('assets/gallery-manifest.json').write_text(
    json.dumps(manifest, indent=2) + '\n', encoding='utf-8'
)

# UG staging area: convert images in every event subfolder, preserve the
# existing folder names, and remove macOS metadata files / original JPEGs.
ug_root = root / 'ug-upload'
ug_manifest = {}
if ug_root.exists():
    for event_dir in sorted(p for p in ug_root.iterdir() if p.is_dir()):
        names = []
        for source in sorted(event_dir.iterdir()):
            if source.is_file() and (source.name.startswith('._') or source.name == '.DS_Store'):
                source.unlink()
                continue
            if not source.is_file() or source.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
                continue
            target = source.with_suffix('.webp')
            with Image.open(source) as opened:
                image = ImageOps.exif_transpose(opened)
                if image.mode not in ('RGB', 'RGBA'):
                    image = image.convert('RGB')
                image.thumbnail((2000, 2000), Image.Resampling.LANCZOS)
                image.save(target, 'WEBP', quality=82, method=6)
            source.unlink()
            names.append(target.name)
            count += 1
        if names:
            ug_manifest[event_dir.name] = names

Path('assets/gallery-ug-manifest.json').write_text(
    json.dumps(ug_manifest, indent=2) + '\n', encoding='utf-8'
)
print(f'Converted {count} gallery images to WebP (PG + UG staging).')
