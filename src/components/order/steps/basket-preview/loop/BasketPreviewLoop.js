import getImageUrl from "../../../../../helpers/getImageUrl";
import styles from './basket-preview-loop.module.scss'

const BasketPreviewLoop = ({data}) => {

    return(
        <div className={styles.basket_preview_loop}>
            {data.map((item, index) => (
                <div key={index} className={styles.basket_preview_loop_item}>
                    <img src={getImageUrl(item.imageName)} className={styles.basket_preview_loop_item_image} />
                </div>
            ))}
        </div>
    )
}

export default BasketPreviewLoop;