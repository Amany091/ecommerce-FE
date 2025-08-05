import { useState } from 'react';
import { FaCheckCircle, FaRegEye } from 'react-icons/fa'
import { TiDelete } from "react-icons/ti";
import LoaderSpinner from '../../ui/LoaderSpinner';
import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const OrderTable = ({ orders, completed, searchResult, onChangeOrderStatus, onSearchOrder, onDeleteOrder, isDirty, isLoading, loading }) => {

  const [orderId, setOrderId] = useState(null)
  const {theme} = useSelector((store)=> store.theme)
  
  const handleChangeOrderStatus = (id, status) => {
    setOrderId(id)
    onChangeOrderStatus(id, status).finally(() => {
      setOrderId(null)
    })
  }

  return (
    <div className="overflow-x-auto">
      <h2 className='text-2xl font-bold mb-4'>All orders</h2>
      <div className='relative'>
      <input
        type="text"
        placeholder="Search by order number or seller or status "
        className="border border-gray-300 rounded p-2 mb-4 w-full dark:text-black"
        onChange={(e) => onSearchOrder(e)}
      />
      {searchResult?.length == 0 && isDirty == true && <p className='text-red-600 absolute end-3 top-3 font-bold text-xs ' >not exist</p>}
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-4">
              <input
                className="h-5 w-5 border-2 border-gray-500 rounded"
                type="checkbox"
                checked={completed === orders?.length}
                readOnly
              />
            </th>
            <th className="px-6 py-6 text-sm md:text-base">Order number</th>
            <th className="px-6 py-6 text-sm md:text-base  sm:table-cell">Order date</th>
            <th className="px-6 py-6 text-sm md:text-base">Seller</th>
            <th className="px-6 py-6 text-sm md:text-base  lg:table-cell">Price</th>
            <th className="px-6 py-6 text-sm md:text-base">Order status</th>
            <th className="px-6 py-6 text-sm md:text-base">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? <LoaderSpinner/> : (searchResult.length > 0 ? searchResult : orders)?.map((order,index) => (
            <tr key={order.id} className="border-b border-slate-100 text-center">
              <td className="h-[100px] flex items-center justify-center gap-3">
                {loading && orderId === order.id && <Oval height={20} width={20} color={theme === "dark" ? "white" : "black"} /> }
                <input
                  type="checkbox"
                  checked={order.status === "complete"}
                  disabled={order.status === 'canceled'}
                  className="h-5 w-5 border-2 border-gray-500 rounded dark:text-black inline"
                  onClick={() => handleChangeOrderStatus(order.id, "complete")}
                  readOnly
                />
                
              </td>
              <td className="px-6 py-6 text-sm md:text-base">{order.number}</td>
              <td className="px-6 py-6 text-sm md:text-base  sm:table-cell">{order.orderDate}</td>
              <td className="px-6 py-6 text-sm md:text-base">{order.status == 'complete' ? order.user.name : ""}</td>
              <td className="px-6 py-6 text-sm md:text-base  lg:table-cell">{order.price}</td>
              <td className="px-6 py-6 text-sm md:text-base">
                {order.status === 'complete' ?
                  <FaCheckCircle className="text-green-500 mx-auto" /> :
                  <div className='flex items-center gap-1'>
                    <p>{order.status}</p>
                    {order.status === "pending" || order.status === "processing" ? <span className='inline-block w-2 h-2 rounded-full bg-orange-400' ></span> : <span className='inline-block w-2 h-2 rounded-full bg-red-600' ></span>}
                  </div>
                }
              </td>
              <td className="px-10 py-6 flex gap-1 justify-center items-center">
                <FaRegEye className='text-green-500 ' />
                {order.status === "pending" || order.status === 'canceled' || order.status === 'complete' ? "" : <TiDelete color='red' className='cursor-pointer' onClick={() => onDeleteOrder(order.id)} />}
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default OrderTable
