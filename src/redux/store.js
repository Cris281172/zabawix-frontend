import { configureStore } from "@reduxjs/toolkit";

import offersSlice from "./slices/offersSlice";
import userSlice from "./slices/userSlice";
import basketSlice from "./slices/basketSlice";
import chestSlice from "./slices/chestSlice";
export default configureStore({
    reducer: {
        offers: offersSlice,
        user: userSlice,
        basket: basketSlice,
        chest: chestSlice
    }
})