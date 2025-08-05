import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addToCartApi = createApi({
    reducerPath: "addToCart",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    tagTypes: ["addToCart"],
    endpoints: (builder) => ({
        addToCart: builder.mutation({
            query: ({count, productId, userId}) => ({
                url: "orders",
                method: "POST",
                body: {
                    orderItems: [{
                        quantity: count,
                        product: productId
                    }],
                    user: userId
                },
            }),
            invalidatesTags: ["addToCart"],
            transformResponse: (response, meta, arg) => response.data,
            transformErrorResponse: (response, meta, arg) => response.data,
        })
    })
})

export const {useAddToCartMutation} = addToCartApi