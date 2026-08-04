"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type CheckoutAddress = {
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

const emptyAddress: CheckoutAddress = {
  fullName: "",
  mobile: "",
  email: "",

  house: "",
  street: "",
  area: "",

  city: "",
  state: "",
  pincode: "",
};

type CheckoutContextType = {
  
  // Current checkout form
  address: CheckoutAddress;
  setAddress: React.Dispatch<
    React.SetStateAction<CheckoutAddress>
  >;

  // Selected delivery address
  deliveryAddress: CheckoutAddress | null;
  setDeliveryAddress: React.Dispatch<
    React.SetStateAction<CheckoutAddress | null>
  >;

  // Shipping
  shippingCharge: number;
  setShippingCharge: React.Dispatch<
    React.SetStateAction<number>
  >;

  shippingCalculated: boolean;
  setShippingCalculated: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  resetCheckout: () => void;
};

const CheckoutContext = createContext<
  CheckoutContextType | undefined
>(undefined);

export function CheckoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [address, setAddress] =
    useState<CheckoutAddress>(emptyAddress);

  const [deliveryAddress, setDeliveryAddress] =
    useState<CheckoutAddress | null>(null);

  const [shippingCharge, setShippingCharge] =
    useState(0);

  const [shippingCalculated, setShippingCalculated] =
    useState(false);
    
    function resetCheckout() {
    setAddress(emptyAddress);
    setDeliveryAddress(null);

    setShippingCharge(0);
    setShippingCalculated(false);
    
  }

  return (
    <CheckoutContext.Provider
      value={{
        address,
        setAddress,

        deliveryAddress,
        setDeliveryAddress,

        shippingCharge,
        setShippingCharge,

        shippingCalculated,
setShippingCalculated,

resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error(
      "useCheckout must be used inside CheckoutProvider"
    );
  }

  return context;
}