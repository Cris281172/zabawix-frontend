import {useFormikContext} from "formik";
import InpostData from "./InpostData";
import DeliveryData from "../data/DeliveryData";
import DeliveryDataForm from "../data/DeliveryDataForm";
const Courier = () => {

    const {values} = useFormikContext()

    return(
        <>
            {values.deliveryType === 'courier' && <DeliveryDataForm />}
        </>
    )
}

export default Courier;