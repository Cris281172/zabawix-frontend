import styles from './section-title.module.scss'

const SectionTitle = ({title}) => {
    return(
        <h1 className={styles.section_title}>
            {title}
        </h1>
    )
}

export default SectionTitle;