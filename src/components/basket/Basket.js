import styles from "./basket.module.scss";
import {IoCart} from "react-icons/io5";
import {useEffect} from "react";
import BasketContent from "./BasketContent";
import deactivateScroll from "../../helpers/deactivateScroll";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchBasket,
    basket as reduxBasket,
    fetchCreateBasket,
    changeBasketVisible,
} from "../../redux/slices/basketSlice";
import Cookies from "js-cookie";
import {user as reduxUser} from "../../redux/slices/userSlice";
import getSessionID from "../../helpers/session-id/getSessionID";

const Basket = () => {

    const dispatch = useDispatch()

    const user = useSelector(reduxUser) || {}

    const basket =  useSelector(reduxBasket)

    const userID = user.user ? user.user.id : null

    const handleBasketContentActive = () => {
        dispatch(changeBasketVisible(true))
        deactivateScroll(true)
    }

    const handleBasketContentClose = () => {
        dispatch(changeBasketVisible(false))
        deactivateScroll(false)
    }

    useEffect(() => {
        if(user.type === 'quest'){
            dispatch(fetchBasket({tokenCookie: Cookies.get("token") ? Cookies.get("token") : getSessionID(), userID: userID}))
            if(basket.status === 'rejected'){
                dispatch(fetchCreateBasket({userID: userID, price: basket.price, basket: basket.data}))
            }
        }
        if(user.type === 'user'){
            dispatch(fetchBasket({tokenCookie: Cookies.get("token") ? Cookies.get("token") : getSessionID(), userID: userID}))
            if(basket.status === 'rejected'){
                dispatch(fetchCreateBasket({userID: userID, price: basket.price, basket: basket.data}))
            }
        }
    }, [user]);

    return(
        <div className={styles.basket}>
            <div className={styles.basket_information_wrapper} onClick={handleBasketContentActive}>
                <IoCart className={styles.basket_icon} />
                <div className={styles.basket_information}>
                    <span>Koszyk</span>
                    <span>{basket.price} zł</span>
                </div>
            </div>
            <BasketContent basket={basket} handleBasketContentClose={handleBasketContentClose} />
        </div>
    )
}

export default Basket;