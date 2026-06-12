import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { verifyAdminAuth } from '@/lib/apiUtils';

// Default images for known portfolio slugs — used as fallback when DB records lack them
const DEFAULT_IMAGES = {
  'oktopus-group-social-media': 'https://i.ibb.co/YB2Wfnq7/Gemini-Generated-Image-mcimd7mcimd7mcim.png',
  'hovertise-agency-partnerships': 'https://i.ibb.co/LD0WR1RG/Gemini-Generated-Image-64ac664ac664ac66.png',
  'uef-social-media-content': 'https://i.ibb.co/whnXq2YT/Gemini-Generated-Image-3ssr8b3ssr8b3ssr.png',
  'fonezone-tiktok-ads': 'https://i.ibb.co/BHSsmP3j/Gemini-Generated-Image-f3scznf3scznf3sc.png',
};

const ALLOWED_FIELDS = ['title', 'slug', 'description', 'category', 'client', 'imageUrl', 'images', 'technologies', 'results', 'testimonial', 'caseStudy', 'featured', 'url', 'status'];

function sanitize(body) {
  const data = {};
  for (const field of ALLOWED_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  return data;
}

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

    // Force the correct imageUrl for known slugs — DB may have stale placeholders
    const enriched = projects.map(p => {
      const defaultImage = DEFAULT_IMAGES[p.slug];
      // Only overwrite if DB has no image or a placeholder — preserve real uploads
      if (defaultImage && (!p.imageUrl || p.imageUrl.includes('via.placeholder'))) {
        return { ...p.toObject(), imageUrl: defaultImage };
      }
      return p;
    });

    return Response.json({ projects: enriched }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ projects: [] }, { status: 200 });
  }
}

export async function POST(request) {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const body = await request.json();
    const data = sanitize(body);

    const project = new Project(data);
    await project.save();

    return Response.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return Response.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
