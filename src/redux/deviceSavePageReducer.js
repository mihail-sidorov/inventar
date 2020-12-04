import Axios from "../config/axiosConfig";
import isEmptyObject from "../functions/isEmptyObject";

const SET_DEVICE_IN_DEVICE_SAVE_PAGE = 'SET_DEVICE_IN_DEVICE_SAVE_PAGE', RESET_DEVICE = 'RESET_DEVICE', SPECIFICATIONS_SET = 'SPECIFICATIONS_SET', SUB_DEVICES_SET = 'SUB_DEVICES_SET', RESET_SUB_DEVICES = 'RESET_SUB_DEVICES';

let initialState = {
    device: {},
    category: {},
    subDevices: {},
};

// Запросы к API
export let saveDevice = (data) => {
    return Axios.post('devices', data);
}

export let editDevice = (data) => {
    return Axios.patch('devices', data);
}

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

export let resetSubDevicesActionCreator = (emptyObject) => {
    return {
        type: RESET_SUB_DEVICES,
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

export let subDevicesSetActionCreator = (categoryId) => {
    let state = window.store.getState(), subDevices = {};
    let devices = state.devicesState.devices;
    let device = state.deviceSavePageState.device;

    if (!isEmptyObject(devices) && state.categoriesState.categories[categoryId] !== undefined) {
        if (state.categoriesState.categories[categoryId].sub_devices !== null) {
            for (let catProp in state.categoriesState.categories[categoryId].sub_devices.sub_cat_id) {
                for (let devicesProp in devices) {
                    if ((devices[devicesProp].category_id == catProp) && (devices[devicesProp].parent_id === null || devices[devicesProp].parent_id === device.id)) {
                        subDevices[devicesProp] = devices[devicesProp];
                    }
                }
            }
        }
    }

    return {
        type: SUB_DEVICES_SET,
        subDevices: subDevices,
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
        case RESET_SUB_DEVICES:
            return {
                ...state,
                subDevices: action.emptyObject,
            };
        case SPECIFICATIONS_SET:
            return {
                ...state,
                category: action.category,
            };
        case SUB_DEVICES_SET:
            return {
                ...state,
                subDevices: action.subDevices,
            };
        default:
            return state;
    }
}

export default deviceSavePageReducer;