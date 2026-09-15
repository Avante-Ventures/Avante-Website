import { COMPACT_QUERY, ENHANCED_QUERY } from './journey.mjs';

const ROOT = '/world-assets/saopaulo-flight';

// The mobile crop keeps the real bridge at phone resolution, without a 4K download.
export function CityPicture({ className, alt = '', priority = false, opening = false }: { className?: string; alt?: string; priority?: boolean; opening?: boolean }) {
  return <picture className="city-picture">
    {/* Match the first 3D frame before React effects, WebGL or map data are ready. */}
    {opening && <source media={COMPACT_QUERY} srcSet="/world-assets/globe-opening-mobile.webp" />}
    {opening && <source media={ENHANCED_QUERY} srcSet="/world-assets/globe-opening.webp" />}
    <source media="(max-width: 599px) and (orientation: portrait)" srcSet={`${ROOT}-portrait-400.webp 400w, ${ROOT}-portrait-600.webp 600w`} sizes="100vw" />
    <source srcSet={`${ROOT}-1280.webp 1280w, ${ROOT}-1920.webp 1920w`} sizes="100vw" />
    {/* An inline fallback avoids Safari fetching a desktop image while React assembles the picture. */}
    <img className={className} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" width="1920" height="1080" alt={alt} src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
  </picture>;
}
