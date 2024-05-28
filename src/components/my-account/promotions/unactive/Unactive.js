import TopBarTitle from "../../top-bar-title/TopBarTitle";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {user as reduxUser} from "../../../../redux/slices/userSlice";
import callToAPI from "../../../../api";

const UnActive = () => {

    const [promotionsData, setPromotionsData] = useState()
    const user = useSelector(reduxUser) || {}

    // useEffect(() => {
    //     if(user.user){
    //         callToAPI('/promotions/user/get?status=end', 'post', {userID: user.user.id})
    //             .then(res => setPromotionsData(res))
    //     }
    // }, []);

    return(
        <div>
            <TopBarTitle text="Promocje nieaktywne" desc="Bla bla bla" />
        </div>
    )
}

export default UnActive;