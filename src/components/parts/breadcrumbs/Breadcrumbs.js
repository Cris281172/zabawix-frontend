import {Link, useLocation} from "react-router-dom";
import styles from './breadcrumbs.module.scss'

const Breadcrumbs = () => {

    const location = useLocation();

    const Breadcrumb = ({el, index}) => {
        return(
            <Link to={`/${el}`} key={index}>
                {index === 0 && 'Strona główna'}
                {el.split('-').map(element => <>{element} </>)}
                {index !== location.pathname.split('/').length - 1 && '>>>'}
            </Link>
        )
    }

    return(
        <div className={styles.breadcrumbs}>
            {location.pathname.split('/').map((el, index) => <Breadcrumb el={el} index={index} />)}
        </div>
    )
}

export default Breadcrumbs;