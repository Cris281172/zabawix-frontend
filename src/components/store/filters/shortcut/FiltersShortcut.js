import {useDispatch, useSelector} from "react-redux";
import {filters as reduxFilters, resetFilters} from "../../../../redux/slices/offersSlice";
import React from "react";
import Shortcut from "./Shortcut";
import styles from './filters-shotcut.module.scss'

const FiltersShortcut = () => {
    const dispatch = useDispatch()
    const filters = useSelector(reduxFilters)

    if(Object.keys(filters).length === 0) return

    return(
        <div className={styles.filters_shortcut}>
            <button className={`${styles.filters_shortcut_reset} btn-primary`} onClick={() => dispatch(resetFilters())}>Resetuj filtry</button>
            {Object.entries(filters).map((filter, index) => <React.Fragment key={index}><Shortcut filter={filter} /></React.Fragment>)}
        </div>
    )
}

export default FiltersShortcut;