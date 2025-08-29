import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { name, email, subject, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
        service: "outlook", // or Outlook, Zoho, etc.
        auth: {
          user: process.env.EMAIL_USER, // from Vercel env vars
          pass: process.env.EMAIL_PASS, // Outlook App Password
        },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact Form: ${name} - ${subject}`,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
