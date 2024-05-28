import {
    currentPage as reduxCurrentPage,
    fetchOffers,
    numberOfPages as reduxNumberOfPages,
    setCurrentPage,
} from "../../../redux/slices/offersSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./pagination.module.scss";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect } from "react";

const Pagination = ({ storeRef }) => {
    const numberOfPages = useSelector(reduxNumberOfPages);
    const dispatch = useDispatch();
    const currentPage = useSelector(reduxCurrentPage);
    if(numberOfPages <= 0){
        return
    }
    const displayPages = 2;
    const pagesArray = [];

    let start = Math.max(1, currentPage - displayPages);
    let end = Math.min(numberOfPages, currentPage + displayPages);

    if (currentPage - displayPages < 1) {
        end = Math.min(numberOfPages, start + displayPages * 2);
    }

    if (currentPage + displayPages > numberOfPages) {
        start = Math.max(1, end - displayPages * 2);
    }

    for (let i = start; i <= end; i++) {
        pagesArray.push(i);
    }

    const scrollToTop = () => {
        setTimeout(() => {
            window.scrollTo({
                top: storeRef.current.offsetTop,
                behavior: "smooth",
            });
        }, 100)
    }

    const changePage = (page) => {
        dispatch(setCurrentPage(page))
        scrollToTop()
    }

    const PaginationLoop = ({ page }) => {
        const handleChangePage = () => {
            dispatch(setCurrentPage(page));
            scrollToTop()
        };

        return (
            <button
                onClick={handleChangePage}
                key={page}
                className={`${styles.pagination_loop_page} ${
                    page === currentPage ? styles.active : ""
                }`}
            >
                {page + 1}
            </button>
        );
    };

    return (
        <div className={styles.pagination}>
            {currentPage >= 1 && (
                <button
                    onClick={() => changePage(currentPage - 1)}
                    className={styles.change_page}
                >
                    <MdChevronLeft className={styles.change_page_icon} />
                    poprzednia
                </button>
            )}
            {currentPage > 3 && (
                <>
                    <PaginationLoop page={0} />
                    {currentPage > displayPages + 2 && <span>...</span>}
                </>
            )}

            {pagesArray.map((page) => (
                <PaginationLoop page={page - 1} key={page} />
            ))}

            {currentPage < numberOfPages - displayPages && <span>...</span>}
            {currentPage - 1 < numberOfPages && (
                <PaginationLoop page={numberOfPages} />
                )}
            {currentPage < numberOfPages && (
                <button onClick={() => changePage(currentPage + 1)} className={styles.change_page}>
                    następna
                    <MdChevronRight className={styles.change_page_icon} />
                </button>
            )}
        </div>
    );
};

export default Pagination;

