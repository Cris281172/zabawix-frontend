import styles from './main-categories.module.scss'
import toysImage from '../../../images/homepage/main-categories/toys.webp'
import carsImage from '../../../images/homepage/main-categories/cars.webp'
import youngestImage from '../../../images/homepage/main-categories/youngest.webp'
import decorImage from '../../../images/homepage/main-categories/decor.webp'
import waterImage from '../../../images/homepage/main-categories/water.webp'
import {Link} from "react-router-dom";
import React from "react";

const MainCategories = () => {

    const mainCategoriesConfig = [
        {
            link: '',
            image: toysImage,
            title: 'Zabawki'
        },
        {
            link: '',
            image: carsImage,
            title: 'Pojazdy'
        },
        {
            link: '',
            image: youngestImage,
            title: 'Dla najmłodszych'
        },
        {
            link: '',
            image: decorImage,
            title: 'Dekoracje'
        },
        {
            link: '',
            image: waterImage,
            title: 'Wodne'
        }
    ]

    const MainCategoriesLoop = ({category}) => {
        return(
            <Link to={category.link} className={styles.main_categories_link}>
                <img src={category.image} alt="Main category image" className={styles.main_categories_image} />
                <h2 className={styles.main_categories_title}>{category.title}</h2>
            </Link>
        )
    }

    return(
        <div className="container">
            <div className={styles.main_categories}>
                {mainCategoriesConfig.map((category, index) => <React.Fragment key={index}><MainCategoriesLoop category={category} /></React.Fragment>)}


            </div>
        </div>
    )
}

export default MainCategories;