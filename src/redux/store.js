import { configureStore } from "@reduxjs/toolkit";

import offersSlice from "./slices/offersSlice";
import userSlice from "./slices/userSlice";
import basketSlice from "./slices/basketSlice";
export default configureStore({
    reducer: {
        offers: offersSlice,
        user: userSlice,
        basket: basketSlice
    }
})