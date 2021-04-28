import { countPages } from "../config/globals";

const MAKE_SHORT_DEPARTMENT_NAMES = 'MAKE_SHORT_DEPARTMENT_NAMES', CHANGE_PAGE_ON_DEPARTMENT_NAMES_PAGE_PAGINATION = 'CHANGE_PAGE_ON_DEPARTMENT_NAMES_PAGE_PAGINATION', CHANGE_DEPARTMENT_NAMES_PAGE_SEARCH = 'CHANGE_DEPARTMENT_NAMES_PAGE_SEARCH';

let makeShortDepartmentNames = (departmentNames, pagination, search, isLastPage) => {
    let searchDepartmentNames = {}, shortDepartmentNames = {};

    if (search !== '') {
        for (let id in departmentNames) {
            let searchWords = search.split(' ');
            let departmentNameAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in departmentNames[id]) {
                    switch (property) {
                        case 'department':
                            if (departmentNames[id][property] !== undefined && departmentNames[id][property] !== null && departmentNames[id][property] !== '') {
                                propertiesArr.push(String(departmentNames[id][property]));
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
                    departmentNameAccord = false;
                    break;
                }
            }

            if (departmentNameAccord) {
                searchDepartmentNames[id] = departmentNames[id];
            }
        }
    }
    else {
        searchDepartmentNames = departmentNames;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    
    let pages = Math.floor(Object.keys(searchDepartmentNames).length / paginationCount);
    if (Object.keys(searchDepartmentNames).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let id in searchDepartmentNames) {
        if (i >= left && i <= right) {
            shortDepartmentNames[id] = searchDepartmentNames[id];
        }
        i++;
    }

    return {
        shortDepartmentNames: shortDepartmentNames,
        currentPage: currentPage,
        pages: pages,
    };
}

let initialState = {
    shortDepartmentNames: {},
    pagination: {
        count: countPages,
        currentPage: 1,
        pages: 0,
    },
    search: '',
};

// Создание Action Creators
export let makeShortDepartmentNamesActionCreator = (isLastPage = false) => {
    let state = window.store.getState();
    let departmentNames = state.departmentNamesState.departmentNames;
    let pagination = state.departmentNamesPageState.pagination;
    let search = state.departmentNamesPageState.search;

    return {
        type: MAKE_SHORT_DEPARTMENT_NAMES,
        departmentNames: departmentNames,
        pagination: pagination,
        search: search,
        isLastPage: isLastPage,
    };
}

export let changePageOnDepartmentNamesPagePaginationActionCreator = (page) => {
    return {
        type: CHANGE_PAGE_ON_DEPARTMENT_NAMES_PAGE_PAGINATION,
        page: page,
    };
}

export let changeDepartmentNamesPageSearchActionCreator = (search) => {
    return {
        type: CHANGE_DEPARTMENT_NAMES_PAGE_SEARCH,
        search: search,
    };
}

let departmentNamesPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_DEPARTMENT_NAMES:
            let makeShortDepartmentNamesResult = makeShortDepartmentNames(action.departmentNames, action.pagination, action.search, action.isLastPage);

            return {
                ...state,
                shortDepartmentNames: makeShortDepartmentNamesResult.shortDepartmentNames,
                pagination: {
                    ...state.pagination,
                    currentPage: makeShortDepartmentNamesResult.currentPage,
                    pages: makeShortDepartmentNamesResult.pages,
                },
            };
        case CHANGE_PAGE_ON_DEPARTMENT_NAMES_PAGE_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.page,
                },
            };
        case CHANGE_DEPARTMENT_NAMES_PAGE_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        default:
            return state;
    }
}

export default departmentNamesPageReducer;