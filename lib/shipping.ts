import { SHIPPING_ZONES } from "@/config/shippingZones";

import {
  FREE_DELIVERY_THRESHOLD,
  isBaseZone,
  isPreferredZone,
} from "@/config/freeDeliveryZones";

export type ShippingResult = {
  zone: string;
  charge: number;
  estimatedDays: string;

  freeDeliveryEligible: boolean;
  freeDeliveryUnlocked: boolean;

  freeDeliveryThreshold: number;

  amountRemaining: number;

  message: string;
};

export function calculateShipping(
  subtotal: number,
  state: string,
  city?: string,
  pincode?: string
): ShippingResult {

  const amountRemaining = Math.max(
    FREE_DELIVERY_THRESHOLD - subtotal,
    0
  );

  //---------------------------------------
  // BASE ZONE
  //---------------------------------------

  if (pincode && isBaseZone(pincode)) {

    const unlocked =
      subtotal >= FREE_DELIVERY_THRESHOLD;

    return {

      zone: "Base Delivery Zone",

      charge: unlocked ? 0 : 30,

      estimatedDays:
        "Same Day / Next Day",

      freeDeliveryEligible: true,

      freeDeliveryUnlocked: unlocked,

      freeDeliveryThreshold:
        FREE_DELIVERY_THRESHOLD,

      amountRemaining,

      message: unlocked
        ? "🎉 Congratulations! You've unlocked FREE Delivery."
        : `🎁 Add products worth ₹${amountRemaining} more to enjoy FREE Delivery.`,
    };
  }

  //---------------------------------------
  // PREFERRED ZONE
  //---------------------------------------

  if (pincode && isPreferredZone(pincode)) {

    const unlocked =
      subtotal >= FREE_DELIVERY_THRESHOLD;

    return {

      zone: "Preferred Delivery Zone",

      charge: unlocked ? 0 : 50,

      estimatedDays:
        "Same Day / Next Day",

      freeDeliveryEligible: true,

      freeDeliveryUnlocked: unlocked,

      freeDeliveryThreshold:
        FREE_DELIVERY_THRESHOLD,

      amountRemaining,

      message: unlocked
        ? "🎉 Congratulations! You've unlocked FREE Delivery."
        : `🎁 Add products worth ₹${amountRemaining} more to enjoy FREE Delivery.`,
    };
  }

  //---------------------------------------
  // COIMBATORE
  //---------------------------------------

  if (
    city?.trim().toLowerCase() ===
    "coimbatore"
  ) {

    const zone = SHIPPING_ZONES.find(
      z => z.id === "coimbatore"
    )!;

    return {

      zone: zone.name,

      charge: zone.charge,

      estimatedDays:
        zone.estimatedDays,

      freeDeliveryEligible: false,

      freeDeliveryUnlocked: false,

      freeDeliveryThreshold:
        FREE_DELIVERY_THRESHOLD,

      amountRemaining: 0,

      message: "",
    };
  }

  //---------------------------------------
  // STATE MATCH
  //---------------------------------------

  const zone = SHIPPING_ZONES.find(
    z => z.states.includes(state)
  );

  if (zone) {

    return {

      zone: zone.name,

      charge: zone.charge,

      estimatedDays:
        zone.estimatedDays,

      freeDeliveryEligible: false,

      freeDeliveryUnlocked: false,

      freeDeliveryThreshold:
        FREE_DELIVERY_THRESHOLD,

      amountRemaining: 0,

      message: "",
    };
  }

  //---------------------------------------
  // REST OF INDIA
  //---------------------------------------

  const rest = SHIPPING_ZONES.find(
    z => z.id === "rest-of-india"
  )!;

  return {

    zone: rest.name,

    charge: rest.charge,

    estimatedDays:
      rest.estimatedDays,

    freeDeliveryEligible: false,

    freeDeliveryUnlocked: false,

    freeDeliveryThreshold:
      FREE_DELIVERY_THRESHOLD,

    amountRemaining: 0,

    message: "",
  };
}