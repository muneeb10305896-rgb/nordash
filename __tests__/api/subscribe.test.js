jest.mock('@/lib/mongodb', () => jest.fn().mockResolvedValue(null));
jest.mock('@/models/Subscriber', () => ({
  findOneAndUpdate: jest.fn().mockResolvedValue({}),
}));
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }) },
  })),
}));
jest.mock('@/lib/rateLimit', () => ({
  checkRateLimit: jest.fn(),
  getClientIP: jest.fn().mockReturnValue('127.0.0.1'),
}));

const { checkRateLimit } = require('@/lib/rateLimit');
const { POST } = require('@/app/api/subscribe/route');

const makeRequest = (body) =>
  new Request('http://localhost/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('POST /api/subscribe', () => {
  beforeEach(() => {
    checkRateLimit.mockReturnValue({ allowed: true, remaining: 4, resetIn: 300 });
  });

  it('returns 400 for missing email', async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid email', async () => {
    const res = await POST(makeRequest({ email: 'not-an-email' }));
    expect(res.status).toBe(400);
  });

  it('returns 429 when rate limited', async () => {
    checkRateLimit.mockReturnValue({ allowed: false, remaining: 0, resetIn: 120 });
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    expect(res.status).toBe(429);
  });

  it('returns 200 with valid email', async () => {
    const res = await POST(makeRequest({ email: 'test@example.com' }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
