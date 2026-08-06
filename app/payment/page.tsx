"use client";

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

import { useCheckout } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { saveOrder } from "@/lib/saveOrder";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const router = useRouter();

  const { user } = useAuth();

  const { cart, clearCart } = useCart();

  const {
    address,
    shippingCharge,
    resetCheckout,
  } = useCheckout();

  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const grandTotal = subtotal + shippingCharge;

  async function handlePayment() {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert(
        "Unable to load Razorpay. Please refresh the page."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/create-order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
          amount: grandTotal,
        }),
      });

      const order = await response.json();

      if (!order.id) {
        throw new Error(
          order.message ||
            "Unable to create Razorpay order."
        );
      }

      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "Aarvya Naturals",

        description:
          "Premium Dry Fruits Purchase",

        image: "/logo.png",

        order_id: order.id,

        prefill: {
          name: address.fullName,
          email: address.email,
          contact: address.mobile,
        },

        notes: {
          customer: address.fullName,
        },

        theme: {
          color: "#0B3C8C",
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        handler: async function (
          razorpayResponse: any
        ) {
          try {
            const verifyResponse =
              await fetch(
                "/api/verify-payment",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    razorpay_order_id:
                      razorpayResponse.razorpay_order_id,

                    razorpay_payment_id:
                      razorpayResponse.razorpay_payment_id,

                    razorpay_signature:
                      razorpayResponse.razorpay_signature,
                  }),
                }
              );

            const verification =
              await verifyResponse.json();

            if (!verification.success) {
              setLoading(false);

              alert(
  "Payment verification failed. If money was deducted, please contact Aarvya Naturals with your payment reference."
);

              return;
            }

            if (!user) {
              throw new Error(
                "User not logged in."
              );
            }

            const orderId =
              await saveOrder({
                userId: user.uid,

                customer: {
                  name: address.fullName,
                  email: address.email,
                  mobile: address.mobile,
                },

                address: {
                  house: address.house,
                  street: address.street,
                  area: address.area,
                  city: address.city,
                  state: address.state,
                  pincode:
                    address.pincode,
                },

                products: cart,

                subtotal,

                shipping:
                  shippingCharge,

                grandTotal,

                razorpayOrderId:
                  razorpayResponse.razorpay_order_id,

                razorpayPaymentId:
                  razorpayResponse.razorpay_payment_id,
              });
  
try {
  await fetch("/api/send-order-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerName: address.fullName,
      customerEmail: address.email,
      customerMobile: address.mobile,
      customerAddress: `${address.house}, ${address.street}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`,
      paymentId:
        razorpayResponse.razorpay_payment_id,
      orderId,
      total: grandTotal,
      items: cart.map((item) => ({
        name: item.name,
        variant: item.variant,
        quantity: item.quantity,
        price: item.price,
      })),
    }),
  });
} catch (error) {
  console.error(
    "Failed to send email:",
    error
  );
}
            clearCart();

            resetCheckout();

            router.push(
              `/order-success?orderId=${orderId}`
            );
          } catch (error) {
            console.error(error);

            setLoading(false);

            alert(
              "Unable to save your order. Please contact support if the payment was deducted."
            );
          }
        },
      };

      const razorpay = new window.Razorpay(
        options
      );

      razorpay.on(
        "payment.failed",
        function (response: any) {
          console.error(response.error);

          setLoading(false);

          alert(
            response.error.description ||
              "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(error);

      setLoading(false);

      alert("Unable to initiate payment.");
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <main className="min-h-screen bg-[#FDFBF7] py-16">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
          <h1 className="text-center text-4xl font-bold text-[#0B3C8C]">
            Payment
          </h1>

          <p className="mt-3 text-center text-gray-600">
            Please review your payment details.
          </p>

          <div className="mt-10 space-y-5 rounded-2xl bg-gray-50 p-6">
            <div className="flex justify-between">
              <span>Customer</span>

              <span className="font-semibold">
                {address.fullName}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>₹{subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <span>₹{shippingCharge}
              </span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-[#0B3C8C]">
              <span>Grand Total</span>

              <span>₹{grandTotal}
              </span>
            </div>
          </div>

          <button
            disabled={loading}
            onClick={handlePayment}
            className="mt-10 w-full rounded-full bg-[#0B3C8C] py-4 text-lg font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading
              ? "Preparing Payment..."
              : `Pay ₹${grandTotal}`}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            🔒 Secure payment powered by Razorpay
          </p>
        </div>
      </main>
    </>
  );
}