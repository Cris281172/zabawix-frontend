import bottomFooterConfig from "../../../../config/bottomFooterConfig";
import styles from './main-content.module.scss'

const MainContent = () => {

    const footerConfig = bottomFooterConfig;

    return(
        <div className={styles.main_content}>
            <nav className={styles.main_content_navigation}>
                 <ul className={styles.main_content_list}>
                     {footerConfig.map((section, key) => {
                         return(
                             <div>
                                 {section.name}
                                 {section.data.map(el => <>{el.text}</>)}
                             </div>
                         )
                     })}
                 </ul>
            </nav>
        </div>
    )
}

export default MainContent;