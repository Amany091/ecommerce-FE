import createDataSlice from "../lib/slices/createDataSlice";

const nodeMode = import.meta.env.VITE_NODE_MODE;
const baseUrl = nodeMode === 'development' ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_SERVER_URL;

const categorySlice = createDataSlice({
  name: "categories",
  endpoint: `${baseUrl}/api/v1/categories`,
  transformResponse: (res) => {
    return {
      categories: res.data,
    };
  },
});

export const {
    actions: categoryActions,
    reducer: categoryReducer,
    fetchData: fetchCategoriesData,
    fetchItem: fetchCategory
} = categorySlice;