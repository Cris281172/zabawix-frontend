import styles from './basket-content.module.scss'
import React, {useEffect, useRef, useState} from 'react'
import testImage from '../../images/header/header-banner-4.png'
import { IoMdClose, IoIosCloseCircleOutline   } from "react-icons/io";
const BasketItem = ({productTitle, productPrice, quantity}) => {
    return(
        <div className={styles.basket_item}>
            <div className={styles.left}>
                <div className={styles.product_image_wrapper}>
                    <img src={testImage} className={styles.product_image} />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.product_title}>
                        {productTitle}
                    </h3>
                    <div className={styles.bottom_content}>
                        <div className={styles.quantity_wrapper}>
                            <button className={`btn-primary ${styles.change_quantity_button}`}>-</button>
                            <input className={styles.quantity_value} value={quantity} />
                            <button className={`btn-primary ${styles.change_quantity_button}`}>+</button>
                        </div>
                        <div>
                            {productPrice} zł
                        </div>
                    </div>

                </div>
            </div>
            <IoIosCloseCircleOutline  className={styles.delete_basket_item} />
        </div>
    )
}

const BasketContent = ({basket, handleBasketContentClose}) => {




    return(
        <div className={styles.basket_content_wrapper}>
            <div className={styles.basket_content}>
                <div className={styles.top_basket}>
                    <h5 className={styles.top_basket_title}>Twój koszyk</h5>
                    <IoMdClose onClick={handleBasketContentClose}  className={styles.top_basket_close} />
                </div>
                <div className={styles.basket_loop}>
                    {basket.data.map((el, index) => <React.Fragment key={index}><BasketItem productTitle={el.productTitle} productPrice={el.productPrice} quantity={el.quantity} /></React.Fragment>)}
                </div>
                <div className={styles.bottom_basket}>
                    {basket.data.length !== 0 &&
                        <div className={styles.price_sum}>
                            <span>Kwota:</span>
                            <span>{basket.price} zł</span>
                        </div>
                    }
                    <div className={styles.bottom_buttons}>
                        <button className={`btn-primary ${styles.continue_shop_button}`} onClick={handleBasketContentClose}>
                            Kontynuuj zakupy
                        </button>
                        {basket.data.length !== 0 &&
                            <button className={`btn-primary ${styles.continue_shop_button}`}>
                                Przejdź do zamówienia
                            </button>
                        }
                    </div>

                </div>
            </div>
        </div>

    )
}

export default BasketContent;