"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [loading,setLoading]=useState(false);

  useEffect(()=>{ if(user) router.replace("/"); },[user,router]);

  async function register(e:React.FormEvent){
    e.preventDefault();
    if(password!==confirmPassword){
      alert("Passwords do not match.");
      return;
    }
    try{
      setLoading(true);
      const cred=await createUserWithEmailAndPassword(auth,email,password);
      await updateProfile(cred.user,{displayName:name});
      await setDoc(doc(db,"users",cred.user.uid),{
        uid:cred.user.uid,
        name,
        phone,
        email,
        role:"customer",
        provider:"email",
        totalOrders:0,
        totalSpent:0,
        defaultAddressId:"",
        isActive:true,
        createdAt:serverTimestamp()
      });
      router.replace("/");
    }catch(error:any){
      alert(error.message);
    }finally{
      setLoading(false);
    }
  }

  async function googleSignup(){
    try{
      setLoading(true);
      const result=await signInWithPopup(auth,googleProvider);
      await setDoc(doc(db,"users",result.user.uid),{
        uid:result.user.uid,
        name:result.user.displayName||"",
        phone:"",
        email:result.user.email||"",
        role:"customer",
        provider:"google",
        totalOrders:0,
        totalSpent:0,
        defaultAddressId:"",
        isActive:true,
        createdAt:serverTimestamp()
      },{merge:true});
      router.replace("/");
    }catch(error:any){
      alert(error.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-[#F8F6F1] px-6 py-16">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid lg:grid-cols-2">
        <section className="bg-[#0B3C8C] p-10 text-white lg:p-14">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-200">Aarvya Naturals</p>
          <h2 className="mt-4 text-4xl font-bold">Join the Aarvya Family</h2>
          <p className="mt-4 text-blue-100">Create your free account and enjoy a faster shopping experience.</p>
          <div className="mt-10 space-y-4">
            <div>✓ Save multiple addresses</div>
            <div>✓ Track your orders</div>
            <div>✓ Faster checkout</div>
            <div>✓ Exclusive offers</div>
          </div>
          <Link href="/login" className="mt-12 inline-block rounded-full bg-white px-8 py-4 font-bold text-[#0B3C8C]">Already have an account? Login</Link>
        </section>

        <section className="p-10 lg:p-14">
          <h1 className="text-4xl font-bold text-[#0B3C8C]">Create Account</h1>
          <p className="mt-3 text-gray-600">Join Aarvya Naturals today.</p>

          <form onSubmit={register} className="mt-8 space-y-4">
            <input required placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-xl border-2 border-gray-300 p-4 outline-none focus:border-[#0B3C8C]" />
            <input required type="tel" placeholder="Mobile Number" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full rounded-xl border-2 border-gray-300 p-4 outline-none focus:border-[#0B3C8C]" />
            <input required type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-xl border-2 border-gray-300 p-4 outline-none focus:border-[#0B3C8C]" />
            <input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-xl border-2 border-gray-300 p-4 outline-none focus:border-[#0B3C8C]" />
            <input required type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="w-full rounded-xl border-2 border-gray-300 p-4 outline-none focus:border-[#0B3C8C]" />
            <button disabled={loading} className="w-full rounded-xl bg-[#0B3C8C] py-4 font-semibold text-white">{loading?"Creating Account...":"Create Account"}</button>
          </form>

          <button onClick={googleSignup} disabled={loading} className="mt-5 w-full rounded-xl border-2 border-gray-300 py-4 font-semibold">
            Continue with Google
          </button>
        </section>
      </div>
    </main>
  );
}
