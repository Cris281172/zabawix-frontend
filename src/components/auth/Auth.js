import {Outlet} from "react-router-dom";
import styles from './auth.module.scss'
import TopNavigationAuth from "./parts/TopNavigationAuth";
const Auth = () => {
    return(
        <div className={styles.auth}>
            <div className={styles.auth_wrapper}>
                {/*<TopNavigationAuth />*/}
                <Outlet />
            </div>
        </div>
    )
}

export default Auth;