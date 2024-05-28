import React, {useEffect, useState, useRef} from "react";
import callToAPI from "../../../api";
import styles from './statistics.module.scss'

const Statistics = () => {

    const [statistics, setStatistics] = useState({});
    const [animatedValues, setAnimatedValues] = useState({});
    const [hasAnimated, setHasAnimated] = useState(false);
    const statsRef = useRef(null);

    const easeInOut = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateValue = (start, end, duration, setValue) => {
        if (start === end) return;

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeInOut(progress);
            setValue(Math.floor(easedProgress * (end - start) + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    useEffect(() => {
        callToAPI('/statistics/get', 'get')
            .then(res => {
                setStatistics(res);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    Object.keys(statistics).forEach(key => {
                        animateValue(0, statistics[key], 2500, (value) =>
                            setAnimatedValues(prev => ({ ...prev, [key]: value }))
                        );
                    });
                }
            },
            { threshold: 0.4 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, [statistics, hasAnimated]);

    const statisticsConfiguration = [
        {
            text: 'Aktywne konta',
            value: animatedValues.usersCount || 0
        },
        {
            text: 'Przedmiotów na stronie',
            value: animatedValues.offersCount || 0
        },
        {
            text: 'Odwiedziło nas',
            value: animatedValues.userVisitCount || 0
        },
        {
            text: 'Transakcje płatnicze',
            value: animatedValues.transactionsCount || 0
        }
    ];


    return(
        <div className={styles.statistics} ref={statsRef}>
            <div className="container">
                <h2 className={styles.statistics_title}>Zabawkowe statystki</h2>
                <div className={styles.statistics_loop_wrapper}>
                    {statisticsConfiguration.map((item, index) => {
                        return(
                            <div className={styles.statistics_loop_item} key={index}>
                                <span className={styles.statistics_loop_value}>
                                    {item.value}
                                </span>
                                <p>
                                    {item.text}
                                </p>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default Statistics;