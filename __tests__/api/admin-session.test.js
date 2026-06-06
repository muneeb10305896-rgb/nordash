jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));
jest.mock('@/lib/jwt', () => ({
  verifyToken: jest.fn(),
}));

const { cookies } = require('next/headers');
const { verifyToken } = require('@/lib/jwt');
const { GET } = require('@/app/api/admin/session/route');

const makeCookieStore = (values = {}) => ({
  get: jest.fn((name) => (values[name] ? { value: values[name] } : undefined)),
});

describe('GET /api/admin/session', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 401 when no token cookie is set', async () => {
    cookies.mockResolvedValue(makeCookieStore({}));
    const res = await GET();
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.authenticated).toBe(false);
  });

  it('returns 401 when JWT verification fails', async () => {
    verifyToken.mockResolvedValue(null);
    cookies.mockResolvedValue(makeCookieStore({ admin_token: 'tampered-or-expired-jwt' }));
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it('returns 200 with authenticated true and email when JWT is valid', async () => {
    verifyToken.mockResolvedValue({ email: 'admin@nordash.com', role: 'admin' });
    cookies.mockResolvedValue(makeCookieStore({ admin_token: 'valid-signed-jwt' }));
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.authenticated).toBe(true);
    expect(body.email).toBe('admin@nordash.com');
    expect(body.role).toBe('admin');
  });
});
