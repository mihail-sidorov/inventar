import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const ACCOUNT_TYPES_SET = 'ACCOUNT_TYPES_SET';

let initialState = {
    accountTypes: {},
};

// Запросы к API
export let accountTypesGet = () => {
    return Axios.get('account_types');
}

// Создание Action Creators
export let accountTypesSetActionCreator = (data) => {
    return {
        type: ACCOUNT_TYPES_SET,
        data: data,
    };
}

let accountTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_TYPES_SET:
            return {
                ...state,
                accountTypes: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default accountTypesReducer;