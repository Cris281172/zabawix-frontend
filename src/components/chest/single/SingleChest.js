import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleChest, singleChest as reduxSingleChest} from "../../../redux/slices/chestSlice";
import ChestContent from "./content/ChestContent";
import styles from './single-chest.module.scss'
import callToAPI from "../../../api";
import {user as reduxUser} from "../../../redux/slices/userSlice";
import ChestOpenResult from "./open/result/ChestOpenResult";
import ChestOpen from "./open/ChestOpen";

const SingleChest = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const singleChest = useSelector(reduxSingleChest);
    const user = useSelector(reduxUser)
    const [chestResult, setChestResult] = useState()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        dispatch(fetchSingleChest(params.id))
    }, [])

    const openChest = async () => {
        if(user.type === 'quest'){
            alert('Brak dostępu')
            return
        }
        setOpen(true)
        await callToAPI('/chest/open', 'post', {
            userID: user.user.id,
            chestID: singleChest._id
        })
            .then(res => setChestResult(res))
    }

    return(
        <div className="container">
            <div className={styles.single_chest}>
                {singleChest.chestName}
            </div>
            <ChestOpen open={open} singleChest={singleChest} chestResult={chestResult} />
            <button onClick={openChest}>
                Otwórz szkrzynkę
            </button>
            <ChestContent />
        </div>
    )
}

export default SingleChest;