import chestImage from '../../../images/chest.webp'
import SectionTitle from "../section-title/SectionTitle";
import styles from './chest.module.scss'
import {Link} from "react-router-dom";

const Chest = () => {
    return(
        <div className="container">
            <div className={styles.chest}>
                <span className={styles.left_top}></span>
                <span className={styles.right_bottom}></span>
                <img src={chestImage} className={styles.chest_image} />
                <div className={styles.chest_information}>
                    <SectionTitle title="Otwieraj szyknki z promocjami!" />
                    <div className={styles.chest_box}>
                        <p className={styles.chest_box_text}>
                            Odkryj Ekscytujące Promocje w Naszych Magicznych Skrzynkach! Witaj w świecie wyjątkowych okazji! Jako nasz cenny klient, masz szansę zdobyć niesamowite promocje i zniżki za każdym razem, gdy otworzysz jedną z naszych magicznych skrzynek. Każde otwarcie skrzynki to nowa przygoda i nowa możliwość oszczędności!
                        </p>
                        <p className={styles.chest_box_remember}>
                            <strong>Pamiętaj!</strong> Każda skrzynka to niespodzianka – nigdy nie wiesz, jaką promocję przyniesie. Od specjalnych zniżek po ekskluzywne oferty - każda skrzynka to unikalna szansa na wyjątkowe korzyści.
                        </p>
                        <Link to="/skrzynki/informacje" className={`${styles.see_more} btn-outline-primary`}>Poznaj szczegóły!</Link>
                        <Link to="/skrzynki" className={`${styles.see_more} btn-outline-primary`}>Otwieraj skrzynki</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chest;