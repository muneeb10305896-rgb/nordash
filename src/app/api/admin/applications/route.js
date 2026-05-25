// In-memory storage for applications (per Lambda instance)
// Note: This is ephemeral - applications are kept in memory during the function's lifetime
// For persistent storage, consider using a database like MongoDB, PostgreSQL, or Vercel KV
let applicationsList = [];
let isInitialized = false;

// Initialize applications list
function initializeApplications() {
  if (!isInitialized) {
    console.log('[Applications] Initializing in-memory store');
    applicationsList = [];
    isInitialized = true;
  }
}

export async function POST(request) {
  try {
    initializeApplications();

    const data = await request.json();

    if (!data.name || !data.email || !data.phone || !data.position) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const application = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      linkedin: data.linkedin || '',
      position: data.position,
      positionId: data.positionId,
      date: new Date().toISOString(),
    };

    // Add to beginning of list
    applicationsList.unshift(application);

    // Keep only last 100 applications
    if (applicationsList.length > 100) {
      applicationsList = applicationsList.slice(0, 100);
    }

    console.log(`[Applications] Saved application #${application.id} from ${data.name}`);

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
    initializeApplications();
    console.log(`[Applications] Fetching list (${applicationsList.length} applications)`);
    return Response.json({ applications: applicationsList }, { status: 200 });
  } catch (error) {
    console.error('[Applications] Error fetching applications:', error);
    return Response.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
