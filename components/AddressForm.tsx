"use client";

import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import { calculateShipping } from "@/lib/shipping";
import { lookupPincode } from "@/lib/pincode";

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
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [localities, setLocalities] = useState<string[]>([]);

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    if (name === "pincode") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 6);

      setAddress((prev) => ({
        ...prev,
        pincode: digitsOnly,
      }));

      setPincodeError("");

      if (digitsOnly.length < 6) {
        setAddress((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));

        return;
      }

      setLoadingPincode(true);

      const result = await lookupPincode(digitsOnly);

      setLoadingPincode(false);

      if (!result.success) {
        setPincodeError(result.message ?? "Invalid pincode");

        setAddress((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));

        return;
      }

      setLocalities(result.localities ?? []);

setAddress((prev) => ({
  ...prev,
  area: "",
  city: result.city ?? "",
  state: result.state ?? "",
}));

      return;
    }

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

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

        <select
  name="area"
  value={address.area}
  onChange={(e) =>
    setAddress((prev) => ({
      ...prev,
      area: e.target.value,
    }))
  }
  disabled={localities.length === 0}
  className="rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-900 bg-white disabled:bg-gray-100"
>
  <option value="">Select your locality</option>

  {localities.map((locality) => (
    <option key={locality} value={locality}>
      {locality}
    </option>
  ))}
</select>

        <div className="grid gap-6 md:grid-cols-3">

  <input
    type="text"
    inputMode="numeric"
    maxLength={6}
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
    readOnly
    className="rounded-2xl border border-gray-300 bg-gray-100 px-5 py-4 outline-none"
  />

  <input
    type="text"
    name="state"
    placeholder="State"
    value={address.state}
    readOnly
    className="rounded-2xl border border-gray-300 bg-gray-100 px-5 py-4 outline-none"
  />

</div>

        {loadingPincode && (
          <p className="text-sm text-blue-700">
            Detecting location...
          </p>
        )}

        {pincodeError && (
          <p className="text-sm text-red-600">
            {pincodeError}
          </p>
        )}
      </div>
    </div>
  );
}