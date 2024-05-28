import {useSelector} from "react-redux";
import {user as reduxUser} from "../../../../redux/slices/userSlice";
import {useFormikContext} from "formik";
import Login from "../../../auth/login/Login";
import ValidationError from "../../../parts/validation-error/ValidationError";

const MyContact = () => {

    const user = useSelector(reduxUser) || {}

    const {values, handleChange, handleBlur, errors} = useFormikContext()

    return(
        <div>
            <div className="input-wrapper primary">
                <input className={`input-typing ${values.email.length === 0 ? '' : 'has-content'} ${errors.email ? 'no-valid' : 'valid'}`} type="text"  onChange={handleChange} onBlur={handleBlur} name="email" value={values.email} />
                <label>Email *</label>
                <span className="focus-border"></span>
                <ValidationError isErrorVisible={errors.email} errorMessage={errors.email} />
            </div>
        </div>
    )
}

export default MyContact;