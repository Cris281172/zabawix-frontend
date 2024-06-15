import styles from './saved-billing-details.module.scss';
import CloseButton from "../../../parts/close-button/CloseButton";
import CloseOutside from "../../../parts/close-outside/CloseOutside";
import { usePopupContext } from "../../../parts/contexts/PopupContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { billingData as reduxBillingData, fetchGetBillings } from "../../../../redux/slices/billingSlice";

const SavedBillingDetails = ({ setInitialValues }) => {
	const dispatch = useDispatch();
	const { hidePopup } = usePopupContext();
	const billingData = useSelector(reduxBillingData);

	useEffect(() => {
		dispatch(fetchGetBillings());
	}, [dispatch]);

	if (billingData.length === 0) {
		return null;
	}

	const savedBillingDetailsConfig = billingData.map(item => ({
		data: [
			{ name: 'Imię', value: item.billingDetails.name, key: 'name' },
			{ name: 'Nazwisko', value: item.billingDetails.surname, key: 'surname' },
			{ name: 'Adres', value: item.billingDetails.address, key: 'address' },
			{ name: 'Miasto', value: item.billingDetails.city, key: 'city' },
			{ name: 'Kod pocztowy', value: item.billingDetails.zip, key: 'zip' },
			{ name: 'Numer telefonu', value: item.billingDetails.phone, key: 'phone' }
		],
		id: item._id
	}));

	const setSavedAddress = (billingItem) => {
		const billingDetails = billingItem.data.reduce((acc, item) => {
			acc[item.key] = item.value;
			return acc;
		}, {});

		setInitialValues(prevState => ({
			...prevState,
			billingDetails
		}));

		hidePopup();
	}

	return (
		<CloseOutside handleClose={() => hidePopup()}>
			<div className={styles.saved_billing_details}>
				<div className={styles.close_button_wrapper}>
					<CloseButton handleClose={() => hidePopup()} />
				</div>
				<h3 className={styles.saved_billing_title}>Wybierz jeden z zapisanych adresów</h3>
				<div className={styles.saved_billing_details_data}>
					{billingData.length === 0 ?
						'Brak adresów'
						:
						<div className={styles.saved_billing_details_data_wrapper}>
							{savedBillingDetailsConfig.map((billingItem, index) => (
								<div key={index} onClick={() => setSavedAddress(billingItem)} className={styles.saved_billing_item}>
									{billingItem.data.map((item, index) => (
										<div key={index}>
											{item.name}: {item.value}
										</div>
									))}
								</div>
							))}
						</div>
					}
				</div>
			</div>
		</CloseOutside>
	);
}

export default SavedBillingDetails;