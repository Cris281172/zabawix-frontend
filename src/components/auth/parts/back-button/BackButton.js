import styles from './back-button.module.scss'
const BackButton = ({onClick}) => {
	return(
		<div className={styles.back_button_wrapper}>
			<button onClick={onClick} className={styles.back_button}>Wróc</button>
		</div>
	)
}

export default BackButton;