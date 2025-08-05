import React, { useEffect, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import * as Yup from "yup"
import { useFormik } from "formik"
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useRegisterMutation } from '../redux/RTK/registerApi'
import { ToastError, ToastSuccess } from '../components/ui/Toast'
import LoaderSpinner from '../components/ui/LoaderSpinner'
import { useSelector } from 'react-redux'

const RegisterPage = () => {

  const {theme} = useSelector((state)=> state.theme)
  const [register, { data, isSuccess, isLoading }] = useRegisterMutation()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const validateSchema = Yup.object({
    firstname: Yup.string().required("Required Field"),
    lastname: Yup.string().required("Required Field"),
    name: Yup.string(),
    email: Yup.string().required("Required Field").matches(/^[a-zA-Z0-9]+@(gmail|yahoo)\.com$/, "invalid email address"),
    password: Yup.string().required("Required Field").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!, @, #, $, %, ^, &, *)"),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const handleForm = async (data) => {
    try {
      await register({ data }).unwrap()
      ToastSuccess("User added successfully")
      navigate('/login')
    } catch (error) {
      ToastError(error?.errors[0].msg)
    }
     

  }

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: validateSchema,
    onSubmit: (values) => handleForm(values)
  })

  useEffect(() => {
    formik.setFieldValue('name', `${formik.values.firstname} ${formik.values.lastname}`)
  }, [formik.values.firstname, formik.values.lastname])

  const handleClickShowPassword = (e) => {
    e.stopPropagation()
    setShowPassword(!showPassword)
  }
  
  return (
    <div className='bg-inputBackground dark:bg-dark py-16'>
      <div className="container flex items-center justify-center">
        <form className="w-[95%] max-w-[520px] md:w-[520px] bg-white shadow-xl mx-auto px-6 pb-10 pt-5 rounded-lg" onSubmit={formik.handleSubmit}>
          <h2 className="mb-3 text-[28px] text-center font-cairo dark:text-black">Create Your Account</h2>
          <div className='flex gap-5 '>
            <div className="mb-5 w-full">
              <Input type="text" placeholder="Firstname" inputLabel={"Firstname"} inputLabelId={"firstname"} styles={"w-[100%]"} change={formik.handleChange} blur={formik.handleBlur} value={formik.values.firstname} inputName={"firstname"} />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="text-red-700 font-inter text-[15px]">{formik.errors.firstname}</div>
              ) : null}
            </div>
            <div className="mb-5 w-full">
              <Input type="text" placeholder="Lastname" inputLabel={"Lastname"} inputLabelId={"lastname"} styles={"w-[100%]"} change={formik.handleChange} blur={formik.handleBlur} value={formik.values.lastname} inputName={"lastname"} />
              {formik.touched.lastname && formik.errors.lastname ? (
                <div className="text-red-700 font-inter text-[15px]">{formik.errors.lastname}</div>
              ) : null}
            </div>
          </div>
          <div className="mb-5">
            <Input type="email" placeholder="Email" inputLabel={"Email"} inputLabelId={"firstname"} styles={"w-[100%]"} change={formik.handleChange} blur={formik.handleBlur} value={formik.values.email} inputName={"email"} />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-700 font-inter text-[15px]">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <Input type={showPassword ? "text" : "password"} placeholder="Password" inputLabel={"Password"} inputLabelId={"password"} styles={"w-[100%]"} change={formik.handleChange} blur={formik.handleBlur} value={formik.values.password} inputName={"password"} />
            <div aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              className='relative'>
              {showPassword ? <MdVisibilityOff size={18} style={{ position: 'absolute', right: '5px', bottom: "15px", color: theme === "dark" ? 'black' : 'white' }} /> : <MdVisibility size={18} style={{ position: 'absolute', right: '5px', bottom: "15px",  color: theme === "dark" ? 'black' : 'white'  }} />}
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-700 font-inter text-[15px]">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <Input type={showPassword ? "text" : "password"} placeholder="Confirm Password" inputLabel={"Confirm Password"} inputLabelId={"passwordConfirm"} styles={"w-[100%]"} change={formik.handleChange} blur={formik.handleBlur} value={formik.values.passwordConfirm} inputName={"passwordConfirm"} />
            <div aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              className='relative'>
              {showPassword ? <MdVisibilityOff size={18} style={{ position: 'absolute', right: '5px', bottom: "15px",  color: theme === "dark" ? 'black' : 'white'  }} /> : <MdVisibility size={18} style={{ position: 'absolute', right: '5px', bottom: "15px",  color: theme === "dark" ? 'black' : 'white'  }} />}
            </div>
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
              <div className="text-red-700 font-inter text-[15px]">{formik.errors.passwordConfirm}</div>
            ) : null}
          </div>
          <Button children={ isLoading ? <LoaderSpinner/> : "Sign Up" }  type={'submit'} className="block py-[10px] mx-auto rounded-lg dark:hover:text-black" />
          <span className="flex justify-center gap-2 mt-3 text-center text-[15px]">
            <span className='text-placeholderColor'>Already have an account?</span>
            <Link className="underline decoration-2 text-bold text-[16px] dark:text-black" to={"/login"}>Sign In</Link>
          </span>
          <span className="block mt-2 text-center text-placeholderColor text-[13px]">
            By creating an account you agree to our <a href="#" className="text-blue-600" >Terms of Use</a> and <a href="#" className="text-blue-600" >Privacy Policy</a>.
          </span>
        </form>
      </div>

    </div>
  )
}

export default RegisterPage
