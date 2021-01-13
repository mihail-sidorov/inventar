import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const ACCOUNTS_SET = 'ACCOUNTS_SET';

let initialState = {
    accounts: {},
};

// Запросы к API
export let serviceAdd = (service) => {
    return Axios.post('accounts', service);
}

export let serviceEdit = (service) => {
    return Axios.patch('accounts', service);
}

export let accountsGet = () => {
    return Axios.get('accounts');
}

// Создание Action Creators
export let accountsSetActionCreator = (data) => {
    return {
        type: ACCOUNTS_SET,
        data: data,
    };
}

let accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNTS_SET:
            return {
                ...state,
                accounts: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default accountsReducer;