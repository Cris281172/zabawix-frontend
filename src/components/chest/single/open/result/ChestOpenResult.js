import styles from './chest-open-result.module.scss'
import getImageUrl from "../../../../../helpers/getImageUrl";
import Price from "../../../../parts/price/Price";
import {Link} from "react-router-dom";
import CloseButton from "../../../../parts/close-button/CloseButton";
import CloseOutside from "../../../../parts/close-outside/CloseOutside";
import PromotionExpiresIn from "../../../../parts/promotion-expires-in/PromotionExpiresIn";
import getDate from "../../../../../helpers/date/getDate";
const ChestOpenResult = ({chestResult, setResultPopupActive, resultPopupActive}) => {

    const handleClose = () => resultPopupActive ? setResultPopupActive(false) : null;

    return(

        <div className={styles.chest_open_result}>
            <CloseOutside handleClose={handleClose}>
                <div className={styles.chest_open_result_content}>
                    <div className={styles.chest_open_result_close_button_wrapper}>
                        <CloseButton handleClose={handleClose} />
                    </div>
                    <h3 className={styles.chest_open_result_you_win}>Wygrałeś/Wygrałaś:</h3>
                    <img className={styles.chest_open_result_image} src={getImageUrl(chestResult.imageName)} />
                    <h2 className={styles.chest_open_result_offer_title}>{chestResult.productTitle}</h2>
                    <h3 className={styles.chest_open_result_price}>
                        <Price price={chestResult.normalPrice} promotionPrice={chestResult.promotionPrice} />
                        <PromotionExpiresIn endAt={getDate(24 * 60 * 60 * 1000)}  />
                    </h3>
                    <div className={styles.chest_open_result_links}>
                        <Link className={`${styles.chest_open_result_link} btn-primary`} to={`/produkt/${chestResult.productID}`}>
                            Przejdź do produktu
                        </Link>
                        <Link className={`${styles.chest_open_result_link} btn-primary`} to={`/produkt/${chestResult.productID}`}>
                            Zobacz swoje wszystkie promocje
                        </Link>
                    </div>
                </div>
            </CloseOutside>
        </div>
    )
}

export default ChestOpenResult;
