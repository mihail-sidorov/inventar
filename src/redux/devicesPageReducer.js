import isEmptyObject from "../functions/isEmptyObject";

const CHANGE_DEVICES_SEARCH = 'CHANGE_DEVICES_SEARCH', MAKE_SHORT_DEVICES = 'MAKE_SHORT_DEVICES', CHANGE_DEVICES_PAGE = 'CHANGE_DEVICES_PAGE';

let makeShortDevices = (devices, pagination, search, users, brands, isLastPage = false) => {
    let searchDevices = {}, shortDevices = {};

    if (search !== '') {
        for (let id in devices) {
            let searchWords = search.split(' ');
            let deviceAccord = true;

            for (let i = 0; i < searchWords.length; i++) {
                let wordAccord = false;
                let pattern = new RegExp(searchWords[i].toLowerCase());
                let propertiesArr = [];

                for (let property in devices[id]) {
                    switch (property) {
                        case 'user_id':
                            if (!isEmptyObject(users)) {
                                let fio = users[devices[id][property]].full_name;
                                if (fio !== undefined && fio !== null && fio !== '') {
                                    propertiesArr.push(String(fio));
                                }
                            }
                            break;
                        case 'brand_id':
                            if (!isEmptyObject(brands)) {
                                let brand = brands[devices[id][property]].brand;
                                if (brand !== undefined && brand !== null && brand !== '') {
                                    propertiesArr.push(String(brand));
                                }
                            }
                            break;
                        case 'specifications':
                            for (let specificationsProperty in devices[id][property]) {
                                if (devices[id][property][specificationsProperty] !== undefined && devices[id][property][specificationsProperty] !== null && devices[id][property][specificationsProperty] !== '') {
                                    propertiesArr.push(String(devices[id][property][specificationsProperty]));
                                }
                            }
                            break;
                        default:
                            if (devices[id][property] !== undefined && devices[id][property] !== null && devices[id][property] !== '') {
                                propertiesArr.push(String(devices[id][property]));
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
                    deviceAccord = false;
                    break;
                }
            }

            if (deviceAccord) {
                searchDevices[id] = devices[id];
            }
        }
    }
    else {
        searchDevices = devices;
    }

    let paginationCount = pagination.count;
    let currentPage = pagination.currentPage;
    
    let pages = Math.floor(Object.keys(searchDevices).length / paginationCount);
    if (Object.keys(searchDevices).length % paginationCount > 0) {
        pages++;
    }
    if (currentPage > pages || isLastPage) {
        currentPage = pages;
    }

    if (currentPage === 0) currentPage = 1;

    let left = (currentPage - 1) * paginationCount + 1;
    let right = left + paginationCount - 1;
    let i = 1;

    for (let id in searchDevices) {
        if (i >= left && i <= right) {
            shortDevices[id] = searchDevices[id];
        }
        i++;
    }

    return {
        shortDevices: shortDevices,
        currentPage: currentPage,
        pages: pages,
    };
}

let initialState = {
    search: '',
    pagination: {
        count: 5,
        currentPage: 1,
        pages: 0,
    },
    shortDevices: {},
};

// Запросы к API

// Создание Action Creators
export let changeDevicesSerachActionCreator = (search) => {
    return {
        type: CHANGE_DEVICES_SEARCH,
        search: search,
    };
}

export let makeShortDevicesActionCreator = () => {
    let devicesState = window.store.getState().devicesState;
    let devicesPageState = window.store.getState().devicesPageState;
    let usersState = window.store.getState().usersState;
    let brandsState = window.store.getState().brandsState;

    return {
        type: MAKE_SHORT_DEVICES,
        devices: devicesState.devices,
        pagination: devicesPageState.pagination,
        search: devicesPageState.search,
        users: usersState.users,
        brands: brandsState.brands,
    };
}

export let changeDevicesPageActionCreator = (page) => {
    return {
        type: CHANGE_DEVICES_PAGE,
        page: page,
    };
}

let devicesPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DEVICES_SEARCH:
            return {
                ...state,
                search: action.search,
                pagination: {
                    ...state.pagination,
                    currentPage: 1,
                },
            };
        case MAKE_SHORT_DEVICES:
            let makeShortDevicesResult = makeShortDevices(action.devices, action.pagination, action.search, action.users, action.brands);

            return {
                ...state,
                shortDevices: makeShortDevicesResult.shortDevices,
                pagination: {
                    ...state.pagination,
                    currentPage: makeShortDevicesResult.currentPage,
                    pages: makeShortDevicesResult.pages,
                },
            };
        case CHANGE_DEVICES_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.page,
                },
            };
        default:
            return state;
    }
}

export default devicesPageReducer;