import { Formik } from "formik";
import callToAPI from "../../../api";
import Cookies from 'js-cookie'
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import { PiWarningCircleLight } from "react-icons/pi";
import ValidationError from "../../parts/validation-error/ValidationError";
import styles from './login.module.scss'
import SectionTitle from "../parts/SectionTitle";
import {useDispatch} from "react-redux";
import {fetchUser} from "../../../redux/slices/userSlice";
import AuthHeader from "../parts/auth-header/AuthHeader";
import SocialMedia from "../social-media/SocialMedia";
import {usePopupContext} from "../../parts/contexts/PopupContext";
import {useState} from "react";
import WrongData from "../parts/wrong-data/WrongData";

const initialValues = {
    email: '',
    password: ''
}

const loginSchema = Yup.object().shape({
    email: Yup.string().required('Wpisz swój e-mail').email('To nie wygląda jak adres mailowy...'),
    password: Yup.string().required('Wpisz hasło').min(6, 'Masz pewność co do hasła? Jest zbyt krótkie.').matches(/[0-9]+/ , 'Hasło musi zawierać przynajmniej jedną cyfrę oraz jedną wielką i jedną małą literę').matches(/[A-Z]+/ , 'Hasło musi zawierać przynajmniej jedną cyfrę oraz jedną wielką i jedną małą literę'),
});

const Login = ({setActiveID}) => {

    const {hidePopup} = usePopupContext()

    const [loading, setLoading] = useState(false)
    const [isDataValid, setIsDataValid] = useState(true)
    const hideAuthPopup = () => hidePopup()
    const dispatch = useDispatch()

    const handleSubmit = (values) => {
        setLoading(true)
        callToAPI('/login', 'post', {
                email: values.email,
                password: values.password
            }
        )
            .then(res => {
                if(res.emailVerifiedAt === null){
                    localStorage.setItem('email', values.email)
                    return setActiveID('verify')
                }
                const now = new Date();
                now.setTime(now.getTime() + 1000 * 60 * 60);
                Cookies.set('token', res.token, {
                    expires: 1/24
                })
                dispatch(fetchUser())
                hideAuthPopup()
            })
            .catch(() => {
                setIsDataValid(false)
            })
            .finally(() => setLoading(false))
    }

    const authHeaderAction = () => setActiveID('register')

    const forgotPopup = () => setActiveID('forgot')

    return(
        <div className={styles.login}>
            <AuthHeader title="Logowanie" subtitle="Nie masz jeszcze konta?" actionText="Stwórz konto!" action={authHeaderAction} />
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
                        <button type="submit" disabled={!isValid && !loading} className={`btn-primary ${styles.login_button}`}>Zaloguj się</button>
                        <div className={styles.forgot_button_wrapper} >
                            <button className={styles.forgot_button} type="button" onClick={forgotPopup}>
                                Zapomniałeś hasła?
                            </button>
                        </div>
                        <WrongData isValid={isDataValid} text="Podany email lub hasło są nieprawidłowe!" />
                    </form>
                )}
            </Formik>
            <SocialMedia />
        </div>
    )
}

export default Login;