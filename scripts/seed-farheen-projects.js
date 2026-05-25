import dbConnect from '../src/lib/mongodb.js';
import Project from '../src/models/Project.js';

const projects = [
  {
    title: "Social Media Marketing Strategy & Campaign Management",
    slug: "oktopus-group-social-media",
    description: "Comprehensive social media marketing strategy development and execution across multiple platforms. Managed day-to-day social media channels (LinkedIn, Facebook, Twitter, Instagram, YouTube), developed data-driven media plans, monitored ad campaigns, and optimized spending allocation. Provided coaching and support to management trainees while tracking key performance metrics.",
    category: "digital-marketing",
    client: "Oktopus Group",
    imageUrl: "https://via.placeholder.com/400x300?text=Oktopus+Group",
    technologies: ["Facebook Ads", "Instagram Marketing", "LinkedIn Strategy", "YouTube", "Data Analytics", "CRM Tools"],
    results: {
      metric: "Campaign Optimization",
      value: "Improved ad spend efficiency and audience targeting across all channels"
    },
    featured: true,
    status: "completed"
  },
  {
    title: "Agency Partnership & Marketing Strategy Development",
    slug: "hovertise-agency-partnerships",
    description: "Led strategic partnerships with local advertising agencies and developed comprehensive marketing initiatives. Onboarded new agency partners, established positioning and marketing strategies, managed relationship communications, and provided creative direction for advertising campaigns.",
    category: "digital-marketing",
    client: "Hovertise",
    imageUrl: "https://via.placeholder.com/400x300?text=Hovertise",
    technologies: ["Strategic Planning", "Market Analysis", "Creative Direction", "Partnership Management"],
    results: {
      metric: "Partnership Success",
      value: "Successfully managed multiple agency partnerships"
    },
    featured: true,
    status: "completed"
  },
  {
    title: "Social Media Content Marketing for International Outreach",
    slug: "uef-social-media-content",
    description: "Designed and produced English-language social media content for TikTok and Instagram to promote University of Eastern Finland. Created short-form videos and reels targeting international students. Achieved 49.9% engagement growth, 31.6% reach increase, and 420K+ views.",
    category: "digital-marketing",
    client: "University of Eastern Finland",
    imageUrl: "https://via.placeholder.com/400x300?text=UEF",
    technologies: ["TikTok", "Instagram", "Video Production", "Content Creation", "Audience Growth"],
    results: {
      metric: "Content Performance",
      value: "49.9% engagement growth, 31.6% reach increase, 420K+ views"
    },
    featured: true,
    status: "completed"
  },
  {
    title: "TikTok Advertising Campaign Management & Optimization",
    slug: "fonezone-tiktok-ads",
    description: "Planned and executed TikTok advertising campaigns with strategic targeting and audience segmentation. Conducted A/B testing, managed advertising budgets, and prepared detailed performance reports with actionable insights for maximum ROI.",
    category: "digital-marketing",
    client: "FoneZone.Ae",
    imageUrl: "https://via.placeholder.com/400x300?text=FoneZone",
    technologies: ["TikTok Ads Manager", "Campaign Planning", "A/B Testing", "Budget Optimization", "Analytics"],
    results: {
      metric: "Campaign Performance",
      value: "Optimized ad delivery and audience targeting"
    },
    featured: true,
    status: "completed"
  }
];

async function seedProjects() {
  try {
    await dbConnect();
    console.log('Database connected...');

    for (const project of projects) {
      const existing = await Project.findOne({ slug: project.slug });
      if (existing) {
        console.log(`Project "${project.title}" already exists, skipping...`);
        continue;
      }

      const newProject = await Project.create(project);
      console.log(`✓ Added project: ${newProject.title}`);
    }

    console.log('\n✓ All projects seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();
