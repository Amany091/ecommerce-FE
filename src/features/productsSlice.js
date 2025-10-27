import createDataSlice from "../lib/slices/createDataSlice";

const nodeMode = import.meta.env.VITE_NODE_MODE;
const baseUrl = nodeMode === 'development' ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_SERVER_URL;

const fetchProducts = createDataSlice({
    name:"products",
    endpoint: `${baseUrl}/api/v1/products`,
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