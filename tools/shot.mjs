// screenshots of a page or section at desktop and phone width, saved in .local/shots/
//   node tools/shot.mjs <file-or-url> <name> [--tall] [--only desktop|phone] [--size WxH]
// e.g. node tools/shot.mjs pages/about/sections/hero/A-split.html about-hero-A
// desktop shots behave like a mouse (hover-only styles apply); phone shots behave like a touch screen.
import { join } from 'node:path';
import { findChrome, toUrl, pageFile, withCopy, ensureServer, shoot, pickSizes, fail, SHOTS } from './chrome.mjs';

const args = process.argv.slice(2), [target, name] = args;
if (!target || !name || name.startsWith('--')) fail('Usage: node tools/shot.mjs <file-or-url> <name> [--tall] [--only desktop|phone] [--size WxH]');

const chrome = findChrome(), isUrl = /^https?:\/\//.test(target), page = isUrl ? null : pageFile(target);
await ensureServer();
for (const [label, size] of pickSizes(args)) {
  const file = join(SHOTS, `${name}-${label}.png`), mouse = size[0] > 900 && !isUrl;
  const ok = mouse ? await withCopy(page, {}, (url) => shoot(chrome, url, size, file)) : await shoot(chrome, isUrl ? target : toUrl(page), size, file);
  console.log(ok ? `saved ${file}` : `failed ${label}`);
}
