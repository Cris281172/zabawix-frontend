import Cookies from 'js-cookie'
import NoResults from "../components/parts/no-results/NoResults";
import {Outlet} from "react-router-dom";
import {usePopupContext} from "../components/parts/contexts/PopupContext";
import Auth from "../components/auth/Auth";
import {useNavigate} from "react-router";

const AuthRoute = () => {
    const {showPopup} = usePopupContext()
    const navigate = useNavigate();
    if(Cookies.get('token') === undefined){
        navigate('/')
        return showPopup(Auth, {type: 'login'})
    }

    return <Outlet />;
}

export default AuthRoute;