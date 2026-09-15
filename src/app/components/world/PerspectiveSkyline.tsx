const ROOT = '/world-assets/saopaulo-perspective';

export function PerspectiveSkyline() {
  return <picture className="perspective-skyline">
    <source media="(max-width: 600px)" srcSet={`${ROOT}-portrait-400.webp 400w, ${ROOT}-portrait-588.webp 588w`} sizes="100vw" />
    <source srcSet={`${ROOT}-960.webp 960w, ${ROOT}-1280.webp 1280w, ${ROOT}-1672.webp 1672w`} sizes="100vw" />
    <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="" loading="lazy" decoding="async" width="1672" height="941" />
  </picture>;
}
