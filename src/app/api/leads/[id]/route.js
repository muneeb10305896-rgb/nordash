import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const lead = await Lead.findById(params.id);

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
  try {
    await dbConnect();
    const data = await request.json();
    const lead = await Lead.findByIdAndUpdate(params.id, data, { new: true });

    return Response.json({ lead }, { status: 200 });
  } catch (error) {
    console.error('Error updating lead:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    await Lead.findByIdAndDelete(params.id);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
