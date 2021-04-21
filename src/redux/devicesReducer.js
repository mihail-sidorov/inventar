import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const DEVICES_GET = 'DEVICES_GET', SAVE_DEVICE = 'SAVE_DEVICE', ATTACH_DEVICE_TO_USER = 'ATTACH_DEVICE_TO_USER', DEVICE_SOFTWARES_SET = 'DEVICE_SOFTWARES_SET';

let initialState = {
    devices: {},
    deviceSoftwares: {},
};

// Запросы к API
export let devicesGet = () => {
    return Axios.get('devices');
}

// Создание Action Creators
export let devicesGetActionCreator = (data) => {
    return {
        type: DEVICES_GET,
        data: data,
    };
}

export let saveDeviceActionCreator = (device) => {
    return {
        type: SAVE_DEVICE,
        device: device,
    };
}

export let attachDeviceToUserActionCreator = (devices) => {
    return {
        type: ATTACH_DEVICE_TO_USER,
        devices,
    };
}

export let deviceSoftwaresSetActionCreator = data => {
    let state = window.store.getState();
    let softwares = state.softwaresState.softwares;
    let deviceSoftwares = {};

    for (let el of data) {
        if (softwares[el.software_id] !== null) {
            deviceSoftwares[el.software_id] = softwares[el.software_id];
        }
    }

    return {
        type: DEVICE_SOFTWARES_SET,
        deviceSoftwares,
    };
};

let devicesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case DEVICES_GET:
            return {
                ...state,
                devices: arrayToObject(action.data),
            };
        case SAVE_DEVICE:
            return {
                ...state,
                devices: {
                    ...state.devices,
                    [action.device.id]: action.device,
                },
            };
        case ATTACH_DEVICE_TO_USER:
            newState.devices = {...newState.devices};
            for (let device of action.devices) {
                newState.devices[device.id] = device;
            }
            return newState;
        case DEVICE_SOFTWARES_SET:
            return {
                ...state,
                deviceSoftwares: action.deviceSoftwares,
            };
        default:
            return state;
    }
}

export default devicesReducer;