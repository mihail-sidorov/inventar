const MAKE_SHORT_LOCATIONS = 'MAKE_SHORT_LOCATIONS', CHANGE_PAGE_ON_LOCATIONS_PAGE_PAGINATION = 'CHANGE_PAGE_ON_LOCATIONS_PAGE_PAGINATION', CHANGE_LOCATIONS_PAGE_SEARCH = 'CHANGE_LOCATIONS_PAGE_SEARCH';

let makeShortLocations = (locations, pagination, search, isLastPage) => {
    let searchLocations = {}, shortLocations = {};

    if (search !== '') {
        for (let id in locations) {
            let searchWords = search.split(' ');
            let locationAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in locations[id]) {
                    switch (property) {
                        case 'location':
                            if (locations[id][property] !== undefined && locations[id][property] !== null && locations[id][property] !== '') {
                                propertiesArr.push(String(locations[id][property]));
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
                    locationAccord = false;
                    break;
                }
            }

            if (locationAccord) {
                searchLocations[id] = locations[id];
            }
        }
    }
    else {
        searchLocations = locations;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    
    let pages = Math.floor(Object.keys(searchLocations).length / paginationCount);
    if (Object.keys(searchLocations).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let id in searchLocations) {
        if (i >= left && i <= right) {
            shortLocations[id] = searchLocations[id];
        }
        i++;
    }

    return {
        shortLocations: shortLocations,
        currentPage: currentPage,
        pages: pages,
    };
}

let initialState = {
    shortLocations: {},
    pagination: {
        count: 1,
        currentPage: 1,
        pages: 0,
    },
    search: '',
};

// Создание Action Creators
export let makeShortLocationsActionCreator = (isLastPage = false) => {
    let state = window.store.getState();
    let locations = state.locationsState.locations;
    let pagination = state.locationsPageState.pagination;
    let search = state.locationsPageState.search;

    return {
        type: MAKE_SHORT_LOCATIONS,
        locations: locations,
        pagination: pagination,
        search: search,
        isLastPage: isLastPage,
    };
}

export let changePageOnLocationsPagePaginationActionCreator = (page) => {
    return {
        type: CHANGE_PAGE_ON_LOCATIONS_PAGE_PAGINATION,
        page: page,
    };
}

export let changeLocationsPageSearchActionCreator = (search) => {
    return {
        type: CHANGE_LOCATIONS_PAGE_SEARCH,
        search: search,
    };
}

let locationsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_LOCATIONS:
            let makeShortLocationsResult = makeShortLocations(action.locations, action.pagination, action.search, action.isLastPage);

            return {
                ...state,
                shortLocations: makeShortLocationsResult.shortLocations,
                pagination: {
                    ...state.pagination,
                    currentPage: makeShortLocationsResult.currentPage,
                    pages: makeShortLocationsResult.pages,
                },
            };
        case CHANGE_PAGE_ON_LOCATIONS_PAGE_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.page,
                },
            };
        case CHANGE_LOCATIONS_PAGE_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        default:
            return state;
    }
}

export default locationsPageReducer;