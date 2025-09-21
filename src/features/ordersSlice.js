import createDataSlice from "../lib/slices/createDataSlice";

const ordersSlice = createDataSlice({
  name: "orders",
  endpoint: `${import.meta.env.VITE_BASE_URL}/orders`,
  transformResponse: (data) =>{
    return {
        orders: data
    }
  }
});

export const {
    reducer: ordersReducer,
    actions: ordersActions,
    fetchData: fetchOrdersData,
    fetchItem: fetchOrder,
    deleteData: deleteOrder,
    updateData: updateOrder,
    debouncedFetchData: debounceedOrdersData
} = ordersSlice;