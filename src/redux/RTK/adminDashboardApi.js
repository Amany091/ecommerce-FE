import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "getOrders",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["getOrders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page = 1, limit }) => {
        const params = [];
        if (page) params.push(`page=${page}`);
        if (limit) params.push(`limit=${limit}`);
        const queryParams = params.length ? `?${params.join("&")}` : "";
        return `orders${queryParams}`;
      },
      // invalidatesTags: ["Orders"],
      transformResponse: (response) => response.data,
      keepUnusedDataFor: Infinity,
    }),
    countOrders: builder.query({
      query: () => {
        return "orders/get/count";
      },
      // transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.status,
      keepUnusedDataFor: Infinity,
      // invalidatesTags: ['Orders']
    }),
    changeOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `orders/${id}`,
        method: "PUT",
        body: status,
      }),
      // invalidatesTags: ["Orders"],
      transformResponse: (response) => response.data,
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Orders"],
      transformResponse: (response) => response.data,
    }),
    getOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "GET",
      }),
      // invalidatesTags: ["Orders"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCountOrdersQuery,
  useChangeOrderStatusMutation,
  useDeleteOrderMutation,
  useGetOrderMutation,
} = ordersApi;
