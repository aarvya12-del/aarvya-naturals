import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export type OrderItem = {
  id: number;
  slug: string;
  name: string;
  image: string;
  variant: string;
  price: number;
  quantity: number;
  type: "product" | "combo";
};

export type DeliveryAddress = {
  fullName: string;
  mobile: string;
  email: string;

  house: string;
  street: string;
  area: string;

  city: string;
  state: string;
  pincode: string;
};

export type CreateOrderPayload = {
  userId: string;

  items: OrderItem[];

  address: DeliveryAddress;

  subtotal: number;
  shipping: number;
  grandTotal: number;

  paymentMethod: string;
  paymentStatus:
    | "Pending"
    | "Paid"
    | "Failed";

  orderStatus:
    | "Pending"
    | "Confirmed"
    | "Packed"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
};

export async function createOrder(
  payload: CreateOrderPayload
) {
  const orderRef = await addDoc(
    collection(db, "orders"),
    {
      ...payload,
      createdAt: serverTimestamp(),
    }
  );

  return orderRef.id;
}