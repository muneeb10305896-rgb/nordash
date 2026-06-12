import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { verifyAdminAuth } from '@/lib/apiUtils';
import mongoose from 'mongoose';

const ALLOWED_FIELDS = ['quote', 'author', 'position', 'company', 'image', 'rating', 'featured', 'approved', 'order'];

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
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!testimonial) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ testimonial }, { status: 200 });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return Response.json({ error: 'Failed to update testimonial' }, { status: 500 });
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
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return Response.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
