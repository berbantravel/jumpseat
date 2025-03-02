import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, code: string) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // App password or email password
    },
  });

  await transporter.sendMail({
    from: '"Your App" <no-reply@yourapp.com>',
    to: email,
    subject: "Verify Your Email",
    text: `Your verification code is: ${code}`,
  });
}
