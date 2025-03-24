import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../Reducx/UserSlice/UserSlice";




export const store = configureStore({
    reducer: {
        "users": UserSlice.reducer
    },
})