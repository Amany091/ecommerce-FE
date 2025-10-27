import createDataSlice from "../lib/slices/createDataSlice";

const nodeMode = import.meta.env.VITE_NODE_MODE;
const baseUrl = nodeMode === 'development' ? import.meta.env.VITE_BASE_URL : import.meta.env.VITE_SERVER_URL;

const brandSlice = createDataSlice({
  name: "brands",
  endpoint: `${baseUrl}/api/v1/brands`,
  transformResponse: (data) => {
    return {
      brands: data,
    };
  },
});

export const {
    reducer: brandsReducer,
    actions: brandsActions,
    fetchData: fetchBrandsData
} = brandSlice;