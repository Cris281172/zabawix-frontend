import styles from './search.module.scss'
import { CiSearch } from "react-icons/ci";
const Search = () => {
    return(
        <div className={styles.search}>
            <input className={styles.input_search} placeholder="Znajdz produkt..." />
            <CiSearch className={styles.search_icon} />
        </div>
    )
}

export default Search;