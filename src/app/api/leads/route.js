import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { verifyAdminAuth } from '@/lib/apiUtils';

const ALLOWED_FIELDS = ['name', 'email', 'phone', 'country', 'company', 'message', 'serviceInterested', 'budget', 'timeline', 'status', 'notes', 'assignedTo', 'lastContact', 'followUpDate', 'source'];

function sanitize(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  return data;
}

export async function GET(request) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
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
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return Response.json(
        { error: 'Name and email required' },
        { status: 400 }
      );
    }

    const data = sanitize(body);
    data.createdAt = new Date();

    const lead = new Lead(data);
    await lead.save();

    return Response.json({ lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return Response.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
