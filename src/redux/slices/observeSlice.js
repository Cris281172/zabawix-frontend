import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import callToAPI from "../../api";

export const fetchChangeObserve = createAsyncThunk('observe/fetchCreateObserve', async({...observeData}) => {
    return await callToAPI('/observe/change', 'post', {
        ...observeData
    })
})

export const fetchGetObserve = createAsyncThunk('observe/fetchGetObserve', async({userID}) => {
    return await callToAPI('/observe/get', 'post', {
        userID: userID
    })
})

export const fetchObserveCount = createAsyncThunk('observe/count', async({userID}) => {
    return await callToAPI('/observe/count', 'post', {
        userID: userID
    })
})

const initialState = {
    count: 0,
    observeData: [],
    userID: '',
    observeStatus: ''
}

const slice = createSlice({
    name: 'observe',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchChangeObserve.fulfilled, (state, {payload}) => {
            if(payload.type === 'add'){
                state.count = state.count + 1
                state.observeData = [...state.observeData, payload];
            }
            else if(payload.type === 'delete'){
                state.count = state.count - 1
                state.observeData = state.observeData.filter(el => el.productID !== payload.productID);
            }
            state.userID = payload.userID
        })
        builder.addCase(fetchObserveCount.fulfilled, (state, {payload}) => {
            state.count = payload;
        })

        builder.addCase(fetchGetObserve.fulfilled, (state, {payload}) => {
            state.count = payload.count
            state.observeData = payload.data
            state.observeStatus = 'fulfilled'
        })
        builder.addCase(fetchGetObserve.pending, (state) => {
            state.observeStatus = 'pending'
        })
        builder.addCase(fetchGetObserve.rejected, (state) => {
            state.observeStatus = 'reject'
        })
    }
})


export const observe = state => state.observe;

export const observeCount = state => state.observe.count;

export default slice.reducer