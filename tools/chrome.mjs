// shared helpers for the screenshot tools: find Chrome, check the local viewer is running, take a screenshot.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve, relative, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const PORT = process.env.PORT || 8080;
export const BASE = `http://127.0.0.1:${PORT}/`;
export const SHOTS = join(ROOT, '.local', 'shots');

// the window sizes we check at. "tall" is for sections longer than one screen
export const SIZES = {
  desktop: [1440, 900], phone: [390, 844],
  'desktop-tall': [1440, 2200], 'phone-tall': [390, 3200],
};

export function findChrome() {
  const candidates = [
    process.env.CHROME,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome-stable', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) fail('Could not find Google Chrome. Install it, or set CHROME=/path/to/chrome and try again.');
  return found;
}

// a page path (relative to the repo root, or absolute) or a full URL, turned into a URL on the local viewer
export function toUrl(target) {
  if (/^https?:\/\//.test(target)) return target;
  const abs = isAbsolute(target) ? target : resolve(ROOT, target);
  if (!existsSync(abs)) fail(`No such file: ${target}`);
  const rel = relative(ROOT, abs);
  if (rel.startsWith('..')) fail(`That file is outside the kit folder: ${target}`);
  return BASE + rel.split(sep).map(encodeURIComponent).join('/');
}

export async function ensureServer() {
  try { await fetch(BASE, { signal: AbortSignal.timeout(2000) }); }
  catch { fail(`The local viewer isn't running. Start it from the kit folder with:\n  python3 -m http.server ${PORT} --bind 127.0.0.1`); }
}

export function shoot(chrome, url, [w, h], file) {
  mkdirSync(dirname(file), { recursive: true });
  const profile = mkdtempSync(join(tmpdir(), 'kit-chrome-'));
  return new Promise((res) => {
    const p = spawn(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
      `--user-data-dir=${profile}`, `--window-size=${w},${h}`, '--virtual-time-budget=6000', `--screenshot=${file}`, url], { stdio: 'ignore' });
    p.on('exit', () => { rmSync(profile, { recursive: true, force: true }); res(existsSync(file)); });
  });
}

// --tall, --only desktop|phone, --size 1280x2000 → the list of [label, [w, h]] to take
export function pickSizes(args) {
  const custom = args.indexOf('--size');
  if (custom > -1) { const [w, h] = (args[custom + 1] || '').split('x').map(Number); if (!w || !h) fail('Use --size WIDTHxHEIGHT, e.g. --size 1280x2000'); return [[`${w}x${h}`, [w, h]]]; }
  const tall = args.includes('--tall'), only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;
  return ['desktop', 'phone'].filter((k) => !only || k === only).map((k) => { const key = tall ? `${k}-tall` : k; return [key, SIZES[key]]; });
}

export function fail(msg) { console.error(msg); process.exit(1); }

// headless Chrome reports itself as a touch screen, so (hover: hover) styles never apply. for desktop shots we
// screenshot a temporary copy of the page and its local stylesheets with the media queries flipped to "mouse".
// hover: true also turns every :hover rule on (via a .force class on every element), to preview hover states.
// copies sit next to the originals (so relative paths still work) and are always deleted afterwards.
import { readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const asMouse = (css) => css
  .replace(/\(\s*hover\s*:\s*hover\s*\)/g, '(min-width: 0px)')
  .replace(/\(\s*hover\s*:\s*none\s*\)/g, '(max-width: 0px)')
  .replace(/\(\s*pointer\s*:\s*fine\s*\)/g, '(min-width: 0px)')
  .replace(/\(\s*pointer\s*:\s*coarse\s*\)/g, '(max-width: 0px)');
const forced = (css) => asMouse(css)
  .replace(/:is\(\s*:hover\s*,\s*:focus-visible\s*\)/g, '.force')
  .replace(/:is\(\s*:focus-visible\s*,\s*:hover\s*\)/g, '.force')
  .replace(/:hover/g, '.force');

export async function withCopy(page, { hover = false }, fn) {
  const fix = hover ? forced : asMouse, temp = [];
  let html = readFileSync(page, 'utf8').replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => `<style>${fix(css)}</style>`);
  html = html.replace(/(<link[^>]+rel="stylesheet"[^>]+href=")([^"]+)(")/g, (all, a, href, b) => {
    if (/^(https?:)?\/\//.test(href)) return all;
    const src = resolve(dirname(page), href);
    if (!existsSync(src)) return all;
    const copy = join(dirname(src), `.shot-${basename(src)}`);
    writeFileSync(copy, fix(readFileSync(src, 'utf8'))); temp.push(copy);
    return a + href.replace(/[^/]+$/, `.shot-${basename(src)}`) + b;
  });
  if (hover) html = html.replace('</body>', `<script>document.querySelectorAll('body *').forEach((el) => el.classList.add('force'))</script>\n</body>`);
  const copy = join(dirname(page), `.shot-${basename(page)}`);
  writeFileSync(copy, html); temp.push(copy);
  try { return await fn(toUrl(copy)); } finally { for (const f of temp) rmSync(f, { force: true }); }
}

export function pageFile(target) {
  const abs = isAbsolute(target) ? target : resolve(ROOT, target);
  if (!existsSync(abs)) fail(`No such file: ${target}`);
  return abs;
}
