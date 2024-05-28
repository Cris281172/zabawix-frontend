import styles from './order-steps-bottom.module.scss'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import useQueryString from "../../../hooks/useQueryString";
import {useFormikContext} from "formik";
const OrderStepsBottom = ({orderStepsConfig}) => {
    const {addQuery, getQuery, updateQuery} = useQueryString()
    const currentStep = Number(getQuery('step'))
    const lastStep = orderStepsConfig.length
    const {isValid, values, errors} = useFormikContext()

    const changeStep = (step) => {
        if(step <= 0){
            return
        }
        if(step === 2 && errors.email){
            return;
        }
        if(step === 3 && errors.deliveryDataCourier && values.deliveryType === 'courier'){
            return;
        }
        if(step === 3 && errors.deliveryDataInpost && values.deliveryType === 'parcelLocker'){
            return;
        }
        updateQuery({step: step})
    }

    return(
        <div className={styles.order_steps_bottom_wrapper}>
            <div className="container">
                <div className={styles.order_steps_bottom}>
                    {currentStep > 1 &&
                        <button className={`${styles.change_step_button} btn-outline-primary`} onClick={() => changeStep(currentStep - 1)}>
                            <GrFormPrevious />
                            Poprzedni
                        </button>
                    }
                    {orderStepsConfig.map((step, index) => <>{step.name}</>)}
                    {lastStep !== currentStep &&
                        <button className={`${styles.change_step_button} btn-outline-primary`} onClick={() => changeStep(currentStep + 1)}>
                            Następny
                            <GrFormNext  />
                        </button>
                    }
                </div>

            </div>
        </div>

    )
}

export default OrderStepsBottom;