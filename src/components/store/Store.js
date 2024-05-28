import {useDispatch, useSelector} from "react-redux";
import {
    offers as reduxOffers,
    fetchOffers,
    setFilters,
    currentOfferCount as reduxCurrentOfferCount,
    currentPage as reduxCurrentPage, offersStatus, offersStatus as reduxOffersStatus, setCurrentPage
} from "../../redux/slices/offersSlice";
import {useEffect, useRef, useState} from "react";
import styles from './store.module.scss'
import Breadcrumbs from "../parts/breadcrumbs/Breadcrumbs";
import Filters from "./filters/Filters";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import OffersLoop from "./loop/OffersLoop";
import ToolBar from "./toolbar/ToolBar";
import Pagination from "../parts/pagination/Pagination";
import FiltersShortcut from "./filters/shortcut/FiltersShortcut";
const Store = () => {
    const offers = useSelector(reduxOffers)
    const filters = useSelector(state => state.offers.filters)
    const sort = useSelector(state => state.offers.sort)
    const currentOfferCount = useSelector(reduxCurrentOfferCount)
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const [moreFiltersVisible, setMoreFiltersVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const storeRef = useRef()
    const currentPage = useSelector(reduxCurrentPage)
    const offersStatus = useSelector(reduxOffersStatus)

    useEffect(() => {
        dispatch(setCurrentPage(0))
    }, []);

    useEffect(() => {
        setLoading(true)
        const queryData = {...filters, sort};
        let query = `?page=${currentPage}`;
        for(const prop in queryData){
            if(queryData[prop].toString().length > 0){
                query+= `&${prop}=${queryData[prop]}`;
            }
        }

        setSearchParams(query);
        dispatch(fetchOffers({
            query
        }))
        setLoading(false)
    }, [filters, sort, currentPage])

    return(
        <div className={`container ${styles.store}`} ref={storeRef}>
            {loading ?
                <>
                    dsa
                </>
                :
                <>
                    <FiltersShortcut />
                    <ToolBar offerCount={currentOfferCount} setMoreFiltersVisible={setMoreFiltersVisible} />
                    <Filters moreFiltersVisible={moreFiltersVisible} setMoreFiltersVisible={setMoreFiltersVisible} />
                    <OffersLoop offers={offers} offersStatus={offersStatus} />
                    <Pagination storeRef={storeRef} />
                </>
            }

        </div>
    )
}

export default Store;