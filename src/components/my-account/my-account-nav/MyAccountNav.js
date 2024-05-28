import {NavLink} from "react-router-dom";
import styles from './my-account-nav.module.scss'
import React from "react";
const MyAccountNav = ({config}) => {

    const MyAccountLink = ({link, linkText, submenu}) => {
        return(
            <>
                <li className={styles.my_account_nav_item}>
                    <NavLink to={link} className={({ isActive, isPending }) =>
                        isActive ? `${styles.my_account_nav_link} ${styles.my_account_nav_link_active}` : `${styles.my_account_nav_link}`
                    }>
                        {linkText}
                    </NavLink >
                </li>

            </>
        )
    }

    return(
        <nav className={styles.my_account_nav}>
            <ul className={styles.my_account_nav_list}>
                {config.map((el, index) => <React.Fragment key={index}><MyAccountLink link={el.key} linkText={el.linkText} submenu={el.submenu}/></React.Fragment>)}
            </ul>
        </nav>
    )
}

export default MyAccountNav;