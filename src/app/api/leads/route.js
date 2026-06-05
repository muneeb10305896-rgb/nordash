import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = {};
    if (status) query.status = status;

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    return Response.json({ leads }, { status: 200 });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return Response.json({ leads: [] }, { status: 200 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return Response.json(
        { error: 'Name and email required' },
        { status: 400 }
      );
    }

    const lead = new Lead({
      ...data,
      createdAt: new Date(),
    });

    await lead.save();

    return Response.json({ lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
