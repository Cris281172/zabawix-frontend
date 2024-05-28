import styles from './info-container.module.scss'
const InfoContainer = ({text, type}) => {
    return(
        <div className={`${styles.info_container} ${styles[type]}`}>
            {text}
        </div>
    )
}

export default InfoContainer;