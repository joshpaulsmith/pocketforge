#!/usr/bin/env bash
set -euo pipefail

SITE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GAME_ROOT="${GAME_ROOT:-/Users/joshsmith/Developer/Forging-main}"
OUT_DIR="$SITE_ROOT/play"
TMP_DIR="$GAME_ROOT/dist-pocketforge-play"

if [[ ! -f "$GAME_ROOT/package.json" ]]; then
  echo "Game repo not found at: $GAME_ROOT" >&2
  exit 1
fi

echo "Building PocketForge game for GitHub Pages subpath..."
cd "$GAME_ROOT"
bash ./scripts/vite-runner.sh build --base=/play/ --outDir "$TMP_DIR"

echo "Refreshing launcher play build..."
mkdir -p "$OUT_DIR"
cp -R "$TMP_DIR"/. "$OUT_DIR"/

mkdir -p "$OUT_DIR/web" "$OUT_DIR/mobile"
cat > "$OUT_DIR/web/index.html" <<'HTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=/play/?experience=web" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PocketForge Web</title>
  </head>
  <body></body>
</html>
HTML

cat > "$OUT_DIR/mobile/index.html" <<'HTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=/play/?experience=mobile" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PocketForge Mobile</title>
  </head>
  <body></body>
</html>
HTML

echo "PocketForge web build synced into $OUT_DIR"
