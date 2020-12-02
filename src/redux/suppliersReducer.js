import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const SUPPLIERS_GET = 'SUPPLIERS_GET';

let initialState = {
    suppliers: {},
};

// Запросы к API
export let suppliersGet = () => {
    return Axios.get('suppliers');
}

// Создание Action Creators
export let suppliersGetActionCreator = (data) => {
    return {
        type: SUPPLIERS_GET,
        data: data,
    };
}

let suppliersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUPPLIERS_GET:
            return {
                ...state,
                suppliers: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default suppliersReducer;