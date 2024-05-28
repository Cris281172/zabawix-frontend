import styles from './basket-preview.module.scss'
import {basket as reduxBasket} from "../../../../redux/slices/basketSlice";
import {useSelector} from "react-redux";
import BasketPreviewLoop from "./loop/BasketPreviewLoop";
const BasketPreview = () => {

    const basket = useSelector(reduxBasket)

    return(
        <div className={styles.basket_preview}>
            <h2 className={styles.basket_preview_title}>Podsumowanie</h2>
            <BasketPreviewLoop data={basket.data} />
        </div>
    )
}

export default BasketPreview;