import styles from "./forgot.module.scss";
import AuthHeader from "../parts/auth-header/AuthHeader";
import {Formik} from "formik";
import ValidationError from "../../parts/validation-error/ValidationError";
import callToAPI from "../../../api";
import BackButton from "../parts/back-button/BackButton";
import * as Yup from "yup";

const forgotSchema = Yup.object().shape({
	email: Yup.string().required('Wpisz swój e-mail').email('To nie wygląda jak adres mailowy...'),
});

const Forgot = ({setActiveID}) => {

	const initialData = {
		email: ''
	}

	const handleSubmit = (values) => {
		callToAPI('/forgot', 'post', {
			email: values.email
		})
			.then(res => {
				localStorage.setItem('forgot-email', values.email)
				setActiveID('verify-forgot')
			})
			.catch(() => {

			})
	}

	const back = () => {
		setActiveID('login')
		localStorage.removeItem('forgot-email')
	}

	return(
		<div className={styles.forgot}>
			<AuthHeader title="Restartowanie hasła" subtitle="Podaj swój email, aby zrestartować hasło"/>
			<Formik initialValues={initialData} onSubmit={handleSubmit} validationSchema={forgotSchema}>
				{({
					  handleSubmit,
					  values,
					  errors,
					  handleChange,
					  handleBlur
				  }) => (
					<form onSubmit={handleSubmit}>
						<div className="input-wrapper primary">
							<input className={`input-typing ${values.email.length === 0 ? '' : 'has-content'} ${values.email.length === 0 ? '' : (errors.email ? 'no-valid' : 'valid')}`} type="text"  onChange={handleChange} onBlur={handleBlur} name="email" value={values.email} />
							<label>Email *</label>
							<span className="focus-border"></span>
							<ValidationError isErrorVisible={errors.email} errorMessage={errors.email} isVisible={values.email.length !== 0} />
						</div>
						<button type="submit" disabled={!!errors.email} className={`btn-primary ${styles.forgot_button}`}>Resetuj hasło</button>
						<BackButton onClick={back} />
					</form>
				)}
			</Formik>
		</div>
	)
}

export default Forgot;