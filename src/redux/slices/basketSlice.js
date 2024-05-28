import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import callToAPI from '../../api';

const saveToLocalStorage = (data) => {
    localStorage.setItem('basket', JSON.stringify(data));
}
const clearLocalStorage = () => {
    localStorage.removeItem('basket');
}

export const fetchCreateBasket = createAsyncThunk('basket/fetchCreateBasket', async({userID, price, basket}) => {
    return await callToAPI('/basket/create', 'post', {userID, price, basket})
})

export const fetchBasket = createAsyncThunk('basket/fetchBasket', async ({ userID }) => {
    return await callToAPI('/basket/get', 'post', { userID });
});

export const addProductFetch = createAsyncThunk('basket/addProductFetch', async ({ userID, productTitle, quantity, productID }) => {
    return await callToAPI('/basket/add', 'post', { userID, productTitle, quantity, productID });
});

export const fetchModifyBasket = createAsyncThunk('basket/fetchModifyBasket', async ({ basketID, quantity, productID }) => {
    return await callToAPI('/basket/modify', 'post', { basketID, quantity, productID });
});


const initialState = {
    basketVisible: false,
    id: '',
    data: JSON.parse(localStorage.getItem('basket')) === null ? [] : JSON.parse(localStorage.getItem('basket')).data,
    price: JSON.parse(localStorage.getItem('basket')) === null ? 0 : JSON.parse(localStorage.getItem('basket')).price,
    status: 'rejected'
};

// Slice
const slice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        changeBasketVisible: (state, action) => {
            state.basketVisible = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchCreateBasket.fulfilled, (state, {payload}) => {
            state.price = payload.price;
            state.data = payload.basket;
            state.id = payload._id;
        })
        builder.addCase(fetchBasket.fulfilled, (state, { payload }) => {
            state.price = payload.price;
            state.data = payload.basket;
            state.id = payload._id;
            state.status = 'fulfilled'
        });
        builder.addCase(fetchBasket.rejected, (state, { payload }) => {
            state.status = 'rejected'
        });

        builder.addCase(addProductFetch.fulfilled, (state, { payload }) => {
            state.price = payload.price;
            state.data = payload.basket;
            state.basketVisible = true;
        });

        builder.addCase(fetchModifyBasket.fulfilled, (state, { payload }) => {
            state.price = payload.price;
            state.data = payload.basket;
        });
    }
});

export const { addProduct, clearBasket, modifyBasket, changeBasketVisible } = slice.actions;

export const basket = state => state.basket;

export default slice.reducer