import { countPages } from "../config/globals";

const MAKE_SHORT_POSTS_DEPARTMENTS_LOCATIONS = 'MAKE_SHORT_POSTS_DEPARTMENTS_LOCATIONS', CHANGE_PAGE_ON_POSTS_DEPARTMENTS_LOCATIONS_PAGE_PAGINATION = 'CHANGE_PAGE_ON_POSTS_DEPARTMENTS_LOCATIONS_PAGE_PAGINATION', CHANGE_POSTS_DEPARTMENTS_LOCATIONS_PAGE_SEARCH = 'CHANGE_POSTS_DEPARTMENTS_LOCATIONS_PAGE_SEARCH';

let makeShortPostsDepartmentsLocations = (postsDepartmentsLocations, posts, departmentsLocations, departments, locations, pagination, search, isLastPage) => {
    let searchPostsDepartmentsLocations = {}, shortPostsDepartmentsLocations = {};

    if (search !== '') {
        for (let id in postsDepartmentsLocations) {
            let searchWords = search.split(' ');
            let postsDepartmentsLocationsAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in postsDepartmentsLocations[id]) {
                    switch (property) {
                        case 'post_id':
                            let post = posts[postsDepartmentsLocations[id][property]]?.post;
                            if (post !== undefined && post !== null && post !== '') {
                                propertiesArr.push(String(post));
                            }
                            break;
                        case 'dep_loc_id':
                            let department = departments[departmentsLocations[postsDepartmentsLocations[id][property]]?.department_id]?.department;
                            let location = locations[departmentsLocations[postsDepartmentsLocations[id][property]]?.location_id]?.location;
                            let departmentLocation = (department ?? '') + (location ?? '');
                            departmentLocation !== '' && propertiesArr.push(String(departmentLocation));
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
                    postsDepartmentsLocationsAccord = false;
                    break;
                }
            }

            if (postsDepartmentsLocationsAccord) {
                searchPostsDepartmentsLocations[id] = postsDepartmentsLocations[id];
            }
        }
    }
    else {
        searchPostsDepartmentsLocations = postsDepartmentsLocations;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    
    let pages = Math.floor(Object.keys(searchPostsDepartmentsLocations).length / paginationCount);
    if (Object.keys(searchPostsDepartmentsLocations).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let id in searchPostsDepartmentsLocations) {
        if (i >= left && i <= right) {
            shortPostsDepartmentsLocations[id] = searchPostsDepartmentsLocations[id];
        }
        i++;
    }

    return {
        shortPostsDepartmentsLocations: shortPostsDepartmentsLocations,
        currentPage: currentPage,
        pages: pages,
    };
}

let initialState = {
    shortPostsDepartmentsLocations: {},
    pagination: {
        count: countPages,
        currentPage: 1,
        pages: 0,
    },
    search: '',
};

// Создание Action Creators
export let makeShortPostsDepartmentsLocationsActionCreator = (isLastPage = false) => {
    let state = window.store.getState();
    let postsDepartmentsLocations = state.postsDepartmentsLocationsState.postsDepartmentsLocations;
    let posts = state.postsState.posts;
    let departmentsLocations = state.departmentsLocationsState.departmentsLocations;
    let departments = state.departmentNamesState.departmentNames;
    let locations = state.locationsState.locations;
    let pagination = state.postsDepartmentsLocationsPageState.pagination;
    let search = state.postsDepartmentsLocationsPageState.search;

    return {
        type: MAKE_SHORT_POSTS_DEPARTMENTS_LOCATIONS,
        postsDepartmentsLocations: postsDepartmentsLocations,
        posts: posts,
        departmentsLocations: departmentsLocations,
        departments: departments,
        locations: locations,
        pagination: pagination,
        search: search,
        isLastPage: isLastPage,
    };
}

export let changePageOnPostsDepartmentsLocationsPagePaginationActionCreator = (page) => {
    return {
        type: CHANGE_PAGE_ON_POSTS_DEPARTMENTS_LOCATIONS_PAGE_PAGINATION,
        page: page,
    };
}

export let changePostsDepartmentsLocationsPageSearchActionCreator = (search) => {
    return {
        type: CHANGE_POSTS_DEPARTMENTS_LOCATIONS_PAGE_SEARCH,
        search: search,
    };
}

let postsDepartmentsLocationsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_POSTS_DEPARTMENTS_LOCATIONS:
            let makeShortPostsDepartmentsLocationsResult = makeShortPostsDepartmentsLocations(action.postsDepartmentsLocations, action.posts, action.departmentsLocations, action.departments, action.locations, action.pagination, action.search, action.isLastPage);

            return {
                ...state,
                shortPostsDepartmentsLocations: makeShortPostsDepartmentsLocationsResult.shortPostsDepartmentsLocations,
                pagination: {
                    ...state.pagination,
                    currentPage: makeShortPostsDepartmentsLocationsResult.currentPage,
                    pages: makeShortPostsDepartmentsLocationsResult.pages,
                },
            };
        case CHANGE_PAGE_ON_POSTS_DEPARTMENTS_LOCATIONS_PAGE_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.page,
                },
            };
        case CHANGE_POSTS_DEPARTMENTS_LOCATIONS_PAGE_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        default:
            return state;
    }
}

export default postsDepartmentsLocationsPageReducer;