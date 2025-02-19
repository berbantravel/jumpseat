import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse JSON request body
    const { RefNo, Status } = body; // Extract response data

    if (Status === "1") { // Assuming "1" means success
      const iccid = req.cookies.get("ICCID")?.value || "No ICCID available";
      return NextResponse.redirect(new URL(`/success?iccid=${encodeURIComponent(iccid)}`, req.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/payment-failed", req.nextUrl));
    }
  } catch (error) {
    console.error("Payment Response Handling Error:", error);
    return NextResponse.redirect(new URL("/payment-failed", req.nextUrl));
  }
}
