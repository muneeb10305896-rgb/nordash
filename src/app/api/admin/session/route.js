import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const email = cookieStore.get('admin_email')?.value;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!token || !adminToken || token !== adminToken) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  return Response.json({ authenticated: true, email: email || '' });
}
