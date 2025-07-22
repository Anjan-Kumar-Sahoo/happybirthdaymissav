// Image utility functions for slideshows

/**
 * Get image source with fallback to placeholder
 */
export const getImageSrc = (imagePath: string): string => {
  return imagePath;
};

/**
 * Handle image load error by showing a colored placeholder
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>, color: string = 'pink') => {
  const img = event.currentTarget;
  const placeholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23${color === 'pink' ? 'ec4899' : '10b981'}'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-family='Arial' font-size='14'%3EImage Loading...%3C/text%3E%3C/svg%3E`;
  img.src = placeholder;
};
