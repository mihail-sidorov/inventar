import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const DEVICES_GET = 'DEVICES_GET', SAVE_DEVICE = 'SAVE_DEVICE', SUB_DEVICES_ATTACH = 'SUB_DEVICES_ATTACH', ATTACH_DEVICE_TO_USER = 'ATTACH_DEVICE_TO_USER';

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

export let subDevicesAttachActionCreator = (deviceId, subDevicesArr) => {
    return {
        type: SUB_DEVICES_ATTACH,
        deviceId: deviceId,
        subDevicesArr: subDevicesArr,
    };
}

export let attachDeviceToUserActionCreator = (device) => {
    return {
        type: ATTACH_DEVICE_TO_USER,
        device: device,
    };
}

let devicesReducer = (state = initialState, action) => {
    let devices;

    switch (action.type) {
        case DEVICES_GET:
            return {
                ...state,
                devices: arrayToObject(action.data),
            };
        case SAVE_DEVICE:
            devices = {...state.devices};

            devices[action.device.id] = action.device;

            return {
                ...state,
                devices: devices,
            };
        case SUB_DEVICES_ATTACH:
            devices = {...state.devices};

            for (let prop in devices) {
                if (devices[prop].parent_id == action.deviceId) {
                    devices[prop].parent_id = null;
                }
            }

            action.subDevicesArr.forEach((value) => {
                devices[value.id] = value;
            });

            return {
                ...state,
                devices: devices,
            };
        case ATTACH_DEVICE_TO_USER:
            let newState = {...state};
            newState.devices[action.device.id] = action.device;
            return newState;
        default:
            return state;
    }
}

export default devicesReducer;