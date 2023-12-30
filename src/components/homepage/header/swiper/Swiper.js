import slider1 from '../../../../images/header/slider/slide-1.webp'
import slider2 from '../../../../images/header/slider/slide-2.webp'
import slider3 from '../../../../images/header/slider/slide-3.webp'
import slider4 from '../../../../images/header/slider/slide-4.webp'
import slider5 from '../../../../images/header/slider/slide-5.webp'
import slider6 from '../../../../images/header/slider/slide-6.webp'
import slider7 from '../../../../images/header/slider/slide-7.webp'
import slider8 from '../../../../images/header/slider/slide-8.webp'
import { MdOutlineNavigateNext, MdOutlineNavigateBefore  } from "react-icons/md";
import styles from './swiper.module.scss'
import {useEffect, useRef, useState} from "react";
import React from 'react'
import {Link} from "react-router-dom";

const SwiperItem = ({index, activeIndex, item}) => {
    return(
        <div className={`${styles.swiper_item} ${index === activeIndex ? `${styles.active}` : ''}`} style={{backgroundImage: `url(${item.backgroundImage})`}}>
            {item.swiperBox}
        </div>
    )
}

const SwiperBox = ({title, text, linkText, linkValue}) => {
    return(
        <div className={styles.swiper_item_box}>
            <h2 className={styles.box_title}>
                {title}
            </h2>
            <p className={styles.box_subtitle}>{text}</p>
            <Link to={linkValue} className={`${styles.box_link} btn-primary`}>{linkText}</Link>
        </div>
    )
}


const Swiper = () => {

    const [activeIndex, setActiveIndex] = useState(0)
    const intervalId = useRef(null);

    const swiperConfiguration = [
        {
            backgroundImage: slider5,
            swiperBox: <SwiperBox title={<>Magiczny Świat <br/> Zabawek - Odkryj i Baw Się!</>} text={<>Poznaj naszą szeroką gamę kreatywnych zabawek, pojazdów i ubranek, <br/> które rozbudzą wyobraźnię Twojego dziecka!</>} linkText="Sklep" linkValue="/sklep" />
        },
        {
            backgroundImage: slider6,
            swiperBox: <SwiperBox title={<>Edukacyjna Zabawa <br /> - Nauka przez Radość!</>} text={<>Odkryj nasze edukacyjne zabawki, które wspierają <br /> rozwój umiejętności i wiedzy Twojego dziecka w zabawny sposób.</>} linkText="Zobacz Edukacyjne Zabawki" linkValue="/sklep" />
        },
        {
            backgroundImage: slider7,
            swiperBox: <SwiperBox title={<>Mega Promocje - Zabawki <br /> w Fantastycznych Cenach!</>} text={<>Nie przegap naszych niesamowitych ofert! Odkryj wyjątkowe promocje <br/> na ulubione zabawki Twojego dziecka. Skorzystaj z najlepszych okazji, zanim się skończą!</>} linkText="Zobacz Promocje" linkValue="/sklep" />
        },
        {
            backgroundImage: slider8,
            swiperBox: <SwiperBox title={<>Skrzynie Niespodzianek <br/> - Zdobądź Nagrody za Punkty!</>} text={<>Otwórz skrzynię pełną zaskoczeń i zdobądź niesamowite zniżki oraz <br /> produkty nawet za złotówkę! Kupuj, zbieraj punkty i wymieniaj je na ekscytujące nagrody. <br /> Twoja szansa na wyjątkowe okazje!</>} linkText="Otwórz Swoją Skrzynię" linkValue="/sklep" />
        }
    ]


    const resetInterval = () => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
        }

        intervalId.current = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex + 1) % swiperConfiguration.length);
        }, 25000);
    };


    useEffect(() => {
        resetInterval();

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [swiperConfiguration.length]);

    const prevSlide = () => {
        setActiveIndex(prevIndex => {
            if(prevIndex === 0){
                return swiperConfiguration.length - 1
            }
            return prevIndex - 1

        });
        resetInterval();
    }

    const nextSlide = () => {
        setActiveIndex(prevIndex => (prevIndex + 1) % swiperConfiguration.length);
        resetInterval();
    }


    return(
        <div className={styles.swiper}>
            <button className={`${styles.left_arrow} ${styles.arrow} btn-primary`} onClick={prevSlide}>
                <MdOutlineNavigateBefore className={styles.icon} />
            </button>
            {swiperConfiguration.map((item, index) => <React.Fragment key={index}><SwiperItem index={index} activeIndex={activeIndex} item={item} /></React.Fragment>)}
            <button className={`${styles.right_arrow} ${styles.arrow} btn-primary`} onClick={nextSlide}>
                <MdOutlineNavigateNext className={styles.icon} />
            </button>
        </div>
    )
}

export default Swiper;