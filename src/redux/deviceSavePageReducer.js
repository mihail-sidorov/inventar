const SET_DEVICE_IN_DEVICE_SAVE_PAGE = 'SET_DEVICE_IN_DEVICE_SAVE_PAGE', RESET_DEVICES = 'RESET_DEVICES';

let initialState = {
    device: {},
};

// Создание Action Creators
export let setDeviceInDeviceSavePageActionCreator = (deviceId) => {
    let state = window.store.getState();

    return {
        type: SET_DEVICE_IN_DEVICE_SAVE_PAGE,
        device: state.devicesState.devices[deviceId],
    };
}

export let resetDeviceActionCreator = () => {
    return {
        type: RESET_DEVICES,
    };
}

let deviceSavePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICE_IN_DEVICE_SAVE_PAGE:
            return {
                ...state,
                device: action.device,
            };
        case RESET_DEVICES:
            return {
                ...state,
                device: {},
            };
        default:
            return state;
    }
}

export default deviceSavePageReducer;