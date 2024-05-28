import React, {useState} from "react";
import {Link} from "react-router-dom";
import styles from './assets/tabs.module.scss'

const useTabs = (Configuration, sectionDefault = '') => {
    const url = new URLSearchParams(window.location.search);
    const initialTab = url.get('tab') || sectionDefault;
    const [activeTab, setActiveTab] = useState(initialTab);

    const TabsNavItem = ({ tab }) => {
        if (tab.visible === false) return null;
        return (
            <li className={`${styles.tabs_nav_item} ${tab.section_id === activeTab ? styles.active : ''}`}>
                <Link className={styles.tabs_nav_item_link} to={`?tab=${tab.section_id}`} onClick={() => changeTab(tab.section_id)}>
                    {tab.title}
                </Link>
            </li>
        );
    };

    const TabsNav = () => (
        <ul className={styles.tabs_nav}>
            {Configuration.map((tab, index) => <TabsNavItem key={index} tab={tab} />)}
        </ul>
    );

    const TabsContentPane = ({ tab }) => {
        if (tab.visible === false) return null;
        return (
            <div id={tab.section_id} style={{ display: activeTab === tab.section_id ? 'block' : 'none' }}>
                {tab.components}
            </div>
        );
    };

    const TabsContent = ({ children }) => (
        <div className={styles.tabs_content}>
            {children}
            {Configuration.map((tab, index) => <TabsContentPane key={index} tab={tab} />)}
        </div>
    );

    const changeTab = (tabId) => {
        setActiveTab(tabId);

        url.set('tab', tabId);
        window.history.pushState({}, '', `?${url.toString()}`);

    };

    const Tabs = ({ handleChange = () => {}, children }) => (
        <div className={styles.tabs}>
            <TabsNav />
            <TabsContent>{children}</TabsContent>
        </div>
    );

    return { Tabs, TabsContent, TabsContentPane, TabsNav, TabsNavItem, activeTab };
};

export default useTabs;