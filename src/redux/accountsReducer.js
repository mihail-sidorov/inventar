import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const ACCOUNTS_SET = 'ACCOUNTS_SET', SERVICE_ADD_ACTION_CREATOR = 'SERVICE_ADD_ACTION_CREATOR';

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

export let serviceAddActionCreator = (service) => {
    return {
        type: SERVICE_ADD_ACTION_CREATOR,
        service: service,
    };
}

let accountsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNTS_SET:
            return {
                ...state,
                accounts: arrayToObject(action.data),
            };
        case SERVICE_ADD_ACTION_CREATOR:
            let newState = {...state};
            newState.accounts[action.service.id] = action.service;
            return newState;
        default:
            return state;
    }
}

export default accountsReducer;