import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productapi";
import { userAPI } from "./api/userapi";

import { cartReducer } from "./reducer/cartReducer";
import { userReducer } from "./reducer/userReducer";
import { orderApi } from "./api/orderapi";
import { dashboardApi } from "./api/Dashboardapi";
export const server = import.meta.env.VITE_SERVER;
export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(userAPI.middleware,productApi.middleware),
  middleware: (mid) => [
    ...mid(),
    userAPI.middleware,
    productAPI.middleware,
    orderApi.middleware,
    dashboardApi.middleware,
  ],
});
