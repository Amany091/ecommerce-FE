import createDataSlice from "../lib/slices/createDataSlice";

const nodeMode = import.meta.env.VITE_NODE_MODE;
const baseUrl = nodeMode === 'development' ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_SERVER_URL;

const cartSlice = createDataSlice({
  name: "cart",
  endpoint: `${baseUrl}/api/v1/orders`,
  transformResponse: (data) => {
    return {
      cart: data,
    };
  },
});

export const {
    actions: cartActions,
    reducer: cartReducer,
    fetchData: fetchCartData,
    fetchItem: fetchCartItem,
    deleteData: deleteCartItem,
    createData: addItemtoCart
} = cartSlice;