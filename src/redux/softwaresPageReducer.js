import { countPages } from "../config/globals";

const MAKE_SHORT_SOFTWARES = 'MAKE_SHORT_SOFTWARES', CHANGE_PAGE_ON_SOFTWARES_PAGE_PAGINATION = 'CHANGE_PAGE_ON_SOFTWARES_PAGE_PAGINATION', CHANGE_SOFTWARES_PAGE_SEARCH = 'CHANGE_SOFTWARES_PAGE_SEARCH', SHORT_SOFTWARES_IS_LAST_PAGE_SET = 'SHORT_SOFTWARES_IS_LAST_PAGE_SET';

let makeShortSoftwares = (softwares, pagination, search, categories, isLastPage) => {
    let searchSoftwares = {}, shortSoftwares = {};

    if (search !== '') {
        for (let id in softwares) {
            let searchWords = search.split(' ');
            let softwareAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in softwares[id]) {
                    switch (property) {
                        case 'software_category_id':
                            let category = categories[softwares[id].software_category_id]?.name;
                            if (category !== undefined && category !== null && category !== '') {
                                propertiesArr.push(String(category));
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
                    softwareAccord = false;
                    break;
                }
            }

            if (softwareAccord) {
                searchSoftwares[id] = softwares[id];
            }
        }
    }
    else {
        searchSoftwares = softwares;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    
    let pages = Math.floor(Object.keys(searchSoftwares).length / paginationCount);
    if (Object.keys(searchSoftwares).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let id in searchSoftwares) {
        if (i >= left && i <= right) {
            shortSoftwares[id] = searchSoftwares[id];
        }
        i++;
    }

    return {
        shortSoftwares: shortSoftwares,
        currentPage: currentPage,
        pages: pages,
    };
}

let initialState = {
    shortSoftwares: {},
    pagination: {
        count: countPages,
        currentPage: 1,
        pages: 0,
    },
    search: '',
    isLastPage: false,
};

// Создание Action Creators
export let makeShortSoftwaresActionCreator = () => {
    let state = window.store.getState();
    let softwares = state.softwaresState.softwares;
    let pagination = state.softwaresPageState.pagination;
    let search = state.softwaresPageState.search;
    let categories = state.softwareCategoriesState.softwareCategories;
    let isLastPage = state.softwaresPageState.isLastPage;

    return {
        type: MAKE_SHORT_SOFTWARES,
        softwares,
        pagination,
        search,
        categories,
        isLastPage,
    };
}

export let shortSoftwaresIsLastPageSetActionCreator = () => ({
    type: SHORT_SOFTWARES_IS_LAST_PAGE_SET,
});

export let changePageOnSoftwaresPagePaginationActionCreator = (page) => {
    return {
        type: CHANGE_PAGE_ON_SOFTWARES_PAGE_PAGINATION,
        page: page,
    };
}

export let changeSoftwaresPageSearchActionCreator = (search) => {
    return {
        type: CHANGE_SOFTWARES_PAGE_SEARCH,
        search: search,
    };
}

let softwaresPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_SOFTWARES:
            let makeShortSoftwaresResult = makeShortSoftwares(action.softwares, action.pagination, action.search, action.categories, action.isLastPage);

            return {
                ...state,
                shortSoftwares: makeShortSoftwaresResult.shortSoftwares,
                pagination: {
                    ...state.pagination,
                    currentPage: makeShortSoftwaresResult.currentPage,
                    pages: makeShortSoftwaresResult.pages,
                },
                isLastPage: false,
            };
        case CHANGE_PAGE_ON_SOFTWARES_PAGE_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.page,
                },
            };
        case CHANGE_SOFTWARES_PAGE_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        case SHORT_SOFTWARES_IS_LAST_PAGE_SET:
            return {
                ...state,
                isLastPage: true,
            };
        default:
            return state;
    }
}

export default softwaresPageReducer;