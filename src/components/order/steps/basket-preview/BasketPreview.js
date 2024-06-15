import styles from './basket-preview.module.scss'
import {basket as reduxBasket} from "../../../../redux/slices/basketSlice";
import {useSelector} from "react-redux";
import getImageUrl from "../../../../helpers/getImageUrl";
import {Link} from "react-router-dom";
import React from "react";
import Price from "../../../parts/price/Price";
const BasketPreview = () => {
    const basket = useSelector(reduxBasket)

    return(
        <div className={styles.basket_preview}>
            <div className={styles.header}>
                Produkt
            </div>
            <div className={styles.header}>
                Ilość
            </div>
            <div className={styles.header}>
                Cena
            </div>
            {basket.data.map(item => (
                <React.Fragment key={item.productID}>
                    <div className={styles.cell}>
                        <div className={styles.main_information}>
                            <img className={styles.main_information_image} src={getImageUrl(item.imageName)} alt={item.productTitle} />
                            <Link className={styles.main_information_link} to={`/produkt/${item.productID}`}>{item.productTitle}</Link>
                        </div>
                    </div>
                    <div className={styles.cell}>
                        <p className={styles.quantity}>
                            {item.quantity}
                        </p>
                    </div>
                    <div className={styles.cell}>
                        <div className={styles.price_wrapper}>
                            <Price price={item.productPrice} promotionPrice={item.promotionData ? item.promotionData.promotionPrice : null} endsAt={item.promotionData ? item.promotionData.endAt : null} />
                        </div>
                    </div>
                </React.Fragment>
            ))}
            {/*<BasketPreviewLoop data={basket.data} />*/}
        </div>
        // <div className={styles.basket_preview}>
        //     <h2 className={styles.basket_preview_title}>Podsumowanie</h2>
        //     <BasketPreviewLoop data={basket.data} />
        //     <div>Do zapłaty: {basket.price}</div>
        // </div>
    )
}

export default BasketPreview;