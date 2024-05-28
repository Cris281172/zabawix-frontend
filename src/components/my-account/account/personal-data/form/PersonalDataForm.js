import {Formik} from "formik";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PersonalDataInput from "../../parts/FormInput";
import {
    user as reduxUser,
    customer as reduxCustomer,
    fetchCustomerCreate, fetchCustomerModify
} from "../../../../../redux/slices/userSlice";
import styles from './personal-data-form.module.scss'
import * as Yup from "yup";
import {RotatingLines} from "react-loader-spinner";

const personalDataSchema = Yup.object().shape({
    name: Yup.string().required('Imię jest wymagane').min(2, 'Imię jest za krótkie').max(20, 'Imię jest za długie'),
    surname: Yup.string().required('Nazwisko jest wymagane').min(2, 'Nazwisko jest za krótkie').max(20, 'Nazwisko jest za długie'),
    street: Yup.string().required('Ulica jest wymagan'),
    addressNumber: Yup.string().required('Number budynku/lokalu jest wymagany'),
    city: Yup.string().required('Miasto jest wymagane'),
    code: Yup.string().required('Kod pocztowy jest wymagany'),
});

const PersonalDataForm = () => {
    const customerData = useSelector(reduxCustomer).data;
    const status = useSelector(reduxCustomer).status;
    const [loading, setLoading] = useState(false)
    const [modifyUser, setModifyUser] = useState(false)

    const dispatch = useDispatch()

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

    // useEffect(() => {
    //     if(!user.user){
    //         return
    //     }
    //     setLoading(true)
    //     callToAPI('/customer/get', 'post', {userID: user.user.id})
    //         .then(res => {
    //             setCustomerData(res)
    //             setModifyUser(true)
    //         })
    //         .catch(() => setModifyUser(false))
    //         .finally(() => setLoading(false))
    // }, [user]);

    const handleSubmit = (values) => {
        const data = {...values, userID: user.user.id}
        if(!customerData.userID){

            dispatch(fetchCustomerCreate(data))
        }
        else{
            dispatch(fetchCustomerModify(data))
        }
    }

    return(
        <div className={styles.personal_data_form_wrapper}>
            {status === 'loading' &&
                <RotatingLines
                visible={true}
                height="200"
                width="500"
                color="#ff8800"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />}
            {status !== 'loading' &&
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
                            <button disabled={!isValid || status === 'loading'} className={`btn-primary ${styles.personal_data_save}`}>
                                {status === 'loading' ? 'Zapisywanie' : 'Zapisz dane'}
                            </button>
                        </form>
                    )}
                </Formik>
            }

        </div>
    )
}

export default PersonalDataForm;