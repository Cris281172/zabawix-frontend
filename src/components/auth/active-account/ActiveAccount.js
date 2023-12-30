import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import callToAPI from "../../../api";

const ActiveAccount = () => {

    const activeAccountConfiguration = [
        {
            key: 'denied',
            text: "Niepoprawny token weryfikacji"
        },
        {
            key: 'pending',
            text: "Na twój email został wysłany link aktywacyjny"
        },
        {
            key: 'accept',
            text: "Konto zweryfikowane"
        }
    ]

    const params = useParams()
    const navigate = useNavigate()

    const [status, setStatus] = useState('pending')

    useEffect(() => {
        if(params.id){
            callToAPI(`/email-verify/${params.id}`, 'get')
                .then(res => {
                    setStatus('accept')
                    console.log(res);
                })
                .catch((err) => {
                    setStatus('denied')
                })
        }
    }, [params]);

    const statusMessage = activeAccountConfiguration.find(item => item.key === status);

    return(
        <div>
            {statusMessage ? statusMessage.text : 'Ładowanie...'}
            {/*{isVerify ? 'Konto zweryfikowane' : 'Na twój email został wysłany link aktywacyjny'}*/}

        </div>
    )
}

export default ActiveAccount;