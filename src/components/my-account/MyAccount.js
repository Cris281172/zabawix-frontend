import React from 'react';
import styles from './my-account.module.scss';
import {Outlet} from 'react-router-dom'
import MyAccountNav from "./my-account-nav/MyAccountNav";
const MyAccount = () => {

    const myAccountNavConfig = [
        {
            key: 'konto',
            linkText: 'Konto'
        },
        {
            key: 'moje-promocje',
            linkText: 'Moje promocje'
        },
        {
            key: 'zamowienia',
            linkText: 'Zamówienia'
        },
        {
            key: 'ustawienia',
            linkText: 'Ustawienia'
        }
    ]

    return (
        <div className={`container ${styles.my_account}`}>
            <MyAccountNav config={myAccountNavConfig} />
            <Outlet />
        </div>
    );
}

export default MyAccount;