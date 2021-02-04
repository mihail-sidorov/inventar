import isEmptyObject from "../functions/isEmptyObject";

const MAKE_SHORT_EVENTS = 'MAKE_SHORT_EVENTS', CHANGE_PAGE_ON_VENTS_PAGE_PAGINATION = 'CHANGE_PAGE_ON_VENTS_PAGE_PAGINATION', CHANGE_EVENTS_PAGE_SEARCH = 'CHANGE_EVENTS_PAGE_SEARCH';

let makeShortEvents = (events, pagination, search, users, isLastPage) => {
    let searchEvents = {}, shortEvents = {};

    if (search !== '') {
        for (let id in events) {
            let searchWords = search.split(' ');
            let eventAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in events[id]) {
                    switch (property) {
                        case 'actor_id':
                            if (!isEmptyObject(users) && users[events[id].actor_id] !== undefined) {
                                let actorName = users[events[id].actor_id].full_name;
                                if (actorName !== undefined && actorName !== null && actorName !== '') {
                                    propertiesArr.push(String(actorName));
                                }
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
                    eventAccord = false;
                    break;
                }
            }

            if (eventAccord) {
                searchEvents[id] = events[id];
            }
        }
    }
    else {
        searchEvents = events;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    
    let pages = Math.floor(Object.keys(searchEvents).length / paginationCount);
    if (Object.keys(searchEvents).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let id in searchEvents) {
        if (i >= left && i <= right) {
            shortEvents[id] = searchEvents[id];
        }
        i++;
    }

    return {
        shortEvents: shortEvents,
        currentPage: currentPage,
        pages: pages,
    };
}

let initialState = {
    shortEvents: {},
    pagination: {
        count: 1,
        currentPage: 1,
        pages: 0,
    },
    search: '',
};

// Создание Action Creators
export let makeShortEventsActionCreator = (isLastPage = false) => {
    let state = window.store.getState();
    let events = state.eventsState.events;
    let users = state.usersState.users;
    let pagination = state.eventsPageState.pagination;
    let search = state.eventsPageState.search;

    return {
        type: MAKE_SHORT_EVENTS,
        events: events,
        users: users,
        pagination: pagination,
        search: search,
        isLastPage: isLastPage,
    };
}

export let changePageOnEventsPagePaginationActionCreator = (page) => {
    return {
        type: CHANGE_PAGE_ON_VENTS_PAGE_PAGINATION,
        page: page,
    };
}

export let changeEventsPageSearchActionCreator = (search) => {
    return {
        type: CHANGE_EVENTS_PAGE_SEARCH,
        search: search,
    };
}

let eventsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_EVENTS:
            let makeShortEventsResult = makeShortEvents(action.events, action.pagination, action.search, action.users, action.isLastPage);
            return {
                ...state,
                shortEvents: makeShortEventsResult.shortEvents,
                pagination: {
                    ...state.pagination,
                    currentPage: makeShortEventsResult.currentPage,
                    pages: makeShortEventsResult.pages,
                },
            };
        case CHANGE_PAGE_ON_VENTS_PAGE_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.page,
                },
            };
        case CHANGE_EVENTS_PAGE_SEARCH:
            return {
                ...state,
                search: action.search,
                pagination: {
                    ...state.pagination,
                    currentPage: 1,
                },
            };
        default:
            return state;
    }
}

export default eventsPageReducer;