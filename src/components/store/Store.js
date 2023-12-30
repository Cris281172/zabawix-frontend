import {useDispatch, useSelector} from "react-redux";
import {offers as reduxOffers, fetchOffers, totalOffers as reduxTotalOffers} from "../../redux/slices/offersSlice";
import {useEffect, useState} from "react";
import styles from './store.module.scss'
import Breadcrumbs from "../parts/breadcrumbs/Breadcrumbs";
import Filters from "./filters/Filters";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import OffersLoop from "./loop/OffersLoop";
import ToolBar from "./toolbar/ToolBar";
const Store = () => {
    const offers = useSelector(reduxOffers)
    const filters = useSelector(state => state.offers.filters)
    const totalOffers = useSelector(reduxTotalOffers)
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const [moreFiltersVisible, setMoreFiltersVisible] = useState(false)


    useEffect(() => {
        const queryData = {page: 0, ...filters};

        let query = '';
        for(const prop in queryData){
            if(queryData[prop].toString().length > 0){
                query+= `?${prop}=${queryData[prop]}`;
            }
        }
        console.log(query)

        setSearchParams(query);


        dispatch(fetchOffers({
            query,
        }))
        // dispatch(setFilters(getFiltersData()))
    }, [filters])

    console.log(offers)
    return(
        <div className={`container ${styles.store}`}>
            <Breadcrumbs />
            <ToolBar total={totalOffers} setMoreFiltersVisible={setMoreFiltersVisible} />
            {moreFiltersVisible && <Filters />}
            <OffersLoop offers={offers} />
            {/*{offers.map(offer =>  <div dangerouslySetInnerHTML={{ __html: offer.desc }} />)}*/}
        </div>
    )
}

export default Store;