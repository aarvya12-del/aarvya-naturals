import { NextRequest, NextResponse } from "next/server";
import { sendOrderConfirmationEmail } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const result = await sendOrderConfirmationEmail(data);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Order email failed:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}