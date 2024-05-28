import {useDispatch} from "react-redux";
import {deleteFilter} from "../../../../redux/slices/offersSlice";
import styles from './shortcut.module.scss'
import { IoMdCloseCircleOutline } from "react-icons/io";
const Shortcut = ({filter}) => {

    const dispatch = useDispatch()

    const namesConfig = {
        category: 'Kategoria',
        min_price: 'Minimalna cena',
        max_price: 'Maksymalna cena',
    }
    if(!namesConfig[filter[0]] || !namesConfig[filter[1]]){
        return
    }
    return(
        <div className={styles.shortcut}>
            <p className={styles.shortcut_text}>{namesConfig[filter[0]]}: {filter[1]}</p>
            <button className={styles.shortcut_close_button} onClick={() => dispatch(deleteFilter(filter[0]))}>
                <IoMdCloseCircleOutline className={styles.shortcut_close_button_icon} />
            </button>
        </div>
    )
}

export default Shortcut;