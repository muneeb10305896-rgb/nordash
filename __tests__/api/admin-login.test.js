jest.mock('@/lib/jwt', () => ({
  createToken: jest.fn(),
}));
jest.mock('@/lib/adminAuth', () => ({
  verifyCredentials: jest.fn(),
}));
jest.mock('@/lib/rateLimit', () => ({
  checkRateLimit: jest.fn(),
  getClientIP: jest.fn().mockReturnValue('127.0.0.1'),
}));

const { createToken } = require('@/lib/jwt');
const { verifyCredentials } = require('@/lib/adminAuth');
const { checkRateLimit } = require('@/lib/rateLimit');
const { POST } = require('@/app/api/admin/login/route');

const makeRequest = (body) =>
  new Request('http://localhost/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('POST /api/admin/login', () => {
  beforeEach(() => {
    checkRateLimit.mockReturnValue({ allowed: true, remaining: 4, resetIn: 60 });
    createToken.mockResolvedValue('signed-jwt-token-value');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 when email or password is missing', async () => {
    verifyCredentials.mockResolvedValue({ success: true, admin: { email: 'a@b.com' } });
    const res = await POST(makeRequest({ email: 'a@b.com' }));
    expect(res.status).toBe(400);
  });

  it('returns 429 when rate limited', async () => {
    checkRateLimit.mockReturnValue({ allowed: false, remaining: 0, resetIn: 55 });
    const res = await POST(makeRequest({ email: 'a@b.com', password: 'pass' }));
    expect(res.status).toBe(429);
  });

  it('returns 401 for invalid credentials', async () => {
    verifyCredentials.mockResolvedValue({ success: false, error: 'Invalid email or password' });
    const res = await POST(makeRequest({ email: 'a@b.com', password: 'wrong' }));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe('Invalid email or password');
  });

  it('returns 200 and sets httpOnly JWT cookie for valid credentials', async () => {
    verifyCredentials.mockResolvedValue({ success: true, admin: { email: 'admin@nordash.com', name: 'Admin' } });
    const res = await POST(makeRequest({ email: 'admin@nordash.com', password: 'correct' }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.email).toBe('admin@nordash.com');
    // Confirm a signed JWT was created with the admin's info
    expect(createToken).toHaveBeenCalledWith({
      email: 'admin@nordash.com',
      role: 'admin',
    });

    const setCookie = res.headers.get('set-cookie');
    expect(setCookie).toMatch(/admin_token/);
    expect(setCookie).toMatch(/HttpOnly/i);
    // Cookie value is a JWT, NOT the raw ADMIN_TOKEN
    expect(setCookie).toContain('signed-jwt-token-value');
  });
});
