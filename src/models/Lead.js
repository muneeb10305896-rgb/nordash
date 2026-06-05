import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
    country: String,
    company: String,
    message: String,
    serviceInterested: {
      type: String,
    },
    budget: String,
    timeline: String,
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'proposal-sent', 'negotiating', 'won', 'lost'],
      default: 'new',
    },
    notes: String,
    assignedTo: String,
    lastContact: Date,
    followUpDate: Date,
    source: {
      type: String,
      enum: ['website', 'referral', 'social', 'email', 'phone', 'other'],
      default: 'website',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);
