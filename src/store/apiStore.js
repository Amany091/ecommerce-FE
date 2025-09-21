import { configureStore } from "@reduxjs/toolkit";
import { brandsReducer } from "../features/brandsSlice";
import signUpReducer from "../features/registerSlice";
import { cartReducer } from "../features/cartSlice";
import themeReducer from "../features/themeSlice";
import { productReducer } from "../features/productsSlice";
import {categoryReducer} from "../features/categoriesSlice"
import { getCurrentUserReducer, loginReducer, logoutReducer } from "../features/authSlice";
import { ordersReducer } from "../features/ordersSlice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        products: productReducer,
        categories: categoryReducer,
        brands: brandsReducer,
        cart: cartReducer,
        login: loginReducer,
        signup: signUpReducer,
        user: getCurrentUserReducer,
        logout: logoutReducer,
        orders: ordersReducer
    },
})

export default store