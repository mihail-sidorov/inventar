const CHANGE_DEVICES_SEARCH = 'CHANGE_DEVICES_SEARCH';

let initialState = {
    search: '',
    pagination: {
        count: 5,
        currentPage: 1,
        pages: 0,
        isLastPage: false,
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

let devicesPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_DEVICES_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        default:
            return state;
    }
}

export default devicesPageReducer;