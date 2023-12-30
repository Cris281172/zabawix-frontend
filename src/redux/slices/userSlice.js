import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import callToAPI from "../../api";

export const fetchUser = createAsyncThunk('user/fetchUser', async({tokenCookie}) => {
    return await callToAPI('/check-login', 'post', {token: tokenCookie === 'undefined' ? null : tokenCookie})
})

const initialState = {
    user: {},
}

const slice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchUser.fulfilled, (state, {payload}) => {
            state.user = payload;
        })
    }
})

export const user = state => state.user.user;

export default slice.reducer