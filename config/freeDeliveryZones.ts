export const FREE_DELIVERY_THRESHOLD = 500;

/**
 * Base Delivery Zone
 * Around Ammankovil / Saravanampatti
 *
 * Orders below ₹500  -> ₹30 Shipping
 * Orders ₹500 & above -> FREE Delivery
 */
export const BASE_ZONE_PINCODES = [
  "641035",
  "641049",
];

/**
 * Preferred Delivery Zone
 *
 * Orders below ₹500  -> ₹50 Shipping
 * Orders ₹500 & above -> FREE Delivery
 */
export const PREFERRED_ZONE_PINCODES = [
  "641107", // Kovilpalayam
  "641050", // Kalapatti
  "641021", // Kurumbapalayam
  "641046", // Neelambur
  "641020", // Periyanaickenpalayam
  "641062", // Malumichampatti / Eachanari belt
];

export function isBaseZone(pincode: string): boolean {
  return BASE_ZONE_PINCODES.includes(pincode.trim());
}

export function isPreferredZone(pincode: string): boolean {
  return PREFERRED_ZONE_PINCODES.includes(pincode.trim());
}

export function isFreeDeliveryEligiblePincode(
  pincode: string
): boolean {
  return (
    isBaseZone(pincode) ||
    isPreferredZone(pincode)
  );
}