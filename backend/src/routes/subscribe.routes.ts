/// <reference types="node" />
import { Router, type Request, type Response } from "express";
import { supabase } from "../lib/supabase.js";
import { sendWelcomeEmail } from "../lib/resend.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  // Save to Supabase
  const { error } = await supabase.from("subscribers").insert({ email });

  if (error) {
    // Duplicate email
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "You are already subscribed",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Subscription failed. Please try again.",
    });
  }

  // Send welcome email
  await sendWelcomeEmail(email);

  return res.status(200).json({
    success: true,
    message: "Subscribed successfully",
  });
});

export default router;
