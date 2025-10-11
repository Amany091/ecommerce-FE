import createDataSlice from "../lib/slices/createDataSlice";

const cartSlice = createDataSlice({
  name: "cart",
  endpoint: `${import.meta.env.VITE_SERVER_URL}/orders`,
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