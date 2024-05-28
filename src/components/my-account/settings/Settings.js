import PersonalData from "../account/personal-data/PersonalData";
import DeliveryData from "../account/delivery-data/DeliveryData";
import useTabs from "../../../hooks/useTabs";
import ChangePassword from "./change-password/ChangePassword";

const Settings = () => {

    const tabConfig = [
        {
            section_id: 'zmiana-hasla',
            title: 'Zmień hasło',
            components: <ChangePassword />,
            visible: true
        },
        {
            section_id: 'usun-konto',
            title: 'Usuń konto',
            components: <DeliveryData />,
            visible: true
        },
    ]

    const { Tabs } = useTabs(tabConfig, 'zmiana-hasla');

    return(
        <div>
            <Tabs />
        </div>
    )
}

export default Settings;