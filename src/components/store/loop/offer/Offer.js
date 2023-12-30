import styles from './offer.module.scss'
import TopIcons from "./top-icons/TopIcons";
const Offer = ({item}) => {
    return(
        <div className={styles.offer}>
            <div className={styles.thumbnail_wrapper}>
                <TopIcons item={item} />
                <span className={styles.image} style={{backgroundImage: `url('https://storage.cloud.google.com/zabawix-image/uploads/1703711343124_396961546_122117668166061381_9155468782490251989_n-PhotoRoom(1).png?authuser=5')`}}></span>
            </div>

        </div>
    )
}

export default Offer;