import styles from './chest-open.module.scss'
import testImage from '../../../../images/offer/test.jpg'
import {useEffect, useRef, useState} from "react";
import ChestOpenResult from "./result/ChestOpenResult";
const ChestOpen = ({open, singleChest, chestResult}) => {

    const chestOpenRef = useRef();
    const chestItemRef = useRef();
    const [transformX, setTransformX] = useState(0)
    const [isOpened, setIsOpened] = useState(false)
    const openTime = 4

    const randomItemsArray = []

    useEffect(() => {
        if(open){
            setTransformX(chestItemRef.current.offsetWidth * 6)
            setTimeout(() => {
                setIsOpened(true)
            }, openTime * 1000)
        }
    }, [open])

    const getRandomItems = (data, numberOfItems) => {
        for(let i = 0; i++; i <= numberOfItems){
            randomItemsArray.push(data[Math.random(``)])
        }
    }

    return(
        <>
            <div className={styles.chest_open_wrapper}>
                <span className={styles.line}></span>
                <div className={styles.chest_open} ref={chestOpenRef} style={{transform: `translateX(-${transformX}px)`, transition: `${openTime}s ease-in-out`}}>
                    <div ref={chestItemRef} className={styles.chest_item_wrapper}>
                        <div className={styles.chest_item}>
                            <img className={styles.chest_item_image} src={testImage} />
                        </div>
                    </div>
                    <div className={styles.chest_item_wrapper}>
                        <div className={styles.chest_item}>
                            <img className={styles.chest_item_image} src={testImage} />
                        </div>
                    </div>
                    <div className={styles.chest_item_wrapper}>
                        <div className={styles.chest_item}>
                            <img className={styles.chest_item_image} src={testImage} />
                        </div>
                    </div>
                    <div className={styles.chest_item_wrapper}>
                        <div className={styles.chest_item}>
                            <img className={styles.chest_item_image} src={testImage} />
                        </div>
                    </div>
                    <div className={styles.chest_item_wrapper}>
                        <div className={styles.chest_item}>
                            <img className={styles.chest_item_image} src={testImage} />
                        </div>
                    </div>
                    <div className={styles.chest_item_wrapper}>
                        <div className={styles.chest_item}>
                            <img className={styles.chest_item_image} src={testImage} />
                        </div>
                    </div>
                    <div className={styles.chest_item_wrapper}>
                        <div className={styles.chest_item}>
                            <img className={styles.chest_item_image} src={testImage} />
                        </div>
                    </div>
                    <div className={styles.chest_item_wrapper}>
                        <div className={styles.chest_item}>
                            <img className={styles.chest_item_image} src={testImage} />
                        </div>
                    </div>
                    <div className={styles.chest_item_wrapper}>
                        <div className={styles.chest_item}>
                            <img className={styles.chest_item_image} src={testImage} />
                        </div>
                    </div>
                    <div className={styles.chest_item_wrapper}>
                        <div className={styles.chest_item}>
                            <img className={styles.chest_item_image} src={testImage} />
                        </div>
                    </div>
                    <div className={styles.chest_item_wrapper}>
                        <div className={styles.chest_item}>
                            <img className={styles.chest_item_image} src={testImage} />
                        </div>
                    </div>
                </div>
            </div>
            {(chestResult && isOpened) && <ChestOpenResult chestResult={chestResult}  /> }
        </>

    )
}

export default ChestOpen;