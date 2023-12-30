import Cookies from 'js-cookie'
import NoResults from "../components/parts/no-results/NoResults";
import {Outlet} from "react-router-dom";

const AuthRoute = () => {
    if(Cookies.get('token') === undefined){
        return <NoResults />
    }

    return <Outlet />;
}

export default AuthRoute;