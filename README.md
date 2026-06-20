# PocketForge public site

This repo hosts the public-facing PocketForge launcher site for `pocketforge.gg`.

## Structure

- `/` = branded landing page
- `/play/` = live web game build
- `/play/web/` = desktop/browser-friendly launch entry
- `/play/mobile/` = phone/tablet launch entry

## Refresh the playable web build

The launcher can rebuild and copy the current game from the sibling development repo:

```bash
bash ./scripts/sync-play-build.sh
```

By default it expects the game repo at:

`/Users/joshsmith/Developer/Forging-main`

You can override that with:

```bash
GAME_ROOT=/absolute/path/to/Forging-main bash ./scripts/sync-play-build.sh
```

## Visitor counter

The homepage uses [CountAPI](https://countapi.xyz/) to display a lightweight public visitor count.

## Domain

This repo includes:

- `CNAME` for `pocketforge.gg`
- `.nojekyll` for GitHub Pages static hosting
