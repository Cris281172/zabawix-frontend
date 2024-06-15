import {useFormikContext} from "formik";
import useFormSection from "../../../../hooks/useFormSection";
import styles from "./billing-details.module.scss";

const BillingDetailsForm = ({actionType}) => {
	const {handleSubmit} = useFormikContext()

	const { renderInput } = useFormSection('billingDetails');

	return(
		<form onSubmit={handleSubmit} className={styles.billing_details_form}>
			<div className={styles.main_content}>
				{renderInput('name', 'Imię')}
				{renderInput('surname', 'Nazwisko')}
				{renderInput('address', 'Adres')}
				{renderInput('city', 'Miasto')}
				{renderInput('zip', 'Kod pocztowy')}
				{renderInput('phone', 'Numer telefonu')}
			</div>
			<button type='submit' className={`btn-primary ${styles.submit_button}`}>
				{actionType === 'create' ? 'Dodaj dane' : 'Edytuj dane'}
			</button>
		</form>
	)
}

export default BillingDetailsForm;