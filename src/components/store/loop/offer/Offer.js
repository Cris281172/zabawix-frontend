import React, { useState } from 'react';
import styles from './offer.module.scss';
import TopIcons from "./top-icons/TopIcons";
import { Link } from "react-router-dom";
import Price from "../../../parts/price/Price";
import getImageUrl from "../../../../helpers/getImageUrl";
import offerImagePlaceholder from '../../../../images/offer/offer-image-placeholder.png'
const Offer = ({ item, type }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className={styles.offer}>
            <div className={styles.thumbnail_wrapper}>
                <TopIcons item={item} />
                <Link to={`/produkt/${type === 'observe' ? item.productID : item._id}`}>
                    {imageLoaded ? (
                        <span className={styles.image} style={{ backgroundImage: `url('${getImageUrl(item.imageName)}')` }}></span>
                    ) : (
                        <img src={offerImagePlaceholder} className={styles.image}></img>
                    )}
                    <img
                        src={getImageUrl(item.imageName)}
                        alt={item.title}
                        onLoad={handleImageLoad}
                        style={{ display: 'none' }}
                    />
                </Link>
            </div>
            <div>
                <h2 className={styles.offer_title}>{item.title}</h2>
                <Price price={item.price} promotionPrice={item.promotionData ? item.promotionData.promotionPrice : null} endsAt={item.promotionData ? item.promotionData.endAt : null} />
                {item.categoryName}
            </div>
        </div>
    );
};

export default Offer;