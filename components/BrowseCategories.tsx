import React from "react";
import Link from "next/link";
import { Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2 } from "lucide-react";

const categories = [
  { name: "Phones", icon: <Smartphone size={40} /> },
  { name: "Computers", icon: <Monitor size={40} /> },
  { name: "SmartWatch", icon: <Watch size={40} /> },
  { name: "Camera", icon: <Camera size={40} /> },
  { name: "HeadPhones", icon: <Headphones size={40} /> },
  { name: "Gaming", icon: <Gamepad2 size={40} /> },
];

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const BrowseCategories = () => (
  <section className="w-full max-w-7xl mx-auto mt-16">
    <div className="flex items-center gap-2 mb-2">
      <span className="w-4 h-8 bg-red-400 rounded-sm inline-block"></span>
      <span className="text-red-500 font-semibold text-lg">Categories</span>
    </div>
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-4xl font-bold">Browse By Category</h2>
      <div className="flex gap-3">
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
    <div className="flex gap-6 justify-center">
      {categories.map((cat) => (
        <Link key={cat.name} href={`/category/${slugify(cat.name)}`} className="flex flex-col items-center justify-center w-56 h-44 border border-gray-300 rounded-xl bg-white hover:shadow transition">
          {cat.icon}
          <span className="mt-4 text-lg font-medium">{cat.name}</span>
        </Link>
      ))}
    </div>
  </section>
);

export default BrowseCategories; 