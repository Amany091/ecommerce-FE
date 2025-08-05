import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const getBrandsApi = createApi({
    reducerPath: "Brands",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    tagTypes: ["getBrands"],
    endpoints: (builder) => ({
        getBrands: builder.query({
            query: () => "brands",
            transformResponse: (response, meta, arg) => response.data, // ensure the response has this structure
            transformErrorResponse: (response, meta, arg) => response.status,
            keepUnusedDataFor: Infinity
        }),
    }),
})

export const { useGetBrandsQuery } = getBrandsApi