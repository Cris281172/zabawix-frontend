import styles from './add-to-observe.module.scss'
import { FaHeart } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {fetchChangeObserve, observe as reduxObserve} from "../../../redux/slices/observeSlice";
import {user as reduxUser} from "../../../redux/slices/userSlice";
import {changeObservedStatus} from "../../../redux/slices/offersSlice";
import {useEffect} from "react";
import {useLocation} from "react-router";
import useCheckAuth from "../../../hooks/useCheckAuth";

const AddToObserve = ({item}) => {
    const location = useLocation()
    const isObservePage = location.pathname === '/obserwowane'
    const dispatch = useDispatch()
    const user = useSelector(reduxUser) || {}
    const {showUnLoggedPopup} = useCheckAuth()
    const addToObserve = () => {
        if(showUnLoggedPopup()){
            if(!isObservePage){
                dispatch(changeObservedStatus(item._id))
                dispatch(fetchChangeObserve({productID: item._id, userID: user.user.id}))
            }
            else{
                dispatch(fetchChangeObserve({productID: item.productID, userID: user.user.id}))
            }
        }
    }

    return(
        <button className={`${styles.add_to_observe_icon} btn-outline-secondary ${(item.observed || isObservePage) ? styles.observed : ''}`} onClick={addToObserve}>
            <FaHeart className={styles.observe_icon} />
        </button>
    )
}

export default AddToObserve;