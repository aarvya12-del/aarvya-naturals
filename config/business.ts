export const BUSINESS = {
  // Brand
  name: "Aarvya Naturals",
  orderPrefix: "AN",

  // Owner
  owner: "Abharajithan",

  // Contact
  phone: "+91 6374626691",
  whatsapp: "916374626691",
  email: "aarvya12@gmail.com",
  website: "https://aarvyanaturals.in",

  // Address
  address: {
    line1: "Ammankovil",
    area: "Saravanampatti",
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    pincode: "641035",
  },

  // Dispatch
  dispatch: {
    originPincode: "641035",
    primaryCourier: "India Post",
    secondaryCourier: "ST Courier",
  },

  // Legal
  fssai: "22426552000244",

  // Currency
  currency: "INR",
} as const;