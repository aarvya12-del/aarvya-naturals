"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export type WishlistItemType = "product" | "combo";

export interface WishlistItem {
  slug: string;
  type: WishlistItemType;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  loading: boolean;
  isWishlisted: (slug: string, type: WishlistItemType) => boolean;
  toggleWishlist: (slug: string, type: WishlistItemType) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

function docIdFor(slug: string, type: WishlistItemType) {
  return `${type}-${slug}`;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlist() {
      if (!user) {
        queueMicrotask(() => {
          setWishlist([]);
          setLoading(false);
        });
        return;
      }

      setLoading(true);
      const snap = await getDocs(
        collection(db, "users", user.uid, "wishlist")
      );

      setWishlist(
        snap.docs.map((d) => {
          const data = d.data() as { slug: string; type: WishlistItemType };
          return {
            slug: data.slug ?? d.id,
            type: data.type ?? "product",
          };
        })
      );

      setLoading(false);
    }

    void loadWishlist();
  }, [user]);

  function isWishlisted(slug: string, type: WishlistItemType) {
    return wishlist.some((item) => item.slug === slug && item.type === type);
  }

  async function toggleWishlist(slug: string, type: WishlistItemType) {
    if (!user) return;

    const ref = doc(db, "users", user.uid, "wishlist", docIdFor(slug, type));
    const alreadyWishlisted = isWishlisted(slug, type);

    if (alreadyWishlisted) {
      setWishlist((prev) =>
        prev.filter((item) => !(item.slug === slug && item.type === type))
      );
      await deleteDoc(ref);
    } else {
      setWishlist((prev) => [...prev, { slug, type }]);
      await setDoc(ref, { slug, type, addedAt: serverTimestamp() });
    }
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, isWishlisted, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}