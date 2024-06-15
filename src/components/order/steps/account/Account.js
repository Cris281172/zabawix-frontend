import Auth from "../../../auth/Auth";
import {usePopupContext} from "../../../parts/contexts/PopupContext";
import ValidationError from "../../../parts/validation-error/ValidationError";
import React from "react";
import {useFormikContext} from "formik";
import styles from './account.module.scss'

const Account = () => {

	const {showPopup} = usePopupContext()

	const {values, errors, handleChange, handleBlur} = useFormikContext()

	const accountAction = (type) => {
		showPopup(Auth, {type: type})
	}

	return(
		<div className={styles.account}>
			<h5 className={styles.type_email}>Podaj email</h5>
			<div className="input-wrapper primary">
				<input
					className={`input-typing ${values.email.length === 0 ? '' : 'has-content'} ${
						values.email.length === 0 ? '' : (errors.email ? 'no-valid' : 'valid')
					}`}
					type="text"
					onChange={handleChange}
					onBlur={handleBlur}
					name={`email`}
					value={values.email}
				/>
				<label>Email</label>
				<span className="focus-border"></span>
				<ValidationError isErrorVisible={errors.email} errorMessage={errors.email} />
			</div>
			<span className={styles.or}>lub</span>
			<div className={styles.account_buttons}>
				<button className={`${styles.account_button} btn-primary`} onClick={() => accountAction('register')}>Załóż konto</button>
				<button className={`${styles.account_button} btn-primary`} onClick={() => accountAction('login')}>Zaloguj się</button>
			</div>
		</div>
	)
}

export default Account;