import styles from './auth.module.scss'
import Register from "./register/Register";
import Login from "./login/Login";
import {useState} from "react";
import loginBackground from '../../images/auth/login-background.webp'
import registerBackground from '../../images/auth/register-background.webp'
import verifyBackground from '../../images/auth/verify-background.webp'
import forgotBackground from '../../images/auth/forgot-background.webp'
import verifyForgotBackground from '../../images/auth/verify-forgot-background.webp'
import newPasswordBackground from '../../images/auth/new-password-background.webp'
import activeSummaryBackground from '../../images/auth/active-summary-background.webp'
import forgotSummaryBackground from '../../images/auth/forgot-summary-background.webp'
import logo from '../../images/logo.png'
import CloseButton from "../parts/close-button/CloseButton";
import {usePopupContext} from "../parts/contexts/PopupContext";
import Verify from "./verify/Verify";
import Forgot from "./forgot/Forgot";
import VerifyForgot from "./verify-forgot/VerifyForgot";
import NewPassword from "./new-password/NewPassword";
import {Link} from "react-router-dom";
import CloseOutside from "../parts/close-outside/CloseOutside";
import ActiveSummary from "./active-summary/ActiveSummary";
import ForgotSummary from "./forgot-summary/ForgotSummary";
const Auth = ({type}) => {

    const [activeID, setActiveID] = useState(type ? type : 'login')

    const authConfig = [
        {
            id: 'login',
            component: <Login setActiveID={setActiveID} />,
            backgroundImage: loginBackground,
            backgroundText: 'Zaloguj się, by odkryć świat zabawek czekających na Ciebie!'
        },
        {
            id: 'register',
            component: <Register setActiveID={setActiveID} />,
            backgroundImage: registerBackground,
            backgroundText: 'Dołącz do nas i zdobądź dostęp do najlepszych ofert i nowości!'
        },
        {
            id: 'verify',
            component: <Verify setActiveID={setActiveID} />,
            backgroundImage: verifyBackground,
            backgroundText: 'Potwierdź swój email, by rozpocząć przygodę z zabawkami.'
        },
        {
            id: 'forgot',
            component: <Forgot setActiveID={setActiveID} />,
            backgroundImage: forgotBackground,
            backgroundText: 'Zresetuj hasło, aby szybko wrócić do świata zabawy!'
        },
        {
            id: 'verify-forgot',
            component: <VerifyForgot setActiveID={setActiveID} />,
            backgroundImage: verifyForgotBackground,
            backgroundText: 'Potwierdź swoje dane i bezpiecznie ustaw nowe hasło.'
        },
        {
            id: 'new-password',
            component: <NewPassword setActiveID={setActiveID} />,
            backgroundImage: newPasswordBackground,
            backgroundText: 'Ustaw nowe hasło i kontynuuj zabawę bez przeszkód!'
        },
        {
            id: 'active-summary',
            component: <ActiveSummary />,
            backgroundImage: activeSummaryBackground,
            backgroundText: 'Twoje konto zostało pomyślnie utworzone! Odkryj świat zabawek i rozpocznij swoją przygodę z nami.'
        },
        {
            id: 'forgot-summary',
            component: <ForgotSummary setActiveID={setActiveID} />,
            backgroundImage: forgotSummaryBackground,
            backgroundText: 'Twoje hasło zostało pomyślnie zresetowane.'
        }
    ]

    const {hidePopup} = usePopupContext()

    const hideAuthPopup = () => hidePopup()


    return(
        <CloseOutside handleClose={hideAuthPopup}>
            <div className={styles.auth}>
                {authConfig.map((authItem, index) => (
                    <div key={index} className={styles.auth_item}>
                        {authItem.id === activeID &&
                            <>
                                <div className={styles.close_button_wrapper}>
                                    <CloseButton handleClose={hideAuthPopup} />
                                </div>
                                <div className={styles.background_content} style={{backgroundImage: `url("${authItem.backgroundImage}")`}}>
                                    <div className={styles.background_color}>

                                    </div>
                                    <div className={styles.logo_content}>
                                        <img src={logo} alt="logo" className={styles.logo} />
                                    </div>
                                    <div className={styles.text_content}>
                                        <p className={styles.text}>
                                            {authItem.backgroundText}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.main_content}>
                                    {authItem.component}
                                    <p className={styles.bottom_information}>
                                        Przystępując do korzystania z naszych usług, zgadzasz się na przestrzeganie Regulaminu Sklepu Zabawkowego oraz na okazjonalne otrzymywanie korespondencji od nas. Zachęcamy do zapoznania się z naszą <Link to="polityka-prywatnosci">Polityką Prywatności</Link>, która wyjaśnia, jak chronimy i przetwarzamy Twoje dane osobowe.
                                    </p>
                                </div>
                            </>
                        }
                    </div>
                ))}
            </div>
        </CloseOutside>
    )
}

export default Auth;