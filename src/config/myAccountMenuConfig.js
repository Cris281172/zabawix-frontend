import PersonalData from "../components/my-account/personal-data/PersonalData";

const myAccountMenuConfig = {
    "/moje-konto": {
        title: "Moje Konto",
        component: '',
        subMenu: {
            "dane-osobowe": {
                title: "Dane Osobowe",
                component: PersonalData
            },
            // inne submenu
        }
    },
    "/ustawienia": {
        title: "Ustawienia",
        component: Settings,
        subMenu: {
        }
    },
};

export default myAccountMenuConfig;