import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import useQueryString from "../../../hooks/useQueryString";
import BasketPreview from "./basket-preview/BasketPreview";
import styles from './order-steps.module.scss'
import {useFormikContext} from "formik";
const OrderSteps = ({orderStepsConfig}) => {
    const {getQuery} = useQueryString()
    const location = useLocation()
    const {values} = useFormikContext()
    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(values))
    }, [location.search]);

    return(
        <div className={`container ${styles.order_steps}`}>
            {orderStepsConfig.map((step, index) => <React.Fragment key={index}>
                {step.key === Number(getQuery('step')) &&
                    <div>
                        {step.name}
                        {step.component}
                    </div>
                }
            </React.Fragment>)}
            <BasketPreview />
        </div>
    )
}

export default OrderSteps;