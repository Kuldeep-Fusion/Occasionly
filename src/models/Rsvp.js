import mongoose from 'mongoose';

const RsvpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    attending: {
      type: String,
      enum: ['attending', 'declined'],
      default: 'attending',
    },
    guestsCount: {
      type: Number,
      default: 1,
      min: [1, 'At least 1 guest required'],
      max: [10, 'Maximum 10 guests permitted per RSVP'],
    },
    dietary: {
      type: [String],
      default: [],
    },
    dietaryNotes: {
      type: String,
      default: '',
      trim: true,
      maxlength: [300, 'Notes cannot exceed 300 characters'],
    },
    songRequest: {
      type: String,
      default: '',
      trim: true,
      maxlength: [150, 'Song title cannot exceed 150 characters'],
    },
    message: {
      type: String,
      default: '',
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Rsvp || mongoose.model('Rsvp', RsvpSchema);
