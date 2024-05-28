import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import callToAPI from "../../api";
import Cookies from 'js-cookie'
export const fetchUser = createAsyncThunk('user/fetchUser', async() => {
    return await callToAPI('/check-login', 'post')
})

export const fetchUserLogout = createAsyncThunk('user/fetchUserLogout', async() => {
    Cookies.remove("token")
    return await callToAPI('/user-logout', 'post', {token: Cookies.get("token")})
})

export const fetchCustomerGet = createAsyncThunk('user/fetchCustomerGet', async (id) => {
    return await callToAPI('/customer/get', 'post', {userID: id})
})

export const fetchCustomerCreate = createAsyncThunk('user/fetchCustomerCreate', async (data) => {
    return await callToAPI('/customer/create', 'post', data)
})

export const fetchCustomerModify = createAsyncThunk('user/fetchCustomerModify', async (data) => {
    return await callToAPI('/customer/modify', 'post', data)
})

export const fetchDeliveryGet = createAsyncThunk('user/fetchDeliveryGet', async (id) => {

})

export const fetchUserPromotion = createAsyncThunk('user/fetchUserPromotion', async ({userID, status}) => {
    return await callToAPI(`/promotions/user/get?status=${status}`, 'post', {userID: userID})
})

const initialState = {
    user: {},
    customer: {
        status: 'idle',
        data: {
            name: "",
            surname: "",
            street: "",
            addressNumber: "",
            city: "",
            code: "",
            email: "dwa@dwa"
        }
    },
    promotions: undefined
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserPoints: (state, action) => {
            state.user.user.points = state.user.user.points - action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUser.fulfilled, (state, {payload}) => {
            state.user = payload;
        })
        builder.addCase(fetchUserLogout.fulfilled, (state, {payload}) => {
            state.user = {type: 'quest'}
        })
        builder.addCase(fetchCustomerGet.fulfilled, (state, {payload}) => {
            state.customer.data = payload
            state.customer.status = 'succeeded'
        })
        builder.addCase(fetchCustomerGet.pending, (state) => {
            state.customer.status = 'loading';
        })
        builder.addCase(fetchCustomerGet.rejected, (state) => {
            state.customer.status = 'rejected';
        })
        builder.addCase(fetchCustomerCreate.fulfilled, (state, {payload}) => {
            state.customer.data = payload
        })
        builder.addCase(fetchCustomerModify.fulfilled, (state, {payload}) => {
            state.customer.data = payload
            state.customer.status = 'succeeded'
        })
        builder.addCase(fetchCustomerModify.pending, (state, {payload}) => {
            state.customer.status = 'loading';
        })
        builder.addCase(fetchCustomerModify.rejected, (state, {payload}) => {
            state.customer.status = 'rejected';
        })
        builder.addCase(fetchUserPromotion.fulfilled, (state, {payload}) => {
            state.promotions = payload;
        })
    }
})

export const {setUserPoints} = slice.actions

export const user = state => state.user.user;

export const customer = state => state.user.customer;

export default slice.reducer