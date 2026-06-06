jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

const { cookies } = require('next/headers');
const { GET } = require('@/app/api/admin/session/route');

const makeCookieStore = (values = {}) => ({
  get: jest.fn((name) => (values[name] ? { value: values[name] } : undefined)),
});

describe('GET /api/admin/session', () => {
  beforeAll(() => { process.env.ADMIN_TOKEN = 'valid-token'; });
  afterAll(() => { delete process.env.ADMIN_TOKEN; });

  it('returns 401 when no token cookie is set', async () => {
    cookies.mockResolvedValue(makeCookieStore({}));
    const res = await GET();
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.authenticated).toBe(false);
  });

  it('returns 401 when token does not match', async () => {
    cookies.mockResolvedValue(makeCookieStore({ admin_token: 'wrong-token' }));
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it('returns 200 with authenticated true and email when token matches', async () => {
    cookies.mockResolvedValue(makeCookieStore({
      admin_token: 'valid-token',
      admin_email: 'admin@nordash.com',
    }));
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.authenticated).toBe(true);
    expect(body.email).toBe('admin@nordash.com');
  });
});
