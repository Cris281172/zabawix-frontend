import styles from './active-summary.module.scss'
import AuthHeader from "../parts/auth-header/AuthHeader";
import {Link} from "react-router-dom";
import {usePopupContext} from "../../parts/contexts/PopupContext";
const ActiveSummary = () => {

	const {hidePopup} = usePopupContext()
	const hideAuthPopup = () => hidePopup()

	return(
		<div className={styles.active_summary}>
			<AuthHeader title="Gratulacje" subtitle="Konto zostało stworzone" />
			<div className={styles.active_summary_content}>
				<h2 className={styles.content_title}>Przejdź do:</h2>
				<ul className={styles.content_list}>
					<li className={styles.content_item}>
						<Link to="moje-konto" className={`btn-primary ${styles.content_link}`} onClick={hideAuthPopup}>
							Ustawień konta
						</Link>
					</li>
					<li className={styles.content_item}>
						<Link to="sklep" className={`btn-primary ${styles.content_link}`} onClick={hideAuthPopup}>
							Sklepu
						</Link>
					</li>
					<li className={styles.content_item}>
						<Link to="moje-konto" className={`btn-primary ${styles.content_link}`} onClick={hideAuthPopup}>
							Kontaktu
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default ActiveSummary;
