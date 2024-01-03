import SingleChestLoop from "./single/SingleChestLoop";
import React from 'react'
import styles from './chests-loop.module.scss'

const ChestsLoop = ({data}) => {
    return(
        <div className="container">
            <div className={styles.chests_loop}>
                {data.map((chest, index) => <React.Fragment key={index}><SingleChestLoop chest={chest} /></React.Fragment>)}
            </div>
        </div>
    )
}

export default ChestsLoop;