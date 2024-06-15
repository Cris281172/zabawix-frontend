import useFormSection from "../../../../hooks/useFormSection";
import {useFormikContext} from "formik";
import styles from './delivery-address-form.module.scss'
const DeliveryAddressForm = ({actionType}) => {

	const {handleSubmit} = useFormikContext()

	const { renderInput } = useFormSection('deliveryAddress');

	return(
		<form onSubmit={handleSubmit} className={styles.delivery_address_form}>
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

export default DeliveryAddressForm;