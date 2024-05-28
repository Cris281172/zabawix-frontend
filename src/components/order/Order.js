import OrderStepsBottom from "./steps/OrderStepsBottom";
import OrderSteps from "./steps/OrderSteps";
import useQueryString from "../../hooks/useQueryString";
import {useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import MyContact from "./steps/my-contact/MyContact";
import {orderData as reduxOrderData, fetchCreateOrder} from "../../redux/slices/orderSlice";
import {useDispatch, useSelector} from "react-redux";
import {Formik} from "formik";
import * as Yup from 'yup'
import Courier from "./steps/delivery/type/Courier";
import DeliveryData from "./steps/delivery/data/DeliveryData";
import BasketPreview from "./steps/basket-preview/BasketPreview";
import Delivery from "./steps/delivery/Delivery";

const orderSchema = Yup.object().shape({
    email: Yup.string().required('Wymagany!').email('test'),
    deliveryDataCourier: Yup.object().shape({
        name: Yup.string().required("Wymagany"),
        surname: Yup.string().required("Wymagany"),
        address: Yup.string().required("Wymagany"),
        zip: Yup.number().required("Wymagany"),
        phone: Yup.number().required("Wymagany"),
    }),
    deliveryDataInpost: Yup.object().shape({
        address: Yup.object().shape({
            line1: Yup.string().required('Wymagany'),
            line2: Yup.string().required('Wymagany')
        }),
        parcelLockerID: Yup.string().required('Wymagany')
    }),
})

const Order = () => {

    const {addQuery, getQuery, updateQuery} = useQueryString()
    const location = useLocation()
    const orderData = useSelector(reduxOrderData)
    const dispatch = useDispatch()

    const localstorageData = JSON.parse(localStorage.getItem('order')) || {}

    const initialValues = {
        email: localstorageData.email ? localstorageData.email : '',
        deliveryType: localstorageData.deliveryType ? localstorageData.deliveryType : '',
        deliveryDataInpost: {
            address: {
                line1: localstorageData.deliveryDataInpost?.address?.line1 ? localstorageData.deliveryDataInpost.address.line1 : '',
                line2: localstorageData.deliveryDataInpost?.address?.line2 ? localstorageData.deliveryDataInpost.address.line2 : ''
            },
            parcelLockerID: localstorageData.deliveryDataInpost?.parcelLockerID ? localstorageData.deliveryDataInpost.parcelLockerID : ''
        },
        deliveryDataCourier: {
            name: localstorageData.deliveryDataCourier?.name ? localstorageData.deliveryDataCourier.name : '',
            surname: localstorageData.deliveryDataCourier?.surname ? localstorageData.deliveryDataCourier.surname : '',
            address: localstorageData.deliveryDataCourier?.address ? localstorageData.deliveryDataCourier.address : '',
            zip: localstorageData.deliveryDataCourier?.zip ? localstorageData.deliveryDataCourier.zip : '',
            phone: localstorageData.deliveryDataCourier?.phone ? localstorageData.deliveryDataCourier.phone : ''
        }
    }

    // useEffect(() => {
    //     if(!orderData.status){
    //         dispatch(fetchCreateOrder())
    //     }
    // }, [])

    const orderStepsConfig = [
        {
            key: 1,
            name: 'Mój kontakt',
            component: <MyContact/>
        },
        {
            key: 2,
            name: 'Sposób wysyłki',
            component: <Delivery />
        },
        {
            key: 3,
            name: 'Dane wysyłki',
            component: <DeliveryData />
        }
    ]

    useEffect(() => {

        if(!location.search){
            addQuery('step', '1')
        }
    }, []);


    const handleSubmit = (values) => {
        console.log(values)
    }

    return(
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validateOnMount={true} validationSchema={orderSchema} enableReinitialize>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <OrderSteps orderStepsConfig={orderStepsConfig} />
                        <OrderStepsBottom orderStepsConfig={orderStepsConfig} />
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Order;