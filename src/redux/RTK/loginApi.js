import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
    reducerPath: "login",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    tagTypes: ["login"],
    
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({data}) => ({
                url: "auth/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["login"],
            transformResponse: (response, meta, arg) => response.data,
            transformErrorResponse : (response) => response.data
        }),

        getUser: builder.query({
            query: () =>{ return "auth/currentUser"},
            transformResponse: (response) => response.data,
            transformErrorResponse: (response) => response.status,
        })
    })
})

export const {useLoginMutation , useGetUserQuery} = loginApi