import getImageUrl from "../../../../../helpers/getImageUrl";
import styles from './chest-content-loop.module.scss'
import {Link} from "react-router-dom";
import Price from "../../../../parts/price/Price";

const ChestContentLoop = ({item}) => {

    return(
            <div className={styles.chest_content_loop}>
                <Link to={`/produkt/${item.productID}`}>
                    <div className={styles.chest_content_loop_image_wrapper}>
                        <img className={styles.chest_content_loop_image} src={getImageUrl(item.imageName)} />
                    </div>
                    <div className={styles.chest_content_loop_price}>
                        <Price price={item.normalPrice} promotionPrice={item.promotionPrice} />
                    </div>
                </Link>
            </div>

    )
}

export default ChestContentLoop;