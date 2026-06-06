import { cookies } from 'next/headers';

export async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const adminToken = process.env.ADMIN_TOKEN;
  if (!token || token !== adminToken) {
    return false;
  }
  return true;
}

export class APIError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

export function errorResponse(error, status = 500) {
  console.error('API Error:', error);
  return Response.json(
    { error: error.message || 'An error occurred' },
    { status }
  );
}

export function successResponse(data, status = 200) {
  return Response.json(data, { status });
}
