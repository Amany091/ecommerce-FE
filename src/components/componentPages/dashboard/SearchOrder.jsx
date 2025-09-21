import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersData, ordersActions } from '../../../features/ordersSlice';
import { debounce } from 'lodash';

export default function SearchOrder() {
     const data = useSelector((state) => state.orders);
     const dispatch = useDispatch();

    const debouncedFetchData = useMemo(
      () =>
        debounce((dispatch, params) => {
          dispatch(fetchOrdersData({ params }));
        }, 1000),
      [dispatch]
    );

    const handleStatusSearch = (e)=>{
      const term = e.target.value.trim().toLowerCase();
      dispatch(ordersActions.setFilters({key: 'status', value: term}))
      debouncedFetchData(dispatch, {...data?.filters, status: term})      
    };

    const handleUserNameSearch = (e) => {
      const term = e.target.value.trim().toLowerCase();
      dispatch(ordersActions.setFilters({ key: "userName", value: term }))
      debouncedFetchData(dispatch, { ...data?.filters, userName: term });      
    };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by order status "
        className="border border-gray-300 rounded p-2 mx-5 mb-4 dark:text-black"
        onChange={(e) => handleStatusSearch(e)}
      />
      <input
        type="text"
        placeholder="Search by seller name"
        className="border border-gray-300 rounded p-2 mb-4 dark:text-black"
        onChange={(e) => handleUserNameSearch(e)}
      />
    </div>
  );
}
