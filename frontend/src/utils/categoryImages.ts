// Hardcoded representative thumbnail per category, until the backend
// exposes a real category image field.
const CATEGORY_IMAGE_MAP: Record<string, string> = {
    sweets: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=80&h=80&fit=crop',
    sweet: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=80&h=80&fit=crop',
    savouries: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=80&h=80&fit=crop',
    savoury: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=80&h=80&fit=crop',
    'dry fruit sweets': 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=80&h=80&fit=crop',
    'milk sweets': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=80&h=80&fit=crop',
    'gift boxes': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=80&h=80&fit=crop',
    'traditional sweets': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=80&h=80&fit=crop',
  };
  
  // Used if the primary image above fails to load.
  const FALLBACK_IMAGE_MAP: Record<string, string> = {
    sweets: 'https://images.unsplash.com/photo-1571877275904-4c243e6fc511?w=80&h=80&fit=crop',
    sweet: 'https://images.unsplash.com/photo-1571877275904-4c243e6fc511?w=80&h=80&fit=crop',
    savouries: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=80&h=80&fit=crop',
    savoury: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=80&h=80&fit=crop',
  };
  
  const DEFAULT_IMAGE =
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=80&h=80&fit=crop';
  
  export function getCategoryImage(categoryName: string): string {
    const key = categoryName.trim().toLowerCase();
    return CATEGORY_IMAGE_MAP[key] ?? DEFAULT_IMAGE;
  }
  
  export function getCategoryFallbackImage(categoryName: string): string {
    const key = categoryName.trim().toLowerCase();
    return FALLBACK_IMAGE_MAP[key] ?? DEFAULT_IMAGE;
  }