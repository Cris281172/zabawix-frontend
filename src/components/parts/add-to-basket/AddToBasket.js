import {addProduct, addProductFetch, basket as reduxBasket, fetchCreateBasket} from "../../../redux/slices/basketSlice";
import {useDispatch, useSelector} from "react-redux";
import {user as reduxUser} from "../../../redux/slices/userSlice";
import { FaShoppingBasket } from "react-icons/fa";
import styles from './add-to-basket.module.scss'
const AddToBasket = ({item, icon}) => {
    const user = useSelector(reduxUser);
    const dispatch = useDispatch()
    const basket =  useSelector(reduxBasket)
    const loggedData = {
        userID: user.user ? user.user.id : null,
        productTitle: item.title,
        quantity: 1,
        productID: item._id,
        productPrice: item.price
    }

    const unLoggedData = {
        productTitle: item.title,
        quantity: 1,
        productID: item._id,
        productPrice: item.price,
        imageName: item.imageName
    }

    const addToBasket = () => {
        return dispatch(addProductFetch(loggedData))
    }

    return(
        <>
            {icon &&
                <button onClick={addToBasket} className={`${styles.add_to_basket_icon} btn-primary`}>
                    <FaShoppingBasket className={styles.basket_icon} />
                </button>
            }
            {!icon &&
                <button onClick={addToBasket} className={`${styles.add_to_basket_text_icon} btn-primary`}>
                    <FaShoppingBasket className={styles.basket_icon} />
                    <span className={styles.text}>Dodaj do koszyka</span>
                </button>
            }
            {/* <div onClick={addToBasket} className={`${styles.add_to_basket} btn-primary`}>*/}
            {/*     {icon && <FaShoppingBasket className={styles.basket_icon} />}*/}
            {/*     {!icon &&*/}
            {/*         <>*/}
            {/*             <FaShoppingBasket className={styles.basket_icon} />*/}
            {/*             Dodaj do koszyka*/}
            {/*         </>*/}
            {/*    }*/}
            {/*</div>*/}
        </>
    )
}

export default AddToBasket;
