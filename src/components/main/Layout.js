import {Outlet} from "react-router-dom";
import Header from "./Header";
import MainNavigation from "../parts/navigation/MainNavigation";
import MainFooter from "./footer/MainFooter";
import {usePopupContext} from "../parts/contexts/PopupContext";


const Layout = () => {

    const {popupContent} = usePopupContext()

    return(
        <>
            {popupContent}
            <MainNavigation />
            <Outlet />
            <MainFooter />
        </>
    )
}

export default Layout