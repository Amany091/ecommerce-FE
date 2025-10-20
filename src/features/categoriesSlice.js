import createDataSlice from "../lib/slices/createDataSlice";

const categorySlice = createDataSlice({
  name: "categories",
  endpoint: `${import.meta.env.VITE_SERVER_URL}/api/v1/categories`,
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