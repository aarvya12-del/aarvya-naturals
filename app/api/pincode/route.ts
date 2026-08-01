import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const pincode = searchParams.get("pincode");

    if (!pincode) {
      return NextResponse.json(
        {
          success: false,
          message: "Pincode is required.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid 6-digit pincode.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `India Post API returned ${response.status}`
      );
    }

    const data = await response.json();

    if (
      !Array.isArray(data) ||
      data.length === 0 ||
      data[0].Status !== "Success" ||
      !Array.isArray(data[0].PostOffice) ||
      data[0].PostOffice.length === 0
    ) {
      return NextResponse.json({
        success: false,
        message: "Invalid pincode.",
      });
    }

    const postOffices = data[0].PostOffice;

    const localities = [
      ...new Set(
        postOffices
          .map((office: any) => office.Name)
          .filter(Boolean)
      ),
    ].sort();

    return NextResponse.json({
      success: true,
      city: postOffices[0].District,
      state: postOffices[0].State,
      district: postOffices[0].District,
      localities,
      pincode,
    });
  } catch (error) {
    console.error("Pincode API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch pincode details.",
      },
      {
        status: 500,
      }
    );
  }
}