import { configureStore } from "@reduxjs/toolkit";
import MyServiceReducer from './MyServiceSlice';
import MyCartReducer from './MyCartSlice';
export const mystore = configureStore({
    reducer: {
        service: MyServiceReducer,
        cart: MyCartReducer
    }
})