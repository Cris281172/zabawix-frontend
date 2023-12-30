import styles from './validation-error.module.scss'
import { AiOutlineDislike, AiOutlineLike  } from "react-icons/ai";
const ValidationError = ({additionalClass = "", errorMessage, isErrorVisible, isVisible}) => {
    if(!isVisible){
        return <></>
    }
    if(!isErrorVisible || !errorMessage){
        return <AiOutlineLike title={errorMessage} className={`${styles.error_message} ${styles.success}`} />
    }
    return(
        <AiOutlineDislike title={errorMessage} className={`${styles.error_message} ${styles.error}`} />
    )
}

export default ValidationError