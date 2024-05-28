import {useFormikContext} from "formik";
import DeliveryDataForm from "./DeliveryDataForm";

const DeliveryData = () => {

    const {values, setFieldValue} = useFormikContext()

    return(
        <>
            {values.deliveryType === 'parcelLocker' ?
                <>
                    {values.deliveryDataInpost.parcelLockerID}
                </>
                :
                <DeliveryDataForm />
            }
        </>
    )
}

export default DeliveryData;