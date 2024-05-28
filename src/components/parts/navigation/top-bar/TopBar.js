import styles from './top-bar.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, fetchUserLogout, user as reduxUser} from "../../../../redux/slices/userSlice";
import {clearBasket} from "../../../../redux/slices/basketSlice";
import {usePopupContext} from "../../contexts/PopupContext";
import Login from "../../../auth/login/Login";
import Auth from "../../../auth/Auth";
const TopBar = () => {

    const user = useSelector(reduxUser)
    
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const topBarItemsConfig = [
        {
            name: 'O nas',
            url: '/o-nas'
        },
        {
            name: `Punkty: ${user.user ? user.user.points : 0}`
        }
    ]

    const logoutUser = async () => {
        await dispatch(fetchUserLogout())
        navigate('/')

    }

    const {showPopup} = usePopupContext()

    const myAccount = () => {
        if(user.type === 'quest'){
            if(localStorage.getItem('email')){
                return showPopup(Auth, {type: 'verify'})
            }
            else if(localStorage.getItem('forgot-email')){
                return showPopup(Auth, {type: 'verify-forgot'})
            }
            return showPopup(Auth, {type: 'login'})
        }
        else{
            navigate('moje-konto')
        }
    }

    return(
        <nav className={`container ${styles.top_bar}`}>
            <ul className={styles.left_side}>
                <button onClick={myAccount} className={styles.my_account_button}>
                    Moje konto
                </button>
                {topBarItemsConfig.map((item, index) => (
                    <li key={index} className={styles.top_bar_item}>
                        <Link className={styles.top_bar_item_link} to={item.url}>{item.name}</Link>
                    </li>
                ))}
                {user.type !== 'quest' &&
                    <button className={`${styles.logout_user_button} btn-primary`} onClick={logoutUser}>
                        Wyloguj się
                    </button>
                }
            </ul>
            <div className="rigth-side">
                <p>
                    Potrzebujesz pomocy? Skontakuj się: <Link to="/kontakt">Kontakt</Link>
                </p>
            </div>
        </nav>
    )
}

export default TopBar;