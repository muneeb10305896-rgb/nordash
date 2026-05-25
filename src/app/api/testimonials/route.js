import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

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
    return Response.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const testimonial = new Testimonial(data);
    await testimonial.save();
    return Response.json({ testimonial }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
