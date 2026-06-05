/**
 * Simple in-memory rate limiter.
 * Works per-instance (Vercel serverless — resets on cold starts).
 * Provides basic brute-force protection.
 */
const stores = {};

// Clean up expired entries every 60 seconds
setInterval(() => {
  const now = Date.now();
  for (const key of Object.keys(stores)) {
    const store = stores[key];
    for (const [ip, entry] of store.entries()) {
      if (now > entry.resetAt) store.delete(ip);
    }
    if (store.size === 0) delete stores[key];
  }
}, 60000);

/**
 * Check if a request is rate limited.
 * @param {string} key - Unique key for this rate limit (e.g. 'login', 'contact')
 * @param {string} ip - IP address to track
 * @param {number} maxAttempts - Max allowed attempts in the window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {{ allowed: boolean, remaining: number, resetIn: number }}
 */
export function checkRateLimit(key, ip, maxAttempts = 5, windowMs = 60000) {
  if (!stores[key]) {
    stores[key] = new Map();
  }
  const store = stores[key];
  const now = Date.now();

  let entry = store.get(ip);
  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(ip, entry);
    return { allowed: true, remaining: maxAttempts - 1, resetIn: windowMs / 1000 };
  }

  entry.count++;
  if (entry.count > maxAttempts) {
    return { allowed: false, remaining: 0, resetIn: Math.ceil((entry.resetAt - now) / 1000) };
  }

  return { allowed: true, remaining: maxAttempts - entry.count, resetIn: Math.ceil((entry.resetAt - now) / 1000) };
}

/**
 * Get client IP from request headers.
 */
export function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;
  return '127.0.0.1';
}
