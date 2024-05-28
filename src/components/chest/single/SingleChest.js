import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleChest, singleChest as reduxSingleChest} from "../../../redux/slices/chestSlice";
import ChestContent from "./content/ChestContent";
import styles from './single-chest.module.scss'
import callToAPI from "../../../api";
import {user as reduxUser, setUserPoints} from "../../../redux/slices/userSlice";
import ChestOpen from "./open/ChestOpen";
import chestOpeningSound from '../../../mp3/chest-opening.mp3'
import { FaVolumeMute, FaVolumeUp  } from "react-icons/fa";
const SingleChest = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const singleChest = useSelector(reduxSingleChest);
    const user = useSelector(reduxUser)
    const [chestResult, setChestResult] = useState()
    const [open, setOpen] = useState(false)
    const sound = new Audio(chestOpeningSound)
    const playSound = () => {

        sound.play();
    }

    useEffect(() => {
        dispatch(fetchSingleChest(params.id))
    }, [])

    const openChest = async () => {
        if(user.type === 'quest'){
            alert('Brak dostępu')
            return
        }
        playSound()
        if(user.user.points < singleChest.pointsCost){
            return alert('nie stać cie biedaku')
        }
        setOpen(true)
        await callToAPI('/chest/open', 'post', {
            userID: user.user.id,
            chestID: singleChest._id
        })
            .then(res => {
                setChestResult(res)
                dispatch(setUserPoints(singleChest.pointsCost))
            })
    }

    return(
        <div className="container">
            <div className={styles.single_chest}>
                <div className={styles.single_chest_name_wrapper}>
                    <h1 className={styles.single_chest_name}>
                        {singleChest.chestName} - {singleChest.pointsCost} punktów
                    </h1>
                    <FaVolumeMute className={styles.change_volume} />
                </div>

                <ChestOpen open={open} singleChest={singleChest} chestResult={chestResult} setOpen={setOpen} />
                <ChestContent singleChestContent={singleChest.content} />
                <button onClick={openChest} disabled={open} className={`${styles.single_chest_open} btn-primary`}>
                    Otwórz szkrzynkę
                </button>
            </div>
        </div>
    )
}

export default SingleChest;