import { Formik } from "formik";
import callToAPI from "../../../api";
import {useNavigate} from "react-router-dom";
import styles from './register.module.scss';
import SectionTitle from "../parts/SectionTitle";
import * as Yup from 'yup';
import ValidationError from "../../parts/validation-error/ValidationError";
import AuthHeader from "../parts/auth-header/AuthHeader";
import SocialMedia from "../social-media/SocialMedia";
import {useState} from "react";
import WrongData from "../parts/wrong-data/WrongData";

const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
}

const RegisterSchema = Yup.object().shape({
    email: Yup.string().required('Wpisz swój e-mail').email('To nie wygląda jak adres mailowy...'),
    password: Yup.string().required('Wpisz hasło').min(6, 'Masz pewność co do hasła? Jest zbyt krótkie.').matches(/[0-9]+/ , 'Hasło musi zawierać przynajmniej jedną cyfrę oraz jedną wielką i jedną małą literę').matches(/[A-Z]+/ , 'Hasło musi zawierać przynajmniej jedną cyfrę oraz jedną wielką i jedną małą literę'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same').required('Powtórzenie hasła jest wymagane'),
});


const Register = ({setActiveID}) => {

    const [accountExist, setAccountExist] = useState()
    const handleSubmit = (values) => {
        callToAPI('/register', 'post', {
            email: values.email,
            password: values.password
        })
            .then(res => {
                localStorage.setItem('email-token-expires', res.expires)
                localStorage.setItem('email', res.email)
                setActiveID('verify')
            })
            .catch(() => {
                setAccountExist(true)
            })
    }

    const authHeaderAction = () => setActiveID('login')
    return(
        <div className={styles.register}>
            <AuthHeader title="Rejestracja" subtitle="Masz już konto?" actionText="Zaloguj się" action={authHeaderAction} />
            <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)} validationSchema={RegisterSchema}>
                {({
                      errors,
                      touched,
                      handleSubmit,
                      values,
                      handleChange,
                      handleBlur,
                      isValid
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={styles.input_wrapper}>
                            <div className="input-wrapper primary">
                                <input className={`input-typing ${values.email.length === 0 ? '' : 'has-content'} ${values.email.length === 0 ? '' : (errors.email ? 'no-valid' : 'valid')}`} type="text"  onChange={handleChange} onBlur={handleBlur} name="email" value={values.email} />
                                <label>Email *</label>
                                <span className="focus-border"></span>
                                <ValidationError isErrorVisible={errors.email} errorMessage={errors.email} />
                            </div>
                            <div className="input-wrapper primary">
                                <input className={`input-typing ${values.password.length === 0 ? '' : 'has-content'} ${values.password.length === 0 ? '' : (errors.password ? 'no-valid' : 'valid')}`} type="text"  onChange={handleChange} onBlur={handleBlur} name="password" value={values.password} />
                                <label>Hasło *</label>
                                <span className="focus-border"></span>
                                <ValidationError isErrorVisible={errors.password} errorMessage={errors.password} />
                            </div>
                            <div className="input-wrapper primary">
                                <input className={`input-typing ${values.confirmPassword.length === 0 ? '' : 'has-content'} ${values.confirmPassword.length === 0 ? '' : (errors.confirmPassword ? 'no-valid' : 'valid')}`} type="text"  onChange={handleChange} onBlur={handleBlur} name="confirmPassword" value={values.confirmPassword} />
                                <label>Powtórz Hasło *</label>
                                <span className="focus-border"></span>
                                <ValidationError isErrorVisible={errors.confirmPassword} errorMessage={errors.confirmPassword} />
                            </div>
                        </div>
                        <button type="submit" disabled={!isValid} className={`btn-primary ${styles.register_button}`}>Załóż konto</button>
                        <WrongData isValid={!accountExist} text="Konto istnieje" />
                    </form>
                )}
            </Formik>
            <SocialMedia />
        </div>
    )
}

export default Register