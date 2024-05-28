import styles from './basket-content.module.scss'
import React, {useEffect, useRef, useState} from 'react'
import testImage from '../../images/header/header-banner-4.png'
import { IoMdClose, IoIosCloseCircleOutline   } from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {fetchModifyBasket, modifyBasket} from "../../redux/slices/basketSlice";
import {user as reduxUser} from "../../redux/slices/userSlice";
import Price from "../parts/price/Price";
import {Link} from "react-router-dom";
import getImageUrl from "../../helpers/getImageUrl";
import CloseButton from "../parts/close-button/CloseButton";
import CloseOutside from "../parts/close-outside/CloseOutside";
import offerImagePlaceholder from '../../images/offer/offer-image-placeholder.png'
const BasketItem = ({productTitle, productPrice, quantity, basketID, productID, promotionData, imageName}) => {

    const dispatch = useDispatch()
    const user = useSelector(reduxUser)
    const changeQuantity = (quantityValue) => {
        const data = {
            quantity: quantityValue,
            productID: productID
        }
        if(user.type === 'user'){
            data['basketID'] = user.user.id
        }
        dispatch(fetchModifyBasket(data))
    }

    return(
        <div className={styles.basket_item}>
            <div className={styles.left}>
                <div className={styles.product_image_wrapper}>
                    <img src={imageName ? getImageUrl(imageName) : offerImagePlaceholder} className={styles.product_image} />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.product_title}>
                        {productTitle}
                    </h3>
                    <div className={styles.bottom_content}>
                        <div className={styles.quantity_wrapper}>
                            <button className={`btn-primary ${styles.change_quantity_button}`} onClick={() => changeQuantity(quantity - 1)}>-</button>
                            <input className={styles.quantity_value} value={quantity} onChange={(e) => changeQuantity(e.target.value)} />
                            <button className={`btn-primary ${styles.change_quantity_button}`} onClick={() => changeQuantity(quantity + 1)}>+</button>
                        </div>
                        <div>
                            <Price price={productPrice} promotionPrice={promotionData ? promotionData.promotionPrice : null} endsAt={promotionData ? promotionData.endAt : null} />
                        </div>
                    </div>

                </div>
            </div>
            <IoIosCloseCircleOutline  className={styles.delete_basket_item} onClick={() => changeQuantity(0)} />
        </div>
    )
}

const BasketContent = ({basket, handleBasketContentClose}) => {

    return(
        <div className={`${styles.basket_content_wrapper} ${basket.basketVisible ? styles.active : ''}`}>
            <CloseOutside handleClose={handleBasketContentClose}>
                <div className={styles.basket_content}>
                    <div className={styles.top_basket}>
                        <h5 className={styles.top_basket_title}>Twój koszyk</h5>
                        <CloseButton handleClose={handleBasketContentClose} />
                    </div>
                    <div className={styles.basket_loop}>
                        {basket.data.map((el, index) => <React.Fragment key={index}><BasketItem productTitle={el.productTitle} productPrice={el.productPrice} quantity={el.quantity} basketID={basket.id} productID={el.productID} promotionData={el.promotionData} imageName={el.imageName} /></React.Fragment>)}
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
                                <Link to="/zamowienie" className={`btn-primary ${styles.continue_shop_button}`}>
                                    Przejdź do zamówienia
                                </Link>
                            }
                        </div>

                    </div>
                </div>
            </CloseOutside>
        </div>

    )
}

export default BasketContent;