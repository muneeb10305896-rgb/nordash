import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { verifyAdminAuth } from '@/lib/apiUtils';

const ALLOWED_FIELDS = ['name', 'slug', 'description', 'longDescription', 'icon', 'category', 'features', 'pricing', 'deliverables', 'timeline', 'imageUrl', 'order', 'featured'];

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
    const body = await request.json();
    const data = sanitize(body);
    const service = new Service(data);
    await service.save();
    return Response.json({ service }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return Response.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
