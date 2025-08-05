import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Drawer({ onClose }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClose = () => {
    onClose();
  };

  const { theme } = useSelector((store) => store.theme)
  const switchTheme = theme === "dark" ? 'hover:text-black' : "hover:text-black"

  return (
    <>
      <div className="flex items-center justify-between ">
        <h1 className="text-[28px] font-bold font-cairo px-2">Shop.Co</h1>
        <IoMdClose className="text-[22px] cursor-pointer" onClick={handleClose} />
      </div>

      <ul className={`showDropDown font-inter flex flex-col gap-2 mt-10 `}>
        <li onClick={handleDropdown}><a href="#" className={`block border-b border-headerBackground `}>
          <span className={`flex justify-between ${switchTheme} hover:bg-headerBackground p-2 duration-300`}>
            Shop
            <RiArrowDropDownLine className="text-[25px] mt-1 cursor-pointer" />
          </span>
          <ul className={showDropdown ? "flex flex-col pb-5 max-h-fit transition-max-height duration-300" : "overflow-hidden max-h-0"}>
            <li className={`${switchTheme}`}><Link to="/category/men" className="block hover:bg-headerBackground duration-300 py-2 px-4 border-b border-headerBackground">Men</Link></li>
            <li className={`${switchTheme}`}><Link to="/category/women" className="block hover:bg-headerBackground duration-300 py-2 px-4 border-b border-headerBackground">Women</Link></li>
            <li className={`${switchTheme}`}><Link to="/category/kids" className="block hover:bg-headerBackground duration-300 py-2 px-4 border-b border-headerBackground">Kids</Link></li>
            <li className={`${switchTheme}`}><Link to="/category/accessories" className="block hover:bg-headerBackground duration-300 py-2 px-4">Accessories</Link></li>
          </ul>
        </a>
        </li>
        <li className={`${switchTheme}`}><Link to="/products" className="block hover:bg-headerBackground duration-300 p-2 border-b border-headerBackground">Products</Link></li>
        <li className={`${switchTheme}`}><Link to="/offer" className="block hover:bg-headerBackground duration-300 p-2 border-b border-headerBackground">Best Offers</Link></li>
      </ul>
    </>
  )
}

export default Drawer
