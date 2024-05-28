import {useState} from "react";
import styles from './by-price.module.scss'
import {setFilters} from "../../../../redux/slices/offersSlice";
import {useDispatch, useSelector} from "react-redux";
import {filters as reduxFilters} from "../../../../redux/slices/offersSlice";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
const ByPrice = () => {
    const dispatch = useDispatch();
    const filters = useSelector(reduxFilters);
    const [priceValue, setPriceValue] = useState([filters.min_price ? filters.min_price : 0, filters.max_price ? filters.max_price : 5000]);
    const filterByPrice = (e) => {
        e.preventDefault()
        const filterData = [
            {
                prop: "min_price",
                value: priceValue[0]
            },
            {
                prop: "max_price",
                value: priceValue[1]
            }
        ]
        dispatch(setFilters(filterData))
    }

    return (
        <>
            <form onSubmit={filterByPrice} className={styles.by_price}>
                <RangeSlider value={priceValue} rangeClass={styles.range} onInput={setPriceValue} min={0} max={5000} />
                <input value={priceValue[0]} onChange={(e) => setPriceValue(prevState => [e.target.value, prevState[1]])} />
                <input value={priceValue[1]} onChange={(e) => setPriceValue(prevState => [prevState[0], e.target.value])} />
                <button type="submit">Filtruj</button>
            </form>
        </>
    );
}

export default ByPrice;