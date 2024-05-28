import styles from './verify.module.scss'
import VerificationInput from "react-verification-input";
import AuthHeader from "../parts/auth-header/AuthHeader";
import {useState} from "react";
import callToAPI from "../../../api";
import Cookies from "js-cookie";
import {fetchUser} from "../../../redux/slices/userSlice";
import {useDispatch} from "react-redux";
import BackButton from "../parts/back-button/BackButton";
import WrongData from "../parts/wrong-data/WrongData";
const Verify = ({setActiveID}) => {

	const [codeValue, setCodeValue] = useState('')
	const [isCodeValid, setIsCodeValid] = useState(true)

	const dispatch = useDispatch()

	const handleComplete = (code) => {
		setCodeValue(code)
	}

	const handleChange = (e) => {
		setCodeValue('')
		setIsCodeValid(true)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		callToAPI('/email-verify', 'post', {
			emailToken: Number(codeValue)
		})
			.then(res => {
				localStorage.removeItem('email');
				const now = new Date();
				now.setTime(now.getTime() + 1000 * 60 * 60);
				Cookies.set('token', res.token, {
					expires: 1/24
				})
				dispatch(fetchUser())
				setActiveID('active-summary')
			})
			.catch(() => {
				setIsCodeValid(false);
			})
	}

	const resendCode = () => {
		callToAPI('/resend-code', 'post', {
			email: localStorage.getItem('email')
		})
			.then(res => {

			})
			.catch(err => {
				console.error('Failed to resend code:', err);
			});
	}

	const back = () => {
		localStorage.removeItem('email');
		setActiveID('register')
	}

	return(
		<div className={styles.verify}>
			<AuthHeader title="Weryfikacja" subtitle="Nie dostałes kody?" actionText="Wyślij ponownie" action={resendCode} />
			<form className={styles.verify_form} onSubmit={handleSubmit}>
				<VerificationInput onChange={handleChange} autoFocus onComplete={handleComplete} validChars="0-9" inputProps={{ inputMode: "numeric" }} placeholder="" classNames={{character: styles.character, container: styles.container, characterSelected: styles.character_selected,}} />
				<button disabled={codeValue.length !== 6} className={`btn btn-primary ${styles.verify_button}`} type="submit">Potwierdz</button>
				<WrongData isValid={isCodeValid} text="Podany kod jest prawidłowy lub stracił swoją ważność" />
				<BackButton onClick={back} />
			</form>
		</div>
	)
}

export default Verify;