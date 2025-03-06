import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface SendEmailParams {
  to: string;
  userName?: string;
}

export const sendSignUpEmail = async ({ to, userName }: SendEmailParams) => {
  try {
    const logoImage = "https://www.jumpseattours.com/images/berbanlogo.png";
    const bannerImage = `${process.env.NEXTAUTH_URL}/images/banner.jpg`;
    const images = Array.from({ length: 6 }, (_, i) => `${process.env.NEXTAUTH_URL}/images/image${i + 1}.jpg`);

    const mailOptions = {
      from: `Berban Travels <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Welcome to Berban Travels – Your Partner in Travel!',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; max-width: 600px; margin: 0 auto;">
          
          <!-- Logo -->
          <img src="${logoImage}" alt="Berban Logo" style=" max-width: 200px; margin-bottom: 20px;">
          
          <!-- Welcome Message -->
          <h1 style="color: #d32f2f; font-size: 24px;">Thank You for Signing Up and Becoming Our Partner!</h1>
          <p style="font-size: 16px; color: #333;">
            Welcome to <strong>Berban Travels</strong>! We’re excited to collaborate with you to bring the best travel deals. 
            Stay tuned for exclusive partner updates, rates, and promotions.
          </p>
          
          <!-- Navigation Buttons -->
          <div style="margin-bottom: 20px;">
            <a href="${process.env.NEXTAUTH_URL}/whats-new" style="text-decoration: none; background-color: #d32f2f; color: white; padding: 12px 20px; border-radius: 6px; margin: 5px; display: inline-block;">WHAT’S NEW</a>
            <a href="${process.env.NEXTAUTH_URL}/about-us" style="text-decoration: none; background-color: #d32f2f; color: white; padding: 12px 20px; border-radius: 6px; margin: 5px; display: inline-block;">ABOUT US</a>
            <a href="${process.env.NEXTAUTH_URL}/partner-now" style="text-decoration: none; background-color: #d32f2f; color: white; padding: 12px 20px; border-radius: 6px; margin: 5px; display: inline-block;">PARTNER NOW</a>
          </div>

          <!-- Banner Image -->
          <img src="${bannerImage}" alt="Berban Travels Banner" style="width: 100%; border-radius: 8px; margin-bottom: 20px;">

          <!-- Grid of Images -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-bottom: 20px;">
            ${images.map(img => `<img src="${img}" style="width: 100%; border-radius: 6px;">`).join('')}
          </div>

          <!-- Section Header -->
          <h2 style="color: #111827; font-size: 22px; font-weight: bold; margin-bottom: 10px;">Explore Our Latest Partner Toolkit & Rates!</h2>
          <p style="font-size: 14px; color: #555;">Get access to the latest UAE tour & transfer tariffs and explore our partner toolkit.</p>

          <!-- CTA Buttons -->
          <div style="margin-top: 20px;">
            <a href="${process.env.NEXTAUTH_URL}/uae-tour-tariff" style="text-decoration: none; background-color: #d32f2f; color: white; padding: 14px 20px; border-radius: 6px; display: block; width: 80%; margin: 10px auto; font-size: 16px; font-weight: bold;">UAE Tour Tariff Sheet</a>
            <a href="${process.env.NEXTAUTH_URL}/uae-transfer-tariff" style="text-decoration: none; background-color: #d32f2f; color: white; padding: 14px 20px; border-radius: 6px; display: block; width: 80%; margin: 10px auto; font-size: 16px; font-weight: bold;">UAE Transfer Tariff Sheet</a>
          </div>

          <!-- Footer -->
          <p style="font-size: 14px; color: #777; margin-top: 20px;">
            If you have any questions, feel free to contact us at <a href="mailto:${process.env.EMAIL_USER}" style="color: #d32f2f;">${process.env.EMAIL_USER}</a>.
          </p>

        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
    return true;
  } catch (error: any) {
    console.error("❌ Email sending failed:", error.message);
    return false;
  }
};
