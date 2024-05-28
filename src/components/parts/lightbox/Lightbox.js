import styles from './lightbox.module.scss'
import deactivateScroll from "../../../helpers/deactivateScroll";
import getImageUrl from "../../../helpers/getImageUrl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {useEffect, useState} from "react";
const Lightbox = ({images, active, setActive, currentIndex, setCurrentIndex}) => {
    // useEffect(() => {
    //     setActiveIndex(currentIndex + 1)
    // }, [currentIndex]);
    useEffect(() => {
        if(active === false){
            deactivateScroll(false)
        }
        else{
            deactivateScroll(true)
        }
    }, [active]);

    if(active === false){
        return
    }


    const handleChangeImagePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex(prevState => prevState === 0 ? images.length - 1 : prevState - 1)
    };

    const handleChangeImageNext = (e) => {
        e.stopPropagation();
        setCurrentIndex(prevState => prevState === images.length - 1 ? 0 : prevState + 1)
    };

    return(
        <div className={styles.lightbox} onClick={() => setActive(false)}>
            <button className={`${styles.change_image_button} ${styles.left} btn-primary`} onClick={handleChangeImagePrev}>
                <FaChevronLeft className={styles.change_image_icon} />
            </button>
            <img src={getImageUrl(images[currentIndex])} />
            <button className={`${styles.change_image_button} ${styles.right} btn-primary`} onClick={handleChangeImageNext}>
                <FaChevronRight className={styles.change_image_icon} />
            </button>
        </div>
    )
}

export default Lightbox;