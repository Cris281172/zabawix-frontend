import styles from './top-navigation.module.scss'
import {Link} from "react-router-dom";
const TopNavigationAuth = () => {
    return(
        <div>
            <Link to="logowanie">Logowanie</Link>
            <Link to="rejestracja">Rejestracja</Link>
        </div>
    )
}

export default TopNavigationAuth;