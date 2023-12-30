import styles from './main-navigation.module.scss'
import {Link} from "react-router-dom";
import logo from '../../../images/logo.png'
import { IoCart } from "react-icons/io5";
import TopBar from "./top-bar/TopBar";
import Search from "./search/Search";
import { BiSolidOffer } from "react-icons/bi";
import BottomNavigation from "./bottom-navigation/BottomNavigation";
import Basket from "../../basket/Basket";

const BestOffers = () => {
    return(
        <Link to="" className={styles.best_offers}>
            <BiSolidOffer className={styles.best_offers_icon} />
            <span className={styles.best_offers_text}>Sprawdź najlepsze oferty</span>
        </Link>
    )
}


const MainNavigation = () => {

    return(
        <>
            <TopBar />
            <nav className={styles.main_navigation}>
                <div className={`${styles.main_navigation_content}`}>
                    <div className={`${styles.top_side} container`}>
                        <Link to="/" className={styles.logo_link}>
                            <img src={logo} alt="logo image" className={styles.logo_image} />
                        </Link>
                        <Search />
                        <BestOffers />
                        <Basket />
                    </div>
                    {/*<div className={styles.right_side}>*/}
                    {/*    <MyAccount />*/}
                    {/*</div>*/}
                    <BottomNavigation />
                </div>

            </nav>
        </>

    )
}

export default MainNavigation;