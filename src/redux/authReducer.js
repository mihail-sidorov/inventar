import Axios from "../config/axiosConfig";

const SET_AUTH_DATA = 'SET_AUTH_DATA';

let initialState = {
    login: null,
    isAuth: 0,
    permission: null,
};

// Запросы к API
export let loginPost = (login, password) => {
    return Axios.post('login', {login: login, password: password});
}

export let loginGet = () => {
    return Axios.get('login');
}

// Создание Action Creators
export let setAuthDataActionCreator = (data) => {
    return {
        type: SET_AUTH_DATA,
        data: data,
    };
}

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...state,
                login: action.data.login,
                isAuth: action.data.isAuth,
                permission: action.data.permission,
            };
        default:
            return state;
    }
}

export default authReducer;