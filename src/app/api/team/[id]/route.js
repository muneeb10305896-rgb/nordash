import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { verifyAdminAuth } from '@/lib/apiUtils';
import mongoose from 'mongoose';

const ALLOWED_FIELDS = ['name', 'position', 'bio', 'image', 'expertise', 'social', 'email', 'joinDate', 'order'];

function sanitize(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  return data;
}

export async function PUT(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const body = await request.json();
    const data = sanitize(body);
    const member = await TeamMember.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!member) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ member }, { status: 200 });
  } catch (error) {
    console.error('Error updating team member:', error);
    return Response.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const member = await TeamMember.findByIdAndDelete(id);
    if (!member) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return Response.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
