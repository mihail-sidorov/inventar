import { countPages } from "../config/globals";
import isEmptyObject from "../functions/isEmptyObject";

const MAKE_SHORT_USERS = 'MAKE_SHORT_USERS', CHANGE_USERS_SEARCH = 'CHANGE_USERS_SEARCH', CHANGE_USERS_PAGE = 'CHANGE_USERS_PAGE', WAS_ADD_USER = 'WAS_ADD_USER';

let makeShortUsers = (users, pagination, search, postDepLocs, isLastPage) => {
    let searchUsers = {}, shortUsers = {};

    if (search !== '') {
        for (let id in users) {
            let searchWords = search.split(' ');
            let userAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in users[id]) {
                    switch (property) {
                        case 'post_dep_loc_id':
                            if (!isEmptyObject(postDepLocs)) {
                                let post = postDepLocs[users[id][property]].post;
                                if (post !== undefined && post !== null && post !== '') {
                                    propertiesArr.push(String(post));
                                }
                            }
                            break;
                        default:
                            if (property === 'full_name') {
                                if (users[id][property] !== undefined && users[id][property] !== null && users[id][property] !== '') {
                                    propertiesArr.push(String(users[id][property]));
                                }
                            }
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
                    userAccord = false;
                    break;
                }
            }

            if (userAccord) {
                searchUsers[id] = users[id];
            }
        }
    }
    else {
        searchUsers = users;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    
    let pages = Math.floor(Object.keys(searchUsers).length / paginationCount);
    if (Object.keys(searchUsers).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let id in searchUsers) {
        if (i >= left && i <= right) {
            shortUsers[id] = searchUsers[id];
        }
        i++;
    }

    return {
        shortUsers: shortUsers,
        currentPage: currentPage,
        pages: pages,
    };
}

let initialState = {
    search: '',
    pagination: {
        count: countPages,
        currentPage: 1,
        pages: 0,
    },
    shortUsers: {},
    wasAdd: false,
};

// Запросы к API

// Создание Action Creators

export let makeShortUsersActionCreator = () => {
    let state = window.store.getState();
    let users = state.usersState.users;
    let postDepLocs = state.postDepLocsState.postDepLocs;

    return {
        type: MAKE_SHORT_USERS,
        users: users,
        postDepLocs: postDepLocs,
    };
}

export let changeUsersSearchActionCreator = (search) => {
    return {
        type: CHANGE_USERS_SEARCH,
        search: search,
    };
}

export let changeUsersPageActionCreator = (page) => {
    return {
        type: CHANGE_USERS_PAGE,
        page: page,
    };
}

export let wasAddUserActionCreator = () => ({
    type: WAS_ADD_USER,
});

let usersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_USERS:
            let makeShortUsersResult = makeShortUsers(action.users, state.pagination, state.search, action.postDepLocs, state.wasAdd);

            return {
                ...state,
                shortUsers: makeShortUsersResult.shortUsers,
                pagination: {
                    ...state.pagination,
                    currentPage: makeShortUsersResult.currentPage,
                    pages: makeShortUsersResult.pages,
                },
                wasAdd: false,
            };
        case CHANGE_USERS_SEARCH:
            return {
                ...state,
                search: action.search,
                pagination: {
                    ...state.pagination,
                    currentPage: 1,
                },
            };
        case CHANGE_USERS_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.page,
                },
            };
        case WAS_ADD_USER:
            return {
                ...state,
                wasAdd: true,
            };
        default:
            return state;
    }
}

export default usersPageReducer;