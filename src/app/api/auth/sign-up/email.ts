import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

interface SendEmailParams {
  to: string;
  userName?: string;
}

export const sendSignUpEmail = async ({ to, userName }: SendEmailParams) => {
  try {
    const siteUrl = "https://www.jumpseattours.com"; 
    const bannerImage = `${siteUrl}/images/banner.jpg`;
    const images = Array.from({ length: 6 }, (_, i) => `${siteUrl}/images/image${i + 1}.jpg`);
    
    const mailOptions = {
      from: `Berban Travels <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Welcome to Berban Travels – Your Partner in Travel!',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; max-width: 600px; margin: 0 auto;">
         
          <!-- Welcome Message -->
          <h1 style="color: #d32f2f; font-size: 24px;">Thank You for Signing Up and Becoming Our Partner!</h1>
          <p style="font-size: 16px; color: #333;">
            Welcome to <strong>Berban Travels</strong>! We’re excited to collaborate with you to bring the best travel deals. 
            Stay tuned for exclusive partner updates, rates, and promotions.
          </p>
          
          <!-- Navigation Buttons -->
          <div style="margin-bottom: 20px;">
            <a href="https://drive.google.com/drive/folders/1HlflrSVxjTb1GB5fbCo2s0wh0QgQYelO?usp=sharing" style="text-decoration: none; background-color: #d32f2f; color: white; padding: 12px 20px; border-radius: 6px; margin: 5px; display: inline-block;">WHAT’S NEW</a>

            <a href="https://berbantravel.com/who-we-are" style="text-decoration: none; background-color: #d32f2f; color: white; padding: 12px 20px; border-radius: 6px; margin: 5px; display: inline-block;">ABOUT US</a>

            <a href="https://berbantravel.com/boracay-activities/" style="text-decoration: none; background-color: #d32f2f; color: white; padding: 12px 20px; border-radius: 6px; margin: 5px; display: inline-block;">Our Activities</a>
          </div>


         <!-- Section Header -->
  <h2 style="color: #111827; font-size: 22px; font-weight: bold; margin-bottom: 10px;">
    Access Exclusive Partner Marketing Assets & E-SIM Offers!
  </h2>
  <p style="font-size: 14px; color: #555;">
    As a valued partner of <strong>Berban Travels</strong>, you now have access to our latest 
    marketing assets, travel collaterals, and exclusive E-SIM offers to sell.  
    Get everything you need to promote and sell our UAE tours, transfers, and more!
  </p>

  <!-- CTA Buttons -->
  <div style="margin-top: 20px;">
    <a href="https://drive.google.com/drive/folders/1HlflrSVxjTb1GB5fbCo2s0wh0QgQYelO?usp=sharing" 
      style="text-decoration: none; background-color: #d32f2f; color: white; 
              padding: 14px 20px; border-radius: 6px; display: block; 
              width: 80%; margin: 10px auto; font-size: 16px; font-weight: bold;">
      Download Marketing Assets
    </a>

    <a href="" 
      style="text-decoration: none; background-color: #d32f2f; color: white; 
              padding: 14px 20px; border-radius: 6px; display: block; 
              width: 80%; margin: 10px auto; font-size: 16px; font-weight: bold;">
      Travel Packages
    </a>

    <a href="https://www.jumpseattours.com/e-sim" 
      style="text-decoration: none; background-color: #d32f2f; color: white; 
              padding: 14px 20px; border-radius: 6px; display: block; 
              width: 80%; margin: 10px auto; font-size: 16px; font-weight: bold;">
      Explore E-SIM Offers
    </a>

    <!-- Contact & Location Section -->
  <div style="text-align: center; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #111827; font-size: 22px; font-weight: bold; margin-top: 30px;">
      Visit Us or Get in Touch!
    </h2>
    <p style="font-size: 14px; color: #555;">
      Have questions or need assistance? Feel free to reach out to us or visit our office.
    </p>

    <!-- Office Addresses -->
    <div style="font-size: 14px; color: #333; margin-top: 20px;">
      <p style="font-weight: bold;">Main Office:</p>
      <p>Don Sergio, Barangay San Juan, San Carlos City, Pangasinan 2420, Philippines</p>

      <p style="font-weight: bold;">Drop by and visit us at:</p>
      <p>No. 15, Arellano St., Malasiqui 2421, Pangasinan, Philippines</p>

      <p style="font-weight: bold;">Write to us:</p>
      <p>Berban Travel and Tours Co, No. 15, Arellano St., Malasiqui 2421, Pangasinan, Philippines</p>
    </div>

    <!-- Contact Information -->
    <div style="margin-top: 20px;">
      <p style="font-size: 14px; font-weight: bold; color: #111827;">WhatsApp</p>
      <p style="font-size: 14px;">+63.995.015.8869</p>

      <p style="font-size: 14px; font-weight: bold; color: #111827;">Viber</p>
      <p style="font-size: 14px;">+63.918.746.6894</p>

      <p style="font-size: 14px; font-weight: bold; color: #111827;">KakaoTalk</p>
      <p style="font-size: 14px;">+63.918.746.6894</p>

      <p style="font-size: 14px; font-weight: bold; color: #111827; margin-top: 10px;">Email</p>
      <p style="font-size: 14px;">
        <a href="mailto:mabuhay@berbantravel.com" style="color: #d32f2f; text-decoration: none;">
          mabuhay@berbantravel.com
        </a>
      </p>
    </div>
  </div>
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
