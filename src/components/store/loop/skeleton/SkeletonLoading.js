import Skeleton from 'react-loading-skeleton';
import styles from './skeleton-loading.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoading = () => {

    const skeletonItemsCount = 8

    return (
        <>
            {Array.from({ length: skeletonItemsCount }).map((_, index) => (
                <div key={index} className={styles.skeleton_item_wrapper}>
                    <Skeleton containerClassName={styles.skeleton_image} />
                    <Skeleton containerClassName={styles.skeleton_text} />
                </div>
            ))}
        </>
    );
}

export default SkeletonLoading