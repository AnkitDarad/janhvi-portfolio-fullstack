#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '../public/social-media-creatives');

const FILE_KEY = process.env.FILE_KEY || 'DWitVFtyYb3LplWayvW7rs';
const TOKEN = process.env.FIGMA_TOKEN;

/** Request URLs use hyphenated ids; API response `images` keys use colons. */
const toHyphenId = (id) => id.replace(/:/g, '-');

/** filename -> Figma node id (colon form, matches API response keys) */
const NODE_MAP = {
  'hero-collage.png': '3635:61716',
  'tool-illustrator.png': '3635:64771',
  'tool-photoshop.png': '3635:64773',
  'tool-figma.png': '3635:64775',
  'jiostream-stats.png': '3635:64974',
  'jiostream-mockup.png': '3635:64806',
  'jiostream-christmas.png': '3635:65052',
  'jiostream-floating-video.png': '3635:66011',
  'jiostream-sparkle.png': '3635:64923',
  'jiostream-linkedin.png': '3635:63333',
  'jioevents-linkedin.png': '3635:67772',
  'jioevents-newyear.png': '3635:66126',
  'other-jioevents-christmas.png': '3635:72036',
  'jioevents-mockup.png': '3635:66030',
  'jioevents-why.png': '3635:66033',
  'jioevents-recap.png': '3635:67566',
  'jioworkspace-newyear.png': '3635:68852',
  'jioworkspace-partner.png': '3635:68772',
  'jioworkspace-linkedin.png': '3635:69271',
  'jioworkspace-lohri.png': '3635:67941',
  'jioworkspace-monkey.png': '3635:68841',
  'jioworkspace-jiosheets.png': '3635:69271',
  'jiotranslate-kites.png': '3635:69733',
  'jiotranslate-hindi.png': '3635:72000',
  'jiotranslate-linkedin.png': '3635:71763',
  'jiotranslate-santa.png': '3635:68203',
  'jiotranslate-landmark.png': '3635:71251',
  'jiotranslate-learning.png': '3635:64331',
  'other-jiosign-christmas.png': '3635:69969',
  'other-jioloyalty.png': '3635:70162',
  'other-jioattendance.png': '3635:70651',
  'other-jioloyalty-christmas.png': '3635:70963',
  'other-jiomeet.png': '3635:71119',
  'other-jioeva.png': '3635:62758',
};

function fetchJson(url, headers) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Bad JSON: ${data.slice(0, 200)}`));
          }
        });
      })
      .on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlink(dest, () => {});
          return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve()));
      })
      .on('error', (err) => {
        file.close();
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function main() {
  if (!TOKEN) {
    console.error('Set FIGMA_TOKEN');
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const headers = { 'X-Figma-Token': TOKEN };
  const uniqueColonIds = [...new Set(Object.values(NODE_MAP))];
  const SCALE = process.env.FIGMA_EXPORT_SCALE || '1';
  const chunkSize = 12;
  const images = {};
  for (let i = 0; i < uniqueColonIds.length; i += chunkSize) {
    const chunk = uniqueColonIds.slice(i, i + chunkSize).map(toHyphenId);
    const idsParam = chunk.join(',');
    const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(idsParam)}&format=png&scale=${SCALE}`;
    const meta = await fetchJson(url, headers);
    if (meta.err) {
      console.error('Figma API error:', meta.err, 'chunk', i / chunkSize);
      process.exit(1);
    }
    Object.assign(images, meta.images || {});
    await new Promise((r) => setTimeout(r, 800));
  }

  const summary = [];

  for (const colonId of uniqueColonIds) {
    const imageUrl = images[colonId];
    if (!imageUrl) {
      summary.push({ node: colonId, error: 'no_url' });
      continue;
    }
    const dests = Object.entries(NODE_MAP)
      .filter(([, n]) => n === colonId)
      .map(([fn]) => path.join(OUT_DIR, fn));

    const first = dests[0];
    await downloadFile(imageUrl, first);
    for (let i = 1; i < dests.length; i++) {
      fs.copyFileSync(first, dests[i]);
    }
    for (const d of dests) {
      const b = fs.statSync(d).size;
      summary.push({ file: path.basename(d), bytes: b, node: colonId });
    }
  }

  console.log(JSON.stringify({ ok: true, outDir: OUT_DIR, count: summary.filter((s) => s.bytes).length, summary }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
