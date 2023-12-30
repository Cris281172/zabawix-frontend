import {useSelector} from "react-redux";
import {user as reduxUser} from "../../../redux/slices/userSlice";
import styles from './no-results.module.scss'
import { RiErrorWarningLine } from "react-icons/ri";
import {Link} from "react-router-dom";

const QuestButton = () => {
    return(
        <Link to={'/logowanie'} className={styles.no_results_button}>Zaloguj się</Link>
    )
}

const UserButton = () => {
    return(
        <Link to={'/'} className={styles.no_results_button}>Wróć na stronę główna</Link>
    )
}

const NoResults = () => {
    const user = useSelector(reduxUser)
    return(
        <div className={styles.no_results}>
            <div className={styles.no_results_wrapper}>
                <RiErrorWarningLine className={styles.no_results_icon} />
                <h2 className={styles.no_results_title}>Strona nie została znaleziona!</h2>
                {user.type === 'quest' && <QuestButton />}
                {user.type === 'user' && <UserButton />}
                {/*{user.type === 'quest' ? <QuestPage /> : <UserPage />}*/}
            </div>
        </div>
    )
}

export default NoResults;