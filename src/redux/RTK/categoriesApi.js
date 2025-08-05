import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getCategoriesApi = createApi({
    reducerPath: "Categories",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    tagTypes: ["getCategories"],

    endpoints: (builder) => ({

        getCategories: builder.query({
            query: () => "categories",
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.status,
            keepUnusedDataFor: Infinity
        }),

        getCategory: builder.mutation({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'GET'
            }),
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.status,
            keepUnusedDataFor: Infinity
        })
    })
})

export const { useGetCategoriesQuery , useGetCategoryMutation } = getCategoriesApi