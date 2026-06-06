import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import TeamMember from '@/models/TeamMember';
import Testimonial from '@/models/Testimonial';
import AdminUser from '@/models/AdminUser';
import { verifyAdminAuth } from '@/lib/apiUtils';

// All existing data from the frontend components
const DEFAULT_SERVICES = [
  { name: 'Video Editing', slug: 'video-editing', description: 'Cinematic cuts, colour grading, motion graphics and reels that stop the scroll and demand a second watch.', icon: 'video', category: 'design', order: 1, featured: true },
  { name: 'Thumbnail Design', slug: 'thumbnail-design', description: 'High-CTR thumbnails engineered with visual psychology, contrast and hierarchy that compel the click.', icon: 'image', category: 'design', order: 2, featured: true },
  { name: 'Social Media Marketing', slug: 'social-media-marketing', description: 'Strategy, content, paid campaigns and growth systems that turn followers into customers at scale.', icon: 'chart', category: 'marketing', order: 3, featured: true },
  { name: 'Software Development', slug: 'software-development', description: 'Web apps, SaaS platforms and mobile solutions built with modern stacks — performant, scalable, beautiful.', icon: 'code', category: 'development', order: 4, featured: true },
  { name: 'Brand Strategy', slug: 'brand-strategy', description: 'Identity systems, positioning, messaging frameworks and visual languages that make your brand unforgettable.', icon: 'target', category: 'strategy', order: 5, featured: false },
  { name: 'UI / UX Design', slug: 'ui-ux-design', description: 'Pixel-perfect interfaces and frictionless experiences grounded in research, logic, and delight.', icon: 'layout', category: 'design', order: 6, featured: false },
  { name: 'SEO & Content Strategy', slug: 'seo-content-strategy', description: 'Search optimization, keyword research, content calendars and growth systems that drive organic traffic and rankings.', icon: 'search', category: 'marketing', order: 7, featured: false },
  { name: 'Mobile App Development', slug: 'mobile-app-development', description: 'Native and cross-platform apps for iOS and Android. Fast, beautiful, and built to convert users into loyal customers.', icon: 'smartphone', category: 'development', order: 8, featured: false },
];

const DEFAULT_TEAM = [
  { name: 'Muneeb Ahmed Butt', position: 'Full Stack Developer', bio: 'IT student at University of Eastern Finland, blending Nordic precision with Asian energy to create digital solutions that convert.', image: 'https://i.ibb.co/mr8TRzwZ/PROFILE.jpg', expertise: ['Video Editing', 'UI/UX Design', 'Web Development', 'Brand Strategy', 'Digital Marketing'], social: { linkedin: 'https://www.linkedin.com/in/muneeb-ahmed-butt-4a384438a/', github: 'https://github.com/muneeb10305896-rgb' }, order: 1 },
  { name: 'Farheen E Sehar', position: 'Marketing Manager', bio: 'Versatile marketing professional with rich experience in social media strategy, content creation, and digital campaign management across B2C and B2B sectors.', image: 'https://i.ibb.co/Z6hKMn6B/1762450046043.jpg', expertise: ['Social Media Marketing', 'Content Creation', 'Digital Marketing', 'Brand Strategy', 'Campaign Management'], social: { linkedin: 'https://www.linkedin.com/in/farheen-e-sehar-8b0868177/' }, order: 2 },
];

const DEFAULT_TESTIMONIALS = [
  { quote: 'NORDASH transformed our digital presence completely. The video content and social strategy they delivered exceeded every expectation.', author: 'Ahmed Khan', position: 'CEO', company: 'Oktopus Group', rating: 5, featured: true, approved: true, order: 1 },
  { quote: 'Professional, creative, and incredibly responsive. The team understood our vision from day one and delivered results that actually moved the needle.', author: 'Sarah Lindström', position: 'Marketing Director', company: 'Nordic Brands', rating: 5, featured: true, approved: true, order: 2 },
  { quote: 'The thumbnail designs they created boosted our CTR by over 40%. Technical skill combined with genuine creative insight — rare to find both.', author: 'Marcus Virtanen', position: 'Content Creator', company: 'Independent', rating: 5, featured: false, approved: true, order: 3 },
];

export async function GET() {
  return Response.json({ error: 'Use POST to seed the database' }, { status: 405 });
}
export async function POST() { return handleSeed(); }

async function handleSeed() {
  if (!(await verifyAdminAuth())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await dbConnect();
    const results = { services: 0, team: 0, testimonials: 0, admin: false };

    // Seed admin user
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      const password = process.env.ADMIN_TOKEN;
      if (!password) {
        return Response.json({ error: 'ADMIN_TOKEN is not set — cannot seed default admin password' }, { status: 500 });
      }
      await AdminUser.create({
        email: 'muneeb10305896@gmail.com',
        passwordHash: password, // pre-save hook hashes it
        name: 'Muneeb',
        role: 'superadmin',
      });
      results.admin = true;
    }

    // Seed services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(DEFAULT_SERVICES);
      results.services = DEFAULT_SERVICES.length;
    }

    // Seed team
    const teamCount = await TeamMember.countDocuments();
    if (teamCount === 0) {
      await TeamMember.insertMany(DEFAULT_TEAM);
      results.team = DEFAULT_TEAM.length;
    }

    // Seed testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany(DEFAULT_TESTIMONIALS);
      results.testimonials = DEFAULT_TESTIMONIALS.length;
    }

    return Response.json({ success: true, seeded: results, message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
