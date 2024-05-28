import InpostData from "./type/InpostData";
import {useFormikContext} from "formik";
import DeliveryDataForm from "./data/DeliveryDataForm";

const Delivery = () => {

	const {values, setFieldValue} = useFormikContext()
	const handleDeliveryTypeChange = (e) => {
		setFieldValue("deliveryType", e.target.value);
	};

	return(
		<div>
			<label>
				<input type="radio" id="courier" name="deliveryType" value="courier" checked={values.deliveryType === "courier"} onChange={handleDeliveryTypeChange} />
				<span htmlFor="huey">Kurier</span>
			</label>
			<label>
				<input type="radio" id="parcelLocker" name="deliveryType" value="parcelLocker" checked={values.deliveryType === "parcelLocker"} onChange={handleDeliveryTypeChange} />
				<span htmlFor="huey">Paczkomat</span>
			</label>
			{values.deliveryType === 'courier' && <DeliveryDataForm />}
			<InpostData />
			<button type="submit">Test submit</button>
		</div>
	)
}

export default Delivery;