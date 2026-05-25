import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(request) {
  try {
    console.log('[Applications] POST request received');

    await dbConnect();
    console.log('[Applications] Database connected');

    const data = await request.json();
    console.log('[Applications] Data received:', { name: data.name, email: data.email, position: data.position });

    if (!data.name || !data.email || !data.phone || !data.position) {
      console.error('[Applications] Missing required fields:', data);
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const application = await Application.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      linkedin: data.linkedin || '',
      position: data.position,
      positionId: data.positionId,
      cvFileName: data.cvFileName,
      coverLetterFileName: data.coverLetterFileName,
    });

    console.log(`[Applications] ✓ Saved application #${application._id} from ${data.name}`);

    return Response.json({ success: true, application }, { status: 200 });
  } catch (error) {
    console.error('[Applications] ✗ Error saving application:', error.message);
    console.error('[Applications] Full error:', error);
    return Response.json(
      { error: error.message || 'Failed to save application' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const applications = await Application.find().sort({ createdAt: -1 });
    console.log(`[Applications] Fetching list (${applications.length} applications)`);
    return Response.json({ applications }, { status: 200 });
  } catch (error) {
    console.error('[Applications] Error fetching applications:', error);
    return Response.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
