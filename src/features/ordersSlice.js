import createDataSlice from "../lib/slices/createDataSlice";

const ordersSlice = createDataSlice({
  name: "orders",
  endpoint: `${import.meta.env.VITE_SERVER_URL}/api/v1/orders`,
  transformResponse: (data) => {
    return {
      orders: data,
    };
  },
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