const USER_DEVICES_SET = 'USER_DEVICES_SET';

let initialState = {
    userDevices: {},
};

// Создание Action Creators
export let userDevicesSetActionCreator = (userId) => {
    let state = window.store.getState();
    let devices = state.devicesState.devices;
    let userDevices = {};

    for (let id in devices) {
        if (devices[id].user_id == userId) {
            if (!userDevices[devices[id].parent_id]) {
                userDevices[devices[id].parent_id] = {};
            }
            userDevices[devices[id].parent_id][id] = devices[id];
        }
    }

    return {
        type: USER_DEVICES_SET,
        userDevices: userDevices,
    };
};

let devicesPageUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_DEVICES_SET:
            return {
                ...state,
                userDevices: action.userDevices,
            };
        default:
            return state;
    }
};

export default devicesPageUserReducer;