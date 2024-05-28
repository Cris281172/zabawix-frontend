import React from "react";
import {useDispatch} from "react-redux";
import {setSort} from "../../../redux/slices/offersSlice";
import styles from './sort.module.scss'
const Sort = () => {

    const dispatch = useDispatch()

    const sortConfiguration = [
        {
            key: 'default',
            text: 'Sortowanie domyślne'
        },
        {
            key: 'newest',
            text: 'Sortuj od najnowszych'
        },
        {
            key: 'oldest',
            text: 'Sortuj od najstarszych'
        },
        {
            key: 'lowest-price',
            text: 'Sortuj po cenie od najniższej'
        },
        {
            key: 'highest-price',
            text: 'Sortuj po cenie od najwyższej'
        }
    ]

    const setSortValue = (e) => {
        e.target.value === 'default' ? dispatch(setSort('')) : dispatch(setSort(e.target.value))
    }

    return(
        <select className={styles.sort}  onChange={setSortValue}>
            {sortConfiguration.map((sort, index) => <React.Fragment key={index}><option value={sort.key}>{sort.text}</option></React.Fragment>)}
        </select>
    )
}

export default Sort;