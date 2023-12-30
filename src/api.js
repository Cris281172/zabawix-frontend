import Cookies from "js-cookie";

const BASE_URL = 'http://localhost:8080'

const callToAPI = async (url, method = 'get', body = null, responseType = 'json') => {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    console.log(body)

    if(body){
        config.body = JSON.stringify({
            ...body,
            token: Cookies.get("token")
        });
    }

    const response = await fetch(BASE_URL + url, config);
    if(responseType === 'json'){
        const data = await response.json();
        return await data;
    }
    const data = await response.text();
    return await data;
}

export default callToAPI;


