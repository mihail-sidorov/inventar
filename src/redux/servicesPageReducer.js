import { countPages } from "../config/globals";
import isEmptyObject from "../functions/isEmptyObject";

const MAKE_SHORT_SERVICES = 'MAKE_SHORT_SERVICES', CHANGE_PAGE_ON_SERVICES_PAGE_PAGINATION = 'CHANGE_PAGE_ON_SERVICES_PAGE_PAGINATION', CHANGE_SERVICES_PAGE_SEARCH = 'CHANGE_SERVICES_PAGE_SEARCH', SET_ATTACHED_FOR_SERVICES = 'SET_ATTACHED_FOR_SERVICES';

let makeShortServices = (services, pagination, search, accountTypes, isLastPage, attached, departments, users) => {
    let searchServices = {}, shortServices = {};

    if (search !== '') {
        for (let id in services) {
            let searchWords = search.split(' ');
            let serviceAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in services[id]) {
                    switch (property) {
                        case 'account_type_id':
                            if (!isEmptyObject(accountTypes) && accountTypes[services[id].account_type_id] !== undefined) {
                                let serviceName = accountTypes[services[id].account_type_id].account_type;
                                if (serviceName !== undefined && serviceName !== null && serviceName !== '') {
                                    propertiesArr.push(String(serviceName));
                                }
                            }
                            break;
                        case 'id':
                            let departmentsStr = '';
                            let usersStr = '';
                            let departmentsArr = attached[services[id][property]]?.departments;
                            let usersArr = attached[services[id][property]]?.users;
                            if (departmentsArr !== undefined) {
                                departmentsArr.forEach((id) => {
                                    departmentsStr += (departments[id]?.department ?? '') + (departments[id]?.location ?? '');
                                });
                            }
                            if (usersArr !== undefined) {
                                usersArr.forEach((id) => {
                                    usersStr += (users[id]?.full_name ?? '');
                                });
                            }
                            propertiesArr.push(departmentsStr + usersStr);
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
                    serviceAccord = false;
                    break;
                }
            }

            if (serviceAccord) {
                searchServices[id] = services[id];
            }
        }
    }
    else {
        searchServices = services;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    
    let pages = Math.floor(Object.keys(searchServices).length / paginationCount);
    if (Object.keys(searchServices).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let id in searchServices) {
        if (i >= left && i <= right) {
            shortServices[id] = searchServices[id];
        }
        i++;
    }

    return {
        shortServices: shortServices,
        currentPage: currentPage,
        pages: pages,
    };
}

let initialState = {
    shortServices: {},
    pagination: {
        count: countPages,
        currentPage: 1,
        pages: 0,
    },
    search: '',
    attached: {},
};

// Создание Action Creators
export let makeShortServicesActionCreator = (isLastPage = false) => {
    let state = window.store.getState();
    let services = state.accountsState.accounts;
    let accountTypes = state.accountTypesState.accountTypes;
    let pagination = state.servicesPageState.pagination;
    let search = state.servicesPageState.search;
    let attached = state.servicesPageState.attached;
    let departments = state.departmentsState.departments;
    let users = state.usersState.users;

    return {
        type: MAKE_SHORT_SERVICES,
        services: services,
        pagination: pagination,
        search: search,
        accountTypes: accountTypes,
        isLastPage: isLastPage,
        attached: attached,
        departments: departments,
        users: users,
    };
}

export let changePageOnServicesPagePaginationActionCreator = (page) => {
    return {
        type: CHANGE_PAGE_ON_SERVICES_PAGE_PAGINATION,
        page: page,
    };
}

export let changeServicesPageSearchActionCreator = (search) => {
    return {
        type: CHANGE_SERVICES_PAGE_SEARCH,
        search: search,
    };
}

export let setAttachedForServicesActionCreator = (attachedArr) => {
    return {
        type: SET_ATTACHED_FOR_SERVICES,
        attachedArr: attachedArr,
    };
};

let servicesPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAKE_SHORT_SERVICES:
            let makeShortServicesResult = makeShortServices(action.services, action.pagination, action.search, action.accountTypes, action.isLastPage, action.attached, action.departments, action.users);

            return {
                ...state,
                shortServices: makeShortServicesResult.shortServices,
                pagination: {
                    ...state.pagination,
                    currentPage: makeShortServicesResult.currentPage,
                    pages: makeShortServicesResult.pages,
                },
            };
        case CHANGE_PAGE_ON_SERVICES_PAGE_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.page,
                },
            };
        case CHANGE_SERVICES_PAGE_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        case SET_ATTACHED_FOR_SERVICES:
            let attached = {};
            action.attachedArr.forEach((element) => {
                if (element.length) {
                    let obj = {
                        departments: [],
                        users: [],
                    };
                    element.forEach((el) => {
                        if (el.dep_loc_id !== null) {
                            obj.departments.push(el.dep_loc_id);
                        }
                        if (el.user_id !== null) {
                            obj.users.push(el.user_id);
                        }
                    });
                    attached[element[0].account_id] = obj;
                }
            });
            return {
                ...state,
                attached: attached,
            };
        default:
            return state;
    }
}

export default servicesPageReducer;