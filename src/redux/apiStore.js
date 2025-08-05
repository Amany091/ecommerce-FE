import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getBrandsApi } from "./RTK/brandsApi";
import { getProductsApi } from "./RTK/productsApi";
import { loginApi } from "./RTK/loginApi";
import { getCategoriesApi } from "./RTK/categoriesApi";
import { registerApi } from "./RTK/registerApi";
import { logoutApi } from "./RTK/logoutApi";
import { ordersApi } from "./RTK/adminDashboardApi";
import { addToCartApi } from "./RTK/cartApi";
import themeReducer from "./themeSlice";

export const store = configureStore({
    reducer: {
        [getBrandsApi.reducerPath]: getBrandsApi.reducer,
        [getProductsApi.reducerPath]: getProductsApi.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [getCategoriesApi.reducerPath]: getCategoriesApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [logoutApi.reducerPath]: logoutApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [addToCartApi.reducerPath]: addToCartApi.reducer,
        theme: themeReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        getProductsApi.middleware,
        getBrandsApi.middleware,
        getCategoriesApi.middleware,
        loginApi.middleware,
        registerApi.middleware,
        logoutApi.middleware,
        ordersApi.middleware,
        addToCartApi.middleware

    ) // enable caching
    
})

setupListeners(store.dispatch)

export default store