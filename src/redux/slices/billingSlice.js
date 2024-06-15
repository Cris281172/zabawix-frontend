import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import callToAPI from "../../api";

export const fetchCreateBilling = createAsyncThunk('billing/fetchCreateBilling', async (billingDetails) => {
	return callToAPI('/billing/create', 'post', {
		...billingDetails
	})
})

export const fetchGetBilling = createAsyncThunk('billing/fetchGetBilling', async () => {
	return callToAPI('/billing/get', 'get')
})

export const fetchGetBillings = createAsyncThunk('billing/fetchGetBillings', async () => {
	return callToAPI('/billings/get', 'get')
})

export const fetchEditBilling = createAsyncThunk('billing/fetchEditBilling', async ({billingDetails, id}) => {
	console.log({
		billingDetails: billingDetails, id
	})
	return callToAPI('/billing/edit', 'post', {
		billingDetails: billingDetails, id
	})
})

export const fetchDeleteBilling = createAsyncThunk('billing/fetchDeleteBilling', async (id) => {
	return callToAPI('/billing/delete', 'post', {
		id: id
	})
})


const initialState = {
	billingStatus: '',
	billingData: []
}

const slice = createSlice({
	name: 'billing',
	initialState,
	extraReducers: builder => {
		builder.addCase(fetchCreateBilling.fulfilled, (state, {payload}) => {
			state.billingData.push(payload)
			console.log(payload)
		})
		builder.addCase(fetchGetBillings.fulfilled, (state, {payload}) => {
			state.billingData = payload
			state.billingStatus = 'fulfilled'
		})
		builder.addCase(fetchGetBillings.pending, (state) => {
			state.billingStatus = 'pending'
		})
		builder.addCase(fetchGetBillings.rejected, (state) => {
			state.billingStatus = 'rejected'
		})
		builder.addCase(fetchEditBilling.fulfilled, (state, {payload}) => {
			console.log(payload);
		})
		builder.addCase(fetchDeleteBilling.fulfilled, (state, {payload}) => {
			state.billingData = state.billingData.filter(item => item._id !== payload.deletedID)
		})
	}
})

export const billingData = state => state.billing.billingData

export const billingStatus = state => state.billing.billingStatus

export default slice.reducer