import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { verifyAdminAuth } from '@/lib/apiUtils';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    let query = {};
    if (featured) query.featured = true;

    const services = await Service.find(query).sort({ order: 1 });
    return Response.json({ services }, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return Response.json({ services: [] }, { status: 200 });
  }
}

export async function POST(request) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const data = await request.json();
    const service = new Service(data);
    await service.save();
    return Response.json({ service }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
