import { SignJWT, jwtVerify } from 'jose';

/**
 * Get the JWT signing key from the environment.
 * Uses ADMIN_TOKEN as the base, hashed to a proper key length.
 */
function getJWTSecret() {
  const secret = process.env.JWT_SECRET || process.env.ADMIN_TOKEN;
  if (!secret) {
    throw new Error('JWT_SECRET (or ADMIN_TOKEN) must be set');
  }
  return new TextEncoder().encode(secret);
}

/**
 * Create a signed JWT for an authenticated admin.
 *
 * @param {object} payload - claims to embed
 * @param {string} payload.email - admin email
 * @param {string} [payload.role] - admin role
 * @returns {Promise<string>} signed JWT string
 */
export async function createToken(payload) {
  const secret = getJWTSecret();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

/**
 * Verify and decode a JWT.
 *
 * @param {string} token - the JWT string
 * @returns {Promise<object|null>} decoded payload, or null on failure
 */
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const secret = getJWTSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}
