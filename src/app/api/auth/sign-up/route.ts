import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { firstName, lastName, companyName, email, password, phoneNumber } = await req.json();

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        companyName,
        email,
        password: hashedPassword,
        phoneNumber,
        isVerified: false,
      },
    });

    // Email configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `Your Platform <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Our Platform! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ff9e39;">Welcome, ${firstName}!</h1>
          <p>Thank you for joining our B2B network. Here's what you can do next:</p>
          
          <a href="${process.env.NEXTAUTH_URL}/dashboard">
            <img src="${process.env.NEXTAUTH_URL}/images/welcome-banner.jpg" 
                 alt="Get Started" 
                 style="width: 100%; border-radius: 8px; margin: 20px 0;">
          </a>

          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXTAUTH_URL}/contact" 
               style="background-color: #ff9e39; color: white; padding: 12px 24px; 
                      border-radius: 5px; text-decoration: none; display: inline-block;">
              Contact Support
            </a>
          </div>

          <p style="margin-top: 30px; color: #666;">
            Need help? Visit our 
            <a href="${process.env.NEXTAUTH_URL}/help" style="color: #ff9e39;">
              help center
            </a>
          </p>
        </div>
      `,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Welcome email sent to ${email}`);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        { message: "User created but email failed to send" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "User registered successfully! Welcome email sent." },
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}