// Topic-specific editorial artwork; illustrative rather than documentary evidence.
export function EditorialCover({ category, image, priority = false }: { category: string; image?: string; priority?: boolean }) {
  if (image) return <div className="editorial-cover editorial-cover--image"><img src={image} alt="" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" /></div>;
  if (category === 'brazil') return <div className="editorial-cover editorial-cover--brazil"><img src="/world-assets/saopaulo-interior-1280.webp" alt="" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} width="1280" height="720" /><span>São Paulo / Brasil</span></div>;
  return <div className={`editorial-cover editorial-cover--${category}`} aria-hidden="true"><div className="editorial-paper"><i /><i /><i /><i /><i /></div><span>Avante / Intelligence</span></div>;
}
