import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Allowed domains
const allowedOrigins = [
  "http://localhost:5173",
  "https://sharmasagarr.github.io/portfolio/",
];

export default async function handler(req, res) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { name, subject, email, message } = req.body;

    try {
      await resend.emails.send({
        from: `onboarding@resend.dev`,
        to: "sharmasagar01@outlook.com",
        subject: `Portfolio Contact Form: ${subject}`,
        text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
      });

      return res.status(200).json({ success: true, msg: "Message sent!" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
