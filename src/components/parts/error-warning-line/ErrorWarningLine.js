import { RiErrorWarningLine } from "react-icons/ri";
import { Tooltip } from 'react-tooltip'
import styles from './error-warning-line.module.scss'
const ErrorWarningLine = ({isError}) => {
    if(!isError) return
    return(
        <div className={styles.error_warning_line}>
            <RiErrorWarningLine data-tooltip-id="error-tooltip" className={styles.error_warning_line_icon} />
            <Tooltip id="error-tooltip" className={styles.error_warning_line_tooltip}>
                {isError}
            </Tooltip>
        </div>
    )
}

export default ErrorWarningLine;