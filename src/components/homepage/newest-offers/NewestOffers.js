import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewestOffers, newestOffers as reduxNewestOffers} from "../../../redux/slices/offersSlice";
import OffersLoop from "../../store/loop/OffersLoop";
import styles from './newest-offers.module.scss'
import {Link} from "react-router-dom";
const NewestOffers = () => {
    const dispatch = useDispatch()

    const newestOffers = useSelector(reduxNewestOffers)

    useEffect(() => {
        dispatch(fetchNewestOffers({limit: 4}))
    }, []);

    return(
        <div className="container">
            <div className={styles.newest_offers}>
                <div className={styles.newest_offers_title_wrapper}>
                    <h2 className={styles.newest_offers_title}>Najnowsze oferty</h2>
                </div>
                <OffersLoop offers={newestOffers} offersStatus={'fulfilled'} />
                <Link to="/sklep" className={`${styles.newest_offers_see_more} btn-primary`}>
                    Zobacz więcej
                </Link>
            </div>
        </div>

    )
}

export default NewestOffers;