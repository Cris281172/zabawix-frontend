import React from 'react';
import {LoginSocialFacebook, LoginSocialGoogle} from 'reactjs-social-login';
import callToAPI from "../../../api";
import Cookies from "js-cookie";
import {fetchUser} from "../../../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import styles from './social-media.module.scss'
import {ReactComponent as GoogleLogo} from '../../../images/company-logo/google.svg'
import {usePopupContext} from "../../parts/contexts/PopupContext";

const SocialMedia = () => {

    const dispatch = useDispatch()
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const {hidePopup} = usePopupContext()
    const handleLoginSuccess = (response) => {

        callToAPI('/login/google', 'post', {
            googleID: response.data.sub,
            email: response.data.email
        })
            .then(res => {
                if(res.error){
                    return
                }
                const now = new Date();
                now.setTime(now.getTime() + 1000 * 60 * 60);
                Cookies.set('token', res.token, {
                    expires: 1/24
                })
                dispatch(fetchUser())
                hidePopup()
            })
    };

    const handleLoginFailure = (error) => {
        console.error('Login Failed:', error);
    };

    return (
        <div className={styles.social_media}>
            <LoginSocialGoogle scope="openid profile email" client_id="405160937490-40an82g66oj9q63e9umu8vdcev7gge08.apps.googleusercontent.com" onReject={handleLoginFailure} onResolve={handleLoginSuccess}>
                <button className={styles.social_media_button}>
                    <GoogleLogo />
                    <span className={styles.social_media_button_text}>Zaloguj się przez Google</span>
                </button>
            </LoginSocialGoogle>
        </div>
    );
};

export default SocialMedia;