"use client";

import { useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import AddressForm from "@/components/AddressForm";
import OrderSummary from "@/components/OrderSummary";

import { useCheckout } from "@/context/CheckoutContext";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { calculateShipping } from "@/lib/shipping";

export default function CheckoutPage() {
  const { user } = useAuth();

  const {
    address,
    setAddress,
    shippingCharge,
    setShippingCharge,
  } = useCheckout();

  useEffect(() => {
    async function loadDefaultAddress() {
      if (!user) return;

      const q = query(
        collection(db, "users", user.uid, "addresses"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      if (snap.empty) return;

      // Find default address first
      const docs = snap.docs.map((doc) => doc.data());

      const selected =
        docs.find((a: any) => a.isDefault) || docs[0];

      const checkoutAddress = {
        fullName: selected.fullName,
        mobile: selected.phone,
        email: "",

        house: selected.addressLine1,
        street: selected.addressLine2 || "",
        area: selected.landmark || "",

        city: selected.city,
        state: selected.state,
        pincode: selected.pincode,
      };

      setAddress(checkoutAddress);

      const shipping = calculateShipping(
        checkoutAddress.state,
        checkoutAddress.city
      );

      setShippingCharge(shipping.charge);
    }

    loadDefaultAddress();
  }, [user, setAddress, setShippingCharge]);

  return (
    <main className="min-h-screen bg-[#FDFBF7] py-16">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">

          <h1 className="text-5xl font-bold text-blue-900">
            Checkout
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Complete your delivery details to continue with your order.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-3">

          <div className="lg:col-span-2">

            <AddressForm
              address={address}
              setAddress={setAddress}
              setShippingCharge={setShippingCharge}
            />

          </div>

          <div>

            <OrderSummary
              shipping={shippingCharge}
            />

          </div>

        </div>

      </div>
    </main>
  );
}