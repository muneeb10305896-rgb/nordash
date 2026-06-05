'use client';

/**
 * Reusable skeleton loader with aurora shimmer effect.
 * Matches the NORDASH design system.
 */
export default function Skeleton({ width, height, borderRadius = 8, style }) {
  return (
    <div
      style={{
        width: width || '100%',
        height: height || 20,
        borderRadius,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s ease-in-out infinite',
        ...style,
      }}
    />
  );
}

/** Grid of skeleton cards — for Portfolio, Services, Team, Testimonials sections */
export function SkeletonGrid({ count = 4, columns = 4, cardHeight = 320 }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 24,
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          background: 'rgba(13,22,38,0.6)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 12,
          padding: 24,
          height: cardHeight,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <Skeleton width={48} height={48} borderRadius={10} />
          <Skeleton width="70%" height={22} />
          <Skeleton width="100%" height={14} />
          <Skeleton width="100%" height={14} />
          <Skeleton width="60%" height={14} />
          <div style={{ marginTop: 'auto' }}>
            <Skeleton width={80} height={12} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Inline text skeleton */
export function SkeletonText({ lines = 3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={i === lines - 1 ? '60%' : '100%'} height={14} />
      ))}
    </div>
  );
}
