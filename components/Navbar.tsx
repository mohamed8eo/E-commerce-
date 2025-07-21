import LeftNavbar from "./LeftNavbar"
import RightNavbar from "./RightNavbar"


const Navbar = () => {


  return (
    <div className="w-full px-4 py-4 flex items-center justify-between bg-white shadow-sm">
      {/* Left: Logo and nav links */}
        <LeftNavbar/>
      {/* Right: Search and cart and user button (desktop only) */}
        <RightNavbar/>
    </div>
  )
}

export default Navbar