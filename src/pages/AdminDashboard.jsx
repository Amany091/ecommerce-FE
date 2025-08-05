import React, { useCallback, useEffect, useState } from 'react'
import DashboardSidebar from '../components/componentPages/dashboard/DashboardSidebar'
import OrderTable from '../components/componentPages/dashboard/OrderTable'
import OrderStatusSummary from '../components/componentPages/dashboard/OrderStatusSummary'
import { AiFillCaretRight } from 'react-icons/ai'
import { Link, useSearchParams } from 'react-router-dom'
import Pagination from '../components/componentPages/dashboard/Pagination'
import { useChangeOrderStatusMutation, useCountOrdersQuery, useDeleteOrderMutation, useGetOrdersQuery } from '../redux/RTK/adminDashboardApi'

const AdminDashboard = () => {
    // const currentPage = 1;
    const [limit, setLimit] = useState(5)
    const [searchParams, setSearchParams] = useSearchParams()
    const [shouldFetch, setShouldFetch] = useState(true)
    const [searchResult, setSearchResult] = useState([])
    const [isDirty, setIsDirty] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const currentPage = searchParams.get("page")
    let queryParams = { currentPage: Number(currentPage), limit: limit }

    const { data: total } = useCountOrdersQuery()
    const [setStatus, { data , isLoading:loading}] = useChangeOrderStatusMutation()
    const { data: orders, refetch, isLoading, isSuccess } = useGetOrdersQuery(queryParams, {
        // skip: !shouldFetch,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    const [updatedOrders, setUpdatedOrders] = useState([])
    const [deleteOrder] = useDeleteOrderMutation()

    const totalPages = Math.ceil(total?.orderCount / 5)
    const completed = 0, processing = 0, canceled = 0;

    const [orderStatus, setOrderStatus] = useState({
        completed: 0,
        processing: 0,
        canceled: 0,
        pending:0
    })

    useEffect(() => {
        if (orders) {
            const completedCount = orders.filter(order => order.status.toLowerCase() === "complete").length;
            const processingCount = orders.filter(order => order.status.toLowerCase() === "processing").length;
            const canceledCount = orders.filter(order => order.status.toLowerCase() === "canceled").length;
            const pendingCount = orders.filter(order => order.status.toLowerCase() === "pending").length;

            // Update the orderStatus state
            setOrderStatus({
                completed: completedCount,
                processing: processingCount,
                canceled: canceledCount,
                pending: pendingCount
            });

            setUpdatedOrders(orders)
            refetch()
        }
    }, [orders, updatedOrders])

    useEffect(() => {
        if(isSuccess) setUpdatedOrders(orders)
    },[isSuccess, orders])
    
    const handleChangeOrderStatus = async (id, status) => {
        let newStatus = { status: status }
        const updatedOrder = orders?.map((order) => order.id === id ? { ...order, status: newStatus.status } : order)
        try {
            await setStatus({ id, status: newStatus }).unwrap()
            setShouldFetch(true)
            refetch()
            setUpdatedOrders(updatedOrder)
        } catch (error) {
            console.log("Failed to update order status")
        }
    }

    const handleSearchOrder = useCallback((e) => {
        setIsSearch(true)
        let orderTerm = e.target.value.trim().toLowerCase()
        setLimit(!!orderTerm ? 16 : 5)
        setIsDirty(true)
        let filterResult = orders?.filter((order) => {
            return (
                order.status.toLowerCase().includes(orderTerm) ||
                order.number == orderTerm
                // order.user.name.includes(orderTerm)
            )
        })

        setSearchResult(filterResult)
    }, [orders, limit])

    const handleChangePage = (newPage) => {
        setSearchParams({ page: newPage })
    }

    const handleDeleteOrder = async (id) => {
        const newOrders = orders?.filter((order) => order.id !== id)
        try {
            await deleteOrder(id).unwrap()
            refetch()
            setUpdatedOrders(newOrders)
            
        } catch (error) {
            console.log("Failed to delete order")
        }
    }

    return (
        <div className="container mx-auto mt-10">
            <nav className="mb-5 flex mt-4 space-x-4 items-center">
                <Link to="/" className="text-gray-500">Dashboard</Link>
                <AiFillCaretRight className='flex' />
                <span className='text-black'>Orders</span>
            </nav>
            <div className='flex flex-col md:flex-row'>
                <DashboardSidebar />
                <div className="flex-1 p-4">
                    {/* handle life cycle when mounting */}
                    <OrderStatusSummary
                        orderStatus={orderStatus}
                    />
                    <OrderTable
                        orders={updatedOrders}
                        completed={completed}
                        searchResult={searchResult}
                        onChangeOrderStatus={handleChangeOrderStatus}
                        onSearchOrder={handleSearchOrder}
                        onDeleteOrder={handleDeleteOrder}
                        isDirty={isDirty}
                        isLoading={isLoading}
                        loading={loading}
                    />
                    <Pagination
                        currentPage={Number(currentPage)}
                        totalPages={totalPages}
                        onPageChange={handleChangePage}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
