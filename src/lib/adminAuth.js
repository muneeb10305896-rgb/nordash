import dbConnect from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';
import crypto from 'crypto';

const DEFAULT_ADMIN_EMAIL = 'muneeb10305896@gmail.com';
const DEFAULT_ADMIN_NAME = 'Muneeb';

/**
 * Ensure the default admin user exists in the database.
 * Called on first login attempt — creates the user with password from env vars.
 */
async function ensureDefaultAdmin() {
  await dbConnect();
  const existing = await AdminUser.findOne({ email: DEFAULT_ADMIN_EMAIL });
  if (!existing) {
    const password = process.env.ADMIN_TOKEN || process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'nordash2025';
    const admin = new AdminUser({
      email: DEFAULT_ADMIN_EMAIL,
      passwordHash: password, // pre-save hook will hash it
      name: DEFAULT_ADMIN_NAME,
      role: 'superadmin',
    });
    await admin.save();
    console.log('[adminAuth] Default admin user created');
    return admin;
  }
  return existing;
}

/**
 * Verify admin credentials. Returns { success, admin } or { success: false, error }.
 */
export async function verifyCredentials(email, password) {
  try {
    await ensureDefaultAdmin();
    const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return { success: false, error: 'Invalid email or password' };
    }
    const valid = await admin.comparePassword(password);
    if (!valid) {
      return { success: false, error: 'Invalid email or password' };
    }
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    return { success: true, admin };
  } catch (err) {
    console.error('[adminAuth] verifyCredentials error:', err);
    return { success: false, error: 'Authentication failed. Please try again.' };
  }
}

/**
 * Create a password reset token for an email.
 */
export async function createResetToken(email) {
  try {
    await ensureDefaultAdmin();
    const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return { success: false, error: 'No account found with that email.' };
    }
    const token = crypto.randomBytes(32).toString('hex');
    admin.resetToken = token;
    admin.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    await admin.save();
    return { success: true, token, email: admin.email };
  } catch (err) {
    console.error('[adminAuth] createResetToken error:', err);
    return { success: false, error: 'Failed to create reset token.' };
  }
}

/**
 * Verify a reset token.
 */
export async function verifyResetToken(token) {
  try {
    await dbConnect();
    const admin = await AdminUser.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });
    if (!admin) {
      return { valid: false, error: 'Invalid or expired reset token.' };
    }
    return { valid: true, email: admin.email };
  } catch (err) {
    console.error('[adminAuth] verifyResetToken error:', err);
    return { valid: false, error: 'Token verification failed.' };
  }
}

/**
 * Reset password using a valid reset token.
 */
export async function resetPassword(token, email, newPassword) {
  try {
    await dbConnect();
    const admin = await AdminUser.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
      email: email.toLowerCase().trim(),
    });
    if (!admin) {
      return { success: false, error: 'Invalid or expired reset token.' };
    }
    // Set plain password — pre-save hook will hash
    admin.passwordHash = newPassword;
    admin.resetToken = undefined;
    admin.resetTokenExpires = undefined;
    await admin.save();
    return { success: true, message: 'Password updated successfully.' };
  } catch (err) {
    console.error('[adminAuth] resetPassword error:', err);
    return { success: false, error: 'Password reset failed.' };
  }
}

/**
 * Change password (when already authenticated).
 */
export async function changePassword(email, currentPassword, newPassword) {
  try {
    await dbConnect();
    const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return { success: false, error: 'User not found.' };
    }
    const valid = await admin.comparePassword(currentPassword);
    if (!valid) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    admin.passwordHash = newPassword;
    await admin.save();
    return { success: true, message: 'Password changed successfully.' };
  } catch (err) {
    console.error('[adminAuth] changePassword error:', err);
    return { success: false, error: 'Password change failed.' };
  }
}

/**
 * Check if an email is a registered admin.
 */
export async function isAuthorizedAdmin(email) {
  try {
    await dbConnect();
    const count = await AdminUser.countDocuments({ email: email.toLowerCase().trim() });
    return count > 0;
  } catch {
    return false;
  }
}
