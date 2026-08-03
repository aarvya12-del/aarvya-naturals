import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface TrackingInfo {
  courier: string;
  trackingNumber: string;
  trackingUrl: string;
  dispatchDate: string; // stored as a plain date string, e.g. "2026-08-05"
}

/**
 * Orders are stored in two places — the main "orders" collection
 * (what admin reads) and a per-user mirror at users/{userId}/orders
 * (what the customer reads on their own Orders page). Any update to
 * an order's status or tracking info has to go to BOTH, or the two
 * views silently drift apart. This is the one place that does that.
 */
export async function updateOrderEverywhere(
  orderId: string,
  userId: string,
  changes: Record<string, unknown>
) {
  await Promise.all([
    updateDoc(doc(db, "orders", orderId), changes),
    updateDoc(doc(db, "users", userId, "orders", orderId), changes),
  ]);
}
