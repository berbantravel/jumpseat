import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const payload = Object.fromEntries(body.entries());

    const { RefNo, Status } = payload; // Extract response data

    if (Status === "1") { // Assuming "1" means success
      const iccid = request.cookies.get("ICCID")?.value || "No ICCID available";
      return NextResponse.redirect(new URL(`/success?iccid=${encodeURIComponent(iccid)}`, request.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/payment-failed", request.nextUrl));
    }

  } catch (error) {
    console.error('Error processing payment response:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
