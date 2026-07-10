# Live Salla preview guide

## Verified environment

- Salla CLI: 3.2.30
- Theme branch: `feat/premium-theme-system`
- Demo store: `hazem-test`
- Theme name: `hazem-dev`

`salla theme list` currently returns two development records named `hazem-dev` (IDs `352916197` and `473436942`). The CLI passed its repository/theme-ID linkage check for this folder. Do not delete either record without confirming which owns the active draft.

## Working commands

```powershell
salla theme preview --store hazem-test --only-link --without-editor
salla theme preview --store hazem-test --with-editor --browser chrome
```

The verified run found `twilight.json`, confirmed GitHub, theme-ID and repository linkage, started the asset and WebSocket servers, and issued a Salla draft URL. Ports and draft IDs are ephemeral; read them from each run. Never save or share the auto-login URL because it contains a short-lived token.

## Expected long-running behavior

After printing the URL, the command stays active to run the watcher and local servers. An idle terminal is not necessarily hung. Confirm the printed asset/live-reload URLs and listening ports. Stop with Ctrl+C, then run `pnpm production` to restore minified marketplace assets.

## Browser requirements

- Allow Chrome local-network access for the Salla preview origin.
- Complete Salla login and any Cloudflare Turnstile challenge interactively; do not automate or bypass it.
- If the page stays on “please wait,” open the new auto-login link in an authenticated ordinary Chrome profile.
- Discard stale tabs after restart: draft IDs, access tokens, ports and cached URLs change.
- Verify `app.css`, `app.js`, and on non-home pages `page-components.css` resolve from the current localhost asset port.

## Troubleshooting order

1. Use `salla theme list` and distinguish duplicate theme names by ID in Partners Portal.
2. Use `salla store list` to verify the demo store.
3. Check the feature branch, remote, clean status and pushed commit.
4. Re-run preview and discard stale draft URLs.
5. Confirm local asset HTTP 200 and both ports listening.
6. Grant Chrome local-network access and complete interactive authentication.
7. Confirm browser requests localhost assets, not production assets.
8. After preview, stop the watcher and run `pnpm production`.

## Preview build pipeline

The watch command generates explicit Salla safelists, builds `src/assets/generated/page-components.css`, then starts Webpack. Webpack copies that file after cleaning `public`; this preserves page component CSS in preview.
