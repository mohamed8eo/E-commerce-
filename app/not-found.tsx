import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopNav from "@/components/TopNav";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <TopNav/>
      <Navbar/>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12">
        {/* Breadcrumb */}
        <div className="w-full max-w-5xl mb-8">
          <nav className="text-gray-400 text-sm flex items-center gap-2 pl-1">
            <span>Home</span>
            <span>/</span>
            <span className="text-black font-medium">404 Error</span>
          </nav>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <h1 className="text-[64px] sm:text-[96px] font-bold mb-4">404 Not Found</h1>
          <p className="text-lg text-gray-700 mb-8 text-center">Your visited page not found. You may go home page.</p>
          <Link href="/" className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md px-8 py-4 transition text-lg">
            Back to home page
          </Link>
        </div>
      </div>
      <Footer/>
    </>
  );
} 