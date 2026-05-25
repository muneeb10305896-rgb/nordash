// Simple in-memory storage for applications
let applicationsList = [];

export async function POST(request) {
  try {
    const data = await request.json();

    const application = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      linkedin: data.linkedin,
      position: data.position,
      positionId: data.positionId,
      date: new Date().toISOString(),
    };

    applicationsList.unshift(application);

    // Keep only last 50 applications in memory
    if (applicationsList.length > 50) {
      applicationsList = applicationsList.slice(0, 50);
    }

    return Response.json({ success: true, application });
  } catch (error) {
    console.error('Error saving application:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    return Response.json({ applications: applicationsList });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
