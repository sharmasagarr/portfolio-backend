// api/contact.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, subject, email, message } = req.body;

    try {
      await resend.emails.send({
        from: `Portfolio Contact <onboarding@resend.dev> - ${email}`,
        to: "sharmasagar01@outlook.com",
        subject: `Portfolio Contact Form: ${name} - ${subject}`,
        text: message,
      });

      return res.status(200).json({ success: true, msg: "Message sent!" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
