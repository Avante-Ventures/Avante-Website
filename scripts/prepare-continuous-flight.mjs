import { execFileSync } from 'node:child_process';
import { mkdir, rename, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import sharp from 'sharp';

// A single real drone take. No cuts, zoom animation, time stretching or interpolation.
// Source and license: public/world-assets/ATTRIBUTION.md.
// Usage: node scripts/prepare-continuous-flight.mjs /path/to/source.mp4 /path/to/scratch
const [source, scratch] = process.argv.slice(2);
if (!source || !scratch) throw new Error('Provide a source MP4 and a scratch directory.');
await stat(source);
await mkdir(scratch, { recursive: true });
const metadata = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', source], { encoding: 'utf8' }));
const stream = metadata.streams.find(value => value.codec_type === 'video');
if (!stream || stream.width !== 1920 || stream.height !== 1080 || Number(metadata.format.duration) < 15.7) throw new Error('Expected the 1080p continuous bridge source, at least 15.7 seconds long.');
const output = resolve('public/world-assets');
const root = join(scratch, 'saopaulo-flight');
const grade = "eq=contrast=1.04:brightness=0.015:saturation=0.95:gamma=1.03,curves=r='0/0.018 0.2/0.21 0.5/0.57 0.75/0.81 1/1':g='0/0.012 0.2/0.18 0.5/0.47 0.75/0.73 1/0.98':b='0/0.04 0.2/0.24 0.5/0.54 0.75/0.73 1/0.94'";
const files = [];
function ffmpeg(args) {
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-threads', '2', '-filter_threads', '2', ...args], { stdio: 'inherit' });
}
const desktop = `${root}-journey.mp4`, mobile = `${root}-mobile.mp4`;
// Preserve the source's 60000/1001 frame cadence and continuous camera path.
ffmpeg(['-i', source, '-vf', `${grade},setsar=1`, '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-threads', '2', '-g', '30', '-keyint_min', '30', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', desktop]);
files.push(desktop);
ffmpeg(['-i', desktop, '-vf', 'scale=1280:-2:flags=lanczos,fps=30000/1001', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-threads', '2', '-g', '60', '-keyint_min', '60', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mobile]);
files.push(mobile);
const poster = `${root}-poster.png`;
ffmpeg(['-i', source, '-vf', grade, '-frames:v', '1', poster]);
for (const width of [1280, 1920]) {
  const path = `${root}-${width}.webp`;
  await sharp(poster).resize({ width }).webp({ quality: 88 }).toFile(path);
  files.push(path);
}
// Native-resolution portrait crop: retain the bridge, without invented detail.
for (const width of [400, 600]) {
  const path = `${root}-portrait-${width}.webp`;
  await sharp(poster).extract({ left: 730, top: 0, width: 608, height: 1080 }).resize({ width }).webp({ quality: 88 }).toFile(path);
  files.push(path);
}
await mkdir(output, { recursive: true });
for (const path of files) {
  const destination = join(output, path.split('/').pop());
  await rename(path, destination);
  console.log(`${destination}: ${(await stat(destination)).size} bytes`);
}
