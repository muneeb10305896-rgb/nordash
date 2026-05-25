import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    position: String,
    company: String,
    image: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    order: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
