import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import callToAPI from "../../api";

export const fetchChest = createAsyncThunk('chest/fetchChest', async() => {
    return await callToAPI('/chests/get', 'get')
})

export const fetchSingleChest = createAsyncThunk('chest/fetchSingleChest', async(id) => {
    return await callToAPI(`/chest/get/${id}`)
})

const initialState = {
    data: [],
    singleChest: {}
}

const slice = createSlice({
    name: 'chest',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchChest.fulfilled, (state, {payload}) => {
            state.data = payload
        })
        builder.addCase(fetchSingleChest.fulfilled, (state, {payload}) => {
            state.singleChest = payload
        })
    }
})

export const chest = state => state.chest.data;

export const singleChest = state => state.chest.singleChest;


export default slice.reducer