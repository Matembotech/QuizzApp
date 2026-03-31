// components/Newsletter.tsx
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("duplicate");
      }
       else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-1">
      <h4 className="font-bold text-on-surface mb-6 font-display">
        Newsletter
      </h4>
      <div className="bg-surface-container-low p-6 rounded-2xl border-t-4 border-primary shadow-sm space-y-4 w-[100%] lg:w-[350px]">
        <h3 className="text-xl font-display font-bold text-on-surface leading-tight">
          Join Us
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Get the latest questions and answers when we update them
        </p>

        <form className="space-y-3" onSubmit={handleSubscribe}>
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ibrahimmaulid551@gmail.com"
              className="w-full px-4 py-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20 focus:outline-none focus:border-primary/40 transition-colors text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 gradient-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform duration-300 uppercase tracking-wider text-sm disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "loading" ? "Joining..." : "Join"}
          </button>
        </form>

        {status === "success" && (
          <p className="text-xs text-green-600 font-medium">
            ✅ Subscribed! Check your email.
          </p>
        )}
        {status === "duplicate" && (
          <p className="text-xs text-yellow-600 font-medium">
            ⚠️ Email already subscribed.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-500 font-medium">
            ❌ Something went wrong. Try again.
          </p>
        )}

        <p className="text-[10px] text-on-surface-variant italic opacity-70">
          No spam, we hate it more than you do.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;