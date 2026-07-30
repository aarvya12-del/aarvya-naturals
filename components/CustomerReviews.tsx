// CustomerReviews_V4_Nature.tsx
"use client";

import { useEffect, useState } from "react";

const reviews = [
{
name:"Ghanesh Karthick",
review:"The products are top quality, the price is affordable and delivery was as promised. Lots of options and combos are offered by them. Overall experience was very smooth. Very responsive team."
},
{
name:"Shamsheer K",
review:"Variety of combo products in affordable price. Loved the quality of it. It is matching with the quality we purchase from gulf countries."
},
{
name:"Shiv Dave",
review:"Wide range of products and great quality. Owner is very responsive and the service was amazing. Highly recommended."
},
{
name:"Bharath Sabapathy",
review:"I got a combo pack and it is really good. Corporate gifting packs and regular combo packs are worth a try."
},
{
name:"Keerthana Keerthu",
review:"Seeds were fresh, quality was excellent and delivery was quick. Thank you Aarvya Naturals."
}
];

export default function CustomerReviews(){
const [current,setCurrent]=useState(0);

useEffect(()=>{
 const t=setInterval(()=>setCurrent(v=>(v+1)%reviews.length),6000);
 return ()=>clearInterval(t);
},[]);

const r=reviews[current];
const initials=r.name.split(" ").map(x=>x[0]).join("").slice(0,2);

return(
<section className="relative overflow-hidden py-20 bg-gradient-to-b from-[#f8fff7] via-white to-[#fffef8]">

{/* Floating Leaves */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">

<div className="absolute left-[8%] top-[10%] text-5xl opacity-10 animate-bounce">🍃</div>
<div className="absolute right-[12%] top-[18%] text-4xl opacity-10 animate-pulse">🍃</div>
<div className="absolute left-[18%] bottom-[18%] text-3xl opacity-10 animate-bounce">🌿</div>
<div className="absolute right-[25%] bottom-[12%] text-5xl opacity-10 animate-pulse">🍃</div>
<div className="absolute left-1/2 top-[8%] text-3xl opacity-10 animate-bounce">🌱</div>

<div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-green-100 blur-3xl opacity-40"></div>
<div className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-yellow-100 blur-3xl opacity-40"></div>

</div>

<div className="relative max-w-5xl mx-auto px-6">

<div className="text-center mb-10">

<div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-lg border border-green-200">
<span className="text-yellow-500">★★★★★</span>
<span className="font-semibold text-green-700">Trusted Across India</span>
</div>

<h2 className="mt-6 text-5xl font-extrabold text-[#0B3C8C]">
5.0 Google Rating
</h2>

<p className="mt-2 text-gray-600">
Based on 5 Verified Google Reviews
</p>

</div>

<div className="relative rounded-[30px] bg-white/80 backdrop-blur-xl border border-white shadow-2xl p-8 md:p-10">

<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-400 text-white font-bold text-xl shadow-lg">
{initials}
</div>

<div className="mt-5 text-center text-yellow-400 text-3xl tracking-wider">
★★★★★
</div>

<p className="mt-6 text-center italic text-lg leading-8 text-gray-700 min-h-[110px]">
“{r.review}”
</p>

<div className="mt-6 text-center">
<h3 className="text-2xl font-bold text-[#0B3C8C]">{r.name}</h3>
<span className="mt-2 inline-block rounded-full bg-green-100 px-4 py-2 text-green-700 font-semibold">
✔ Verified Google Review
</span>
</div>

<div className="mt-8 flex items-center justify-center gap-5">

<button onClick={()=>setCurrent((current-1+reviews.length)%reviews.length)}
className="rounded-full border border-green-200 px-4 py-2 hover:bg-green-50 transition">
←
</button>

<div className="flex gap-2">
{reviews.map((_,i)=>(
<button key={i}
onClick={()=>setCurrent(i)}
className={i===current?"h-3 w-8 rounded-full bg-green-600":"h-3 w-3 rounded-full bg-gray-300"} />
))}
</div>

<button onClick={()=>setCurrent((current+1)%reviews.length)}
className="rounded-full border border-green-200 px-4 py-2 hover:bg-green-50 transition">
→
</button>

</div>

</div>

<div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
<a href="https://www.google.com/maps/place/Aarvya+Naturals/@11.0706702,76.9988664,4266m/data=!3m1!1e3!4m8!3m7!1s0x3ba8f76c5f7439a3:0x4b3d34e6a019e95!8m2!3d11.0663475!4d77.0017267!9m1!1b1!16s%2Fg%2F11zcnwhgzn?entry=ttu&g_ep=EgoyMDI2MDcyNi4wIKXMDSoASAFQAw%3D%3D" target="_blank"
className="rounded-full bg-[#0B3C8C] px-8 py-3 text-white font-semibold hover:scale-105 transition">
⭐ View Google Reviews
</a>

<a href="https://g.page/r/CZWeAWpO07MEEBM/review" target="_blank"
className="rounded-full bg-green-600 px-8 py-3 text-white font-semibold hover:scale-105 transition">
✍ Write a Review
</a>
</div>

</div>

</section>
);
}
