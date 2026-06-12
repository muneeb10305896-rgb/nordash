import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { verifyAdminAuth } from '@/lib/apiUtils';
import mongoose from 'mongoose';

const ALLOWED_FIELDS = ['name', 'slug', 'description', 'longDescription', 'icon', 'category', 'features', 'pricing', 'deliverables', 'timeline', 'imageUrl', 'order', 'featured'];

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
    const service = await Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!service) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ service }, { status: 200 });
  } catch (error) {
    console.error('Error updating service:', error);
    return Response.json({ error: 'Failed to update service' }, { status: 500 });
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
    const service = await Service.findByIdAndDelete(id);
    if (!service) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting service:', error);
    return Response.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
