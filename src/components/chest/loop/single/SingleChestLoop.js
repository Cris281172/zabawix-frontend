import styles from './single-chest-loop.module.scss'
import testImage from '../../.././../images/chest.webp'
import {Link} from "react-router-dom";

const SingleChestLoop = ({chest}) => {

    return(
        <div className={styles.single_chest_loop}>
            <div className={styles.image_wrapper}>
                <img src={testImage} className={styles.chest_image} alt="Chest image" />
            </div>
            <div className={styles.chest_information}>
                <h2 className={styles.chest_name}>{chest.chestName}</h2>
                <ul className={styles.chest_list}>
                    <li className={styles.chest_item}>
                        Koszt skrznki: {chest.pointsCost} punktów
                    </li>
                    <li className={styles.chest_item}>
                        Ilość przedmiotów: {chest.quantityItems} przedmitów
                    </li>
                </ul>
            </div>
            <Link className={`${styles.open_chest} btn-primary`} to={chest._id}>Otwórz szkynkę</Link>
        </div>
    )
}

export default SingleChestLoop