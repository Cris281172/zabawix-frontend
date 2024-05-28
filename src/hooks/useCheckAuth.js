import {useSelector} from "react-redux";
import {user as reduxUser} from "../redux/slices/userSlice";
import {useState} from "react";
import {usePopupContext} from "../components/parts/contexts/PopupContext";
import Auth from "../components/auth/Auth";

const useCheckAuth = () => {
	const user = useSelector(reduxUser)
	const {showPopup} = usePopupContext()

	const showUnLoggedPopup = () => {
		if(user.type === 'quest'){
			showPopup(Auth, {type: 'login'})
			return false
		}
		else{
			return true
		}
	}
	return {showUnLoggedPopup}
}

export default useCheckAuth