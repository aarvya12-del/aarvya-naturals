"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

import AddressForm, { Address } from "./AddressForm";
import AddressCard from "./AddressCard";

type StoredAddress = Address & { id: string };

export default function AddressList() {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<StoredAddress[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<StoredAddress | null>(
    null
  );

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
    async function fetchAddresses() {
      if (!user) {
        setAddresses([]);
        return;
      }

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

    void fetchAddresses();
  }, [user]);

  async function handleSave(address: Address) {
    if (!user) return;

    if (editingAddress) {
      // Editing an existing address — update it, don't create a new one.
      await updateDoc(
        doc(db, "users", user.uid, "addresses", editingAddress.id),
        { ...address }
      );
    } else {
      await addDoc(
        collection(db, "users", user.uid, "addresses"),
        {
          ...address,
          createdAt: serverTimestamp(),
        }
      );
    }

    setShowForm(false);
    setEditingAddress(null);
    await loadAddresses();
  }

  function handleEdit(address: StoredAddress) {
    setEditingAddress(address);
    setShowForm(true);
  }

  async function handleDelete(address: StoredAddress) {
    if (!user) return;

    if (!confirm("Delete this address?")) return;

    await deleteDoc(doc(db, "users", user.uid, "addresses", address.id));
    await loadAddresses();
  }

  function handleCancel() {
    setShowForm(false);
    setEditingAddress(null);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#0B3C8C]">
          My Addresses
        </h2>

        <button
          onClick={() => {
            setEditingAddress(null);
            setShowForm(true);
          }}
          className="rounded-xl bg-[#0B3C8C] px-6 py-3 font-semibold text-white"
        >
          + Add Address
        </button>
      </div>

      {showForm && (
        <AddressForm
          initialData={editingAddress ?? undefined}
          onSave={handleSave}
          onCancel={handleCancel}
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
              onEdit={() => handleEdit(address)}
              onDelete={() => handleDelete(address)}
            />
          ))}
        </div>
      )}
    </div>
  );
}