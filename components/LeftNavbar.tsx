"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";

const LeftNavbar = () => {
  const pathname = usePathname();
  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <div>      <div className="flex items-center gap-8 lg:gap-[190px]"> 
    <Link href="/">
      <h1 className="text-2xl font-extrabold">Exclusive</h1>
    </Link>
    {/* Desktop nav links */}
    <ul className="hidden md:flex items-center gap-6 lg:gap-[48px] ">
      {links.map(link => (
        <li key={link.path} className='text-[16px] leading-[24px] font-normal'>
          <Link
            href={link.path}
            className={`relative px-2 py-1 transition-colors duration-200
              ${pathname === link.path ? 'text-[#0c0a13] font-semibold' : 'text-gray-700 hover:text-[#0c0a13]'}
              before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5
              before:bg-[#0c0a13] before:transform before:scale-x-0 before:transition-transform before:duration-200
              ${pathname === link.path ? 'before:scale-x-100' : 'hover:before:scale-x-100'}
            `}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
    {/* Mobile nav menu button */}

  </div></div>
  )
}

export default LeftNavbar