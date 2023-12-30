import styles from './header.module.scss'
import Swiper from "./swiper/Swiper";

const Header = () => {
    return(
        <header className={styles.header}>
            <Swiper />
        </header>
    )
}

export default Header;