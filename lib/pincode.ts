export interface PincodeResponse {
  success: boolean;
  localities?: string[];
  city?: string;
  state?: string;
  district?: string;
  pincode?: string;
  message?: string;
}

export async function lookupPincode(
  pincode: string
): Promise<PincodeResponse> {
  try {
    const response = await fetch(
      `/api/pincode?pincode=${encodeURIComponent(pincode)}`
    );

    const data: PincodeResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Pincode lookup failed:", error);

    return {
      success: false,
      message: "Unable to lookup pincode.",
    };
  }
}