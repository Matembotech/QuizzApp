import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSchema: Schema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      match: [/^[a-zA-Z ]+$/, "Name must contain only letters and spaces"],
      minlength: [5, "Name must be at least 5 characters long"],
      maxlength: [20, "Name must be at most 20 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address",
      ],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      minlength: [5, "Subject must be at least 5 characters long"],
      maxlength: [100, "Subject must be at most 20 characters long"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [20, "Message must be at least 20 characters long"],
      maxlength: [500, "Message must be at most 500 characters"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IContact>("Contact", ContactSchema);
