import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';

export async function GET(request) {
  try {
    await dbConnect();
    const members = await TeamMember.find({}).sort({ order: 1 });
    return Response.json({ members }, { status: 200 });
  } catch (error) {
    console.error('Error fetching team:', error);
    return Response.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const member = new TeamMember(data);
    await member.save();
    return Response.json({ member }, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
