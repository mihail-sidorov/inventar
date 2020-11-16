import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const USERS_GET = 'USERS_GET';

let initialState = {
    users: {},
};

// Запросы к API
export let usersGet = () => {
    return Axios.get('users');
}

// Создание Action Creators
export let usersGetActionCreator = (data) => {
    return {
        type: USERS_GET,
        data: data,
    };
}

let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_GET:
            return {
                ...state,
                users: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default usersReducer;