"use client";

import {
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";

import { calculateShipping } from "@/lib/shipping";

type Address = {
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

type Props = {
  address: Address;
  setAddress: Dispatch<SetStateAction<Address>>;
  setShippingCharge: Dispatch<SetStateAction<number>>;
};

export default function AddressForm({
  address,
  setAddress,
  setShippingCharge,
}: Props) {

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ✅ Calculate shipping whenever address changes
  useEffect(() => {

    if (
      address.city.trim() === "" ||
      address.state.trim() === ""
    ) {
      setShippingCharge(0);
      return;
    }

    const shipping = calculateShipping(
      address.state,
      address.city
    );

    setShippingCharge(shipping.charge);

  }, [
    address.city,
    address.state,
    setShippingCharge,
  ]);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="text-3xl font-bold text-blue-900">
        Delivery Address
      </h2>

      <p className="mt-2 text-gray-600">
        Please enter your delivery details.
      </p>

      <div className="mt-8 grid gap-6">

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={address.fullName}
          onChange={handleChange}
          className="rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-900"
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={address.mobile}
          onChange={handleChange}
          className="rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-900"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address (Optional)"
          value={address.email}
          onChange={handleChange}
          className="rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-900"
        />

        <input
          type="text"
          name="house"
          placeholder="House / Flat No."
          value={address.house}
          onChange={handleChange}
          className="rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-900"
        />

        <input
          type="text"
          name="street"
          placeholder="Street"
          value={address.street}
          onChange={handleChange}
          className="rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-900"
        />

        <input
          type="text"
          name="area"
          placeholder="Area / Locality"
          value={address.area}
          onChange={handleChange}
          className="rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-900"
        />

        <div className="grid gap-6 md:grid-cols-3">

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleChange}
            className="rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-900"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-900"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            className="rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-900"
          />

        </div>

      </div>

    </div>
  );
}