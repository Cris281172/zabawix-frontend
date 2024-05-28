import styles from './offer-details.module.scss'

const OfferDetails = ({singleData}) => {

    const covertToHtml = (el) => {
        if(el.type === 'header'){
            switch (el.data.level){
                case 1:
                    return <h1>{el.data.text}</h1>
                case 2:
                    return <h2>{el.data.text}</h2>
                case 3:
                    return <h3>{el.data.text}</h3>
                case 4:
                    return <h4>{el.data.text}</h4>
                case 5:
                    return <h5>{el.data.text}</h5>
                case 6:
                    return <h6>{el.data.text}</h6>
                default:
                    return <></>
            }
        }
        if(el.type === 'delimiter'){
            return <span className={styles.delimiter}></span>
        }
        if(el.type === 'list'){
            return (
                <ul className={styles.list}>
                    {el.data.items.map((item, index) => (
                        <li className={`${styles.list_item} ${el.data.style === 'unordered' ? styles.unordered : styles.ordered}`} key={index}>{item}</li>
                    ))}
                </ul>
            )
        }
        if(el.type === 'paragraph'){
            return <p>{el.data.text}</p>
        }
    }

    return(
        <div className={styles.offer_desc}>
            {JSON.parse(singleData.desc).map(el => covertToHtml(el))}
        </div>

    )
}

export default OfferDetails;