import styles from "./bottom-navigation.module.scss";
import {Link} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiContactsBookLine } from "react-icons/ri";
import { FiChevronRight } from "react-icons/fi";
const BottomNavigationItem = ({name, url, icon}) => {
    return(
        <li className={styles.menu_item}>
            <Link className={styles.menu_item_link} to={url}>
                {icon}
                <span className={styles.link_value}>{name}</span>
            </Link>
        </li>
    )
}

const BottomNavigation = () => {

    const bottomNavigationConfig = [
        {
            name: 'Strona główna',
            url: '/',
            icon: <FaHome className={styles.menu_item_icon} />
        },
        {
            name: 'Sklep',
            url: '/sklep',
            icon: <FiShoppingBag className={styles.menu_item_icon}  />
        },
        {
            name: 'O nas',
            url: '/o-nas',
            icon: <AiOutlineInfoCircle className={styles.menu_item_icon}  />
        },
        {
            name: 'Kontakt',
            url: '/contact',
            icon: <RiContactsBookLine className={styles.menu_item_icon} />
        }
    ]

    return(
        <nav className={styles.bottom_navigation}>
            <div className={`container ${styles.bottom_navigation_items}`}>
                <ul className={styles.bottom_navigation_items_wrapper}>
                    {bottomNavigationConfig.map((menuItem, index) => <BottomNavigationItem name={menuItem.name} url={menuItem.url} icon={menuItem.icon} />)}
                </ul>
                <Link to="" className={styles.categories}>
                    Wszystkie kategorie
                    <FiChevronRight className={styles.categories_icon} />
                </Link>
            </div>
        </nav>
    )
}

export default BottomNavigation;