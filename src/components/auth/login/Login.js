import { Formik } from "formik";
import callToAPI from "../../../api";
import Cookies from 'js-cookie'
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import { PiWarningCircleLight } from "react-icons/pi";
import ValidationError from "../../parts/validation-error/ValidationError";
import styles from './login.module.scss'
import SectionTitle from "../parts/SectionTitle";

const initialValues = {
    email: '',
    password: ''
}

const loginSchema = Yup.object().shape({
    email: Yup.string().required('Wpisz swój e-mail').email('To nie wygląda jak adres mailowy...'),
    password: Yup.string().required('Wpisz hasło').min(6, 'Masz pewność co do hasła? Jest zbyt krótkie.').matches(/[0-9]+/ , 'Hasło musi zawierać przynajmniej jedną cyfrę oraz jedną wielką i jedną małą literę').matches(/[A-Z]+/ , 'Hasło musi zawierać przynajmniej jedną cyfrę oraz jedną wielką i jedną małą literę'),
});

const Login = () => {

    const navigate = useNavigate()

    const handleSubmit = (values) => {
        callToAPI('/login', 'post', {
                email: values.email,
                password: values.password
            }
        )
            .then(res => {
                if(res.error){
                    return
                }
                const now = new Date();
                now.setTime(now.getTime() + 1000 * 60 * 60);
                Cookies.set('token', res.token, {
                    expires: 1/24
                })
                navigate('/')
            })
    }

    return(
        <div className={styles.login}>
            <SectionTitle title="Logowanie" />
            <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)} validationSchema={loginSchema}>
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
                        <div className="input-wrapper">
                            <input className={`input-typing ${values.email.length === 0 ? '' : 'has-content'} ${values.email.length === 0 ? '' : (errors.email ? 'no-valid' : 'valid')}`} type="text"  onChange={handleChange} onBlur={handleBlur} name="email" value={values.email} />
                            <label>Email *</label>
                            <span className="focus-border"></span>
                            <ValidationError isErrorVisible={errors.email} errorMessage={errors.email} isVisible={values.email.length !== 0} />
                        </div>
                        <div className="input-wrapper">
                            <input className={`input-typing ${values.password.length === 0 ? '' : 'has-content'} ${values.password.length === 0 ? '' : (errors.password ? 'no-valid' : 'valid')}`} type="text"  onChange={handleChange} onBlur={handleBlur} name="password" value={values.password} />
                            <label>Hasło *</label>
                            <span className="focus-border"></span>
                            <ValidationError isErrorVisible={errors.email} errorMessage={errors.password} isVisible={values.password.length !== 0} />
                        </div>
                        <button type="submit" disabled={!isValid} className={`btn-outline-primary ${styles.login_button}`}>Zaloguj się</button>
                    </form>
                )}
            </Formik>
            <p className={styles.no_account}>Nie posiadasz jeszcze konta? <Link className={styles.link} to="/rejestracja">Załóż konto</Link></p>
        </div>
    )
}

export default Login;