import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { verifyAdminAuth } from '@/lib/apiUtils';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const project = await Project.findById(id);

    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }

    return Response.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error);
    return Response.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();
    const project = await Project.findByIdAndUpdate(id, data, { new: true });

    return Response.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const { id } = await params;
    await Project.findByIdAndDelete(id);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
