import TopNav from "@/components/TopNav";
import { ReactNode } from "react";


const Layout = async ({ children }: { children: ReactNode }) => {

  return (
    <>
    <div className="flex items-center justify-center bg-black">
      <nav className="relative w-full max-w-4xl">
        <TopNav/>
      </nav>
      </div>
      <div>
      {children}
      </div>
    </>
  );
};

export default Layout; 