import styles from './top-icons.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {user as reduxUser} from '../../../../../redux/slices/userSlice'
import AddToBasket from "../../../../parts/add-to-basket/AddToBasket";
import AddToObserve from "../../../../parts/add-to-observe/AddToObserve";
const TopIcons = ({item}) => {
    const user = useSelector(reduxUser)

    return(
        <div className={styles.top_icons}>
            <div className={styles.left}>
                <AddToBasket item={item} icon={true} />
            </div>
            <div className={styles.right}>
                <AddToObserve item={item} />
            </div>
        </div>
    )
}

export default TopIcons;
