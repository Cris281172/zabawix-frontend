import useTabs from "../../../hooks/useTabs";
import Active from "./active/Active";
import UnActive from "./unactive/Unactive";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserPromotion, user as reduxUser} from "../../../redux/slices/userSlice";

const Promotions = () => {
    const user = useSelector(reduxUser)
    const dispatch = useDispatch()
    const tabConfig = [
        {
            section_id: 'aktywne',
            title: 'Aktywne',
            components: <Active />,
            visible: true
        },
        {
            section_id: 'nieaktywne',
            title: 'Nieaktywne',
            components: <UnActive />,
            visible: true
        },
    ]

    const { Tabs, activeTab } = useTabs(tabConfig, 'aktywne');

    useEffect(() => {
        if(user.user) {
            dispatch(fetchUserPromotion({userID: user.user.id, status: 'active'}))
        }
    }, [user]);


    return(
        <>
            <Tabs />
        </>
    )
}

export default Promotions;