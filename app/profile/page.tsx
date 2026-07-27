"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [gender,setGender]=useState("");
  const [dob,setDob]=useState("");
  const [saving,setSaving]=useState(false);

  useEffect(()=>{
    if(!loading && !user){router.replace("/login");return;}
    async function load(){
      if(!user) return;
      const snap=await getDoc(doc(db,"users",user.uid));
      if(snap.exists()){
        const d=snap.data();
        setName(d.name||user.displayName||"");
        setPhone(d.phone||"");
        setGender(d.gender||"");
        setDob(d.dob||"");
      }else{
        setName(user.displayName||"");
      }
    }
    load();
  },[loading,user,router]);

  async function saveProfile(){
    if(!user) return;
    setSaving(true);
    await setDoc(doc(db,"users",user.uid),{
      name,email:user.email,phone,gender,dob,updatedAt:serverTimestamp()
    },{merge:true});
    await updateProfile(user,{displayName:name});
    alert("Profile updated successfully.");
    setSaving(false);
  }

  if(loading||!user) return <main className="min-h-screen flex items-center justify-center">Loading...</main>;

  return (
  <main className="min-h-screen bg-[#F8F6F1] py-12 px-6">
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl">
      <h1 className="mb-8 text-4xl font-bold text-[#0B3C8C]">My Profile</h1>
      <div className="space-y-6">
        <div><label>Full Name</label><input className="mt-2 w-full rounded-xl border p-4" value={name} onChange={e=>setName(e.target.value)}/></div>
        <div><label>Email</label><input readOnly className="mt-2 w-full rounded-xl border bg-gray-100 p-4" value={user.email||""}/></div>
        <div><label>Phone Number</label><input className="mt-2 w-full rounded-xl border p-4" value={phone} onChange={e=>setPhone(e.target.value)}/></div>
        <div className="grid gap-6 md:grid-cols-2">
          <div><label>Gender</label><select className="mt-2 w-full rounded-xl border p-4" value={gender} onChange={e=>setGender(e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
          <div><label>Date of Birth</label><input type="date" className="mt-2 w-full rounded-xl border p-4" value={dob} onChange={e=>setDob(e.target.value)}/></div>
        </div>
        <button onClick={saveProfile} disabled={saving} className="rounded-xl bg-[#0B3C8C] px-8 py-3 font-semibold text-white">{saving?"Saving...":"Save Changes"}</button>
      </div>
    </div>
  </main>);
}
