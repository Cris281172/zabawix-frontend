import React from 'react'
import styles from './filters.module.scss'
import ByPrice from "./by-price/ByPrice";
import Categories from "./categories/Categories";
import CloseOutside from "../../parts/close-outside/CloseOutside";
import CloseButton from "../../parts/close-button/CloseButton";

const FiltersLoop = ({title, children}) => {
    return(
        <div className={styles.filters_loop}>
            <h2 className={styles.filter_title}>{title}</h2>
            {children}
        </div>
    )
}

const Filters = ({moreFiltersVisible, setMoreFiltersVisible}) => {

    const handleCloseFilters = () => setMoreFiltersVisible(false)


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
        <div className={`${styles.filters_wrapper} ${moreFiltersVisible ? styles.active : ''}`}>
            <CloseOutside handleClose={handleCloseFilters}>
                <div className={styles.filters}>
                    <div className={styles.close_button_wrapper}>
                        <CloseButton handleClose={handleCloseFilters} />
                    </div>
                    <div className={styles.filters_loop_wrapper}>
                        {filtersConfig.map((filter, index) => <React.Fragment key={index}><FiltersLoop title={filter.title} children={filter.children} /></React.Fragment>)}
                    </div>
                </div>
            </CloseOutside>
        </div>
    )
}

export default Filters;