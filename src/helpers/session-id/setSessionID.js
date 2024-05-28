import Cookies from "js-cookie";

const setSessionID = (sessionID) => {
	if(!Cookies.get('sessionID')){
		Cookies.set('sessionID', sessionID, {expires: 7})
	}
}

export default setSessionID