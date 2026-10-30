# Tools

Scripts Claude uses to check its own work before showing you anything. You don't need to run them yourself, but you can.

They all need the local viewer running first, from the kit folder:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Screenshots are saved in `.local/shots/`, which stays on your computer and is never sent to GitHub.

## shot.mjs: screenshots

```bash
node tools/shot.mjs <file> <name>
```

Takes two screenshots: **desktop** (1440×900) and **phone** (390×844).

```bash
node tools/shot.mjs pages/about/sections/hero/A-split.html about-hero-A
# → .local/shots/about-hero-A-desktop.png and about-hero-A-phone.png
```

The desktop shot behaves like a computer with a mouse, so styles meant only for hover-capable screens show up. The phone shot behaves like a touch screen.

| Add | To |
|---|---|
| `--tall` | Capture more of a long section: 1440×2200 and 390×3200 |
| `--only desktop` or `--only phone` | Take just one of the two |
| `--size 1280x2000` | Use any window size you like |

You can also pass a full web address instead of a file.

## hover.mjs: hover states

```bash
node tools/hover.mjs <file> <name>
```

A headless browser can't move a mouse, so this switches **every hover state on at once** and screenshots that: buttons in their hover colour, rows highlighted, and so on. It works on a temporary copy and deletes it afterwards, so the real files are never changed. It takes the same `--tall`, `--only` and `--size` options as `shot.mjs`.

## chrome.mjs

Shared helpers for the two scripts above, such as finding Chrome and checking the viewer is running. It isn't run on its own.

## Good to know

- **Chrome not found?** Install Google Chrome, or point to it: `CHROME=/path/to/chrome node tools/shot.mjs …`
- **Viewer on a different port?** Put the port first: `PORT=8090 node tools/shot.mjs …`
- **What a screenshot can't show:** scroll effects, clicks and typing. Claude says when something needs your eye in the real browser.
