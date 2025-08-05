import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartItems from '../components/componentPages/cart/CartItems';
import OrderSummary from '../components/componentPages/cart/OrderSummary';
import { Link } from 'react-router-dom';
import { AiFillCaretRight } from "react-icons/ai";
import { useCountOrdersQuery, useDeleteOrderMutation, useGetOrderMutation, useGetOrdersQuery } from '../redux/RTK/adminDashboardApi';

const CartPage = () => {
  const { data: total, refetch:refetchCount } = useCountOrdersQuery();
  const queryParams = { page: 1, limit: total?.orderCount }

  const { data: orders, isLoading, isSuccess, refetch } = useGetOrdersQuery(queryParams, {
    refetchOnFocus: true
  });
  
  const [getOrder, {data: currentOrder}] = useGetOrderMutation({
    // fixedCacheKey: "getOrder",
  })

  const [deleteOrder] = useDeleteOrderMutation()
  const [showModal, setShowModal] = useState(false)
  const [updatedOrder, setUpdatedOrders] = useState([])
  
  

  const handleDeleteOrder = async (id) => {
    const newOrders = orders?.filter((order) => order.id !== id)
    try {
      await deleteOrder(id).unwrap()
      setShowModal(false)
      refetch()
      setUpdatedOrders(newOrders)
      refetchCount()
    } catch (error) {
      console.log("Error occurred", error)
    }
  }

  
  const handleFetchOrder = (id) => {
    setShowModal(true)
    getOrder(id).unwrap()
  }

  // useEffect(() => {
  //   refetch()
  // }, [])

  useEffect(() => {
   if(isSuccess) setUpdatedOrders(orders)
  },[isSuccess, orders])
  

  return (
    <div className="container pb-20">
      <nav className="mb-5 flex mt-4 space-x-4 items-center">
        <Link to="/" className="text-gray-500 ">Home</Link>
        <AiFillCaretRight className='flex' />
        <span className='text-black'>Cart</span>
      </nav>
      <div>
        <h2 className="text-3xl font-bold mb-4">Your cart</h2>
        <div className="grid sm:grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
          <CartItems
            isLoading={isLoading}
            updatedOrder={updatedOrder}
            onFetchOrder={handleFetchOrder}
            onDeleteOrder={handleDeleteOrder}
            showModal={showModal}
            setShowModal={setShowModal}
            currentOrder={currentOrder}
          />
          <OrderSummary
             updatedOrder={updatedOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
