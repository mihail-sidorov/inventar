import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const DEVICES_GET = 'DEVICES_GET';

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

let devicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEVICES_GET:
            return {
                ...state,
                devices: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default devicesReducer;