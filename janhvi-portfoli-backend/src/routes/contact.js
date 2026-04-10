import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <h3>New message from your portfolio website</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await getTransporter().sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Email send failed:', err.message);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

export default router;
