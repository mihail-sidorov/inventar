const USER_DEVICES_USER_ID_SET = 'USER_DEVICES_USER_ID_SET';

let initialState = {
    userId: null,
};

// Создание Action Creators
export let userDevicesUserIdSetActionCreator = (userId) => {
    return {
        type: USER_DEVICES_USER_ID_SET,
        userId: userId,
    };
}

let  userDevicesReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_DEVICES_USER_ID_SET:
            return {
                ...state,
                userId: action.userId,
            };
        default:
            return state;
    }
}

export default userDevicesReducer;