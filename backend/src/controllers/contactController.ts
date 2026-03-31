import { Request, Response } from "express";
import Contact from "../models/contact";

export const createContact = async (req: Request, res: Response) => {
  try {
    const { fullname, email, subject, message } = req.body;

    if (!fullname || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = new Contact({
      fullname,
      email,
      subject,
      message,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Thank you for contacting us! We will get back to you soon.",
      data: contact,
    });
  } catch (error: any) {
    console.error("Create contact error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create contact",
      error: error.message,
    });
  }
};
