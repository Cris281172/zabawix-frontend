import {useEffect, useState} from "react";
import callToAPI from "../../../../api";
import {useSelector} from "react-redux";
import {user as reduxUser} from "../../../../redux/slices/userSlice";
import TopBarTitle from "../../top-bar-title/TopBarTitle";

const Active = () => {

    const [promotionsData, setPromotionsData] = useState()
    const user = useSelector(reduxUser) || {}

    // useEffect(() => {
    //     if(user.user){
    //         callToAPI('/promotions/user/get?status=active', 'post', {userID: user.user.id})
    //             .then(res => setPromotionsData(res))
    //     }
    // }, []);

    return(
        <div>
            <TopBarTitle text="Aktywne promocje" desc="Bla bla bla" />
            das
        </div>
    )
}

export default Active;