import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getProductsApi = createApi({
    reducerPath: "Products",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    tagTypes: ["getProducts"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            
            query: ({ size, color, maxPrice, minPrice, category } = {}) => {
                const params = [];
                if (size) params.push(`size=${size}`)
                if (color) params.push(`color=${color}`)
                if (maxPrice) params.push(`maxPrice=${maxPrice}`)
                if (minPrice) params.push(`minPrice=${minPrice}`)
                if (category) params.push(`category=${category}`)
                const queryParams = params.length ? `?${params.join("&")}` : "" ;
                return `products${queryParams}`
            },
            
            transformResponse: (response, meta, arg) => response.data,
            transformErrorResponse: (response, meta, arg) => response.data,
            keepUnusedDataFor: Infinity
        }),

        getProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: "GET",
            }),
            transformResponse: (response, meta, arg) => response.data,
            transformErrorResponse: (response, meta, arg) => response.status,
            keepUnusedDataFor: Infinity
        })
    }),
})

export const { useGetProductsQuery , useGetProductMutation} = getProductsApi;