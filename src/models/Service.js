import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
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
    longDescription: String,
    icon: String,
    category: {
      type: String,
      enum: ['development', 'marketing', 'design', 'strategy'],
      required: true,
    },
    features: [String],
    pricing: {
      starter: { name: String, price: Number, features: [String] },
      professional: { name: String, price: Number, features: [String] },
      enterprise: { name: String, price: String, features: [String] },
    },
    deliverables: [String],
    timeline: String,
    imageUrl: String,
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);
