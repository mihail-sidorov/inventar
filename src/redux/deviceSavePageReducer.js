import Axios from "../config/axiosConfig";
import isEmptyObject from "../functions/isEmptyObject";

const SET_DEVICE_IN_DEVICE_SAVE_PAGE = 'SET_DEVICE_IN_DEVICE_SAVE_PAGE', RESET_DEVICE = 'RESET_DEVICE', SPECIFICATIONS_SET = 'SPECIFICATIONS_SET', SEARCH_USERS_INPUT_CHANGE = 'SEARCH_USERS_INPUT_CHANGE';

let initialState = {
    device: {},
    category: {},
    searchUsersInput: '',
};

// Запросы к API
export let saveDevice = (data) => {
    return Axios.post('devices', data);
}

export let editDevice = (data) => {
    return Axios.patch('devices', data);
}

export let subDevices = (id, ids) => Axios.post('subDevices', {id, ids});

// Создание Action Creators
export let setDeviceInDeviceSavePageActionCreator = (deviceId) => {
    let state = window.store.getState(), device = {};

    if (state.devicesState.devices[deviceId] !== undefined) {
        device = state.devicesState.devices[deviceId];

        for (let field in device.specifications) {
            device[`specifications_${field}`] = device.specifications[field];
        }
    }

    return {
        type: SET_DEVICE_IN_DEVICE_SAVE_PAGE,
        device: device,
    };
}

export let resetDeviceActionCreator = (emptyObject) => {
    return {
        type: RESET_DEVICE,
        emptyObject: emptyObject,
    };
}

export let specificationsSetActionCreator = (categoryId) => {
    let state = window.store.getState(), category = {};

    if (state.categoriesState.categories[categoryId] !== undefined) {
        category = state.categoriesState.categories[categoryId];
    }

    return {
        type: SPECIFICATIONS_SET,
        category: category,
    };
}

export let searchUsersInputChangeActionCreator = (value) => {
    return {
        type: SEARCH_USERS_INPUT_CHANGE,
        value: value,
    };
}

let deviceSavePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICE_IN_DEVICE_SAVE_PAGE:
            return {
                ...state,
                device: action.device,
            };
        case RESET_DEVICE:
            return {
                ...state,
                device: action.emptyObject,
                category: {},
            };
        case SPECIFICATIONS_SET:
            return {
                ...state,
                category: action.category,
            };
        case SEARCH_USERS_INPUT_CHANGE:
            return {
                ...state,
                searchUsersInput: action.value,
            };
        default:
            return state;
    }
}

export default deviceSavePageReducer;