import styles from './auth-header.module.scss'
const AuthHeader = ({title, subtitle, actionText, action}) => {
	return(
		<div className={styles.auth_header}>
			<h2 className={styles.auth_header_title}>
				{title}
			</h2>
			<p className={styles.auth_subtitle_wrapper}>
				{subtitle}
				<span className={styles.auth_action} onClick={action}>{actionText}</span>
			</p>
		</div>
	)
}

export default AuthHeader;