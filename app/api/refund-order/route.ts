export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { adminAuth } from "@/lib/firebaseAdmin";
import { ADMIN_EMAILS } from "@/config/admin";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    // 1. Verify the request actually comes from a logged-in admin.
    // This is the real security check — everything else in this
    // route assumes the caller is trustworthy BECAUSE of this step.
    const authHeader = req.headers.get("authorization");
    const idToken = authHeader?.replace("Bearer ", "");

    if (!idToken) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = await adminAuth.verifyIdToken(idToken);

    if (!decoded.email || !ADMIN_EMAILS.includes(decoded.email)) {
      return NextResponse.json(
        { success: false, message: "Not authorized" },
        { status: 403 }
      );
    }

    // 2. Now safe to process the refund.
    const { paymentId, amount, reason } = await req.json();

    if (!paymentId || !amount) {
      return NextResponse.json(
        { success: false, message: "Missing paymentId or amount" },
        { status: 400 }
      );
    }

    const refund = await razorpay.payments.refund(paymentId, {
      amount: Math.round(amount * 100), // paise
      notes: reason ? { reason } : undefined,
    });

    return NextResponse.json({ success: true, refund });
  } catch (error) {
    console.error("Refund Error:", error);

    return NextResponse.json(
      { success: false, message: "Refund failed. Check server logs." },
      { status: 500 }
    );
  }
}
