import createDataSlice from "../lib/slices/createDataSlice";

const categorySlice = createDataSlice({
    name: 'categories',
    endpoint: `${import.meta.env.VITE_BASE_URL}/categories`,
    transformResponse: (res) => {
        return {
            categories: res.data
        }
    }
});

export const {
    actions: categoryActions,
    reducer: categoryReducer,
    fetchData: fetchCategoriesData,
    fetchItem: fetchCategory
} = categorySlice;