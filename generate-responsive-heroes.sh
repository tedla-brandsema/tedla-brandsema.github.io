#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./generate-responsive-heroes.sh static/images/hero
#
# Input:
#   static/images/hero/data-duality-hero.png
#
# Output:
#   static/images/hero/generated/data-duality-480.webp
#   static/images/hero/generated/data-duality-480.png
#   ...

if [ "${1:-}" = "" ]; then
  echo "Usage: $0 <directory-containing-*-hero.png>"
  exit 1
fi

INPUT_DIR="$1"
OUTPUT_DIR="${INPUT_DIR%/}/generated"

WIDTHS=(480 768 1200 1600)

mkdir -p "$OUTPUT_DIR"

command -v convert >/dev/null 2>&1 || {
  echo "Error: ImageMagick 'convert' command not found."
  echo "Install ImageMagick first."
  exit 1
}

shopt -s nullglob

FILES=("$INPUT_DIR"/*-hero.png)

if [ "${#FILES[@]}" -eq 0 ]; then
  echo "No *-hero.png files found in: $INPUT_DIR"
  exit 0
fi

for SRC in "${FILES[@]}"; do
  FILE="$(basename "$SRC")"
  NAME="${FILE%-hero.png}"

  echo "Processing: $FILE"

  for WIDTH in "${WIDTHS[@]}"; do
    BASE_OUT="$OUTPUT_DIR/${NAME}-${WIDTH}"

    # WebP: good modern browser support
    convert "$SRC" \
      -auto-orient \
      -strip \
      -resize "${WIDTH}x>" \
      -quality 78 \
      "${BASE_OUT}.webp"

    # PNG fallback
    convert "$SRC" \
      -auto-orient \
      -strip \
      -resize "${WIDTH}x>" \
      -define png:compression-level=9 \
      -define png:compression-filter=5 \
      -define png:compression-strategy=1 \
      "${BASE_OUT}.png"
  done
done

echo
echo "Done. Generated responsive images in:"
echo "$OUTPUT_DIR"