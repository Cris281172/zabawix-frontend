import Skeleton from "react-loading-skeleton";
import styles from './skeleton-loading-main-content.module.scss'
const SkeletonLoadingMainContent = () => {
    return(
        <div>
            <Skeleton containerClassName={styles.skeleton_item} height={30} width="50%" />
            <Skeleton containerClassName={styles.skeleton_item} height={30} width="50%" />
            <Skeleton containerClassName={styles.skeleton_item} height={15} width="25%" />
            <Skeleton containerClassName={styles.skeleton_item} height={40} width="25%" borderRadius={20} />
            <Skeleton containerClassName={styles.skeleton_item} height={30} width="25%"  />
            <Skeleton containerClassName={styles.skeleton_item} height={30} width="25%"  />
        </div>
    )
}

export default SkeletonLoadingMainContent;