import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import callToAPI from "../../api";

export const fetchCreateOrder = createAsyncThunk('order/fetchCreateOrder', async () => {
    return await callToAPI('/order/create', 'post', {status: 'new'})
})


const initialState = {
    orderData: {
        status: undefined,
        deliveryID: null,
        customerID: null,
        shippingMethod: null
    }
}

const slice = createSlice({
    name: 'order',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchCreateOrder.fulfilled, (state, {payload}) => {
            state.orderData.status = payload.status
        })
    }
})

export const orderData = state => state.order.orderData

export default slice.reducer