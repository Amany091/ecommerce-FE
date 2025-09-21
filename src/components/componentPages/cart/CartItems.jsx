import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Modal from '../../ui/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, fetchCartItem } from '../../../features/cartSlice';

const CartItems = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.cart);
  const cartItem = data?.item?.data ?? {};
  const { data: cart } = data?.data ?? [];
  const [showModal, setShowModal] = useState(false)
  
  const handleDeleteOrder = (id) => {
      dispatch(deleteCartItem(id))
      setShowModal(false)
    }
  
    const handleFetchOrder = (id) => {
      setShowModal(true)
      dispatch(fetchCartItem(id))
    }

  
  return (
    <>
      <div className=" p-5 rounded-lg shadow-md border-[1px] border-gray-300 h-fit">
      {cart?.length === 0 && data?.loading === false ? (
        <div className='flex justify-center items-center font-bold text-2xl'>
          <p>Your cart is empty</p>
        </div>
        ) : 
            <div className="flex flex-col gap-10">
              {cart?.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex gap-3`}
                >
                  <img src={item.orderItems[0].product?.imgCover} alt={item.orderItems[0].product?.title} className="w-[20%] h-full rounded-xl" />
    
                  <div className="flex-1 ">
                    <div className="relative flex flex-col items-baseline gap-x-3">
                      <button  className="text-red-500 border-none">
                        <FaTrash className='absolute right-0' onClick={()=>handleFetchOrder(item?._id)} />
                      </button>
                      <div className='flex flex-col'>
                        <p className="font-bold sm:text-xs lg:text-lg"> {item.orderItems[0].product?.title} </p>
                        <small> Size : {item.orderItems[0].product?.size} </small>
                        <small> color: {[item.orderItems[0].product?.color].map((color)=> (color))} </small>
                      </div>
                    </div>
                    
                    <div key={index} className="flex justify-between items-center mt-5">
                      <p className="text-black font-bold font-inter text-xl dark:text-white ">${item.orderItems[0].product?.price}</p>
                      <div className="flex items-center p-1 rounded-3xl bg-gray-200">
                        <span className="text-gray-500 mx-2">
                          {/* <CgMathMinus /> */}
                        </span>
                        <p className="mx-4 dark:text-black">{ item.orderItems[0]?.quantity}</p>
                        <span className="text-gray-500 mx-2">
                          {/* <CgMathPlus /> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      }
      </div>
      {showModal && (
        <Modal>
          <p className='font-bold text-xl'>Confirm Delete Order</p>
          <div className='flex gap-5'>
            <button className='bg-green-600 p-2 w-14 rounded' onClick={()=>handleDeleteOrder(cartItem?._id)} >Yes</button>
            <button className='bg-red-500 p-2 rounded' onClick={()=> setShowModal(false)} >No</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CartItems;