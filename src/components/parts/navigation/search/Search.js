import styles from './search.module.scss'
import { CiSearch } from "react-icons/ci";
import {useState} from "react";
import {filters as reduxFilters, setFilters, resetFilters} from "../../../../redux/slices/offersSlice";
import {useDispatch, useSelector} from "react-redux";
import { IoMdClose } from "react-icons/io";
import {useNavigate} from "react-router";
const Search = () => {
    const filters = useSelector(reduxFilters)
    const [query, setQuery] = useState(filters.text ? filters.text : '')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(resetFilters())
        const queryData = [
            {
                prop: 'text',
                value: query
            }
        ]
        dispatch(setFilters(queryData))
        navigate('/sklep')
    }

    const handleChange = (e) => {
        setQuery((e.target.value))
    }

    const deleteQuery = () => {
        setQuery('')
        dispatch(setFilters([{
            prop: 'text',
            value: ''
        }]))
    }

    return(
        <form className={styles.search} onSubmit={handleSubmit}>
            <input className={styles.input_search} placeholder="Znajdz produkt..." onChange={handleChange} value={query} />
            {!filters.text ?
                <button type="submit" className={styles.search_button}>
                    <CiSearch className={styles.search_icon} />
                </button>
                :
                <button type="button" onClick={deleteQuery} className={styles.search_button}>
                    <IoMdClose className={styles.search_icon} />
                </button>
            }
        </form>
    )
}

export default Search;