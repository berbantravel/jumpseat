import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendSignUpEmail } from "./email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    // Validate required fields
    if (!formData.companyName || !formData.email || !formData.primaryContactTitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure `productsServices` is always an array
    const payload = {
      ...formData,
      productsServices: JSON.stringify(formData.productsServices || []),
    };

    // Save to database
    const newCompany = await prisma.company.create({
      data: {
        ...payload,
        primaryContactTitle: payload.primaryContactTitle,
        primaryContactOther: payload.primaryContactOther || null,
        companyTypeOther: payload.companyTypeOther || null,
      },
    });

    // Gather emails, filter out null values, and ensure they are strings
    const recipients: string[] = [newCompany.email, newCompany.primaryEmail, newCompany.secondaryEmail]
      .filter((email): email is string => Boolean(email));

    // Send email to all valid addresses
    try {
      await Promise.all(
        recipients.map((to) =>
          sendSignUpEmail({
            to,
            userName: newCompany.primaryFirstName,
          })
        )
      );
    } catch (emailError) {
      console.error("Email failed but company created:", emailError);
    }

    return NextResponse.json({ success: true, company: newCompany }, { status: 201 });

  } catch (error: any) {
    console.error("FULL ERROR DETAILS:", {
      error: error.message,
      stack: error.stack,
      receivedData: await req.json(),
    });
    return NextResponse.json(
      { error: "Database operation failed" },
      { status: 500 }
    );
  }
}
