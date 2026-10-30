// screenshots of a section with every hover state switched on at once, since headless Chrome can't hover.
//   node tools/hover.mjs <file> <name> [--tall] [--only desktop|phone] [--size WxH]
// works on a temporary copy (see withCopy in chrome.mjs); the real files are never touched.
import { join } from 'node:path';
import { findChrome, pageFile, withCopy, ensureServer, shoot, pickSizes, fail, SHOTS } from './chrome.mjs';

const args = process.argv.slice(2), [target, name] = args;
if (!target || !name || name.startsWith('--') || /^https?:/.test(target)) fail('Usage: node tools/hover.mjs <file> <name> [--tall] [--only desktop|phone] [--size WxH]');

const chrome = findChrome(), page = pageFile(target);
await ensureServer();   // checked before any copies are made, so a failure leaves nothing behind
for (const [label, size] of pickSizes(args)) {
  const file = join(SHOTS, `${name}-hover-${label}.png`);
  console.log((await withCopy(page, { hover: true }, (url) => shoot(chrome, url, size, file))) ? `saved ${file}` : `failed ${label}`);
}
