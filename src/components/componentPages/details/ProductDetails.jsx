import React, { useState } from "react";
import MainQuantity from "../../ui/MainQuantity";
import Button from "../../ui/Button";
import MainSize from "../../ui/MainSize";
import MainReviews from "../../ui/MainReviews";
import Color from "../../ui/Color";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useGetUserQuery } from "../../../redux/RTK/loginApi";
import { useAddToCartMutation } from "../../../redux/RTK/cartApi";
import { ToastError, ToastSuccess } from "../../ui/Toast";
import { useCountOrdersQuery, useGetOrdersQuery } from "../../../redux/RTK/adminDashboardApi";
import LoaderSpinner from "../../ui/LoaderSpinner";

const ProductDetails = ({ product }) => {
  const { data:user } = useGetUserQuery()
  const [count, setCount] = useState(1); // order quantity
  const isUserExist = !!localStorage.getItem("role")
  const [addToCart, {isLoading}] = useAddToCartMutation()
  const { refetch: refetchCount } = useCountOrdersQuery()
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  const clientOrder = { selectedColor: selectedColor , selectedSize: selectedSize , quantity: count }

  async function handleAddToCart() {
    const quantity = Number(count)
    try {
      await addToCart({ count: quantity, productId: product?._id, userId: "670e2e1d58277efbe52cabd1" }).unwrap()
      if (!isUserExist) {
        ToastError("You Must Login Before Add To Your Cart") 
      } else { 
        ToastSuccess("Order has been added ")
        refetchCount()
      }
    } catch (error) {
      console.log(error?.errors[0].msg)
    }
  }

  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="font-cairo font-bold">{product?.title}</h3>
      <p className="text-descriptionColor dark:text-slate-300">{product?.description}</p>
     
      <div className="flex gap-2 items-center">
        <MainReviews rate={product?.ratingsAverage} />
        <h4> {product?.priceAfterDiscount}$ </h4>
        <h4 className="text-gray-400 line-through"> {product?.price}$ </h4>
        <small className="bg-discountBackground text-discountColor rounded-buttonRadius p-1">
          -40%
        </small>
      </div>
      <hr className="text-descriptionColor" />

      <div>
        <p className="text-descriptionColor mb-4 dark:text-white">select colors</p>
        <Color colors={product?.colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      </div>

      <hr className="text-descriptionColor" />

      <div>
        <p className="mb-4 text-descriptionColor dark:text-white">choose sizes</p>
        <MainSize
          sizes={[product?.size]}
          className={`rounded-buttonRadius p-sizeSm lg:p-sizeLg `}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </div>

      <div className="flex gap-3 my-6 flex-row  md:flex-row lg:flex-row items-center">
        <div
          className={`flex items-center gap-5 `}
        >
          <button
            onClick={() => setCount((pre) => pre + 1)}
            className=" p-2 flex justify-center items-center rounded-[50%] bg-black text-white "
          >
            <FaPlus className="cursor-pointer" />
          </button>

          <span>{count}</span>
          <button onClick={() => count !== 1 && setCount((pre) => pre - 1)}
            className="p-2 flex justify-center items-center rounded-[50%] border border-black "
          >
            <FaMinus className="cursor-pointer" />
          </button>
        </div>
        
        <button
          className="lg:w-[400px] md:w-[200px] w-[236px] bg-forground p-3 hover:bg-black/50  hover:text-white text-white  rounded-buttonRadius"
          onClick={() => handleAddToCart()}
        >
          {isLoading ? <LoaderSpinner/> : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
