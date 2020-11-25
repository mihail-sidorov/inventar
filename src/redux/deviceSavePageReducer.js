const SET_DEVICE_IN_DEVICE_SAVE_PAGE = 'SET_DEVICE_IN_DEVICE_SAVE_PAGE';

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

let deviceSavePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DEVICE_IN_DEVICE_SAVE_PAGE:
            return {
                ...state,
                device: action.device,
            };
        default:
            return state;
    }
}

export default deviceSavePageReducer;