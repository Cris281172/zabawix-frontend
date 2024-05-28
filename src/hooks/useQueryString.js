import {useLocation, useNavigate} from 'react-router';

export default function useQueryString() {

    const location = useLocation();
    const navigate = useNavigate();

    const getQuery = (key) => {

        const searchParams = new URLSearchParams(location.search);

        return searchParams.get(key);

    }

    const updateQuery = params => {

        let pathname = location.pathname;

        let searchParams = new URLSearchParams();


        for (const key in params) {

            if(params[key] !== null && params[key] !== undefined) {

                if(Array.isArray(params[key])) {

                    params[key].forEach((item) => {

                        searchParams.append(`${key}`, item);

                    });

                }
                else {

                    searchParams.append(key, params[key]);

                }

            }

        }

        navigate({
            pathname: pathname,
            search:  searchParams.toString()
        })

    }

    const addQuery = (key, value) => {

        let pathname = location.pathname;

        if(value === '') {

            removeQuery(key)

        }
        else {

            let searchParams = new URLSearchParams(location.search);

            searchParams.set(key, value);

            navigate({
                pathname: pathname,
                search:  searchParams.toString()
            })

        }

    };

    const removeQuery = (key) => {
        let pathname = location.pathname;
        let searchParams = new URLSearchParams(location.search);
        searchParams.delete(key);
        navigate({
            pathname: pathname,
            search:  searchParams.toString()
        })
    };
    return {
        updateQuery,
        addQuery,
        removeQuery,
        getQuery
    };
}
