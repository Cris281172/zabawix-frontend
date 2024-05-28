import styles from './offer-information.module.scss'
import AddToBasket from "../../../parts/add-to-basket/AddToBasket";
import getPointsValue from "../../../../helpers/getPointsValue";
import { TbTruckDelivery } from "react-icons/tb";
import { RiHandCoinLine } from "react-icons/ri";
import { FaExchangeAlt } from "react-icons/fa";
import { GiOpenChest } from "react-icons/gi";
import Price from "../../../parts/price/Price";
import PromotionExpiresIn from "../../../parts/promotion-expires-in/PromotionExpiresIn";
import {useState} from "react";
import { FaDotCircle } from "react-icons/fa";
import RelateOffers from "../relate/RelateOffers";
const OfferInformation = ({item}) => {

    const additionalInformationConfig = [
        {
            text: "Wysyłka do 48 godzin",
            icon: <TbTruckDelivery className={styles.additional_information_icon} />
        },
        {
            text: "Darmowa wysyłka od 199 zł",
            icon: <RiHandCoinLine className={styles.additional_information_icon} />
        },
        {
            text: "14 dni na łatwy zwrot",
            icon: <FaExchangeAlt className={styles.additional_information_icon} />
        },
        {
            text: "Punkty za zakupy",
            icon: <GiOpenChest className={styles.additional_information_icon} />
        }
    ]

    return(
        <div className={styles.main_content}>
            <h1 className={styles.main_content_title}>{item.title}</h1>
            <div className={styles.price_wrapper}>
                <span className={styles.price}>
                    <Price price={item.price} promotionPrice={item.promotionData.promotionPrice} endsAt={item.promotionData.endAt} />
                </span>
                BRUTTO
                <span className={styles.points}>+ {getPointsValue(item.price, item.promotionData.promotionPrice)} punktów</span>
                {item.promotionData.endAt && <PromotionExpiresIn endAt={item.promotionData.endAt} />}
            </div>
            <div className={styles.amount_wrapper}>
                <FaDotCircle className={`${item.amount >= 3 ? styles.accessible : styles.unavailable}`} /> <p className={styles.amount}>Produkt {item.amount >= 3 ? 'dostępny' : 'niedostępny'} {item.amount >= 3 ? `- ${item.amount} sztuk` : ''}</p>
            </div>
            <div className={styles.add_to_basket_wrapper}>
                <AddToBasket item={{...item, imageName: item.imageNames[0]}} icon={false} />
            </div>
            <div className={styles.additional_information}>
                <ul className={styles.additional_information_list}>
                    {additionalInformationConfig.map((item, index) => <li className={styles.additional_information_item} key={index}>{item.icon} <p className={styles.additional_information_text}>{item.text}</p></li>)}
                </ul>
            </div>
            <RelateOffers relatedOffers={item.relatedOffers} />
        </div>
    )
}

export default OfferInformation;