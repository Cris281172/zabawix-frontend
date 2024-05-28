import styles from './loop-gallery-images.module.scss'
import getImageUrl from "../../../../../helpers/getImageUrl";
import Lightbox from "../../../../parts/lightbox/Lightbox";
import {useState} from "react";

const LoopGalleryImages = ({images, openLightbox}) => {
    if(!images[1]){
        return
    }
    return(
        <div className={styles.loop_gallery_images}>
            {images.slice(1).map((image, index) => <div onClick={() => openLightbox(index)} className={styles.gallery_image_wrapper}><img className={styles.gallery_image} key={index} src={getImageUrl(image)} /></div>)}
        </div>
    )
}

export default LoopGalleryImages;