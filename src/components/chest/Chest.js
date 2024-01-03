import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchChest, chest as reduxChest} from "../../redux/slices/chestSlice";
import ChestsLoop from "./loop/ChestsLoop";

const Chest = () => {
    const dispatch = useDispatch()
    const chest = useSelector(reduxChest)
    console.log(chest)
    useEffect(() => {
        dispatch(fetchChest())
    }, [])

    return(
        <div>
            {chest.length === 0 && <div>Brak</div>}
            {chest.length !== 0 && <ChestsLoop data={chest} />}
        </div>
    )
}
export default Chest;