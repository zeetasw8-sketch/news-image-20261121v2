// The World Today — 21 November 2026 in one image
// (make.fun news-image-20261121, v2 challenger entry).
//
// The front page itself is already drawn: entry.png was rendered ahead
// of time from Saturday's news (Reuters / AP / AFP / BBC / AJP / IANS)
// with Python and Pillow — flat colours, simple pictograms, DejaVu
// type. This program needs no network at all; it only has to deliver
// that finished image to the output directory and prove the copy is
// byte-for-byte intact.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//   # then compare: sha256sum out/entry.png entry.png

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ONE_MIB = 1024 * 1024;
const PNG_MAGIC = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

function fail(message) {
  throw new Error(message);
}

// The grader hands us a writable directory; fall back to /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, 'entry.png');
if (!existsSync(sourcePath)) {
  fail(`bundled image not found: ${sourcePath}`);
}
const image = readFileSync(sourcePath);

// A real PNG starts with these eight bytes. Reject anything else here
// instead of handing the grader a broken file.
if (
  image.length < PNG_MAGIC.length ||
  !image.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)
) {
  fail('entry.png does not start with the PNG signature');
}

// The rules cap the image at 1 MiB; refuse an oversize bundle outright
// rather than letting the gate reject the entry after the run.
if (image.length > ONE_MIB) {
  fail(`entry.png is ${image.length} bytes, over the 1 MiB limit`);
}

const outPath = join(outDir, 'entry.png');
writeFileSync(outPath, image);

// Read the file back and demand an exact match: a short or corrupted
// write must fail loudly, not silently grade a broken image.
const written = readFileSync(outPath);
if (!written.equals(image)) {
  fail('output entry.png differs from the bundled entry.png');
}
const digest = createHash('sha256').update(written).digest('hex');
console.log(
  `wrote ${outPath} (${written.length} bytes, sha256=${digest}, verified identical)`,
);
