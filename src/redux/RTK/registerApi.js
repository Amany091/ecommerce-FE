import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerApi = createApi({
    reducerPath: "register",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    tagTypes: ["register"],
    endpoints: (build) => ({
        register: build.mutation({
            query: ({data}) => ({
                url: "auth/signup",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["register"],
            transformResponse: (response, meta, arg) => response.data,
            transformErrorResponse: (response, meta, arg) => response.data,
        }),
    }),
})

export const {useRegisterMutation} = registerApi