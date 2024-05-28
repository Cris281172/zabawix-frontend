import styles from './popup.module.scss'
const Popup = ({children}) => {
	return(
		<div className={styles.popup}>
			{children}
		</div>
	)
}

export default Popup;