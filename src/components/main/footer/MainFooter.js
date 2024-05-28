import styles from './main-footer.module.scss'
import MainContent from "./main-content/MainContent";
const MainFooter = () => {
    return(
        <div className={styles.main_footer}>
            <div className="container">
                <MainContent />
            </div>
        </div>
    )
}

export default MainFooter;