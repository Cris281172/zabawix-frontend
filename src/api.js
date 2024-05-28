import Cookies from "js-cookie";
import getSessionID from "./helpers/session-id/getSessionID";

// const BASE_URL = 'http://localhost:8080'
const BASE_URL = '//16.16.121.201:8080'

const callToAPI = async (url, method = 'get', body = null, responseType = 'json') => {

    const token = Cookies.get("token");

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": '*'
    };


    if (token) {
        headers['Authorization'] = `${token}`;
    } else if (getSessionID()) {
        headers['SessionID'] = `${getSessionID()}`;
    }

    const config = {
        method,
        headers: headers,
        // credentials: 'include' // Dodaj tę opcję, jeśli chcesz, aby ciasteczka były wysyłane z żądaniem
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(BASE_URL + url, config);
    if (responseType === 'json') {
        const data = await response.json();
        return data;
    }
    const data = await response.text();
    return data;
}

export default callToAPI;


