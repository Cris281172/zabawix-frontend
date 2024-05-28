import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import OfferGallery from "./gallery/OfferGallery";
import styles from './singe-offer.module.scss'
import OfferInformation from "./offer-information/OfferInformation";
import {useDispatch, useSelector} from "react-redux";
import {fetchOffer, offer as reduxOffer, offerStatus as reduxOfferStatus} from "../../../redux/slices/offersSlice";
import SkeletonLoadingGallery from "./skeleton/SkeletonLoadingGallery";
import SkeletonLoadingMainContent from "./skeleton/SkeletonLoadingMainContent";
import Similar from "./similar/Similar";
import Tabs from "./tabs/Tabs";

const SingleOffer = () => {
    const params = useParams()

    const [offerNotFound, setOfferNotFound] = useState()

    const dispatch = useDispatch()

    const offer = useSelector(reduxOffer)

    const offerStatus = useSelector(reduxOfferStatus)

    useEffect(() => {
        dispatch(fetchOffer(params.id))
    }, [params.id]);

    return(
        <div className="container">
            <div className={styles.single_offer}>
                <div className={styles.content}>
                    <div className={styles.main_content}>
                        {offerStatus === 'pending' &&
                            <SkeletonLoadingGallery />
                        }
                        {offerStatus === 'fulfilled' &&
                            <>
                                <OfferGallery images={offer.imageNames} />
                                <Tabs singleData={offer}  />
                            </>
                        }

                    </div>
                    <div className={styles.aside_content}>
                        {offerStatus === 'pending' &&
                            <SkeletonLoadingMainContent />
                        }
                        {offerStatus === 'fulfilled' &&
                            <OfferInformation item={offer} />
                        }

                    </div>

                </div>
            </div>
            {offerStatus === 'fulfilled' && <Similar similarOffers={offer.similarOffers} />}
            {offerStatus === 'rejected' && <div>Nie znalexiono</div>}
        </div>


    )
}

export default SingleOffer;