import { getAdminPassword, isAuthorizedAdmin, setAdminPassword } from '@/lib/resetTokenStore';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    // Check if email is registered
    if (!isAuthorizedAdmin(normalizedEmail)) {
      return Response.json({
        error: 'Email not found. Please contact Muneeb to register.',
      }, { status: 401 });
    }

    // Verify password
    const storedPassword = getAdminPassword(normalizedEmail);

    if (storedPassword !== password) {
      return Response.json({
        error: 'Invalid password. Please try again or reset your password.',
      }, { status: 401 });
    }

    return Response.json({
      success: true,
      message: 'Login successful',
      email: normalizedEmail,
      token: storedPassword,
    });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}

// Update password
export async function PUT(request) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    if (!isAuthorizedAdmin(normalizedEmail)) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    setAdminPassword(normalizedEmail, newPassword);

    return Response.json({
      success: true,
      message: 'Password updated successfully',
    });

  } catch (error) {
    console.error('Update password error:', error);
    return Response.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
