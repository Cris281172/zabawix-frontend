import PersonalData from "./personal-data/PersonalData";
import useTabs from "../../../hooks/useTabs";
import DeliveryData from "./delivery-data/DeliveryData";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCustomerGet, user as reduxUser} from "../../../redux/slices/userSlice";
const Account = () => {

    const dispatch = useDispatch()
    const user = useSelector(reduxUser)
    const tabConfig = [
        {
            section_id: 'dane-personalne',
            title: 'Dane personalne',
            components: <PersonalData />,
            visible: true
        },
        {
            section_id: 'dane-dostawy',
            title: 'Dane dostawy',
            components: <DeliveryData />,
            visible: true
        }
    ]

    useEffect(() => {
        if(user.user){
            dispatch(fetchCustomerGet(user.user.id))
        }
    }, [user]);

    const { Tabs } = useTabs(tabConfig, 'dane-personalne');

    return(
        <div>
            <Tabs />
        </div>
    )
}

export default Account;