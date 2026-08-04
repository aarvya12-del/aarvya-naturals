"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);

  useEffect(() => {
  if (!user) return;

  const pendingBuyNow = sessionStorage.getItem("pendingBuyNow");

  if (pendingBuyNow) {

    addToCart(JSON.parse(pendingBuyNow));

    sessionStorage.removeItem("pendingBuyNow");

    router.replace("/checkout");

    return;
  }

  router.replace("/");

}, [user, router, addToCart]);

  async function login(e:React.FormEvent){
    e.preventDefault();
    try{
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    }catch(error:any){
      alert(error.message);
    }finally{
      setLoading(false);
    }
  }

  async function googleLogin(){
    try{
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    }catch(error:any){
      alert(error.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#F8F6F1] px-6 py-16">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid lg:grid-cols-2">
        <section className="p-10 lg:p-14">
          <h1 className="text-4xl font-bold text-[#0B3C8C]">Welcome Back</h1>
          <p className="mt-3 text-gray-600">Login to continue shopping with Aarvya Naturals.</p>

          <form onSubmit={login} className="mt-10 space-y-5">
            <input type="email" required placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-xl border-2 border-gray-300 p-4 focus:border-[#0B3C8C] outline-none"/>
            <input type="password" required placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full rounded-xl border-2 border-gray-300 p-4 focus:border-[#0B3C8C] outline-none"/>
            <button disabled={loading} className="w-full rounded-xl bg-[#0B3C8C] py-4 font-semibold text-white hover:bg-[#082F6D]">
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <button onClick={googleLogin} disabled={loading} className="mt-5 w-full rounded-xl border-2 border-gray-300 py-4 font-semibold hover:bg-gray-50">
            Continue with Google
          </button>

          <div className="mt-8 flex justify-between text-sm">
            <Link href="/forgot-password" className="text-[#0B3C8C] hover:underline">Forgot Password?</Link>
            </div>
        </section>

        <section className="bg-[#0B3C8C] p-10 text-white lg:p-14">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-200">Aarvya Naturals</p>
          <h2 className="mt-4 text-4xl font-bold">New to Aarvya?</h2>
          <p className="mt-4 leading-7 text-blue-100">Create your free account and enjoy a faster, smarter shopping experience.</p>

          <div className="mt-10 space-y-5">
            <div>✓ Save multiple delivery addresses</div>
            <div>✓ Track your orders</div>
            <div>✓ Faster checkout</div>
            <div>✓ Exclusive member offers</div>
            <div>✓ Personalized shopping experience</div>
          </div>

          <Link href="/register" className="mt-12 inline-block rounded-full bg-white px-8 py-4 font-bold text-[#0B3C8C] hover:bg-blue-50">
            Create Free Account
          </Link>
        </section>
      </div>
    </main>
  );
}
