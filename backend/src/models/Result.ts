// Result model - stores quiz results/scores for users
import mongoose, { Document, Schema } from 'mongoose';

// Interface for Result type definition
export interface IResult extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User who took the quiz
  score: number;                   // Number of correct answers
  totalQuestions: number;          // Total number of questions in the quiz
  date: Date;                      // Date when the quiz was completed (defaults to now)
  createdAt: Date;                 // Auto-generated: when result record was created
  updatedAt: Date;                 // Auto-generated: when result was last updated
}

// Result schema definition
const ResultSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',    // Reference to the User model
      required: [true, 'User reference is required'],
    },
    score: {
      type: Number,
      required: [true, 'Score is required'],
      min: [0, 'Score cannot be negative'],  // Prevent negative scores
    },
    totalQuestions: {
      type: Number,
      required: [true, 'Total questions is required'],
      min: [1, 'Must have at least 1 question'],
    },
    date: {
      type: Date,
      default: Date.now,  // Automatically set to current date/time if not provided
    },
  },
  {
    timestamps: true,  // Auto-add createdAt and updatedAt fields
  }
);

// Performance optimization: create compound index for faster queries
// This optimizes queries like: find results by userId sorted by date (descending)
ResultSchema.index({ userId: 1, date: -1 });

export default mongoose.model<IResult>('Result', ResultSchema);
