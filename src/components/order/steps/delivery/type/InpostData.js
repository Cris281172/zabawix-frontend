import { InpostGeowidget } from "react-inpost-geowidget";
import {useFormikContext} from "formik";
import {useState} from "react";
import styles from './inpost-data.module.scss'
const InpostData = () => {
    const {values, setFieldValue} = useFormikContext()

    const [isDeliveryDataExist, setIsDeliveryDataExist] = useState(!!values.deliveryDataInpost?.address?.line1)

    const onPointCallback = (e) => {

        setFieldValue('deliveryDataInpost.address.line1', e.address.line1)
        setFieldValue('deliveryDataInpost.address.line2', e.address.line2)
        setFieldValue('deliveryDataInpost.parcelLockerID', e.name)
        setIsDeliveryDataExist(true)
    }

    const removeParcelLocker = () => {
        setFieldValue('deliveryDataInpost.address.line1', '')
        setFieldValue('deliveryDataInpost.address.line2', '')
        setFieldValue('deliveryDataInpost.parcelLockerID', '')
        setIsDeliveryDataExist(false)
    }

    if(values.deliveryType !== "parcelLocker"){
        return
    }
    // console.log(values)
    return(
        <div className={styles.inpost_data}>
            {isDeliveryDataExist ?
                <>
                    <button onClick={removeParcelLocker}>Zmień paczkomat</button>
                    {values.deliveryDataInpost.address.line1}
                    {values.deliveryDataInpost.address.line2}
                    {values.deliveryDataInpost.parcelLockerID}
                </>
                :
                <InpostGeowidget
                    token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMjE4MDM4NDMsImlhdCI6MTcwNjQ0Mzg0MywianRpIjoiY2EyMjA2MGMtNjI5NC00NzQzLTlmNzctNzg1MzIzODcyZDljIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpFRThOZ2dRRE5RSWhlUk83c2V4RFBnbjJmNVV4cXk1Zk1rZG9Ua3VuTzlVIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiZjc0MDA1ZjAtYmY0Ni00NTZhLWI2M2YtNGY5NWI2N2M0MzlkIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6ImY3NDAwNWYwLWJmNDYtNDU2YS1iNjNmLTRmOTViNjdjNDM5ZCIsImFsbG93ZWRfcmVmZXJyZXJzIjoiIiwidXVpZCI6IjNkNmE1MmY4LTUwZTQtNDY3Yi1iZTE3LTQxMDM4MDExYTMxOCJ9.Y38nVRy06G0uWeD1nnpL14lh0tnu3Sj7EGYzAkookV9sM7f5oMSRpaBdoSwBNbWtcoT7ILgQXxyIo-69ZPr7C7undw8GAg55y4GvlqhMWrMAN5vKmjuVBSYHLRQ5JjHbKjIOCG29m1m-_oWHHSvJrWB-Bju7KngsqgsYo6FjlY-6Z007pYD86jIBoQnxaS-yj4MLHkTXmb23G9xL5wq2guRfi8sOqAzlwrgvd1s25mkOtX_CliEvwF_ggsCz1Kg9pVx0DFFe16sQIyKdNIOcrhOACLi5fio6jhhoCT2mif-F6Swt00XoilkkgNo3O3dk1E9PaNJzvEXaA1xdlZPtnQ"
                    onPoint={onPointCallback}
                    language='pl'
                    config='parcelCollect'
                />
            }
        </div>
    )
}

export default InpostData;