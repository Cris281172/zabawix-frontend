import Skeleton from "react-loading-skeleton";
import styles from './skeleton-loading-gallery.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoadingGallery = () => {
    return(
        <>
            <Skeleton containerClassName={styles.skeleton_item_wrapper} />
        </>
    )
}

export default SkeletonLoadingGallery;