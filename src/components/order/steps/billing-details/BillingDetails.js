import React from 'react';
import { useFormikContext } from 'formik';
import styles from './billing-details.module.scss';
import ValidationError from '../../../parts/validation-error/ValidationError';
import useFormSection from "../../../../hooks/useFormSection";
import { useSelector } from "react-redux";
import { billingData as reduxBillingData } from "../../../../redux/slices/billingSlice";
import { usePopupContext } from "../../../parts/contexts/PopupContext";
import SavedBillingDetails from "./SavedBillingDetails";
import {user as reduxUser} from "../../../../redux/slices/userSlice";
import Auth from "../../../auth/Auth";

const BillingDetails = ({ setInitialValues }) => {
	const { values, setFieldValue } = useFormikContext();
	const billingData = useSelector(reduxBillingData);
	const { showPopup } = usePopupContext();
	const user = useSelector(reduxUser)
	const changeInvoiceStatus = (e) => {
		setFieldValue('billingDetails.invoice', e.target.checked);
	};

	const changeSameLikeDeliveryAddressStatus = (e) => {
		setFieldValue('billingDetails.sameLikeDeliveryAddress', e.target.checked);
	}

	const showSavedAddress = () => {
		if(user.type === 'quest'){
			showPopup(Auth, {type: 'login'})
		}
		else if(user.type === 'user'){
			showPopup(SavedBillingDetails, { setInitialValues })
		}
	}

	const { renderInput } = useFormSection('billingDetails');

	return (
		<div className={styles.billing_details}>
			<label className={styles.billing_details_invoice}>
				<input
					type="checkbox"
					name="billingDetails.invoice"
					checked={values.billingDetails.invoice}
					onChange={changeInvoiceStatus}
				/>
				<span>Potrzebujesz faktury?</span>
			</label>
			<label className={styles.billing_details_invoice}>
				<input
					type="checkbox"
					name="billingDetails.sameLikeDeliveryAddress"
					checked={values.billingDetails.sameLikeDeliveryAddress}
					onChange={changeSameLikeDeliveryAddressStatus}
				/>
				<span>Dane rozliczeniowe takie same jak faktury</span>
			</label>
			<button className={`btn-primary ${styles.billing_details_saved_address}`} type='button' onClick={showSavedAddress}>
				Twoje adresy
			</button>
			<div className={styles.billing_details_form}>
				{values.billingDetails.invoice && (
					<>
						{renderInput('companyName', 'Nazwa firmy')}
						{renderInput('companyTaxID', 'NIP')}
					</>
				)}
				{!values.billingDetails.sameLikeDeliveryAddress && (
					<>
						{renderInput('name', 'Imię')}
						{renderInput('surname', 'Nazwisko')}
						{renderInput('address', 'Adres')}
						{renderInput('zip', 'Kod pocztowy')}
						{renderInput('phone', 'Numer telefonu')}
					</>
				)}
			</div>
		</div>
	);
};

export default BillingDetails;