import createDataSlice from "../lib/slices/createDataSlice";

const brandSlice = createDataSlice({
  name: "brands",
  endpoint: `${import.meta.env.VITE_BASE_URL}/brands`,
  transformResponse: (data) => {
    return {
        brands: data
    }
  }
});

export const {
    reducer: brandsReducer,
    actions: brandsActions,
    fetchData: fetchBrandsData
} = brandSlice;