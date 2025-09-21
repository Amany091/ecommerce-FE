import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignupTopbar from "../ui/SignupTopbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../features/authSlice";

const Layout = () => {
  const {theme} = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user)
  const currentUser = user?.data?.data || {}
  const isUserExist = currentUser && Object.keys(currentUser).length > 0

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
    dispatch(getCurrentUser())
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
