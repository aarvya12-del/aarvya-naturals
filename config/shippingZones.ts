export type ShippingZone = {
  id: string;
  name: string;
  states: string[];
  charge: number;
  estimatedDays: string;
};

export const SHIPPING_ZONES: ShippingZone[] = [
  {
    id: "coimbatore",
    name: "Coimbatore",
    states: ["Coimbatore"],
    charge: 60,
    estimatedDays: "Same Day / Next Day",
  },

  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    states: ["Tamil Nadu"],
    charge: 80,
    estimatedDays: "2–3 Business Days",
  },

  {
    id: "kerala",
    name: "Kerala",
    states: ["Kerala"],
    charge: 90,
    estimatedDays: "3–4 Business Days",
  },

  {
    id: "karnataka",
    name: "Karnataka",
    states: ["Karnataka"],
    charge: 100,
    estimatedDays: "3–4 Business Days",
  },

  {
    id: "andhra-telangana",
    name: "Andhra Pradesh & Telangana",
    states: ["Andhra Pradesh", "Telangana"],
    charge: 120,
    estimatedDays: "4–5 Business Days",
  },

  {
    id: "rest-of-india",
    name: "Rest of India",
    states: [],
    charge: 150,
    estimatedDays: "5–7 Business Days",
  },
];