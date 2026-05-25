// Shared reset token store for password recovery
let resetTokens = {};
let adminPasswords = {
  'muneeb10305896@gmail.com': process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'nordash2025',
};

export function createResetToken(email) {
  const token = require('crypto').randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

  resetTokens[token] = {
    email: email.toLowerCase(),
    expiresAt,
  };

  return token;
}

export function verifyResetToken(token) {
  if (!resetTokens[token]) {
    return { valid: false, error: 'Invalid or expired token' };
  }

  const { email, expiresAt } = resetTokens[token];

  if (Date.now() > expiresAt) {
    delete resetTokens[token];
    return { valid: false, error: 'Token has expired' };
  }

  return { valid: true, email };
}

export function updatePassword(token, email, newPassword) {
  const verification = verifyResetToken(token);

  if (!verification.valid) {
    return { success: false, error: verification.error };
  }

  if (verification.email !== email.toLowerCase()) {
    return { success: false, error: 'Email does not match token' };
  }

  adminPasswords[email.toLowerCase()] = newPassword;
  delete resetTokens[token];

  return { success: true, message: 'Password updated successfully' };
}

export function getAdminPassword(email) {
  return adminPasswords[email.toLowerCase()];
}

export function setAdminPassword(email, password) {
  adminPasswords[email.toLowerCase()] = password;
}

export function isAuthorizedAdmin(email) {
  return adminPasswords.hasOwnProperty(email.toLowerCase());
}

export function addAdminUser(email, password) {
  adminPasswords[email.toLowerCase()] = password;
}

export function getAllAdminEmails() {
  return Object.keys(adminPasswords);
}
