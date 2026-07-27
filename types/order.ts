export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type PaymentStatus =
  | "Pending"
  | "Paid"
  | "Failed"
  | "Refunded";

export type OrderItem = {
  id: number;
  slug: string;
  name: string;
  image: string;

  variant: string;

  price: number;

  quantity: number;

  subtotal: number;

  type: "product" | "combo";
};

export type CustomerAddress = {
  fullName: string;
  mobile: string;
  email?: string;

  house: string;
  street: string;
  area: string;

  city: string;
  state: string;
  pincode: string;
};

export type Order = {
  orderId: string;

  items: OrderItem[];

  address: CustomerAddress;

  subtotal: number;

  shipping: number;

  grandTotal: number;

  paymentStatus: PaymentStatus;

  orderStatus: OrderStatus;

  paymentId?: string;

  courier?: string;

  trackingNumber?: string;

  createdAt: string;
};