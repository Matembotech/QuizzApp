// lib/resend.ts
//The /// <reference types="node" /> line forces TypeScript to load Node types for that specific file without needing to touch tsconfig.json.
/// <reference types="node" /> 
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string) => {
  await resend.emails.send({
    from: "QuizzApp <ibrahimmaulid551@gmail.com>",
    to: email,
    subject: "Welcome to QuizzApp! 🎉",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h1 style="color: #7C3AED;">Welcome to QuizzApp!</h1>
        <p>You're now subscribed. Get ready to test your knowledge and track your progress.</p>
        <a href="https://yourapp.com" 
           style="background: #7C3AED; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
          Start Quizzing
        </a>
        <p style="color: #888; font-size: 12px; margin-top: 24px;">
          © 2026 QuizzApp by Matembo Tech
        </p>
      </div>
    `,
  });
};