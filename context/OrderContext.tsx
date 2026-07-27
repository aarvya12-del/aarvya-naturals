"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type OrderData = {
  orderId: string;
  paymentId: string;

  paymentStatus:
    | "Pending"
    | "Paid"
    | "Failed";

  orderStatus:
    | "Pending"
    | "Confirmed"
    | "Packed"
    | "Shipped"
    | "Delivered"
    | "Cancelled";

  subtotal: number;
  shipping: number;
  grandTotal: number;
};

type OrderContextType = {
  order: OrderData;
  setOrder: React.Dispatch<
    React.SetStateAction<OrderData>
  >;

  resetOrder: () => void;
};

const emptyOrder: OrderData = {
  orderId: "",
  paymentId: "",

  paymentStatus: "Pending",
  orderStatus: "Pending",

  subtotal: 0,
  shipping: 0,
  grandTotal: 0,
};

const OrderContext = createContext<
  OrderContextType | undefined
>(undefined);

export function OrderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [order, setOrder] =
    useState<OrderData>(emptyOrder);

  function resetOrder() {
    setOrder(emptyOrder);
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrder must be used inside OrderProvider"
    );
  }

  return context;
}