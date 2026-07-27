export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  type: "Home" | "Office" | "Other";
  isDefault: boolean;
}

import { useState } from "react";

interface Props {
  initialData?: Address;
  onSave: (address: Address) => void;
  onCancel: () => void;
}

const emptyAddress: Address = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  type: "Home",
  isDefault: false,
};

export default function AddressForm({
  initialData = emptyAddress,
  onSave,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Address>(initialData);

  const update = (key: keyof Address, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (
      !form.fullName ||
      !form.phone ||
      !form.addressLine1 ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(form);
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="mb-6 text-3xl font-bold text-[#0B3C8C]">
        {initialData.fullName ? "Edit Address" : "Add Address"}
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <input className="rounded-xl border p-4" placeholder="Full Name *"
          value={form.fullName} onChange={(e)=>update("fullName",e.target.value)} />
        <input className="rounded-xl border p-4" placeholder="Phone Number *"
          value={form.phone} onChange={(e)=>update("phone",e.target.value)} />
      </div>

      <input className="mt-5 w-full rounded-xl border p-4"
        placeholder="House / Flat / Building *"
        value={form.addressLine1}
        onChange={(e)=>update("addressLine1",e.target.value)} />

      <input className="mt-5 w-full rounded-xl border p-4"
        placeholder="Street / Area"
        value={form.addressLine2}
        onChange={(e)=>update("addressLine2",e.target.value)} />

      <input className="mt-5 w-full rounded-xl border p-4"
        placeholder="Landmark"
        value={form.landmark}
        onChange={(e)=>update("landmark",e.target.value)} />

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <input className="rounded-xl border p-4" placeholder="City *"
          value={form.city} onChange={(e)=>update("city",e.target.value)} />
        <input className="rounded-xl border p-4" placeholder="State *"
          value={form.state} onChange={(e)=>update("state",e.target.value)} />
        <input className="rounded-xl border p-4" placeholder="Pincode *"
          value={form.pincode} onChange={(e)=>update("pincode",e.target.value)} />
      </div>

      <div className="mt-6 flex gap-6">
        {["Home","Office","Other"].map((t)=>(
          <label key={t} className="flex items-center gap-2">
            <input
              type="radio"
              checked={form.type===t}
              onChange={()=>update("type",t)}
            />
            {t}
          </label>
        ))}
      </div>

      <label className="mt-6 flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e)=>update("isDefault",e.target.checked)}
        />
        Set as Default Address
      </label>

      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="rounded-xl border px-6 py-3"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="rounded-xl bg-[#0B3C8C] px-6 py-3 font-semibold text-white"
        >
          Save Address
        </button>
      </div>
    </div>
  );
}
