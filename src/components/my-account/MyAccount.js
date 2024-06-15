import React from 'react';
import styles from './my-account.module.scss';
import {Outlet} from "react-router-dom";
const MyAccount = () => {


    return (
        <div className={`container ${styles.my_account}`}>
            <Outlet />
        </div>
    );
}

export default MyAccount;