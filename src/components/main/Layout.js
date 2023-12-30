import {Outlet} from "react-router-dom";
import Header from "./Header";
import MainNavigation from "../parts/navigation/MainNavigation";


const Layout = () => {
    return(
        <>
            <MainNavigation />
            <Outlet />
        </>
    )
}

export default Layout