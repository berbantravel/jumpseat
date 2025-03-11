import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendSignUpEmail } from "./email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  let formData;
  try {
    // Ensure request JSON is parsed safely
    formData = await req.json();
  } catch (error) {
    console.error("❌ Failed to parse request JSON:", error);
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 });
  }

  try {
    // Validate required fields
    if (!formData.companyName || !formData.email || !formData.primaryContactTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Ensure `productsServices` is always a JSON string
    const payload = {
      ...formData,
      productsServices: JSON.stringify(formData.productsServices || []),
      primaryEmail: formData.primaryEmail || formData.email, // Ensure primaryEmail exists
      secondaryEmail: formData.secondaryEmail || null, // Ensure it's either a value or null
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

    console.log("✅ New company added:", newCompany);

    // Gather valid email recipients
    const recipients: string[] = [
      newCompany.email,
      newCompany.primaryEmail,
      newCompany.secondaryEmail,
    ].filter((email): email is string => Boolean(email));
    
    console.log("📩 Attempting to send email to:", recipients);

    // Send email notifications
    if (recipients.length > 0) {
      try {
        await Promise.all(
          recipients.map((to) =>
            sendSignUpEmail({
              to,
              userName: newCompany.primaryFirstName || "User",
            })
          )
        );
        console.log("✅ Emails sent successfully");
      } catch (emailError) {
        console.error("❌ Email failed but company was created:", emailError);
      }
    } else {
      console.warn("⚠ No valid email recipients found");
    }

    return NextResponse.json({ success: true, company: newCompany }, { status: 201 });

  } catch (error: any) {
    console.error("❌ Database operation failed:", {
      error: error.message,
      stack: error.stack,
      receivedData: formData,
    });

    return NextResponse.json({ error: "Database operation failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma connection is closed
  }
}

// 🛠️ DEBUG: Test email sending manually
export async function GET() {
  try {
    await sendSignUpEmail({ to: "yourtestemail@gmail.com", userName: "Test User" });
    return NextResponse.json({ success: true, message: "Test email sent!" });
  } catch (error: any) {
    console.error("❌ Test email failed:", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Unknown error" });
  }
}
