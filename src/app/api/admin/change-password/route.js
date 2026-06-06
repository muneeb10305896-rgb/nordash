import { verifyAdminAuth } from '@/lib/apiUtils';
import { changePassword } from '@/lib/adminAuth';

export async function PUT(request) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { email, currentPassword, newPassword } = await request.json();

    if (!email || !currentPassword || !newPassword) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return Response.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const result = await changePassword(email, currentPassword, newPassword);
    if (!result.success) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json({ success: true, message: result.message });
  } catch (error) {
    console.error('Change password error:', error);
    return Response.json({ error: error.message || 'Failed to change password' }, { status: 500 });
  }
}
