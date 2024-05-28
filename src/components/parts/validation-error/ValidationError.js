import styles from './validation-error.module.scss'
import { AiOutlineDislike, AiOutlineLike  } from "react-icons/ai";
import { PiWarningCircle } from "react-icons/pi";
import { Tooltip } from 'react-tooltip';
const ValidationError = ({additionalClass = "", errorMessage, isErrorVisible}) => {
    if(!isErrorVisible || !errorMessage){
        return
    }
    return(
        <>
            <a
                data-tooltip-id={`my-tooltip`}
                data-tooltip-content={errorMessage}
                data-tooltip-variant="error"
                data-tooltip-offset={0}
            >
                <PiWarningCircle className={`${styles.error_message} ${styles.error}`} />
            </a>
            <Tooltip id={`my-tooltip`} place="top-start" noArrow={true}/>

        </>
    )
}

export default ValidationError