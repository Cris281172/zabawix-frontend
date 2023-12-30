import styles from './top-bar.module.scss'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {user as reduxUser} from "../../../../redux/slices/userSlice";
const TopBar = () => {

    const user = useSelector(reduxUser)
    console.log(user);
    const topBarItemsConfig = [
        {
            name: 'O nas',
            url: '/o-nas'
        },
        {
            name: 'Moje konto',
            url: user.type !== 'quest' ? '/moje-konto' : '/logowanie'
        },
        {
            name: `Punkty: ${user.user ? user.user.points : 0}`
        }
    ]

    return(
        <nav className={`container ${styles.top_bar}`}>
            <ul className={styles.left_side}>
                {topBarItemsConfig.map((item, index) => (
                    <li key={index} className={styles.top_bar_item}>
                        <Link to={item.url}>{item.name}</Link>
                    </li>
                ))}
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