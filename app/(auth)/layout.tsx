import { ReactNode } from "react"
import Navbar from "@/components/Navbar";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const Authlayout = ({children}:{children: ReactNode}) => {
  return (
    <div className="auth-layout">
        <TopNav/>
        <Navbar />
        {children}
        <Footer/>
    </div>
  )
}

export default Authlayout