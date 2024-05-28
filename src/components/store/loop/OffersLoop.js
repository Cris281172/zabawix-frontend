import styles from './offers-loop.module.scss'
import Offer from "./offer/Offer";
import SkeletonLoading from "./skeleton/SkeletonLoading";
import InfoContainer from "../../parts/info-container/InfoContainer";
const OffersLoop = ({offers, offersStatus, count, type}) => {

    return(
        <div className={`${styles.offers_loop}`}>
            {offersStatus === 'fulfilled' && count === 0 && <InfoContainer text="Brak wyników dla obserwacji" type='info' />}
            {offersStatus === 'pending' && <SkeletonLoading />}
            {offersStatus === 'rejected' && <div>Błąd w ładowaniu</div>}
            {offersStatus === 'fulfilled' &&
                <>
                    {offers.map(el => <Offer item={el} type={type} />)}
                </>
            }
        </div>
    )
}

export default OffersLoop;