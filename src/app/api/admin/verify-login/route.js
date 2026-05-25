// Store valid login tokens
let validTokens = new Map();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Missing credentials' }, { status: 400 });
    }

    // Verify credentials with login API
    const loginResponse = await fetch(new URL('/api/admin/login', request.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!loginResponse.ok) {
      const data = await loginResponse.json();
      return Response.json({ error: data.error }, { status: 401 });
    }

    // Generate a session token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    validTokens.set(token, {
      email: email.toLowerCase(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    return Response.json({
      success: true,
      token,
      message: 'Login successful',
    });

  } catch (error) {
    console.error('Verify login error:', error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token || !validTokens.has(token)) {
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    const session = validTokens.get(token);

    // Check if token has expired
    if (Date.now() > session.expiresAt) {
      validTokens.delete(token);
      return Response.json({ error: 'Token expired' }, { status: 401 });
    }

    return Response.json({
      valid: true,
      email: session.email,
    });

  } catch (error) {
    console.error('Verify token error:', error);
    return Response.json({ error: 'Verification failed' }, { status: 500 });
  }
}
