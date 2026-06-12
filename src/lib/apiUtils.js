import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';

export async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const payload = await verifyToken(token);
  return payload?.email ? payload : false;
}

export class APIError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

export function errorResponse(error, status = 500) {
  console.error('API Error:', error);
  // Never leak error details to the client — prevents stack trace exposure
  return Response.json(
    { error: 'An internal error occurred' },
    { status }
  );
}

export function successResponse(data, status = 200) {
  return Response.json(data, { status });
}
