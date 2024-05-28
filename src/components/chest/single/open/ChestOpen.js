import styles from './chest-open.module.scss'
import testImage from '../../../../images/offer/test.jpg'
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import ChestOpenResult from "./result/ChestOpenResult";
import getImageUrl from "../../../../helpers/getImageUrl";
import getRandomItems from "../../../../helpers/chest/getRandomItems";
import callToAPI from "../../../../api";
import {useSelector} from "react-redux";
import {user as reduxUser} from "../../../../redux/slices/userSlice";
import getDate from "../../../../helpers/date/getDate";
const ChestOpen = ({open, singleChest, chestResult, setOpen}) => {

    const chestOpenRef = useRef();
    const chestItemRef = useRef(null);
    const [transformX, setTransformX] = useState(0)
    const [resultPopupActive, setResultPopupActive] = useState(false)
    const openTime = 3
    const user = useSelector(reduxUser)
    const chestOpenTop = useRef()
    const [displayedItems, setDisplayedItems] = useState([])

    useEffect(() => {

    }, [resultPopupActive]);

    useEffect(() => {
        let timeoutId;
        if(open){
            let itemsToDisplay = getRandomItems(singleChest.content, 40);
            window.scrollTo({
                top: chestOpenTop.current.offsetTop - 50,
                behavior: 'smooth'
            })
            if(chestResult){
                itemsToDisplay.splice(22, 0, chestResult.imageName)
                callToAPI('/promotion/create', 'post', {
                    promotionName: chestResult.productTitle,
                    userID: user.user.id,
                    offerID: chestResult.productID,
                    startAt: getDate(0),
                    endAt: getDate(24 * 60 * 60 * 1000),
                    promotionPrice: chestResult.promotionPrice
                })
            }
            setDisplayedItems(itemsToDisplay);
            timeoutId = setTimeout(() => {
                setOpen(false)
                setResultPopupActive(true);
                setTransformX(0)
                setDisplayedItems([])
            }, openTime * 1000 + 500);
        }

        return () => {

            if(timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [open, chestResult]);

    useLayoutEffect(() => {
        if (chestItemRef.current && !resultPopupActive) {
            setTransformX(chestItemRef.current.offsetWidth * 20);
        }
    }, [displayedItems]);


    return(
        <>
            <div ref={chestOpenTop} className={`${styles.chest_open_wrapper} ${open === true ? styles.active : styles.inactive}`}>
                <span className={styles.line}></span>
                <div className={styles.chest_open} ref={chestOpenRef} style={{transform: `translateX(-${transformX}px)`, transition: `${openTime}s ease-in-out`}}>
                    {displayedItems.map((item, index) => (
                        <div ref={chestItemRef} key={index} className={styles.chest_item_wrapper}>
                            <div className={styles.chest_item}>
                                <img className={styles.chest_item_image} src={getImageUrl(item)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {(chestResult && resultPopupActive) && <ChestOpenResult chestResult={chestResult} setResultPopupActive={setResultPopupActive} resultPopupActive={resultPopupActive} /> }
        </>

    )
}

export default ChestOpen;