import { SHIPPING_ZONES } from "@/config/shippingZones";

export type ShippingResult = {
  zone: string;
  charge: number;
  estimatedDays: string;
};

export function calculateShipping(
  state: string,
  city?: string
): ShippingResult {

  // Coimbatore Special Rate
  if (
    city?.trim().toLowerCase() === "coimbatore"
  ) {
    const zone = SHIPPING_ZONES.find(
      (z) => z.id === "coimbatore"
    )!;

    return {
      zone: zone.name,
      charge: zone.charge,
      estimatedDays: zone.estimatedDays,
    };
  }

  // Match State
  const zone = SHIPPING_ZONES.find((z) =>
    z.states.includes(state)
  );

  if (zone) {
    return {
      zone: zone.name,
      charge: zone.charge,
      estimatedDays: zone.estimatedDays,
    };
  }

  // Default
  const rest = SHIPPING_ZONES.find(
    (z) => z.id === "rest-of-india"
  )!;

  return {
    zone: rest.name,
    charge: rest.charge,
    estimatedDays: rest.estimatedDays,
  };
}