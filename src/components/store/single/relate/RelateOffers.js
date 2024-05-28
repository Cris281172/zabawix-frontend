import styles from './relate-offers.module.scss'
import getImageUrl from "../../../../helpers/getImageUrl";
import {Link} from "react-router-dom";
const RelateOffers = ({relatedOffers}) => {

	return(
		<div className={styles.relate_offers_wrapper}>
			{relatedOffers.map((relate, index) => (
				<Link to={`/produkt/${relate._id}`} className={styles.relate_offers} key={index}>
					<img className={styles.relate_image} src={getImageUrl(relate.mainImage)} />
				</Link>
			))}
		</div>
	)
}

export default RelateOffers;