"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "@/context/AuthContext";

export type CartItem = {
  id: number;
  slug: string;
  name: string;
  image: string;

  variant: string;

  price: number;      // ⭐ NEW

  type: "product" | "combo";

  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, variant: string) => void;
  increaseQuantity: (id: number, variant: string) => void;
  decreaseQuantity: (id: number, variant: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user, loading } = useAuth();

  // Tracks the previously-seen logged-in user, so we can tell the
  // difference between "app just loaded" and "user actually logged
  // out just now" — only the second case should clear the cart.
  const prevUidRef = useRef<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("aarvya-cart");

    if (!savedCart) return;

    // Defer state update to satisfy React 19 lint rule.
    queueMicrotask(() => {
      setCart(JSON.parse(savedCart));
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("aarvya-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (loading) return; // wait until auth state has actually resolved

    const currentUid = user?.uid ?? null;
    const wasLoggedIn = prevUidRef.current !== null;
    const isNowLoggedOut = currentUid === null;

    if (wasLoggedIn && isNowLoggedOut) {
      setCart([]);
      localStorage.removeItem("aarvya-cart");
    }

    prevUidRef.current = currentUid;
  }, [user, loading]);

  function addToCart(item: CartItem) {
    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === item.id &&
          p.variant === item.variant &&
          p.type === item.type
      );

      if (existing) {
        return prev.map((p) =>
          p.id === item.id &&
          p.variant === item.variant &&
          p.type === item.type
            ? {
                ...p,
                quantity: p.quantity + item.quantity,
              }
            : p
        );
      }

      return [...prev, item];
    });
  }

  function removeFromCart(id: number, variant: string) {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.variant === variant)
      )
    );
  }

  function increaseQuantity(id: number, variant: string) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.variant === variant
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(id: number, variant: string) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.variant === variant
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}