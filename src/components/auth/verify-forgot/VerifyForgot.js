import styles from './verify-forgot.module.scss'
import AuthHeader from "../parts/auth-header/AuthHeader";
import VerificationInput from "react-verification-input";
import callToAPI from "../../../api";
import Cookies from "js-cookie";
import {fetchUser} from "../../../redux/slices/userSlice";
import {useState} from "react";
import BackButton from "../parts/back-button/BackButton";
import WrongData from "../parts/wrong-data/WrongData";
const VerifyForgot = ({setActiveID}) => {
	const [codeValue, setCodeValue] = useState('')
	const [isCodeValid, setIsCodeValid] = useState(true)
	const handleComplete = (code) => {
		setCodeValue(code)
	}

	const handleChange = (e) => {
		setCodeValue('')
		setIsCodeValid(true)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		callToAPI('/forgot/verify', 'post', {
			email: localStorage.getItem('forgot-email'),
			forgotToken: codeValue
		})
			.then(res => {
				setActiveID('new-password')
				localStorage.removeItem('forgot-email')
			})
			.catch(() => {
				setIsCodeValid(false)
			})
	}

	const resendCode = () => {
		callToAPI('/forgot', 'post', {
			email: localStorage.getItem('forgot-email')
		})
			.then(res => {

			})
			.catch(() => {
			})
	}

	const back = () => {
		setActiveID('forgot')
		localStorage.removeItem('forgot-email')
	}

	return(
		<div className={styles.verify_forgot}>
			<AuthHeader title="Weryfikacja" subtitle="Nie dostałes kody?" actionText="Wyślij ponownie" action={resendCode} />
			<form className={styles.verify_forgot_form} onSubmit={handleSubmit}>
				<VerificationInput onChange={handleChange} autoFocus onComplete={handleComplete} validChars="0-9" inputProps={{ inputMode: "numeric" }} placeholder="" classNames={{character: styles.character, container: styles.container, characterSelected: styles.character_selected,}} />
				<button disabled={codeValue.length !== 6} className={`btn btn-primary ${styles.verify_button}`} type="submit">Potwierdz</button>
				<WrongData isValid={isCodeValid} text="Podany kod jest prawidłowy lub stracił swoją ważność" />
				<BackButton onClick={back} />
			</form>
		</div>
	)
}

export default VerifyForgot;