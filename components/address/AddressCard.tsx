"use client";

import { useRouter } from "next/navigation";

import { useCheckout } from "@/context/CheckoutContext";
import { Address } from "./AddressForm";

interface Props {
  address: Address & { id: string };
  onEdit: () => void;
  onDelete: () => void;
}

export default function AddressCard({ address, onEdit, onDelete }: Props) {
  const router = useRouter();

  const {
    setDeliveryAddress,
    setAddress,
  } = useCheckout();

  const icon =
    address.type === "Home"
      ? "🏠"
      : address.type === "Office"
      ? "🏢"
      : "📍";

  function handleUseAddress() {
    const checkoutAddress = {
      fullName: address.fullName,
      mobile: address.phone,
      email: "",

      house: address.addressLine1,
      street: address.addressLine2 || "",
      area: address.landmark || "",

      city: address.city,
      state: address.state,
      pincode: address.pincode,
    };

    setDeliveryAddress(checkoutAddress);

    // Copy into the editable checkout form
    setAddress(checkoutAddress);

    router.push("/checkout");
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <span className="text-2xl">
              {icon}
            </span>

            <h3 className="text-xl font-bold text-[#0B3C8C]">
              {address.type}
            </h3>

            {address.isDefault && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Default
              </span>
            )}

          </div>

          <div className="mt-4 space-y-1 text-gray-700">

            <p className="font-semibold">
              {address.fullName}
            </p>

            <p>{address.phone}</p>

            <p>{address.addressLine1}</p>

            {address.addressLine2 && (
              <p>{address.addressLine2}</p>
            )}

            {address.landmark && (
              <p>Landmark: {address.landmark}</p>
            )}

            <p>
              {address.city}, {address.state} - {address.pincode}
            </p>

          </div>

        </div>

        <div className="flex flex-col gap-2">

          <button
            onClick={handleUseAddress}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            Use for Checkout
          </button>

          <button
            onClick={onEdit}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}
