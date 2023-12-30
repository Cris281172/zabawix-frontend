import styles from './section-title.module.scss'
const SectionTitle = ({title}) => {
    return(
        <>
            <h2 className={styles.section_title}>{title}</h2>
        </>
    )
}

export default SectionTitle;