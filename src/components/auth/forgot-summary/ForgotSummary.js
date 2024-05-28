import AuthHeader from "../parts/auth-header/AuthHeader";
import styles from './forgot-summary.module.scss'

const ForgotSummary = ({setActiveID}) => {

	const login = () => setActiveID('login')

	return(
		<div className={styles.forgot_summary}>
			<AuthHeader title="Gratulacje" subtitle="Hasło zostało zmienione." />
			<button onClick={login} className={`btn-primary ${styles.forgot_summary_button}`}>
				Zaloguj się
			</button>
		</div>
	)
}

export default ForgotSummary;