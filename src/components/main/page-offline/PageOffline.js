import styles from './page-offline.module.scss';
import { RiErrorWarningLine } from "react-icons/ri";

const PageOffline = () => {

    const refreshPage = () => {
        window.location.reload(false)
    }

    return(
        <div className={styles.page_offline}>
            <div className={styles.page_offline_wrapper}>
                <RiErrorWarningLine className={styles.page_offline_icon} />
                <h1 className={styles.page_offline_text}>Strona jest <span className={styles.page_offline_offline}>OFFLINE</span></h1>
                <button onClick={refreshPage} className={`btn-primary ${styles.page_offline_refresh}`}>Spróbuj ponownie</button>
            </div>
        </div>
    )
}

export default PageOffline;