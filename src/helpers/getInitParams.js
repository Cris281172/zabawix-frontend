const getInitFilters = () => {
    const searchParams = [...new URLSearchParams(window.location.search).entries()]

    let urlQueries = {};

    urlQueries = [...searchParams].filter(el => el[0] !== 'page').reduce((result, el) => {
        result[el[0]] = el[1];
        return result;
    }, {});

    return urlQueries
}

export default getInitFilters;