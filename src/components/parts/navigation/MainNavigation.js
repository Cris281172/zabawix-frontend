import styles from './main-navigation.module.scss'
import {Link} from "react-router-dom";
import logo from '../../../images/logo.png'
import { IoCart } from "react-icons/io5";
import TopBar from "./top-bar/TopBar";
import Search from "./search/Search";
import { BiSolidOffer } from "react-icons/bi";
import BottomNavigation from "./bottom-navigation/BottomNavigation";
import Basket from "../../basket/Basket";
import { FaHeart } from "react-icons/fa";
import {
    fetchObserveCount,
    observeCount as reduxObserveCount,
} from "../../../redux/slices/observeSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {user as reduxUser} from "../../../redux/slices/userSlice";

const Observed = () => {
    const observeCount = useSelector(reduxObserveCount)
    const dispatch = useDispatch()
    const user = useSelector(reduxUser)
    useEffect(() => {
        if(user.user){
            dispatch(fetchObserveCount({userID: user.user.id}))
        }
    }, [user]);
    return(
        <Link to="/obserwowane" className={styles.observed}>
            <FaHeart className={styles.observed_icon} />
            <span className={styles.observed_text}>Obserwowane ({observeCount})</span>
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
                        <Observed />
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