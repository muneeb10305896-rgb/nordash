import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { verifyAdminAuth } from '@/lib/apiUtils';

const ALLOWED_FIELDS = ['quote', 'author', 'position', 'company', 'image', 'rating', 'featured', 'approved', 'order'];

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

    let query = { approved: true };
    if (featured) query.featured = true;

    const testimonials = await Testimonial.find(query).sort({ order: 1 });
    return Response.json({ testimonials }, { status: 200 });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return Response.json({ testimonials: [] }, { status: 200 });
  }
}

export async function POST(request) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const body = await request.json();
    const data = sanitize(body);
    const testimonial = new Testimonial(data);
    await testimonial.save();
    return Response.json({ testimonial }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return Response.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
