import {useEffect, useState } from 'react'
import OrderTable from '../components/componentPages/dashboard/OrderTable'
import OrderStatusSummary from '../components/componentPages/dashboard/OrderStatusSummary'
import Pagination from '../components/componentPages/dashboard/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersData } from '../features/ordersSlice'
import BreadCrumb from '../components/ui/BreadCrumb'

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const data = useSelector((state)=> state.orders);
    const pagination = data?.data?.pagination
    const [page, setPage] = useState(1)

    useEffect(()=>{
        dispatch(fetchOrdersData({page, limit: pagination?.limit}))
    },[])

    const handleChangePage = (newPage) => {
        setPage(newPage)
        dispatch(fetchOrdersData({params: {...data?.filters, page: newPage, limit: pagination?.limit}}))
    }

    return (
        <div className="container mx-auto mt-10">
            <BreadCrumb/>
            <div className='flex flex-col md:flex-row'>
                <div className="flex-1 p-4">
                    <OrderStatusSummary />
                    <OrderTable/>
                    <Pagination
                        currentPage={page}
                        totalPages={pagination?.totalPages}
                        onPageChange={handleChangePage}
                    />
                </div>
             </div>
         </div>
    )
}

export default AdminDashboard
