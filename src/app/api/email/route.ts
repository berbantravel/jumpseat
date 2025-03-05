import { NextResponse } from 'next/server';
import { sendInquiryEmails } from '@/lib/email/senders/inquiry';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const result = await sendInquiryEmails(email);

    return NextResponse.json(
      { success: result },
      { status: result ? 200 : 500 }
    );
    
  } catch (error) {
    console.error('Email route error:', error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}