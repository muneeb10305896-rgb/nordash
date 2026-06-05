import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { verifyAdminAuth } from '@/lib/apiUtils';

export async function PUT(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!testimonial) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ testimonial }, { status: 200 });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
