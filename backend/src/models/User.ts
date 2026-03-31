// User model - stores registered user information
import mongoose, { Document, Schema } from "mongoose";

// Interface for User type definition
export interface IUser extends Document {
  name: string; // User's full name
  email: string; // User's email (unique, used for login)
  password: string; // Hashed password
  isAdmin: boolean; // Admin role flag - grants access to admin routes
  createdAt: Date; // Auto-generated: when user was created
  updatedAt: Date; // Auto-generated: when user was last updated
}

// User schema definition
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
      match: [/^[a-zA-Z\s]+$/, "Name must contain only letters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensures no duplicate emails
      lowercase: true, // Always store as lowercase
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"], // Email format validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 6 characters long"],
    },
    isAdmin: {
      type: Boolean,
      default: false, // By default, users are NOT admins
    },
  },
  {
    timestamps: true, // Auto-add createdAt and updatedAt fields
  },
);

export default mongoose.model<IUser>("User", UserSchema);
