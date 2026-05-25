import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    bio: String,
    image: String,
    expertise: [String],
    social: {
      linkedin: String,
      twitter: String,
      github: String,
      portfolio: String,
    },
    email: String,
    joinDate: Date,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);
