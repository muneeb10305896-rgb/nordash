import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { dirname } from 'path';

const getStoragePath = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/tmp/applications.json';
  }
  return join(process.cwd(), '.data', 'applications.json');
};

const getApplicationsList = async () => {
  try {
    const path = getStoragePath();
    const data = await readFile(path, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, return empty array
    return [];
  }
};

const saveApplicationsList = async (list) => {
  try {
    const path = getStoragePath();
    const dir = dirname(path);

    // Ensure directory exists
    try {
      await mkdir(dir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Keep only last 100 applications
    const filtered = list.slice(0, 100);
    await writeFile(path, JSON.stringify(filtered, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving to file:', error);
    throw error;
  }
};

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

    const applicationsList = await getApplicationsList();
    applicationsList.unshift(application);
    await saveApplicationsList(applicationsList);

    return Response.json({ success: true, application });
  } catch (error) {
    console.error('Error saving application:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const applicationsList = await getApplicationsList();
    return Response.json({ applications: applicationsList });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
