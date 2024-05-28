import styles from './price.module.scss'
const Price = ({price, promotionPrice, endsAt}) => {
    const nowDate = new Date()
    return(
        <>
            {promotionPrice && nowDate < new Date(endsAt) ?
                <p className={styles.promotion_price}>
                    <span className={styles.normal_price_value}>{price} zł</span> <span className={styles.promotion_price_value}>{promotionPrice} zł</span>
                </p>
                :
                <p className={styles.promotion_price}>
                    <span className={styles.price}>{price} zł</span>
                </p>
            }
        </>

    )
}

export default Price;