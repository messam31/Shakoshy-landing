#!/usr/bin/env bash
# Remove the white background from every PNG in public/.
# Uses a corner flood-fill so only the connected outer background is made
# transparent — white *inside* the artwork is preserved.
# Originals are backed up to public/_originals/ (run is reversible).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLIC_DIR="$SCRIPT_DIR/../public"
BACKUP_DIR="$PUBLIC_DIR/_originals"
FUZZ="${FUZZ:-12%}" # color tolerance; raise if white edges remain

mkdir -p "$BACKUP_DIR"

shopt -s nullglob
for img in "$PUBLIC_DIR"/*.png; do
  name="$(basename "$img")"

  # Back up the original once.
  if [[ ! -f "$BACKUP_DIR/$name" ]]; then
    cp "$img" "$BACKUP_DIR/$name"
  fi

  echo "Processing $name ..."
  magick "$BACKUP_DIR/$name" \
    -alpha set -bordercolor white -border 1 \
    -fuzz "$FUZZ" \
    -fill none \
    -draw "alpha 0,0 floodfill" \
    -shave 1x1 \
    "$img"
done

echo "Done. Originals saved in public/_originals/"
