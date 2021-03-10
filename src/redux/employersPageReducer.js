import isEmptyObject from "../functions/isEmptyObject";

const MAKE_SHORT_EMPLOYERS = 'MAKE_SHORT_EMPLOYERS', CHANGE_PAGE_ON_EMPLOYERS_PAGE_PAGINATION = 'CHANGE_PAGE_ON_EMPLOYERS_PAGE_PAGINATION', CHANGE_EMPLOYERS_PAGE_SEARCH = 'CHANGE_EMPLOYERS_PAGE_SEARCH';

let makeShortEmployers = (employers, pagination, search, isLastPage) => {
    let searchEmployers = {}, shortEmployers = {};

    if (search !== '') {
        for (let id in employers) {
            let searchWords = search.split(' ');
            let employerAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in employers[id]) {
                    switch (property) {
                        case 'employer':
                            if (employers[id][property] !== undefined && employers[id][property] !== null && employers[id][property] !== '') {
                                propertiesArr.push(String(employers[id][property]));
                            }
                            break;
                        default:
                            break;
                    }
                }

                for (let i = 0; i < propertiesArr.length; i++) {
                    if (propertiesArr[i].toLowerCase().match(pattern)) {
                        wordAccord = true;
                        break;
                    }
                }

                if (!wordAccord) {
                    employerAccord = false;
                    break;
                }
            }

            if (employerAccord) {
                searchEmployers[id] = employers[id];
            }
        }
    }
    else {
        searchEmployers = employers;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    
    let pages = Math.floor(Object.keys(searchEmployers).length / paginationCount);
    if (Object.keys(searchEmployers).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let id in searchEmployers) {
        if (i >= left && i <= right) {
            shortEmployers[id] = searchEmployers[id];
        }
        i++;
    }

    return {
        shortEmployers: shortEmployers,
        currentPage: currentPage,
        pages: pages,
    };
}

let initialState = {
    shortEmployers: {},
    pagination: {
        count: 5,
        currentPage: 1,
        pages: 0,
    },
    search: '',
};

// Создание Action Creators
export let makeShortEmployersActionCreator = (isLastPage = false) => {
    let state = window.store.getState();
    let employers = state.employersState.employers;
    let pagination = state.employersPageState.pagination;
    let search = state.employersPageState.search;

    return {
        type: MAKE_SHORT_EMPLOYERS,
        employers: employers,
        pagination: pagination,
        search: search,
        isLastPage: isLastPage,
    };
}

export let changePageOnEmployersPagePaginationActionCreator = (page) => {
    return {
        type: CHANGE_PAGE_ON_EMPLOYERS_PAGE_PAGINATION,
        page: page,
    };
}

export let changeEmployersPageSearchActionCreator = (search) => {
    return {
        type: CHANGE_EMPLOYERS_PAGE_SEARCH,
        search: search,
    };
}

let employersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_EMPLOYERS:
            let makeShortEmployersResult = makeShortEmployers(action.employers, action.pagination, action.search, action.isLastPage);

            return {
                ...state,
                shortEmployers: makeShortEmployersResult.shortEmployers,
                pagination: {
                    ...state.pagination,
                    currentPage: makeShortEmployersResult.currentPage,
                    pages: makeShortEmployersResult.pages,
                },
            };
        case CHANGE_PAGE_ON_EMPLOYERS_PAGE_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.page,
                },
            };
        case CHANGE_EMPLOYERS_PAGE_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        default:
            return state;
    }
}

export default employersPageReducer;