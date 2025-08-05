import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignupTopbar from "../ui/SignupTopbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Layout = () => {
  const isUserExist = !!localStorage.getItem("role")
  const {theme} = useSelector((state) => state.theme)

  useEffect(() => {
    const root = document.getElementById("root")
    if (theme === "dark") {
      root.classList.add("dark")
      root.style.backgroundColor = "#0a0a0a"
      root.style.color = "white"
    } else {
      root.classList.remove("dark")
      root.style.backgroundColor = "white"
      root.style.color = "black"
    }
  }, [theme])
  
  return (
    <>
      {!isUserExist && <SignupTopbar />}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
