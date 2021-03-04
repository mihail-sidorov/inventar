import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const USERS_GET = 'USERS_GET', USERS_POST = 'USERS_POST', USERS_SERVICES_SET = 'USERS_SERVICES_SET';

let initialState = {
    users: {},
    usersServices: {},
};

// Запросы к API
export let usersGet = () => {
    return Axios.get('users');
}

export let usersPost = (userObj) => {
    return Axios.post('users', userObj);
}

export let usersPatch = (userObj) => {
    return Axios.patch('users', userObj);
}

// Создание Action Creators
export let usersGetActionCreator = (data) => {
    return {
        type: USERS_GET,
        data: data,
    };
}

export let usersPostActionCreator = (userObj) => {
    return {
        type: USERS_POST,
        userObj: userObj,
    };
}

export let usersServicesSetActionCreator = (usersServices) => ({
    type: USERS_SERVICES_SET,
    usersServices: usersServices,
});

let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_GET:
            return {
                ...state,
                users: arrayToObject(action.data),
            };
        case USERS_POST:
            let users = {...state.users};
            users[action.userObj.id] = action.userObj;
            return {
                ...state,
                users: users,
            };
        case USERS_SERVICES_SET:

            return {
                ...state,
                usersServices: action.usersServices,
            };
        default:
            return state;
    }
}

export default usersReducer;