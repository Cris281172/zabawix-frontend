import styles from './my-account.module.scss'
import TopBarTitle from "./top-bar-title/TopBarTitle";
import Breadcrumbs from "../parts/breadcrumbs/Breadcrumbs";
const MyAccount = () => {
    return(
        <div className={`container ${styles.my_account}`}>
            <TopBarTitle text={"Dsa"} />
            <Breadcrumbs />
        </div>
    )
}

export default MyAccount