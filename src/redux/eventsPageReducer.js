import Axios from "../config/axiosConfig";
import isEmptyObject from "../functions/isEmptyObject";

const MAKE_SHORT_EVENTS = 'MAKE_SHORT_EVENTS', CHANGE_PAGE_ON_VENTS_PAGE_PAGINATION = 'CHANGE_PAGE_ON_VENTS_PAGE_PAGINATION', CHANGE_EVENTS_PAGE_SEARCH = 'CHANGE_EVENTS_PAGE_SEARCH', CHANGE_STATUS_IN_FILTER_ON_EVENTS_PAGE = 'CHANGE_STATUS_IN_FILTER_ON_EVENTS_PAGE', CHANGE_PERSON_IN_FILTER_ON_EVENTS_PAGE = 'CHANGE_PERSON_IN_FILTER_ON_EVENTS_PAGE';

let makeShortEvents = (events, pagination, search, users, isLastPage, filter, userId) => {
    let searchEvents = {}, shortEvents = {};

    let filterEvent = (filter, event) => {
        for (let filterName in filter) {
            if (filterName === 'status') {
                if (filter[filterName] !== event[filterName]) {
                    return false;
                }
            }
            if (filterName === 'person') {
                if (filter[filterName] && event.personal_ids[userId] === undefined) {
                    return false;
                }
            }
        }
        return true;
    }

    for (let id in events) {
        if (filterEvent(filter, events[id])) {
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

    let eventGroups = {};
    for (let id in searchEvents) {
        let group = searchEvents[id].actor_id + searchEvents[id].name + JSON.stringify(searchEvents[id].additional);
        if (eventGroups[group] === undefined) {
            eventGroups[group] = {
                events: {},
            };
        }
        eventGroups[group].name = searchEvents[id].name;
        eventGroups[group].name_rus = searchEvents[id].name_rus;
        eventGroups[group].actor = users[searchEvents[id].actor_id].full_name;
        eventGroups[group].whom = searchEvents[id].name === 'givenDevice' || searchEvents[id].name === 'returnDevice' ? users[searchEvents[id].additional[0].value[0]].full_name : null;
        eventGroups[group].events[[searchEvents[id].history_id, searchEvents[id].event_confirm_preset_id]] = searchEvents[id];
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    let pages = Math.floor(Object.keys(eventGroups).length / paginationCount);
    if (Object.keys(eventGroups).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }
    if (currentPage === 0) currentPage = 1;
    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;
    for (let id in eventGroups) {
        if (i >= left && i <= right) {
            shortEvents[id] = eventGroups[id];
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
        count: 5,
        currentPage: 1,
        pages: 0,
    },
    search: '',
    filter: {
        status: 'pending',
        person: false,
    },
};

// Запросы к API
export let eventAccept = id => Axios.post('eventAction?action=simpleAccept', {id: id});
export let eventReject = id => Axios.post('eventAction?action=reject', {id: id});

// Создание Action Creators
export let makeShortEventsActionCreator = (isLastPage = false) => {
    let state = window.store.getState();
    let events = state.eventsState.events;
    let users = state.usersState.users;
    let pagination = state.eventsPageState.pagination;
    let search = state.eventsPageState.search;
    let filter = state.eventsPageState.filter;
    let userId = state.authState.userId;

    return {
        type: MAKE_SHORT_EVENTS,
        events: events,
        users: users,
        pagination: pagination,
        search: search,
        isLastPage: isLastPage,
        filter: filter,
        userId: userId,
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

export let changeStatusInFilterOnEventsPageActionCreator = (status) => ({
    type: CHANGE_STATUS_IN_FILTER_ON_EVENTS_PAGE,
    status: status,
});

export let changePersonInFilterOnEventsPageActionCreator = () => ({
    type: CHANGE_PERSON_IN_FILTER_ON_EVENTS_PAGE,
});

let eventsPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_EVENTS:
            let makeShortEventsResult = makeShortEvents(action.events, action.pagination, action.search, action.users, action.isLastPage, action.filter, action.userId);
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
        case CHANGE_STATUS_IN_FILTER_ON_EVENTS_PAGE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    status: action.status,
                },
            };
        case CHANGE_PERSON_IN_FILTER_ON_EVENTS_PAGE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    person: state.filter.person ? false : true,
                },
            };
        default:
            return state;
    }
}

export default eventsPageReducer;