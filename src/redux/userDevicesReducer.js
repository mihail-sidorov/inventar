import Axios from "../config/axiosConfig";

const USER_DEVICES_USER_ID_SET = 'USER_DEVICES_USER_ID_SET', USER_DEVICES_CHANGE_SEARCH = 'USER_DEVICES_CHANGE_SEARCH';

let initialState = {
    userId: null,
    search: '',
};

// Запросы к API

export let attachDeviceToUser = (userId, deviceId) => {
    return Axios.patch('devices?action=bind', {user_id: userId, id: deviceId});
}

// Создание Action Creators
export let userDevicesUserIdSetActionCreator = (userId) => {
    return {
        type: USER_DEVICES_USER_ID_SET,
        userId: userId,
    };
}

export let userDevicesChangeSearchActionCreator = (search) => {
    return {
        type: USER_DEVICES_CHANGE_SEARCH,
        search: search,
    };
}

let  userDevicesReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_DEVICES_USER_ID_SET:
            return {
                ...state,
                userId: action.userId,
            };
        case USER_DEVICES_CHANGE_SEARCH:
            return {
                ...state,
                search: action.search,
            };
        default:
            return state;
    }
}

export default userDevicesReducer;