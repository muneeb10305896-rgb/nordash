import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['web-development', 'mobile-app', 'digital-marketing', 'branding', 'software'],
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    images: [String],
    technologies: [String],
    results: {
      metric: String,
      value: String,
    },
    testimonial: {
      quote: String,
      author: String,
      position: String,
    },
    caseStudy: String,
    featured: {
      type: Boolean,
      default: false,
    },
    url: String,
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'archived'],
      default: 'completed',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
