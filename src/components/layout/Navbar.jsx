import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { MdMenu } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Drawer from "./Drawer";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/Button";
import { LuLogIn } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../redux/RTK/loginApi";
import { useCountOrdersQuery } from "../../redux/RTK/adminDashboardApi";
import { useLogoutMutation } from "../../redux/RTK/logoutApi";
import { ToastSuccess } from "../ui/Toast";
import { FaRegMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, toggleTheme } from "../../redux/themeSlice";


function Navbar() {
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const dropdownRef = useRef(null);
  const [loginDropdownStatus, setLoginDropdownStatus] = useState(false);
  const loginDropdownRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate()

  const { theme } = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const switchTheme = theme === "dark" ? 'text-black' : ''

  const isLogged = !!localStorage.getItem("role") 
  const { data: user } = useGetUserQuery()
  const { data: total } = useCountOrdersQuery()
  const [logout] = useLogoutMutation()
  
  const handleDropdown = () => {
    setDropdownStatus((prev) => !prev);
  };


  const handleLoginDropdown = () => {
    setLoginDropdownStatus((prev) => !prev);
  };


  const handleDrawerOpen = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleSearchOpen = () => {
    setSearchOpen((prev) => !prev);
  };


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownStatus(false);
    }

    if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target)) {
      setLoginDropdownStatus(false);
    }

    if (drawerOpen && drawerRef.current && !drawerRef.current.contains(event.target)) {
      setDrawerOpen(false);
    }

    if (searchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      localStorage.removeItem("role")
      ToastSuccess("You've logged out successfully! ")
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen, searchOpen]);


  return (
    // Start Navbar
    <div className="dark:bg-dark dark:shadow-slate-300/20 shadow-md">
      <div className="container flex justify-between items-center gap-4 py-3">
        <div className="flex items-center gap-3  ">
          <span className="text-4xl md:block lg:hidden cursor-pointer " onClick={handleDrawerOpen}>
            <MdMenu />
          </span>
          <h1 className="flex text-[25px] lg:text-[32px] font-bold font-cairo lg:mr-[20px]"><Link to={"/"}>SHOP.CO</Link></h1>
        </div>

        {/* Start Links */}
        <ul className="showDropDown font-inter hidden lg:flex flex-row gap-4 items-center">
          <li className="dropdown flex items-center relative right-[-10px]" onClick={handleDropdown} ref={dropdownRef}>
            <span className="cursor-pointer">Shop</span>
            <RiArrowDropDownLine className="text-[25px] mt-1 cursor-pointer" />
            <ul className={dropdownStatus ? "show-dropdown flex flex-col py-3 px-2 z-10 bg-white absolute w-[150px] shadow-custom rounded-md" : "hidden"} style={{ top: 'calc(100% + 5px)' }}>
              <li className="px-3 py-2 hover:bg-headerBackground duration-300"><Link to="/category/men">Men</Link></li>
              <li className="px-3 py-2 hover:bg-headerBackground duration-300"><Link to="/category/women">Women</Link></li>
              <li className="px-3 py-2 hover:bg-headerBackground duration-300"><Link to="/category/kids">Kids</Link></li>
              <li className="px-3 py-2 hover:bg-headerBackground duration-300"><Link to="/category/accessories">Accessories</Link></li>
            </ul>
          </li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/offer">Best Offers</NavLink></li>
          {user?.role === "admin" && <li><NavLink to="/admin">Dasboard</NavLink></li>}
          {/* <li><NavLink to="/">Brands</NavLink></li> */}
        </ul>
        {/* End Links */}

        {/* Start Search */}
        <div className="lg:flex items-center flex-1 font-inter hidden ">
          <CiSearch className="text-[20.27px] relative left-7  placeholder-placeholderColor dark:text-slate-300" />
          <input type="search" name="search" id="search" placeholder="Search for products..." className="block rounded-buttonRadius bg-inputBackground dark:text-black py-[12px] pr-4 pl-8 border-none flex-1" />
        </div>
        {/* End Search */}

        {/* Start Icons */}
        <div className="flex items-center gap-5 text-buttonBackground font-inter dark:text-white">
          <span className=" lg:hidden mr-[-8px] cursor-pointer" onClick={handleSearchOpen} >
            <CiSearch className="text-[22px]" />
          </span>
          <span className="relative cursor-pointer ">
            <Link to="/cart">
              <FiShoppingCart className="text-[22px]" />
            </Link>
            <span className="absolute top-[-15px] left-[10px] w-[20px] h-[20px] flex justify-center items-center text-sm p-3 text-white rounded-full bg-red-700">{total?.orderCount}</span>
          </span>
          {
            isLogged ? <span className="cursor-pointer relative dark:text-white" onClick={handleLoginDropdown} ref={loginDropdownRef}  >
              <FaRegCircleUser className="text-[22px]" />
              <ul className={loginDropdownStatus ? "show-dropdown flex flex-col py-3 px-2 bg-white absolute w-[150px] shadow-custom rounded-md z-10" : "hidden"} style={{ top: 'calc(100% + 15px)', right: 'calc(-100%)' }}>
                <li className="px-2 py-2  hover:bg-headerBackground duration-300 dark:text-black "><Link to="/">Account</Link></li>
                <li className="px-2 py-2  hover:bg-headerBackground duration-300 dark:text-black"><Link to="/orders">Orders</Link></li>
                <li className="px-2 py-2  hover:bg-headerBackground duration-300 border-b border-headerBackground dark:text-black"><Link to="/">Address</Link></li>
                <li className="px-2 py-2 hover:bg-headerBackground duration-300 text-discountColor" onClick={()=> handleLogout()} >logout</li>
              </ul>
            </span> :
              <span >
                {
                  <LuLogIn className="lg:hidden text-[22px] cursor-pointer" onClick={()=> navigate("/login")} />
                }
                <Button click={() => navigate("/login")} children={"Login"} className="py-[10px] px-[40px] hidden lg:block" />
              </span>
          }
          {theme === "light" ?
            <FaRegMoon onClick={() => dispatch(toggleTheme())} className="dark:text-white" />
            :
            <MdOutlineWbSunny onClick={() => dispatch(toggleTheme())} className="dark:text-white"  />}
        </div>
        {/* End Icons */}

        {/* Start Search Overlay */}
        {searchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="relative z-50  min-w-[75%]" ref={searchRef}>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search for products..."
                className="block rounded-[62px] bg-inputBackground py-[12px] pr-4 pl-8 border-none w-full"
              />
            </div>
            <IoMdClose
              className="absolute top-5 right-5 text-white text-[30px] cursor-pointer z-50"
              onClick={() => setSearchOpen(false)}
            />
          </div>
        )}
        {/* End Search Overlay */}
      </div >

      {/* Start Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 w-72 bg-white dark:bg-dark py-3 px-5 h-full z-50 shadow-lg">
            <div ref={drawerRef}>
              <Drawer  onClose={() => setDrawerOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* End Drawer */}

    </div >
    // End Navbar
  )
}

export default Navbar
