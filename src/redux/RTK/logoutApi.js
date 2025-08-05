import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const logoutApi = createApi({
  reducerPath: "logout",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["logout"],
  endpoints: (build) => ({
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    transformResponse: (response) => response.data,
    transformErrorResponse: (response) => response.data,
  }),
});

export const { useLogoutMutation } = logoutApi;
