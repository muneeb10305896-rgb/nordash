import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { verifyAdminAuth } from '@/lib/apiUtils';

export async function PUT(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();
    const service = await Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!service) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ service }, { status: 200 });
  } catch (error) {
    console.error('Error updating service:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting service:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
