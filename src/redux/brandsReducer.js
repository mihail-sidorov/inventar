import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const BRANDS_GET = 'BRANDS_GET';

let initialState = {
    brands: {},
};

// Запросы к API
export let brandsGet = () => {
    return Axios.get('brands');
}

// Создание Action Creators
export let brandsGetActionCreator = (data) => {
    return {
        type: BRANDS_GET,
        data: data,
    };
}

let brandsReducer = (state = initialState, action) => {
    switch (action.type) {
        case BRANDS_GET:
            return {
                ...state,
                brands: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default brandsReducer;