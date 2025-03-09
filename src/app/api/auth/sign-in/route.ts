import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Find the company in the database
    const company = await prisma.company.findUnique({ where: { email } });

    if (!company || !company.companyPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, company.companyPassword);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: company.id, email: company.email }, JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
