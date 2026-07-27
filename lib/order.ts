import type { CartItem } from "@/context/CartContext";
import type {
  CustomerAddress,
  Order,
  OrderStatus,
  PaymentStatus,
} from "@/types/order";

export function generateOrderId(): string {
  const timestamp = Date.now().toString().slice(-6);

  return `AN${timestamp}`;
}

export function calculateSubtotal(cart: CartItem[]): number {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

export function calculateGrandTotal(
  subtotal: number,
  shipping: number
): number {
  return subtotal + shipping;
}

export function createOrder({
  cart,
  address,
  shipping,
  paymentStatus = "Pending",
}: {
  cart: CartItem[];
  address: CustomerAddress;
  shipping: number;
  paymentStatus?: PaymentStatus;
}): Order {
  const subtotal = calculateSubtotal(cart);

  const grandTotal = calculateGrandTotal(
    subtotal,
    shipping
  );

  return {
    orderId: generateOrderId(),

    items: cart.map((item) => ({
      ...item,
      subtotal: item.price * item.quantity,
    })),

    address,

    subtotal,

    shipping,

    grandTotal,

    paymentStatus,

    orderStatus: "Pending" as OrderStatus,

    createdAt: new Date().toISOString(),
  };
}