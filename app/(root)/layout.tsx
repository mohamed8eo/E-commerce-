import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
const Layout = async ({ children }: { children: ReactNode }) => {

  return (
    <>
      <div>
        <TopNav/>
        <Navbar />
        {children}
        <Footer/>
      </div>
    </>
  );
};

export default Layout; 