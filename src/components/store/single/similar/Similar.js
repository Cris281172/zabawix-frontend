import OffersLoop from "../../loop/OffersLoop";
import styles from './similar.module.scss'
const Similar = ({similarOffers}) => {

	return(
		<div className={styles.similar}>
			<h2 className={styles.similar_title}>Podobne produkty</h2>
			<div className={styles.similar_offers}>
				<OffersLoop offers={similarOffers} offersStatus={'fulfilled'} />
			</div>
		</div>
	)
}

export default Similar;