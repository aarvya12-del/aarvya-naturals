"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

import AddressForm, { Address } from "./AddressForm";
import AddressCard from "./AddressCard";

export default function AddressList() {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<(Address & {id:string})[]>([]);
  const [showForm, setShowForm] = useState(false);

  async function loadAddresses() {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "addresses"),
      orderBy("createdAt", "desc")
    );

    const snap = await getDocs(q);

    setAddresses(
      snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Address),
      }))
    );
  }

  useEffect(() => {
    loadAddresses();
  }, [user]);

  async function handleSave(address: Address) {
    if (!user) return;

    await addDoc(
      collection(db, "users", user.uid, "addresses"),
      {
        ...address,
        createdAt: serverTimestamp(),
      }
    );

    setShowForm(false);
    await loadAddresses();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#0B3C8C]">
          My Addresses
        </h2>

        <button
          onClick={() => setShowForm(true)}
          className="rounded-xl bg-[#0B3C8C] px-6 py-3 font-semibold text-white"
        >
          + Add Address
        </button>
      </div>

      {showForm && (
        <AddressForm
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {addresses.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
          No addresses found. Add your first address.
        </div>
      ) : (
        <div className="space-y-6">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
            />
          ))}
        </div>
      )}
    </div>
  );
}
