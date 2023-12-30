import styles from "./basket.module.scss";
import {IoCart} from "react-icons/io5";
import {useEffect, useState} from "react";
import BasketContent from "./BasketContent";
import deactivateScroll from "../../helpers/deactivateScroll";
import {useDispatch, useSelector} from "react-redux";
import {fetchBasket, basket as reduxBasket} from "../../redux/slices/basketSlice";
import Cookies from "js-cookie";
import {user as reduxUser} from "../../redux/slices/userSlice";
import useBasketAdd from "../../hooks/useBasketAdd";

const Basket = () => {

    const [visibleBasketContent, setVisibleBasketContent] = useState(false)

    const dispatch = useDispatch()

    const user = useSelector(reduxUser) || {}

    const basket = useSelector(reduxBasket)

    const userID = user.user ? user.user.id : null

    const handleBasketContentActive = () => {
        setVisibleBasketContent(true)
        deactivateScroll(true)
    }

    const handleBasketContentClose = () => {
        setVisibleBasketContent(false)
        deactivateScroll(false)
    }


    useEffect(() => {
        if(userID !== null && basket.data.length === 0){
            dispatch(fetchBasket({tokenCookie: Cookies.get("token"), userID: userID}))
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
            {visibleBasketContent && <BasketContent basket={basket} handleBasketContentClose={handleBasketContentClose} />}

        </div>
    )
}

export default Basket;