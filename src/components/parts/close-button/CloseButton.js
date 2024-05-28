import styles from './close-button.module.scss'
import { IoMdClose  } from "react-icons/io";

const CloseButton = ({handleClose}) => {
    return(
        <button className={styles.close_button} onClick={handleClose}>
            <IoMdClose className={styles.close_button_icon} />
        </button>
    )
}

export default CloseButton;