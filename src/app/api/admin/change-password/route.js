import { verifyAdminAuth } from '@/lib/apiUtils';
import { changePassword } from '@/lib/adminAuth';

export async function PUT(request) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return Response.json({ error: 'New password must be at least 8 characters' }, { status: 400 });
    }

    // Always use the authenticated session's email — never trust the request body
    const result = await changePassword(auth.email, currentPassword, newPassword);
    if (!result.success) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json({ success: true, message: result.message });
  } catch (error) {
    console.error('Change password error:', error);
    return Response.json({ error: error.message || 'Failed to change password' }, { status: 500 });
  }
}
