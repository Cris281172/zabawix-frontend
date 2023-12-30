import {useState, useEffect} from 'react';
import Cookies from 'js-cookie'
const useAuth = () => {
    const [isAuth, setIsAuth] = useState(false);
    const setAuthToken = () => setIsAuth(Cookies.get('token') !== undefined)

    useEffect(() => {
        setAuthToken();
        const interval = setInterval(setAuthToken, 1000);
        return () => clearInterval(interval)
    }, []);

    return isAuth;
}


export default useAuth;