import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log('Received payment response:', data);

    // Process the payment data here if needed
    // You might want to update your database or perform other actions

    // Redirect to the payment-response page with the data as query parameters
    const searchParams = new URLSearchParams(data as Record<string, string>);
    return NextResponse.redirect(`${request.nextUrl.origin}/payment-response?${searchParams.toString()}`, 303);
  } catch (error) {
    console.error('Error processing payment response:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}