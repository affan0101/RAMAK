/** Local AI-generated demonstration assets; never hotlinked. */
export function ResponsiveImage({ large, small, width = 1440, height = 960, alt = '', className = '', priority = false, sizes = '(max-width: 700px) 92vw, (max-width: 1100px) 80vw, 40vw' }) {
  return <img className={`scene-art ${className}`} src={large}
    srcSet={small ? `${small} 640w, ${large} ${width}w` : undefined} sizes={sizes}
    alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
}
