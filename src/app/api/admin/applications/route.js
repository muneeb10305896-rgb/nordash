import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';

export async function POST(request) {
  try {
    await dbConnect();

    const data = await request.json();

    if (!data.name || !data.email || !data.phone || !data.position) {
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

    console.log(`[Applications] Saved application from ${data.name}`);

    return Response.json({ success: true, application }, { status: 200 });
  } catch (error) {
    console.error('[Applications] Error saving application:', error);
    return Response.json(
      { error: 'Failed to save application' },
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
