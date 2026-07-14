import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const publicAssets = [
  'optimized/shirt.webp',
  'shirt.png',
  'ouroboros.png',
  'optimized/tarot_valery.webp',
  'optimized/tarot_brin.webp',
  'optimized/tarot_sakris.webp',
  'optimized/tarot_tallis.webp',
  'optimized/tarot_stive.webp',
  'avatar_valery.png',
  'avatar_brin.png',
  'avatar_sakris.png',
  'avatar_tallis.png',
  'avatar_stive.png',
  'videos/thumbnail.jpg',
  'map_sever.png',
  'map_northwind.png',
  'maps/north_full_atlas.jpg',
  'maps/north_humans.jpg',
  'maps/north_elves.jpg',
  'maps/north_dwarves.jpg',
  'docs/astaria.pdf',
  'docs/pursuing-peace-orcs.pdf',
];

let failed = false;
for (const asset of publicAssets) {
  const path = join('public', asset);
  if (!existsSync(path)) {
    console.error(`MISS public/${asset}`);
    failed = true;
    continue;
  }
  const size = statSync(path).size;
  if (size <= 0) {
    console.error(`EMPTY public/${asset}`);
    failed = true;
    continue;
  }
  console.log(`OK public/${asset} ${size} bytes`);
}

process.exit(failed ? 1 : 0);
