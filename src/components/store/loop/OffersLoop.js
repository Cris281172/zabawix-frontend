import styles from './offers-loop.module.scss'
import testImage from '../../../images/header/header-banner-2.jpg'
import testImage2 from '../../../images/header/header-banner-3.jpg'
import testImage3 from '../../../images/offer/test.jpg'
import testImage4 from '../../../images/offer/test2.jpg'
import Offer from "./offer/Offer";
const OffersLoop = ({offers}) => {


    const testConfig = [
        {
            image: 'testImage',
            title: 'Test title',
            price: 125,
            category: 'pojazdy'
        },
        {
            image: testImage3,
            title: 'Test title',
            price: 125,
            category: 'pojazdy'
        },
        {
            image: testImage2,
            title: 'Test title',
            price: 125,
            category: 'pojazdy'
        },
        {
            image: testImage4,
            title: 'Test title',
            price: 125,
            category: 'pojazdy'
        },
        {
            image: testImage,
            title: 'Test title',
            price: 125,
            category: 'pojazdy'
        }
    ]

    return(
        <div className={`${styles.offers_loop} container`}>
            {offers.map(el => <Offer item={el} />)}
        </div>
    )
}

export default OffersLoop;