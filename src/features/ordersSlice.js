import createDataSlice from "../lib/slices/createDataSlice";

const nodeMode = import.meta.env.VITE_NODE_MODE;
const baseUrl = nodeMode === 'development' ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_SERVER_URL;

const ordersSlice = createDataSlice({
  name: "orders",
  endpoint: `${baseUrl}/api/v1/orders`,
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
    updateAllData: updateAllOrders,
    debouncedFetchData: debounceedOrdersData
} = ordersSlice;