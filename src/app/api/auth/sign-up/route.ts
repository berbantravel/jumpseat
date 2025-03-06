import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sendSignUpEmail } from "./email"; // Import from local email.ts

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { firstName, lastName, companyName, email, password, phoneNumber } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    // Send email using the local email function
    const emailSent = await sendSignUpEmail({ to: email, userName: firstName });

    if (!emailSent) {
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
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
