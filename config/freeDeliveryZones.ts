export const FREE_DELIVERY_THRESHOLD = 500;

/**
 * Zone 1
 * Around Ammankovil / Saravanampatti
 *
 * Shipping ₹30
 * FREE above ₹500
 */
export const BASE_ZONE_PINCODES = [
  "641035",
  "641049",
];

/**
 * Zone 2
 * Aarvya Delivery Zone
 *
 * Shipping ₹50
 * FREE above ₹500
 */
export const PREFERRED_ZONE_PINCODES = [
  // Ganapathy
  "641006",

  // Peelamedu
  "641004",
  "641014",

  // Singanallur
  "641005",

  // Saravanampatti Belt
  "641028",
  "641029",
  "641032",
  "641034",
  "641037",
  "641042",
  "641045",

  // Kovilpalayam / S.S. Kulam
  "641107",
  "641108",
  "641109",
  "641110",
  "641111",
  "641112",
  "641113",
  "641114",
  "641115",
  "641116",
  "641117",
  "641118",

  // Neelambur
  "641062",
  "641063",

  // Periyanaickenpalayam
  "641020",
  "641021",
  "641022",
  "641023",
  "641024",
  "641025",
  "641026",

  // Maruthamalai
  "641046",
  "641047",
  "641048",

  // Malumichampatti
  "641050",
  "641051",
  "641052",

  // Kuniyamuthur
  "641008",

  // Kovaipudur
  "641042",
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