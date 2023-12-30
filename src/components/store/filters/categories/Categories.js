import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import buildCategoryTree from "../../../../helpers/buildCategoryTree";
import {setFilters, filters as reduxFilters} from "../../../../redux/slices/offersSlice";
import callToAPI from "../../../../api";
const Category = ({ category }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch()
    const handleClick = (categoryID, categoryName) => {
        setIsExpanded(!isExpanded)
        dispatch(setFilters({prop: "category", value: categoryID}))
    }

    return (
        <div style={{ marginLeft: '20px'}}>
            <div onClick={() => handleClick(category._id, category.categoryName)}>{category.categoryName}</div>
            {isExpanded && (
                <>
                    {category.subcategories && category.subcategories.map(subcategory => (
                        <Category key={subcategory._id} category={subcategory} />
                    ))}
                </>
            )}
        </div>
    );
};

const Categories = () => {
    const [categoriesData, setCategoriesData] = useState([])
    useEffect(() => {
        callToAPI('/categories/get', 'GET')
            .then(res => setCategoriesData(buildCategoryTree(res)))
    }, []);

    return(
        <div>
            {categoriesData.map(category => (
                <Category key={category._id} category={category} />
            ))}
        </div>
    )
}

export default Categories;