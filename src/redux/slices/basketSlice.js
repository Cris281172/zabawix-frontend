import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchUser, user as reduxUser} from "./userSlice";
import callToAPI from "../../api";
import {useSelector} from "react-redux";

export const fetchBasket = createAsyncThunk('basket/fetchBasket', async({userID}) => {
    return await callToAPI('/basket/get', 'post', {userID: userID})
})

export const addProduct = createAsyncThunk('basket/addProduct', async({userID, productTitle, quantity, productID}) => {
    console.log(userID, productTitle)
    return await callToAPI('/basket/add', 'post', {userID: userID, productTitle: productTitle, quantity: quantity, productID: productID})
})

const initialState = {
    data: [],
    price: 0
}

const slice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addProduct: (state, payload) => {
            // state.data = [...state.data, payload.]
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchBasket.fulfilled, (state, {payload}) => {
            state.price = payload.price;
            state.data = payload.basket;
        });

        builder.addCase(addProduct.fulfilled, (state, {payload}) => {
            state.price = payload.price;
            state.data = payload.basket;

            localStorage.setItem('basket', JSON.stringify({price: payload.price, data: payload.basket}));
        })
    }
})

export const basket = state => state.basket;

export default slice.reducer