import ReactSlider from "react-slider";
import {useState} from "react";
import styles from './by-price.module.scss'
import {setFilters} from "../../../../redux/slices/offersSlice";
import {useDispatch} from "react-redux";

const ByPrice = () => {
    const dispatch = useDispatch()
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(100)



    const setCurrentPrice = (min, max) => {

        setMinPrice(min)
        setMaxPrice(max)
    }

    return(
        <div className={styles.by_price}>
            <div className={styles.slider_wrapper}>
                <ReactSlider
                    className={styles.horizontal_slider}
                    thumbClassName={styles.example_thumb}
                    trackClassName={styles.example_track}
                    defaultValue={[minPrice, maxPrice]}
                    onChange={(value) => setMinPrice(value)}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    ariaValuetext={state => setCurrentPrice(state.value[0], state.value[1])}
                    renderThumb={(props, state) => <div {...props}>dot</div>}
                    pearling
                    step={0.5}
                    minDistance={1}
                />
            </div>

            <button onClick={e => dispatch(setFilters({prop: "min_price", value: minPrice}))}>Filtruj</button>
            {/*{minPrice}*/}
            {/*{maxPrice}*/}
        </div>
    )
}

export default ByPrice;