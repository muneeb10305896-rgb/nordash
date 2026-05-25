import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const project = await Project.findById(params.id);

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
  try {
    await dbConnect();
    const data = await request.json();
    const project = await Project.findByIdAndUpdate(params.id, data, { new: true });

    return Response.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    await Project.findByIdAndDelete(params.id);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
