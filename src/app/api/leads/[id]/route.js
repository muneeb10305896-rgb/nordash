import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { verifyAdminAuth } from '@/lib/apiUtils';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const lead = await Lead.findById(id);

    if (!lead) {
      return Response.json({ error: 'Lead not found' }, { status: 404 });
    }

    return Response.json({ lead }, { status: 200 });
  } catch (error) {
    console.error('Error fetching lead:', error);
    return Response.json({ error: 'Failed to fetch lead' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const data = await request.json();
    const lead = await Lead.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    if (!lead) {
      return Response.json({ error: 'Lead not found' }, { status: 404 });
    }

    return Response.json({ lead }, { status: 200 });
  } catch (error) {
    console.error('Error updating lead:', error);
    return Response.json({ error: error.message }, { status: 500 });
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
    await Lead.findByIdAndDelete(id);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
