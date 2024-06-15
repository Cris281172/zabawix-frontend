import EditProfile from "../../parts/EditProfile";
import {Formik} from "formik";
import useFormSection from "../../../../hooks/useFormSection";
import DeliveryAddressForm from "./DeliveryAddressForm";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
	deliveryAddress as reduxDeliveryAddress,
	fetchCreateDelivery,
	fetchGetDelivery
} from "../../../../redux/slices/deliverySlice";
import * as Yup from "yup";
import {phoneNumberRegex, postalCodeRegex} from "../../../../helpers/regexes";

const validationSchema = Yup.object().shape({
	deliveryAddress: Yup.object().shape({
		name: Yup.string().required('Imię jest wymagane'),
		surname: Yup.string().required('Nazwisko jest wymagane'),
		address: Yup.string().required('Adres jest wymagany'),
		zip: Yup.string().required('Kod pocztowy jest wymagany').matches(postalCodeRegex, "Nieprawidłowy format kodu pocztowego"),
		phone: Yup.string().required('Numer telefonu jest wymagany').matches(phoneNumberRegex, "Nieprawidłowy format numeru telefonu"),
		city: Yup.string().required('Miasto jest wymagane')
	}),
})

const DeliveryAddress = () => {

	const dispatch = useDispatch()

	const deliveryAddress = useSelector(reduxDeliveryAddress)

	const initialData = {
		deliveryAddress: {
			type: 'courier',
			...deliveryAddress,
		},
	};

	const handleSubmit = (values) => {
		dispatch(fetchCreateDelivery({...values.deliveryAddress, zip: Number(values.deliveryAddress.zip), phone: Number(values.deliveryAddress.phone)}))
	}


	return(
		<div>
			<EditProfile sectionTitle="Adres dostawy">
				<Formik initialValues={initialData} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{() => (
						<DeliveryAddressForm />
					)}
				</Formik>
			</EditProfile>
		</div>
	)
}

export default DeliveryAddress