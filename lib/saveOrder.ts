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