import { NextRequest, NextResponse } from "next/server";
import {
  sendOrderConfirmationEmail,
  sendAdminOrderNotification,
} from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const customerResult =
      await sendOrderConfirmationEmail(data);

    const adminResult =
      await sendAdminOrderNotification(data);

    return NextResponse.json({
      success: true,
      customerResult,
      adminResult,
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