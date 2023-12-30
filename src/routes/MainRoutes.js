import {Route, Routes} from "react-router-dom";
import Layout from "../components/main/Layout";
import HomePage from "../components/homepage/HomePage";
import Store from "../components/store/Store";
import MyAccount from "../components/my-account/MyAccount";
import NoResults from "../components/parts/no-results/NoResults";
import Auth from "../components/auth/Auth";
import Login from "../components/auth/login/Login";
import Register from "../components/auth/register/Register";
import ActiveAccount from "../components/auth/active-account/ActiveAccount";
import AuthRoute from "./AuthRoute";

const LoggedRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route element={<AuthRoute />}>
                    <Route path="/moje-konto" element={<MyAccount />}>
                        <Route path="zmiana-hasla" element="dsa"></Route>
                    </Route>
                </Route>
                <Route path="/sklep" element={<Store />}>

                </Route>
            </Route>

            <Route element={<Auth />}>
                <Route path="/logowanie" element={<Login />}></Route>
                <Route path="/rejestracja" element={<Register />} />
                <Route path="/rejestracja/aktywacja-konta" element={<ActiveAccount />} />
                <Route path="/rejestracja/aktywacja-konta/:id" element={<ActiveAccount />} />
            </Route>
            <Route path="*" element={<NoResults />}></Route>
        </Routes>
    )
}

export default LoggedRoutes