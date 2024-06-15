import EditProfile from "../../parts/EditProfile";
import { Formik } from "formik";
import DeliveryAddressForm from "../delivery-address/DeliveryAddressForm";
import * as Yup from "yup";
import BillingDetailsForm from "./BillingDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import {
	billingData as reduxBillingData,
	fetchCreateBilling, fetchDeleteBilling,
	fetchEditBilling
} from '../../../../redux/slices/billingSlice';
import { phoneNumberRegex, postalCodeRegex } from "../../../../helpers/regexes";
import { useState, useEffect } from "react";

const validationSchema = Yup.object().shape({
	billingDetails: Yup.object().shape({
		name: Yup.string().required('Imię jest wymagane'),
		surname: Yup.string().required('Nazwisko jest wymagane'),
		address: Yup.string().required('Adres jest wymagany'),
		zip: Yup.string().required('Kod pocztowy jest wymagany').matches(postalCodeRegex, "Nieprawidłowy format kodu pocztowego"),
		phone: Yup.string().required('Numer telefonu jest wymagany').matches(phoneNumberRegex, "Nieprawidłowy format numeru telefonu"),
		city: Yup.string().required('Miasto jest wymagane')
	})
});

const BillingDetails = () => {
	const billingData = useSelector(reduxBillingData);
	const dispatch = useDispatch();
	const [actionType, setActionType] = useState('')

	const [initialData, setInitialData] = useState({
		id: '',
		billingDetails: {
			name: '',
			surname: '',
			address: '',
			zip: '',
			phone: '',
			city: ''
		}
	});

	const handleSubmit = (values) => {
		if(actionType === 'create'){
			dispatch(fetchCreateBilling({ ...values.billingDetails }));
			setActionType('')
		}
		else if(actionType === 'edit'){
			dispatch(fetchEditBilling({ billingDetails: values.billingDetails, id: values.id }));
			setActionType('')
		}
	};

	const previewSectionConfig = billingData.map(item => ({
		data: [
			{ name: 'Imię', value: item.billingDetails.name },
			{ name: 'Nazwisko', value: item.billingDetails.surname },
			{ name: 'Adres', value: item.billingDetails.address },
			{ name: 'Miasto', value: item.billingDetails.city },
			{ name: 'Kod pocztowy', value: item.billingDetails.zip },
			{ name: 'Numer telefonu', value: item.billingDetails.phone }
		],
		id: item._id
	}));

	const editData = (id) => {
		const item = billingData.find(data => data._id === id);
		if (item) {
			setInitialData({
				id: id,
				billingDetails: {
					name: item.billingDetails.name,
					surname: item.billingDetails.surname,
					address: item.billingDetails.address,
					zip: item.billingDetails.zip,
					phone: item.billingDetails.phone,
					city: item.billingDetails.city
				}
			});
		}
	};

	const deleteData = (id) => {
		if(id){
			dispatch(fetchDeleteBilling(id))
			setInitialData({
				billingDetails: {
					name: '',
					surname: '',
					address: '',
					zip: '',
					phone: '',
					city: ''
				}
			});
			setActionType('')
		}
	}

	const createData = () => {
		setInitialData({
			billingDetails: {
				name: '',
				surname: '',
				address: '',
				zip: '',
				phone: '',
				city: ''
			},
		});
	}


	return (
		<div>
			<EditProfile sectionTitle="Dane rozliczeniowe" previewSection={previewSectionConfig} editData={editData} deleteData={deleteData} createData={createData} setActionType={setActionType}>
				<Formik
					enableReinitialize
					initialValues={initialData}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					{({ values, setValues }) => (
						<BillingDetailsForm actionType={actionType}  />
					)}
				</Formik>
			</EditProfile>
		</div>
	);
};

export default BillingDetails;