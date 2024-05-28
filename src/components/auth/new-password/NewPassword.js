import styles from './new-password.module.scss'
import AuthHeader from "../parts/auth-header/AuthHeader";
import {Formik} from "formik";
import ValidationError from "../../parts/validation-error/ValidationError";
import SocialMedia from "../social-media/SocialMedia";
import * as Yup from "yup";

const NewPasswordSchema = Yup.object().shape({
	password: Yup.string().required('Wpisz hasło').min(6, 'Masz pewność co do hasła? Jest zbyt krótkie.').matches(/[0-9]+/ , 'Hasło musi zawierać przynajmniej jedną cyfrę oraz jedną wielką i jedną małą literę').matches(/[A-Z]+/ , 'Hasło musi zawierać przynajmniej jedną cyfrę oraz jedną wielką i jedną małą literę'),
	confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same').required('Powtórzenie hasła jest wymagane'),
});


const NewPassword = () => {

	const initialValues = {
		password: '',
		confirmPassword: ''
	}

	const handleSubmit = (values) => {

	}

	return(
		<div className={styles.new_password}>
			<AuthHeader title="Nowe hasło" subtitle="Ustaw nowe hasło do konta" />
			<Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)} validationSchema={NewPasswordSchema}>
				{({
					  errors,
					  touched,
					  handleSubmit,
					  values,
					  handleChange,
					  handleBlur,
					  isValid
				  }) => (
					<form onSubmit={handleSubmit}>
						<div className="input-wrapper primary">
							<div className="input-wrapper primary">
								<input className={`input-typing ${values.password.length === 0 ? '' : 'has-content'} ${values.password.length === 0 ? '' : (errors.password ? 'no-valid' : 'valid')}`} type="text"  onChange={handleChange} onBlur={handleBlur} name="password" value={values.password} />
								<label>Hasło *</label>
								<span className="focus-border"></span>
								<ValidationError isErrorVisible={errors.password} errorMessage={errors.password} isVisible={values.password.length !== 0} />
							</div>
							<div className="input-wrapper primary">
								<input className={`input-typing ${values.confirmPassword.length === 0 ? '' : 'has-content'} ${values.confirmPassword.length === 0 ? '' : (errors.confirmPassword ? 'no-valid' : 'valid')}`} type="text"  onChange={handleChange} onBlur={handleBlur} name="confirmPassword" value={values.confirmPassword} />
								<label>Powtórz Hasło *</label>
								<span className="focus-border"></span>
								<ValidationError isErrorVisible={errors.confirmPassword} errorMessage={errors.confirmPassword}/>
							</div>
						</div>
						<button type="submit" disabled={!isValid} className={`btn-primary ${styles.new_password_button}`}>Załóż konto</button>
					</form>
				)}
			</Formik>
			<SocialMedia />
		</div>
	)
}

export default NewPassword;