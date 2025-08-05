import { MdEmail } from 'react-icons/md';
import { BiLogoFacebook, BiLogoInstagram, BiLogoGithub } from 'react-icons/bi';
import { BsTwitter } from "react-icons/bs";
import masterCard from "../../assets/images/Mastercard-Logo.png"
import paypal from "../../assets/images/paypal.png"
import GPay from "../../assets/images/googlePay.png"
import visa from "../../assets/images/VISA-logo.png"
import ApplePay from "../../assets/images/apple-pay.png"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-footerBackground dark:bg-dark  text-gray-700 pt-20 lg:p-0  mt-20">
      <div className="container mx-auto px-4 ">
        <div className="relative   flex flex-col md:flex-row justify-between items-center bg-buttonBackground p-6 rounded-2xl mb-10 text-inputBackground transform -translate-y-1/3 sm:-translate-y-1/2 md:-translate-y-1/2 lg:-translate-y-[50%]">
          <h2 className="text-3xl md:text-3xl font-bold w-full md:w-1/2 lg:text-start md:text-left mx-7 sm:text-start mb-7 lg:mb-0">
            STAY UPTO DATE ABOUT OUR <br /> LATEST OFFERS
          </h2>
          <div className="flex flex-col gap-3 w-full md:w-1/3 mx-7">
            <div className="relative">
              <MdEmail className="absolute text-slate-300 top-3 left-5 mt-1" size={20} />
              <input
                type="text"
                placeholder="Enter your email address"
                className="bg-buttonColor px-12 py-3 rounded-[62px] w-full caret-slate-600 text-slate-600"
              />
            </div>
            <button className="bg-buttonColor text-buttonBackground px-3 py-3 rounded-[62px]">Subscribe to Newsletter</button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start text-sm mb-10 -mt-20 dark:text-slate-300 ">
          <div className="w-full md:w-1/5 mr-16 ">
            <h3 className="font-bold text-4xl mb-3 text-buttonBackground dark:text-white"><Link to={"/"}>SHOP.CO</Link></h3>
            <p className="text-descriptionColor md:w-auto sm:w-[358px] font-inter dark:text-white">
              We have clothes that suit your style and which you're proud to wear. From women to men.</p>
            <div className="flex my-4 space-x-4 sm:mb-5 ">
              <BsTwitter className=" dark:text-slate-300 rounded-full border border-slate-300 p-1 text-black" size={28} />
              <BiLogoFacebook className=" dark:text-slate-300 rounded-full bg-black border border-slate-300 p-1 text-white" size={28} />
              <BiLogoInstagram className=" dark:text-slate-300 rounded-full border border-slate-300 p-1 text-black" size={28} />
              <BiLogoGithub className=" dark:text-slate-300 rounded-full border border-slate-300 p-1 text-black" size={28} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:grid-cols-4 md:space-x-6 w-full md:w-4/5 mb-5">
            <div className="space-y-4 ">
              <h3 className="font-bold text-lg mb-3 text-buttonBackground dark:text-white">COMPANY</h3>
              <ul className="space-y-2">
                <li><a href="#">About</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Works</a></li>
                <li><a href="#">Career</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-3 text-buttonBackground dark:text-white">HELP</h3>
              <ul className="space-y-2 ">
                <li><a href="#">Customer Support</a></li>
                <li><a href="#">Delivery Details</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-3 text-buttonBackground dark:text-white">FAQ</h3>
              <ul className="space-y-2">
                <li><a href="#">Account</a></li>
                <li><a href="#">Manage Deliveries</a></li>
                <li><a href="#">Orders</a></li>
                <li><a href="#">Payments</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-3 text-buttonBackground dark:text-white">RESOURCES</h3>
              <ul className="space-y-2 ">
                <li><a href="#">Free eBooks</a></li>
                <li><a href="#">Development Tutorial</a></li>
                <li><a href="#">How to - Blog</a></li>
                <li><a href="#">Youtube Playlist</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t pt-10 py-10 ">
          <p className="text-sm dark:text-white">&copy; Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex space-x-4 items-center mt-4 md:mt-0">
            <img src={visa} alt="visaCard" width="30" />
            <img src={masterCard} alt="masterCard" width="30" />
            <img src={paypal} alt="payplaCard" width="40" />
            <img src={GPay} alt="googleCard" width="40" />
            <img src={ApplePay} alt="AppleCard" width="40" />
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
