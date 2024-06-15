import React from 'react';
import styles from './delivery-address.module.scss';
import useFormSection from "../../../../hooks/useFormSection";

const DeliveryAddress = () => {
	const { renderInput } = useFormSection('deliveryAddress');

	return (
		<div className={styles.delivery_address}>
			<div className={styles.delivery_address_form}>
				{renderInput('name', 'Imię')}
				{renderInput('surname', 'Nazwisko')}
				{renderInput('address', 'Adres')}
				{renderInput('zip', 'Kod pocztowy')}
				{renderInput('phone', 'Numer telefonu')}
			</div>
		</div>
	);
};

export default DeliveryAddress;