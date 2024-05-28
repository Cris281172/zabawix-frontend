import styles from './tool-bar.module.scss'
import Sort from "../sort/Sort";
const ToolBar = ({offerCount, setMoreFiltersVisible}) => {

    return(
        <div className={styles.tool_bar}>
            <div className={styles.tool_bar_left}>
                <p className={styles.tool_bar_offers_count}>
                    Wyświetlanie {offerCount}  wyników
                </p>
                <button className={`${styles.tool_bar_more_filters} btn-primary`} onClick={() => setMoreFiltersVisible(true)}>
                    Więcej filtrów
                </button>
            </div>
            <Sort />

        </div>
    )
}

export default ToolBar;