import Axios from "../config/axiosConfig";

const SET_AUTH_DATA = 'SET_AUTH_DATA';

let initialState = {
    userId: null,
    isAuth: 0,
    role: null,
};

// Запросы к API
export let loginPost = (login, password) => {
    return Axios.post('login', {login: login, password: password});
}

export let loginGet = () => {
    return Axios.get('login');
}

export let loginDelete = () => {
    return Axios.delete('login');
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
                userId: action.data.userId,
                isAuth: action.data.isAuth,
                role: action.data.role,
            };
        default:
            return state;
    }
}

export default authReducer;