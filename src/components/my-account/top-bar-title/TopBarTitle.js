import styles from './top-bar-title.module.scss'
const TopBarTitle = ({text, desc}) => {
    return(
        <div className={styles.top_bar_title_wrapper}>
            <h1 className={styles.top_bar_title}>
                {text}
            </h1>
            <p className={styles.top_bar_desc}>
                {desc}
            </p>
        </div>

    )
}

export default TopBarTitle;