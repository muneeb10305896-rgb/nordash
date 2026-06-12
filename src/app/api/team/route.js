import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { verifyAdminAuth } from '@/lib/apiUtils';

const ALLOWED_FIELDS = ['name', 'position', 'bio', 'image', 'expertise', 'social', 'email', 'joinDate', 'order'];

function sanitize(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  return data;
}

export async function GET(request) {
  try {
    await dbConnect();
    const members = await TeamMember.find({}).sort({ order: 1 });
    return Response.json({ members }, { status: 200 });
  } catch (error) {
    console.error('Error fetching team:', error);
    return Response.json({ members: [] }, { status: 200 });
  }
}

export async function POST(request) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const body = await request.json();
    const data = sanitize(body);
    const member = new TeamMember(data);
    await member.save();
    return Response.json({ member }, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return Response.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
