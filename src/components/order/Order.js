import React, {useEffect, useState} from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import BasketPreview from "./steps/basket-preview/BasketPreview";
import Delivery from "./steps/delivery/Delivery";
import styles from './order.module.scss';
import BillingDetails from "./steps/billing-details/BillingDetails";
import { phoneNumberRegex, postalCodeRegex, removeSpaces, taxIDRegex } from "../../helpers/regexes";
import DeliveryAddress from "./steps/delivery-address/DeliveryAddress";
import Account from "./steps/account/Account";
import {useDispatch} from "react-redux";
import {fetchGetBillings} from "../../redux/slices/billingSlice";

const orderSchema = Yup.object().shape({
    email: Yup.string().required('Wymagany!').email('test'),
    deliveryType: Yup.string().required('Wymagany wybór rodzaju dostawy'),
    deliveryDataInpost: Yup.object().shape({
        address: Yup.object().shape({
            line1: Yup.string().when('$deliveryType', {
                is: 'inpost',
                then: schema => schema.required('Adres jest wymagany'),
                otherwise: schema => schema.notRequired()
            }),
            line2: Yup.string().when('$deliveryType', {
                is: 'inpost',
                then: schema => schema.required('Adres jest wymagany'),
                otherwise: schema => schema.notRequired()
            }),
        }),
        parcelLockerID: Yup.string().when('$deliveryType', {
            is: 'inpost',
            then: schema => schema.required('ID paczkomatu jest wymagane'),
            otherwise: schema => schema.notRequired()
        }),
    }),
    deliveryAddress: Yup.object().shape({
        name: Yup.string().when('$deliveryType', {
            is: 'courier',
            then: schema => schema.required('Imię jest wymagane'),
            otherwise: schema => schema.notRequired()
        }),
        surname: Yup.string().when('$deliveryType', {
            is: 'courier',
            then: schema => schema.required('Nazwisko jest wymagane'),
            otherwise: schema => schema.notRequired()
        }),
        address: Yup.string().when('$deliveryType', {
            is: 'courier',
            then: schema => schema.required('Adres jest wymagany'),
            otherwise: schema => schema.notRequired()
        }),
        zip: Yup.string().when('$deliveryType', {
            is: 'courier',
            then: schema => schema.required('Kod pocztowy jest wymagany').matches(postalCodeRegex, "Nieprawidłowy format kodu pocztowego"),
            otherwise: schema => schema.notRequired()
        }),
        phone: Yup.string().when('$deliveryType', {
            is: 'courier',
            then: schema => schema.required('Numer telefonu jest wymagany').matches(phoneNumberRegex, "Nieprawidłowy format numeru telefonu"),
            otherwise: schema => schema.notRequired()
        }),
    }),
    billingDetails: Yup.object().shape({
        name: Yup.string().when('sameLikeDeliveryAddress', {
            is: false,
            then: schema => schema.required('Imię jest wymagane'),
            otherwise: schema => schema.notRequired()
        }),
        surname: Yup.string().when('sameLikeDeliveryAddress', {
            is: false,
            then: schema => schema.required('Nazwisko jest wymagane'),
            otherwise: schema => schema.notRequired()
        }),
        address: Yup.string().when('sameLikeDeliveryAddress', {
            is: false,
            then: schema => schema.required('Adres jest wymagany'),
            otherwise: schema => schema.notRequired()
        }),
        zip: Yup.string().when('sameLikeDeliveryAddress', {
            is: false,
            then: schema => schema.required('Kod pocztowy jest wymagany').matches(postalCodeRegex, "Nieprawidłowy format kodu pocztowego"),
            otherwise: schema => schema.notRequired()
        }),
        phone: Yup.string().when('sameLikeDeliveryAddress', {
            is: false,
            then: schema => schema.required('Numer telefonu jest wymagany').matches(phoneNumberRegex, "Nieprawidłowy format numeru telefonu"),
            otherwise: schema => schema.notRequired()
        }),
        companyName: Yup.string().when('invoice', {
            is: true,
            then: schema => schema.required('Nazwa firmy jest wymagana'),
            otherwise: schema => schema.notRequired()
        }),
        companyTaxID: Yup.string().transform((value) => removeSpaces(value)).when('invoice', {
            is: true,
            then: schema => schema.required('NIP jest wymagany').matches(taxIDRegex, "Nieprawidłowy format NIP"),
            otherwise: schema => schema.notRequired()
        }),
    })
});

const Order = () => {
    const localstorageData = JSON.parse(localStorage.getItem('order')) || {};
    const dispatch = useDispatch()
    const [initialValues, setInitialValues] = useState({
        email: localstorageData.email ? localstorageData.email : '',
        deliveryType: localstorageData.deliveryType ? localstorageData.deliveryType : 'courier',
        deliveryDataInpost: {
            address: {
                line1: localstorageData.deliveryDataInpost?.address?.line1 ? localstorageData.deliveryDataInpost.address.line1 : '',
                line2: localstorageData.deliveryDataInpost?.address?.line2 ? localstorageData.deliveryDataInpost.address.line2 : ''
            },
            parcelLockerID: localstorageData.deliveryDataInpost?.parcelLockerID ? localstorageData.deliveryDataInpost.parcelLockerID : ''
        },
        billingDetails: {
            sameLikeDeliveryAddress: false,
            type: '',
            name: '',
            surname: '',
            address: '',
            zip: '',
            phone: '',
            companyName: '',
            companyTaxID: '',
            invoice: ''
        },
        deliveryAddress: {
            name: '',
            surname: '',
            address: '',
            zip: '',
            phone: '',
        }
    });

    useEffect(() => {
        dispatch(fetchGetBillings())
    })

    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <div className={`container ${styles.order}`}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={orderSchema} enableReinitialize>
                {({ handleSubmit, values }) => {
                    const stepsConfig = [
                        {
                            id: 1,
                            title: 'Zawartość twojego koszyka',
                            component: <BasketPreview />
                        },
                        {
                            id: 2,
                            title: 'Dostawa',
                            component: <Delivery />
                        },
                        ...(values.deliveryType === 'courier' ? [{
                            id: 3,
                            title: 'Adres dostawy',
                            component: <DeliveryAddress />
                        }] : []),
                        {
                            id: values.deliveryType === 'courier' ? 4 : 3,
                            title: 'Dane rozliczeniowe',
                            component: <BillingDetails setInitialValues={setInitialValues} />
                        },
                        {
                            id: values.deliveryType === 'courier' ? 5 : 4,
                            title: 'Konto',
                            component: <Account />
                        }
                    ];

                    return (
                        <form className={styles.order_form} onSubmit={handleSubmit}>
                            {stepsConfig.map((stepItem, index) => (
                                <div key={index} className={styles.order_component}>
                                    <h3 className={styles.order_component_title}>
                                        <span>{stepItem.id}</span>
                                        {stepItem.title}
                                    </h3>
                                    {stepItem.component}
                                </div>
                            ))}
                            <button type='submit' className={`${styles.submit_form} btn-primary`}>Przejdź do płatności</button>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default Order;