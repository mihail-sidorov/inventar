import { countPages } from "../config/globals";

const MAKE_SHORT_DEPARTMENTS_LOCATIONS = 'MAKE_SHORT_DEPARTMENTS_LOCATIONS', CHANGE_PAGE_ON_DEPARTMENTS_LOCATIONS_PAGE_PAGINATION = 'CHANGE_PAGE_ON_DEPARTMENTS_LOCATIONS_PAGE_PAGINATION', CHANGE_DEPARTMENTS_LOCATIONS_PAGE_SEARCH = 'CHANGE_DEPARTMENTS_LOCATIONS_PAGE_SEARCH';

let makeShortDepartmentsLocations = (departmentsLocations, departments, locations, pagination, search, isLastPage) => {
    let searchDepartmentsLocations = {}, shortDepartmentsLocations = {};

    if (search !== '') {
        for (let id in departmentsLocations) {
            let searchWords = search.split(' ');
            let departmentsLocationAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in departmentsLocations[id]) {
                    switch (property) {
                        case 'department_id':
                            let department = departments[departmentsLocations[id][property]]?.department;
                            if (department !== undefined) {
                                propertiesArr.push(String(department));
                            }
                            break;
                        case 'location_id':
                            let location = locations[departmentsLocations[id][property]]?.location;
                            if (location !== undefined) {
                                propertiesArr.push(String(location));
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
                    departmentsLocationAccord = false;
                    break;
                }
            }

            if (departmentsLocationAccord) {
                searchDepartmentsLocations[id] = departmentsLocations[id];
            }
        }
    }
    else {
        searchDepartmentsLocations = departmentsLocations;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    
    let pages = Math.floor(Object.keys(searchDepartmentsLocations).length / paginationCount);
    if (Object.keys(searchDepartmentsLocations).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let id in searchDepartmentsLocations) {
        if (i >= left && i <= right) {
            shortDepartmentsLocations[id] = searchDepartmentsLocations[id];
        }
        i++;
    }

    return {
        shortDepartmentsLocations: shortDepartmentsLocations,
        currentPage: currentPage,
        pages: pages,
    };
}

let initialState = {
    shortDepartmentsLocations: {},
    pagination: {
        count: countPages,
        currentPage: 1,
        pages: 0,
    },
    search: '',
};

// Создание Action Creators
export let makeShortDepartmentsLocationsActionCreator = (isLastPage = false) => {
    let state = window.store.getState();
    let departmentsLocations = state.departmentsLocationsState.departmentsLocations;
    let departments = state.departmentNamesState.departmentNames;
    let locations = state.locationsState.locations;
    let pagination = state.departmentsLocationsPageState.pagination;
    let search = state.departmentsLocationsPageState.search;

    return {
        type: MAKE_SHORT_DEPARTMENTS_LOCATIONS,
        departmentsLocations: departmentsLocations,
        departments: departments,
        locations: locations,
        pagination: pagination,
        search: search,
        isLastPage: isLastPage,
    };
}

export let changePageOnDepartmentsLocationsPagePaginationActionCreator = (page) => {
    return {
        type: CHANGE_PAGE_ON_DEPARTMENTS_LOCATIONS_PAGE_PAGINATION,
        page: page,
    };
}

export let changeDepartmentsLocationsPageSearchActionCreator = (search) => {
    return {
        type: CHANGE_DEPARTMENTS_LOCATIONS_PAGE_SEARCH,
        search: search,
    };
}

let departmentsLocationsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_DEPARTMENTS_LOCATIONS:
            let makeShortDepartmentsLocationsResult = makeShortDepartmentsLocations(action.departmentsLocations, action.departments, action.locations, action.pagination, action.search, action.isLastPage);

            return {
                ...state,
                shortDepartmentsLocations: makeShortDepartmentsLocationsResult.shortDepartmentsLocations,
                pagination: {
                    ...state.pagination,
                    currentPage: makeShortDepartmentsLocationsResult.currentPage,
                    pages: makeShortDepartmentsLocationsResult.pages,
                },
            };
        case CHANGE_PAGE_ON_DEPARTMENTS_LOCATIONS_PAGE_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.page,
                },
            };
        case CHANGE_DEPARTMENTS_LOCATIONS_PAGE_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        default:
            return state;
    }
}

export default departmentsLocationsPageReducer;