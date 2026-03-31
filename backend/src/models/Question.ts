// Question model - stores quiz questions linked to a module
import mongoose, { Document, Schema } from 'mongoose';

// Interface for Question type definition
export interface IQuestion extends Document {
  questionText: string;    // The actual question text
  options: string[];       // Array of possible answer choices (e.g., ['A', 'B', 'C', 'D'])
  correctAnswers: string[]; // Array of correct answers (subset of options, supports multiple correct)
  moduleId: mongoose.Types.ObjectId; // Reference to the Module this question belongs to
  createdAt: Date;         // Auto-generated: when question was created
  updatedAt: Date;         // Auto-generated: when question was last updated
}

// Question schema definition
const QuestionSchema: Schema = new Schema(
  {
    questionText: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,  // Remove whitespace from both ends
    },
    options: {
      type: [String],
      required: [true, 'Options are required'],
      validate: {
        validator: function (options: string[]) {
          return options.length >= 2 && options.length <= 4;  // Must have at least 2 options amd not exceed 4 (multiple choice)
        },
        message: 'At least 2 options are required',
      },
    },
    correctAnswers: {
      type: [String],
      required: [true, 'Correct answers are required'],
      validate: {
        validator: function (answers: string[]) {
          return answers.length > 0;  // Must have at least 1 correct answer
        },
        message: 'At least one correct answer is required',
      },
    },
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Module',  // Reference to the Module model
      required: [true, 'Module reference is required'],
    },
  },
  {
    timestamps: true,  // Auto-add createdAt and updatedAt fields
  }
);

// Custom validation: ensure all correctAnswers exist in the options array
QuestionSchema.pre('validate', function (next) {
  const doc = this as unknown as IQuestion;
  // Only run validation if both fields exist
  if (doc.options && doc.correctAnswers) {
    // Find any correct answers that are NOT in the options list
    const invalidAnswers = doc.correctAnswers.filter(
      (answer) => !doc.options.includes(answer)
    );

    if (invalidAnswers.length > 0) {
      // Fail validation if there are invalid correct answers
      next(new Error('Correct answers must be present in options'));
    } else {
      next();  // All good
    }
  } else {
    next();  // Skip validation if fields are missing (other validators will catch)
  }
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);
