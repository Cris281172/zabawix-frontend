import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import callToAPI from "../../api";

export const fetchOffers = createAsyncThunk('offers/fetchOffers', async ({query, page}) => {
    return await callToAPI(`/offers/get${query}`, 'get')
})

export const fetchImages = createAsyncThunk('offers/fetchImages', async ({offerID}) => {
    return await callToAPI(`offer/images`, 'post', {offerID: offerID})
})

const initialState = {
    offers: [],
    numberOfPages: 0,
    filters: {
        min_price: '',
    },
    currentPage: 0
}

const slice = createSlice({
    name: 'offers',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action) => {
            //{prop: min_price, value: 10}
            state.filters = {...state.filters, [action.payload.prop]: action.payload.value}
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchOffers.fulfilled, (state, {payload}) => {
            state.numberOfPages = payload.pages - 1;
            state.offers = payload.offers;
            state.totalOffers = payload.total;
        })
        builder.addCase(fetchImages.fulfilled, (state, {payload}) => {
            console.log(state.offers)
        })
    }
})

export const {setCurrentPage, setFilters} = slice.actions

export const offers = state => state.offers.offers;

export const filters = state => state.filters

export const numberOfPages = state => state.offers.numberOfPages

export const totalOffers = state => state.offers.totalOffers

export const currentPage = state => state.offers.currentPage;

export default slice.reducer