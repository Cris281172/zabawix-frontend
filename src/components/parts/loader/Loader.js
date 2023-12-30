import React from "react";
import styles from './loader.module.scss';
import { TbHorseToy } from "react-icons/tb";
const Loader = () => {

    return <div className={styles.loader}><div className={styles.loader_content}></div></div>;

}

export default Loader;