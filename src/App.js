import {BrowserRouter} from "react-router-dom";
import UnLoggedRoutes from "./routes/UnLoggedRoutes";
import './components/main/assets/main.scss'
import useAuth from "./hooks/useAuth";
import {useEffect, useState} from "react";
import Cookies from 'js-cookie'
import callToAPI from "./api";
import MainRoutes from "./routes/MainRoutes";
import {fetchUser, user as reduxUser} from "./redux/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import PageStatus from "./components/main/page-status/PageStatus";
import {fetchBasket} from "./redux/slices/basketSlice";
const App = () => {
    const auth = useAuth();
    const dispatch = useDispatch()
    const user = useSelector(reduxUser)

    useEffect(() => {
        dispatch(fetchUser({tokenCookie: Cookies.get("token")}))
        if(auth){
            setInterval(async() => {
                let newToken = await callToAPI('/refresh-token', "POST", {token: Cookies.get("token")})
                await Cookies.set('token', newToken.token, {
                    expires: 1/24
                })
            }, 1000 * 60 * 5)

        }
    }, [auth])

  return (
    <BrowserRouter>
        <MainRoutes />
        <PageStatus user={user} />
    </BrowserRouter>
  );
}

export default App;
