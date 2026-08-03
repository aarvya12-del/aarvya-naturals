import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { CartItem } from "@/context/CartContext";

export type SaveOrderParams = {
  userId: string;

  customer: {
    name: string;
    email: string;
    mobile: string;
  };

  address: {
    house: string;
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
  };

  products: CartItem[];

  subtotal: number;

  shipping: number;

  grandTotal: number;

  razorpayOrderId: string;

  razorpayPaymentId: string;
};

export async function saveOrder({
  userId,
  customer,
  address,
  products,
  subtotal,
  shipping,
  grandTotal,
  razorpayOrderId,
  razorpayPaymentId,
}: SaveOrderParams) {
  const orderData = {
    userId,

    customer,

    address,

    products,

    subtotal,

    shipping,

    grandTotal,

    razorpayOrderId,

    razorpayPaymentId,

    paymentStatus: "Paid",

    // Payment succeeded, so the order starts life as "Confirmed" rather
    // than "Pending" — admin then moves it through Packed/Shipped/Delivered.
    orderStatus: "Confirmed",

    // Filled in later by the admin panel once the order ships.
    tracking: null,

    // Becomes true the moment stock is actually deducted (when the
    // order is marked Delivered) — prevents deducting twice.
    inventoryUpdated: false,

    createdAt: serverTimestamp(),
  };

  // Main Orders Collection

  const orderRef = await addDoc(
    collection(db, "orders"),
    orderData
  );

  // User Orders Collection

  await setDoc(
    doc(
      db,
      "users",
      userId,
      "orders",
      orderRef.id
    ),
    orderData
  );

  return orderRef.id;
}
