import Cookies from "js-cookie";

const getSessionID = () => {
	return Cookies.get('sessionID')
}

export default getSessionID;