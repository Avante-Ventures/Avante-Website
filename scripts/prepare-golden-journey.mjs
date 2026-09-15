import { execFileSync } from 'node:child_process';
import { mkdir, rename, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import sharp from 'sharp';

// Real licensed footage. See public/world-assets/ATTRIBUTION.md for provenance.
// Usage: node scripts/prepare-golden-journey.mjs /path/to/source.mp4 /path/to/scratch [--smooth-motion]
const source = process.argv[2];
const scratch = process.argv[3];
const smoothMotion = process.argv.includes('--smooth-motion');
if (!source || !scratch) throw new Error('Provide the source MP4 and a scratch directory.');
await stat(source);
await mkdir(scratch, { recursive: true });
const output = resolve('public/world-assets');
const root = join(output, 'saopaulo-golden');
const filmRoot = smoothMotion ? join(scratch, 'saopaulo-fluid') : root;
const grade = "eq=contrast=1.06:brightness=0.012:saturation=1.13:gamma=1.03,curves=r='0/0.016 0.2/0.20 0.5/0.58 0.75/0.84 1/1':g='0/0.012 0.2/0.17 0.5/0.46 0.75/0.70 1/0.97':b='0/0.04 0.2/0.23 0.5/0.53 0.75/0.69 1/0.9'";

async function atmosphere(width) {
  const height = width * 9 / 16;
  const path = join(scratch, `atmosphere-${width}.png`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><linearGradient id="grade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#454697" stop-opacity=".55"/><stop offset=".28" stop-color="#7C4B98" stop-opacity=".4"/><stop offset=".5" stop-color="#E47A5C" stop-opacity=".2"/><stop offset=".7" stop-color="#E47A5C" stop-opacity="0"/><stop offset="1" stop-color="#E47A5C" stop-opacity="0"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(#grade)"/></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path);
  return path;
}

function toning(input, width) {
  // A luminance mask keeps the atmospheric color from washing out the architecture.
  return `[${input}]scale=${width}:-2:flags=lanczos,setsar=1,${grade},split[city][luma];` +
    "[luma]format=gray,lut=y='clip((val-95)*255/135,0,255)'[mask];" +
    '[1:v]split[color][gradient];[gradient]alphaextract[gradientalpha];' +
    '[mask][gradientalpha]blend=all_mode=multiply[alpha];' +
    '[color][alpha]alphamerge[wash];[city][wash]overlay=0:0:format=auto,format=yuv420p[graded]';
}

function ffmpeg(args) {
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-threads', '4', '-filter_complex_threads', '2', ...args], { stdio: 'inherit' });
}

const overlay = await atmosphere(1920);
// The original changes angles at 7.59 seconds. Keep two clean takes with a gentle
// dissolve, and play each at two-thirds speed. No reverse loop or frozen tail.
// Interpolate each clean take before the dissolve, avoiding optical-flow
// artifacts across the angle change. Plain fps conversion only repeats frames.
const cadence = smoothMotion ? 'minterpolate=fps=30:mi_mode=mci:mc_mode=obmc:me_mode=bilat:me=epzs:mb_size=16:search_param=16:vsbmc=0' : 'fps=30';
const edit = '[0:v]split[wide][close];' +
  `[wide]trim=start=0:end=7.3,setpts=1.5*(PTS-STARTPTS),${cadence},settb=AVTB[a];` +
  `[close]trim=start=7.7:end=14.85,setpts=1.5*(PTS-STARTPTS),${cadence},settb=AVTB[b];` +
  '[a][b]xfade=transition=fade:duration=1.1:offset=9.85[edited];';
// Scale each take before the dissolve to keep peak memory low on the local Mac.
const scaledEdit = edit.replace('trim=start=0', 'scale=1920:-2,trim=start=0').replace('trim=start=7.7', 'scale=1920:-2,trim=start=7.7');
ffmpeg(['-i', source, '-loop', '1', '-i', overlay, '-filter_complex', scaledEdit + toning('edited', 1920), '-map', '[graded]', '-an', '-t', '20.57', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-threads', '4', '-g', '15', '-keyint_min', '15', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', `${filmRoot}-journey.mp4`]);

ffmpeg(['-i', `${filmRoot}-journey.mp4`, '-vf', 'scale=1280:-2:flags=lanczos,fps=24', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-threads', '4', '-g', '48', '-keyint_min', '48', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${filmRoot}-mobile.mp4`]);

if (smoothMotion) {
  // Preserve the approved 4K posters and publish local files only after encoding.
  for (const variant of ['journey', 'mobile']) {
    const destination = join(output, `saopaulo-fluid-${variant}.mp4`);
    await rename(`${filmRoot}-${variant}.mp4`, destination);
    console.log(`${destination}: ${(await stat(destination)).size} bytes`);
  }
  process.exit(0);
}

// Match the opening frame and grade, retaining real 4K source detail in the poster.
const poster = join(scratch, 'golden-poster.png');
ffmpeg(['-i', source, '-i', await atmosphere(3840), '-filter_complex', toning('0:v', 3840), '-map', '[graded]', '-frames:v', '1', poster]);
for (const width of [1280, 1920, 2560, 3840]) {
  const path = width === 3840 ? `${root}.webp` : `${root}-${width}.webp`;
  await sharp(poster).resize({ width }).webp({ quality: 86 }).toFile(path);
}
// Center the real pylon in the narrow composition, including its full height.
for (const width of [720, 1080]) {
  await sharp(poster).extract({ left: 1400, top: 0, width: 1215, height: 2160 }).resize({ width }).webp({ quality: 86 }).toFile(`${root}-portrait-${width}.webp`);
}
for (const path of [`${root}-journey.mp4`, `${root}-mobile.mp4`, `${root}.webp`, `${root}-portrait-720.webp`]) {
  console.log(`${path}: ${(await stat(path)).size} bytes`);
}
