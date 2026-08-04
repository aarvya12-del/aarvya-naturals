import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 text-center shadow-xl">

        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-green-100">

          <span className="text-6xl">
            ✅
          </span>

        </div>

        <h1 className="mt-8 text-4xl font-bold text-[#0B3C8C]">
          Order Placed Successfully
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Thank you for shopping with Aarvya Naturals.
          Your order has been received successfully.
        </p>

        <div className="mt-10 rounded-2xl bg-[#F8F8F8] p-6 text-left">

          <div className="flex justify-between py-2">
            <span className="font-medium text-gray-600">
              Order ID
            </span>

            <span className="font-bold">
              Will be generated after payment
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-medium text-gray-600">
              Payment Status
            </span>

            <span className="font-bold text-green-700">
              Successful
            </span>
          </div>

        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row">

          <Link
            href="/products"
            className="flex-1 rounded-full bg-[#0B3C8C] py-4 text-center font-semibold text-white transition hover:bg-blue-800"
          >
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="flex-1 rounded-full border-2 border-[#0B3C8C] py-4 text-center font-semibold text-[#0B3C8C] transition hover:bg-[#0B3C8C] hover:text-white"
          >
            View My Orders
          </Link>

        </div>

      </div>

    </main>
  );
}