import mongoose from 'mongoose';

const WishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    message: {
      type: String,
      required: [true, 'Please write your heartfelt wish'],
      trim: true,
      maxlength: [500, 'Wish message cannot exceed 500 characters'],
    },
    emoji: {
      type: String,
      default: '❤️',
      maxlength: 10,
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

export default mongoose.models.Wish || mongoose.model('Wish', WishSchema);
