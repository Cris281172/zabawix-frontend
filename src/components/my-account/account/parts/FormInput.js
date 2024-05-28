import {useFormikContext} from "formik";
import styles from './form-input.module.scss'
import { RiErrorWarningLine } from "react-icons/ri";
import ErrorWarningLine from "../../../parts/error-warning-line/ErrorWarningLine";

const FormInput = ({keyValue, label, placeholder}) => {
    const {handleChange, handleBlur, values, errors} = useFormikContext()

    return(
        <div className={styles.personal_data_input_wrapper}>
            <label className={'base-label'}>{label}</label>
            <input className={`${styles.personal_data_input} base-input ${errors[keyValue] ? 'base-input-error' : ''}`} placeholder={placeholder} value={values[keyValue]} name={keyValue} onChange={handleChange} onBlur={handleBlur} />
            <ErrorWarningLine isError={errors[keyValue]} />
        </div>
    )
}

export default FormInput;