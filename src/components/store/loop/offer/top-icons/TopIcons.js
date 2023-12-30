import styles from './top-icons.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../../../../redux/slices/basketSlice";
import {user as reduxUser} from '../../../../../redux/slices/userSlice'
const TopIcons = ({item}) => {
    const dispatch = useDispatch()
    const user = useSelector(reduxUser)
    console.log(user)
    const data = {
        userID: user.user ? user.user.id : null,
        productTitle: item.title,
        quantity: 1,
        productID: item._id
    }
    return(
        <div className={styles.top_icons}>
            <div className={styles.left}>
                <button onClick={() => dispatch(addProduct(data))}>
                    Dodaj do kosza
                </button>
            </div>
            <div className={styles.right}>

            </div>
        </div>
    )
}

export default TopIcons;
