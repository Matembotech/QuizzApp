// Module model - represents a course/module that contains questions
import mongoose, { Document, Schema } from 'mongoose';

// Interface for Module type definition
export interface IModule extends Document {
  yearOfStudy: number;   // Academic year (e.g., 1, 2, 3, 4)
  semester: string;      // Semester (I, II, III, IV, V, VI or 1-6)
  moduleName: string;    // Name of the module/course (unique)
  createdAt: Date;       // Auto-generated: when module was created
  updatedAt: Date;       // Auto-generated: when module was last updated
}

// Module schema definition
const ModuleSchema: Schema = new Schema(
  {
    yearOfStudy: {
      type: Number,
      required: [true, 'Year of study is required'],
      min: [1, 'Year must be at least 1'],  // Minimum value validation
    },
    semester: {
      type: String,
      required: [true, 'Semester is required'],
      enum: {
        values: ['I', 'II', 'III', 'IV', 'V', 'VI', '1', '2', '3', '4', '5', '6'],
        message: 'Semester must be a valid value (I, II, III, IV, V, VI or 1-6)',
      },  // Only allow specific semester values
    },
    moduleName: {
      type: String,
      required: [true, 'Module name is required'],
      trim: true,       // Remove whitespace from both ends
      unique: true,     // Ensures no duplicate module names
    },
  },
  {
    timestamps: true,    // Auto-add createdAt and updatedAt fields
  }
);

export default mongoose.model<IModule>('Module', ModuleSchema);
