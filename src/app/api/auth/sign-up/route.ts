import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendSignUpEmail } from "./email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    
    // 1. Add explicit validation for required Prisma fields
    if (!formData.companyName || !formData.email || !formData.primaryContactTitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Fix JSON data handling
    const payload = {
      ...formData,
      productsServices: formData.productsServices || [], // Ensure array exists
    };

    // 3. Database operation with error handling
    const newCompany = await prisma.company.create({
      data: {
        ...payload,
        // Explicitly map all required fields
        primaryContactTitle: payload.primaryContactTitle,
        primaryContactOther: payload.primaryContactOther || null,
        companyTypeOther: payload.companyTypeOther || null,
      },
    });

    // 4. Email sending with error handling
    try {
      await sendSignUpEmail({
        to: newCompany.primaryEmail,
        userName: newCompany.primaryFirstName
      });
    } catch (emailError) {
      console.error("Email failed but company created:", emailError);
    }

    return NextResponse.json(newCompany, { status: 201 });

  } catch (error: any) {
    console.error("FULL ERROR DETAILS:", {
      error: error.message,
      stack: error.stack,
      receivedData: await req.json()
    });
    return NextResponse.json(
      { error: "Database operation failed" },
      { status: 500 }
    );
  }
}