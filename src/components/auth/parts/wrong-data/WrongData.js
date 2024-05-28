import styles from './wrong-data.module.scss'
const WrongData = ({isValid, text}) => {
	if(isValid){
		return
	}
	return(
		<p className={styles.wrong_data}>
			{text}
		</p>
	)
}

export default WrongData;