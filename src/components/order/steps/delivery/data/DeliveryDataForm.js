import React from "react";
import {useFormikContext} from "formik";
import ValidationError from "../../../../parts/validation-error/ValidationError";
const DeliveryDataForm = () => {
    const {values, handleChange, handleBlur, errors} = useFormikContext()

    const deliveryDataFormConfig = [
        {
            name: 'name',
            placeholder: 'Imię',
            type: 'text',
        },
        {
            name: 'surname',
            placeholder: 'Nazwisko',
            type: 'text'
        },
        {
            name: 'address',
            placeholder: 'Adres',
            type: 'text'
        },
        {
            name: 'zip',
            placeholder: 'Kod pocztowy',
            type: 'number'
        },
        {
            name: 'phone',
            placeholder: 'Numer telefonu',
            type: 'number'
        }
    ]


    return(
        <div>
            {deliveryDataFormConfig.map((element, key) => (
                <div>
                    <div className="input-wrapper primary">
                        <input type={element.type} className={`input-typing ${values.deliveryDataCourier[element.name].length === 0 ? '' : 'has-content'} ${errors.deliveryDataCourier && errors.deliveryDataCourier[element.name] ? 'no-valid' : 'valid'}`} type="text"  onChange={handleChange} onBlur={handleBlur} name={`deliveryDataCourier.${element.name}`} value={values.deliveryDataCourier[element.name]} />
                        <label>{element.placeholder}</label>
                        <span className="focus-border"></span>
                        <ValidationError isErrorVisible={errors.deliveryDataCourier && errors.deliveryDataCourier[element.name]} errorMessage={errors.deliveryDataCourier && errors.deliveryDataCourier[element.name]} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DeliveryDataForm;