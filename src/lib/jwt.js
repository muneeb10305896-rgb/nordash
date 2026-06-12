import { SignJWT, jwtVerify } from 'jose';

/**
 * Get the JWT signing key from the environment.
 * Requires JWT_SECRET — does NOT fall back to ADMIN_TOKEN to avoid
 * using the admin password as a cryptographic signing key.
 */
function getJWTSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      'JWT_SECRET environment variable is required. '
      + 'Set a unique, random string in .env.local (do NOT reuse ADMIN_TOKEN).'
    );
  }
  if (secret.length < 16) {
    throw new Error(
      'JWT_SECRET must be at least 16 characters long. '
      + 'Generate a random string with: openssl rand -hex 32'
    );
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
