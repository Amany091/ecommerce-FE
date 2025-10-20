import createDataSlice from "../lib/slices/createDataSlice";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const fetchProducts = createDataSlice({
    name:"products",
    endpoint: `${BASE_URL}/api/v1/products`,
    transformResponse: (res) => {
        return {
            products: res
        }
    }
})

export const {
    actions: productsActions,
    reducer: productReducer,
    fetchData: fetchProductsData,
    fetchItem: fetchProductItem,
} = fetchProducts;