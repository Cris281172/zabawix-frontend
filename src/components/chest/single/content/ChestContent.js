import ChestContentLoop from "./loop/ChestContentLoop";
import React from 'react';
import styles from './chest-content.module.scss'
const ChestContent = ({singleChestContent}) => {
    if(!singleChestContent){
        return
    }
    return(
        <div className={styles.chest_content_wrapper}>
            <h3 className={styles.chest_content_text}>Przedmioty w skrzynce:</h3>
            <div className={styles.chest_content}>
                {singleChestContent.map((item, index) => <React.Fragment key={index}><ChestContentLoop item={item} /></React.Fragment>)}
            </div>
        </div>

    )
}

export default ChestContent;