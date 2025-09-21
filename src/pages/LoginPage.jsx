import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()

  const { theme } = useSelector((state) => state.theme)
  const data = useSelector(store => store.login);
  const navigate = useNavigate();

  const handleClickShowPassword = (e) => {
    setShowPassword(!showPassword)
  }

  const handleLogin = (data) => {
   try {
     dispatch(loginUser(data));
     navigate("/");
   } catch (error) {
    return error;
   }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("Email Is Required *").matches(/^[a-zA-Z0-9]+@(gmail|yahoo)\.com$/, "Invalid Email Address"),
    password: Yup.string().required("Password Is Required *").min(6, "Password Must Be At least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      await handleLogin(values)
    },
  });


  return (
    <div className="bg-inputBackground dark:bg-dark py-16">
      <div className="container flex items-center justify-center">
        <form className="w-[95%] max-w-[480px] md:w-[480px] bg-white shadow-xl mx-auto px-6 pb-10 pt-5 rounded-lg" onSubmit={formik.handleSubmit}>
          <h2 className="mb-3 text-[30px] text-center font-cairo dark:text-black ">Login</h2>
          <div className="mb-5">
            <Input type="email" placeholder="Enter Email Address" inputLabel={"Username"} inputLabelId={"user-name"} styles={"w-[100%]"} change={formik.handleChange} blur={formik.handleBlur} value={formik.values.email} inputName={"email"} />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-700 text-[15px]">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <Input type={showPassword ? "text" : "password"} placeholder="Enter Your Password" inputLabel={"Password"} inputLabelId={"password"} styles={"w-[100%]"} change={formik.handleChange} blur={formik.handleBlur} value={formik.values.password} inputName={"password"} />
            <div onClick={handleClickShowPassword}
              className='relative'>
              {showPassword ? <MdVisibilityOff size={18} style={{ position: 'absolute', right: '5px', bottom: "15px" ,  color: theme === "dark" ? 'black' : 'white' }} /> : <MdVisibility size={18} style={{ position: 'absolute', right: '5px', bottom: "15px",  color: theme === "dark" ? 'black' : 'white'  }} />}
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-700 font-inter text-[15px]">{formik.errors.password}</div>
            ) : null}
          </div>
          <Button children={"Login"} isLoading={data?.loading} className="block py-[10px] mx-auto rounded-lg dark:hover:text-black" type={'sumbit'} />
          <span className="flex justify-center gap-2 mt-3 text-center text-[15px]">
            <span className="text-placeholderColor">Create Your Account</span>
            <button
              onClick={() => navigate("/register")}
              className="cursor-pointer underline decoration-2 text-bold text-[16px] dark:text-black "
              >Sign Up</button>
          </span>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

