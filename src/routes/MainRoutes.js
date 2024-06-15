import {Route, Routes} from "react-router-dom";
import Layout from "../components/main/Layout";
import HomePage from "../components/homepage/HomePage";
import Store from "../components/store/Store";
import MyAccount from "../components/my-account/MyAccount";
import NoResults from "../components/parts/no-results/NoResults";
import AuthRoute from "./AuthRoute";
import Chest from "../components/chest/Chest";
import SingleChest from "../components/chest/single/SingleChest";
import SingleOffer from "../components/store/single/SingleOffer";
import ChestInformation from "../components/chest/information/ChestInformation";
import Order from "../components/order/Order";
import PrivacyPolicy from "../components/privacy-policy/PrivacyPolicy";
import TermsOfService from "../components/terms-of-service/TermsOfService";
import AboutUs from "../components/about-us/AboutUs";
import Observe from "../components/observe/Observe";
import Profile from "../components/my-account/profile/Profile";

const LoggedRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route element={<AuthRoute />}>
                    <Route path="/moje-konto" element={<MyAccount />}>
                        <Route path="profil" element={<Profile />}></Route>
                    </Route>
                    <Route path="/obserwowane" element={<Observe />}></Route>
                </Route>
                <Route path="/skrzynki">
                    <Route index element={<Chest />} />
                    <Route path=":id" element={<SingleChest />}></Route>
                    <Route path="informacje" element={<ChestInformation />}></Route>
                </Route>
                <Route path="/sklep" element={<Store />}>

                </Route>
                <Route path="/produkt/:id" element={<SingleOffer />}></Route>
                <Route path="/zamowienie" element={<Order />}>

                </Route>
                <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />}></Route>
                <Route path="/regulamin" element={<TermsOfService />}></Route>
                <Route path="/o-nas" element={<AboutUs />} />
            </Route>
            <Route path="*" element={<NoResults />}></Route>
        </Routes>
    )
}

export default LoggedRoutes