import React from 'react'
import styles from './filters.module.scss'
import ByPrice from "./by-price/ByPrice";
import Categories from "./categories/Categories";

const FiltersLoop = ({title, children}) => {
    return(
        <div className={styles.filters_loop}>
            <h2 className={styles.filter_title}>{title}</h2>
            {children}
        </div>
    )
}

const Filters = () => {

    const filtersConfig = [
        {
            title: "Filtruj po cenie",
            children: <ByPrice />
        },
        {
            title: "Kategorie",
            children: <Categories />
        }
    ]

    return(
        <div className={styles.filters_wrapper}>
            <div className={styles.filters}>
                {filtersConfig.map((filter, index) => <React.Fragment key={index}><FiltersLoop title={filter.title} children={filter.children} /></React.Fragment>)}
            </div>
        </div>
    )
}

export default Filters;