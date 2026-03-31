// api/subscribe.ts (or Express route on your backend)
import { supabase } from "../lib/supabase";
import { sendWelcomeEmail } from "../lib/resend";

export const subscribeHandler = async (req: any, res: any) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Save to Supabase
  const { error } = await supabase
    .from("subscribers")
    .insert({ email });

  if (error) {
    // Handle duplicate email
    if (error.code === "23505") {
      return res.status(409).json({ message: "Already subscribed" });
    }
    return res.status(500).json({ message: "Subscription failed" });
  }

  // Send welcome email via Resend
  await sendWelcomeEmail(email);

  return res.status(200).json({ message: "Subscribed successfully" });
};