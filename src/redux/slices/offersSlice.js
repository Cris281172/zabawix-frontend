import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import callToAPI from "../../api";
import getInitFilters from "../../helpers/getInitParams";
export const fetchOffers = createAsyncThunk('offers/fetchOffers', async ({query, page}) => {
    return await callToAPI(`/offers/get${query}`, 'get')
})

export const fetchOffer = createAsyncThunk('offers/fetchOffer', async(id) => {
    return await callToAPI(`/offer/get/${id}`, 'get')
})

export const fetchImages = createAsyncThunk('offers/fetchImages', async ({offerID}) => {
    return await callToAPI(`offer/images`, 'post', {offerID: offerID})
})

export const fetchNewestOffers = createAsyncThunk('offers/fetchNewestOffers', async({limit}) => {
    return await callToAPI(`/offers/get?sort=newest&limit=${limit}&page=0`, 'get')
})

export const fetchSimilarOffers = createAsyncThunk('offers/fetchSimilarOffers', async({offerID}) => {
    return await callToAPI(`/offers/get?page=0&similar=${offerID}`)
})

const initialState = {
    offers: [],
    offersStatus: '',
    offer: {},
    offerStatus: '',
    newestOffers: [],
    similarOffers: [],
    numberOfPages: 0,
    filters: getInitFilters(),
    currentPage: 0,
    limit: 0,
    currentOfferCount: 0,
    sort: '',
    observed: false,
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
            action.payload.forEach(el => state.filters = {...state.filters, [el.prop]: el.value})

        },
        setSort: (state, action) => {
            state.sort = action.payload
        },
        deleteFilter: (state, action) => {
            delete state.filters[action.payload]
            // state.filters = state.filters.filter()
        },
        resetFilters: (state, action) => {
            state.filters = {}
        },
        changeObservedStatus: (state, action) => {
            const changedOffers = state.offers.map(offer => {
                if(offer._id === action.payload){
                    return {...offer, observed: !offer.observed}
                }
                return {...offer}
            })
            state.offers = changedOffers
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchOffers.fulfilled, (state, {payload}) => {
            state.numberOfPages = payload.pages - 1;
            state.offers = payload.offers;
            state.totalOffers = payload.total;
            state.limit = payload.limit;
            state.currentOfferCount = payload.currentOfferCount;
            state.offersStatus = 'fulfilled'
        })
        builder.addCase(fetchOffers.pending, (state) => {
              state.offersStatus = 'pending'
        })
        builder.addCase(fetchOffers.rejected, (state) => {
            state.offersStatus = 'rejected'
        })

        builder.addCase(fetchOffer.fulfilled, (state, {payload}) => {
            state.offer = payload
            state.offerStatus = 'fulfilled'
        })
        builder.addCase(fetchOffer.pending, (state) => {
            state.offerStatus = 'pending'
        })
        builder.addCase(fetchOffer.rejected, (state) => {
            state.offerStatus = 'rejected'
        })

        builder.addCase(fetchNewestOffers.fulfilled, (state, {payload}) => {
            state.newestOffers = payload.offers
        })
        builder.addCase(fetchImages.fulfilled, (state, {payload}) => {
        })
        builder.addCase(fetchSimilarOffers.fulfilled, (state, {payload}) => {
            state.similarOffers = payload.offers;
        })
    }
})

export const {changeObservedStatus, setCurrentPage, setFilters, setSort, resetFilters, deleteFilter} = slice.actions

export const offers = state => state.offers.offers;

export const offersStatus = state => state.offers.offersStatus;

export const offer = state => state.offers.offer

export const offerStatus = state => state.offers.offerStatus

export const newestOffers = state => state.offers.newestOffers;

export const filters = state => state.offers.filters

export const numberOfPages = state => state.offers.numberOfPages

export const totalOffers = state => state.offers.totalOffers

export const currentPage = state => state.offers.currentPage;

export const pageLimit = state => state.offers.limit;
export const currentOfferCount = state => state.offers.currentOfferCount;

export const similarOffers = state => state.offers.similarOffers

export default slice.reducer