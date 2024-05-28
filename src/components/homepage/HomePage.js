import Header from "./header/Header";
import Chest from "./chest/Chest";
import Statistics from "./statistics/Statistics";
import {useEffect} from "react";
import FAQ from "./faq/FAQ";
import MainCategories from "./main-categories/MainCategories";
import NewestOffers from "./newest-offers/NewestOffers";

const HomePage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0
        })
    }, []);
    return(
        <>
            <Header />
            <MainCategories />
            <Chest />
            <Statistics />
            <NewestOffers />
            <FAQ />
        </>
    )
}

export default HomePage