import {Formik} from "formik";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import PersonalDataInput from "../../parts/FormInput";
import callToAPI from "../../../../../api";
import {user as reduxUser} from "../../../../../redux/slices/userSlice";
import styles from './delivery-data-form.module.scss'
import * as Yup from "yup";

const personalDataSchema = Yup.object().shape({
    name: Yup.string().required('Imię jest wymagane').min(2, 'Imię jest za krótkie').max(20, 'Imię jest za długie'),
    surname: Yup.string().required('Nazwisko jest wymagane').min(2, 'Nazwisko jest za krótkie').max(20, 'Nazwisko jest za długie'),
    street: Yup.string().required('Ulica jest wymagan'),
    addressNumber: Yup.string().required('Number budynku/lokalu jest wymagany'),
    city: Yup.string().required('Miasto jest wymagane'),
    code: Yup.string().required('Kod pocztowy jest wymagany'),
});

const DeliveryDataForm = () => {
    const [loading, setLoading] = useState(false)
    const [modifyUser, setModifyUser] = useState(false)
    const [customerData, setCustomerData] = useState({
        name: "",
        surname: "",
        street: "",
        addressNumber: "",
        city: "",
        code: "",
        email: "krzysiu.juczynski@gmail.com"
    })

    const loopConfig = [
        {
            key: 'name',
            placeholder: 'Podaj swoje imię',
            label: 'Imię'
        },
        {
            key: 'surname',
            placeholder: 'Podaj swoje nazwisko',
            label: 'Nazwisko'
        },
        {
            key: 'street',
            placeholder: "Podaj ulice",
            label: 'Ulica'
        },
        {
            key: 'addressNumber',
            placeholder: 'Podaj numer budynku / numer lokalu',
            label: 'Numer budynku / numer lokalu'
        },
        {
            key: 'city',
            placeholder: "Podaj swoje miasto",
            label: 'Miasto'
        },
        {
            key: 'code',
            placeholder: 'Podaj swój kod pocztowy',
            label: 'Kod pocztowy',
        }
    ]

    const user = useSelector(reduxUser)

    const handleSubmit = (values) => {
        const data = {...values, userID: user.user.id}
        if(!modifyUser){
            callToAPI('/customer/create', 'post', data)
        }
        else{
            callToAPI('/customer/modify', 'post', data)
        }
    }

    if(loading){
        return <div>XDD</div>
    }
    return(
        <div className={styles.personal_data_form_wrapper}>
            <Formik initialValues={customerData} onSubmit={(values) => handleSubmit(values)} validationSchema={personalDataSchema}>
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isValid,
                  }) => (
                    <form onSubmit={handleSubmit} className={styles.personal_data_form}>
                        <div className={styles.personal_data_loop}>
                            {loopConfig.map((item, index) => <React.Fragment key={index}><PersonalDataInput keyValue={item.key} placeholder={item.placeholder} label={item.label} /></React.Fragment>)}
                        </div>
                        <button disabled={!isValid} className={`btn-primary ${styles.personal_data_save}`}>Zapisz dane</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default DeliveryDataForm;