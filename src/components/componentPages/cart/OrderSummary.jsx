import React from 'react';
import { BsArrowRight } from "react-icons/bs";
import { AiFillTag } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import Button from "../../ui/Button";
// import { applyPromoCode } from "../../../redux/features/cartsSlice"; 
const OrderSummary = ({updatedOrder}) => {

  const subtotal = updatedOrder?.reduce((acc, item) => acc + item.orderItems[0].product.price * item.orderItems[0].quantity, 0) || 0;
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;
  
  return (
    <div className="w-full max-h-fit p-5 rounded-lg shadow-md border-[1px] border-slate-300/50">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-black dark:text-white">Order Summary</h2>

      <div className="mb-4 flex justify-between text-base font-inter">
        <p className='text-descriptionColor dark:text-slate-300'>Subtotal</p>
        <p className='font-bold'>${subtotal.toFixed(2)}</p>
      </div>
      <div className="mb-4 flex justify-between text-base font-inter">
        <p className='text-descriptionColor dark:text-slate-300'>Discount (-20%)</p>
        <p className='text-red-500 font-bold'>-${discount.toFixed(2)}</p>
      </div>
      <div className="mb-4 flex justify-between text-base font-inter border-b my-5">
        <p className='text-descriptionColor dark:text-slate-300'>Delivery Fee</p>
        <p className='font-bold'>${deliveryFee}</p>
      </div>
      <div className="mb-4 flex justify-between text-base font-inter my-5">
        <p>Total</p>
        <p className='text-sm lg:text-lg font-bold '>${total.toFixed(2)}</p>
      </div>

      {updatedOrder?.length > 0 && (
        <>
          <div className="flex sm:hidden items-center justify-between mb-4">
            <div className="relative w-3/4 px-2">
              <AiFillTag className="absolute left-6 top-1/2 transform -translate-y-1/2 scale-x-[-1] text-gray-500" />
              <input
                type="text"
                placeholder="Add Promo code"
                className="bg-gray-200 p-2 pl-10 rounded-3xl w-full border-none"
                
              />
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-3xl hover:bg-gray-500  hover:bg-transparent hover:text-inherit ">
              Apply
            </button>
          </div>
          <div className='text-center mt-4'>
            <Button className="flex items-center justify-center my-7 mx-auto">
              Go to Checkout
              <BsArrowRight className='ml-2 text-lg sm:text-xl' />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;