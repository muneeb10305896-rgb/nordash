import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import { verifyAdminAuth } from '@/lib/apiUtils';

export async function PUT(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();
    const member = await TeamMember.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!member) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ member }, { status: 200 });
  } catch (error) {
    console.error('Error updating team member:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    const member = await TeamMember.findByIdAndDelete(id);
    if (!member) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
