import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const DEVICES_GET = 'DEVICES_GET', SAVE_DEVICE = 'SAVE_DEVICE', ATTACH_DEVICE_TO_USER = 'ATTACH_DEVICE_TO_USER';

let initialState = {
    devices: {},
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
        default:
            return state;
    }
}

export default devicesReducer;