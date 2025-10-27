import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, updateAllOrders, updateOrder } from '../../../features/ordersSlice';
import SearchOrder from './SearchOrder';
import {FaRegEye, FaCheckCircle} from "react-icons/fa"
import {TiDelete} from "react-icons/ti"

const OrderTable = () => {
  const dispatch = useDispatch()
  const data = useSelector((state)=> state.orders);
  const orders = data?.data?.data ?? [];
  
  const handleChangeOrderStatus = (id) => {
    dispatch(updateOrder({id, body: {status: "completed"}}))
  }

  const updateAllOrdersStatus = ()=>{
    dispatch(updateAllOrders())
  }

  return (
    <div className="overflow-x-auto">
      <h2 className='text-2xl font-bold mb-4'>All orders</h2>
      <div className='relative'>
      <SearchOrder/>
      </div>
          {orders?.length === 0 ? (
            <p className='text-center text-lg'>No orders yet</p>
          ) : (
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-4">
                  <input
                    className="h-5 w-5 border-2 border-gray-500 rounded"
                    type="checkbox"
                    onChange={updateAllOrdersStatus}
                    disabled={orders.every(order => order.status === 'completed')}
                    checked={orders.every(order => order.status === 'completed')}
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
              { orders?.map((order)=>(
                <tr key={order.id} className="border-b border-slate-100 text-center">
                  <td className="h-[100px] flex items-center justify-center gap-3">
                    <input
                      type="checkbox"
                      checked={order?.status === "completed"}
                      disabled={order?.status === 'completed'}
                      className="h-5 w-5 border-2 border-gray-500 rounded dark:text-black inline"
                      onChange={() => handleChangeOrderStatus(order?._id)}
                    />
                  </td>
                  <td className="px-6 py-6 text-sm md:text-base">{order.number}</td>
                  <td className="px-6 py-6 text-sm md:text-base  sm:table-cell">{order.orderDate}</td>
                  <td className="px-6 py-6 text-sm md:text-base">{order.user?.name}</td>
                  <td className="px-6 py-6 text-sm md:text-base  lg:table-cell">{order.price}</td>
                  <td className="px-6 py-6 text-sm md:text-base">
                    {order.status === 'completed' ?
                      <FaCheckCircle className="text-green-500 mx-auto" /> :
                      <div className='flex items-center gap-1'>
                        <p>{order.status}</p>
                        {/* {order.status === "pending" || order.status === "processing" ? <span className='inline-block w-2 h-2 rounded-full bg-orange-400' ></span> : <span className='inline-block w-2 h-2 rounded-full bg-red-600' ></span>} */}
                      </div>
                    }
                  </td>
                  <td className="px-10 py-6 flex gap-1 justify-center items-center">
                    {/* <FaRegEye className='text-green-500 ' /> */}
                    { <TiDelete 
                    color='red' 
                    className='cursor-pointer' 
                    onClick={() => dispatch(deleteOrder(order?.id))}
                    size={25} 
                    />}
                  </td>
                </tr>
              ))}  
            </tbody>
          </table>
          )}
      </div>
  )
}

export default OrderTable;
