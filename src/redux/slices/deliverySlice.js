import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import callToAPI from "../../api";
import {fetchOffers} from "./offersSlice";

export const fetchGetDelivery = createAsyncThunk('delivery/fetchGetDelivery', async () => {
	return await callToAPI('/delivery/get', 'get')
})

export const fetchCreateDelivery = createAsyncThunk('delivery/fetchCreateDelivery', async (deliveryData) => {
	return await callToAPI('/delivery/create', 'post', {
		...deliveryData
	})
})

const initialState = {
	deliveryStatus: '',
	type: '',
	deliveryAddress: {
		name: '',
		surname: '',
		address: '',
		zip: '',
		phone: '',
		city: ''
	},
	deliveryDataInpost: {
		address: {
			line1: '',
			line2: ''
		},
		parcelLockerID: ''
	}
}

const slice = createSlice({
	name: 'delivery',
	initialState,
	extraReducers: builder => {
		builder.addCase(fetchGetDelivery.fulfilled, (state, {payload}) => {
			state.deliveryAddress = payload.deliveryAddress
			state.deliveryStatus = 'fulfilled'
		})
		builder.addCase(fetchGetDelivery.pending, (state) => {
			state.deliveryStatus = 'pending'
		})
		builder.addCase(fetchGetDelivery.rejected, (state) => {
			state.deliveryStatus = 'fulfilled'
		})
	}
})

export const deliveryAddress = state => state.delivery.deliveryAddress

export const deliveryStatus = state => state.delivery.deliveryStatus

export default slice.reducer