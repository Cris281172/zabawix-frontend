import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {user as reduxUser} from "../../redux/slices/userSlice";
import {fetchGetObserve, observe as reduxObserve} from "../../redux/slices/observeSlice";
import OffersLoop from "../store/loop/OffersLoop";
import {
    currentPage as reduxCurrentPage,
    fetchOffers,
    offers as reduxOffers,
    offersStatus as reduxOffersStatus, setCurrentPage
} from "../../redux/slices/offersSlice";
import Pagination from "../parts/pagination/Pagination";

const Observe = () => {

    const user = useSelector(reduxUser);

    const dispatch = useDispatch()

    const observeRef = useRef()

    const observe = useSelector(reduxOffers)

    const observeStatus = useSelector(reduxOffersStatus)

    const currentPage = useSelector(reduxCurrentPage);

    useEffect(() => {
        if(user.user){
            dispatch(fetchOffers({query: `?page=${currentPage}&observe=true`}))
        }
    }, [user, currentPage]);

    useEffect(() => {
        dispatch(setCurrentPage(0))
    }, []);

    return(
        <div className="container" ref={observeRef}>
            <OffersLoop offers={observe} offersStatus={observeStatus} count={observe.count} type="observe" />
            <Pagination storeRef={observeRef} />
        </div>
    )
}

export default Observe;