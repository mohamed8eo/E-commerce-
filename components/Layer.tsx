import Link from 'next/link';
import React from 'react'

const Layer = () => {
  const categories = [
    "Woman’s Fashion",
    "Men’s Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby’s & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  // Helper to create slugs for URLs
  const slugify = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return (
    <ul className="flex flex-col items-center gap-4 text-[16px] font-normal leading-[24px] text-gray-900">
    {categories.map((category, index) => (
      <li key={index} className="w-full">
        <Link href={`/category/${slugify(category)}`}
          className="flex items-center justify-between w-full gap-2 group hover:text-blue-600 transition-colors">
          <span className="whitespace-nowrap">{category}</span>
          {(category === "Woman’s Fashion" || category === "Men’s Fashion") && (
            <svg className="w-5 h-5 text-gray-700 group-hover:text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          )}
        </Link>
      </li>
    ))}
  </ul>
  )
}

export default Layer