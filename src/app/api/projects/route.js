import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { verifyAdminAuth } from '@/lib/apiUtils';

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const category = searchParams.get('category');

    let query = { status: 'completed' };
    if (featured) query.featured = true;
    if (category) query.category = category;

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .limit(featured ? 6 : 100);

    return Response.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ projects: [] }, { status: 200 });
  }
}

export async function POST(request) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const data = await request.json();

    const project = new Project(data);
    await project.save();

    return Response.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
