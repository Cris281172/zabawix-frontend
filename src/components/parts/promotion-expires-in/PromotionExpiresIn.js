import { useEffect, useState } from "react";
import styles from './promotion-expires-in.module.scss';

const PromotionExpiresIn = ({ endAt }) => {

    const calculateTimeLeft = () => {
        const endTime = new Date(endAt).getTime();
        const now = new Date().getTime();
        const difference = endTime - now;

        if (difference <= 0) {
            return null;
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const renderTime = () => {
        if (!timeLeft) return <div>koniec</div>;

        return (
            <p className={styles.promotion_expires_in}>
                {timeLeft.days > 0 && <span>{timeLeft.days} dni, </span>}
                {timeLeft.hours > 0 && <span>{timeLeft.hours} godzin, </span>}
                <span>{timeLeft.minutes} minut, </span>
                <span>{timeLeft.seconds} sekund</span>
            </p>
        );
    }

    return <div>{renderTime()}</div>;
}

export default PromotionExpiresIn;