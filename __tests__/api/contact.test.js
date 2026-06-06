jest.mock('@/lib/mongodb', () => jest.fn().mockResolvedValue(null));
jest.mock('@/models/Lead', () => ({ create: jest.fn().mockResolvedValue({}) }));
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
const { POST } = require('@/app/api/contact/route');

const makeRequest = (body) =>
  new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('POST /api/contact', () => {
  beforeEach(() => {
    checkRateLimit.mockReturnValue({ allowed: true, remaining: 2, resetIn: 60 });
  });

  it('returns 400 when required fields are missing', async () => {
    const res = await POST(makeRequest({ name: 'Test Only' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it('returns 429 when rate limited', async () => {
    checkRateLimit.mockReturnValue({ allowed: false, remaining: 0, resetIn: 30 });
    const res = await POST(makeRequest({ name: 'Test', email: 'a@b.com', phone: '123', country: 'US' }));
    expect(res.status).toBe(429);
  });

  it('returns 200 with valid data', async () => {
    const res = await POST(makeRequest({ name: 'Test', email: 'a@b.com', phone: '123', country: 'US' }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it('returns 200 for book-call type', async () => {
    const res = await POST(makeRequest({ type: 'book-call', name: 'Test', email: 'a@b.com', phone: '123', country: 'US' }));
    expect(res.status).toBe(200);
  });
});
