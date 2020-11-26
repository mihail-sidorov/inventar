import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const CATEGORIES_GET = 'CATEGORIES_GET';

let initialState = {
    categories: {},
};

// Запросы к API
export let categoriesGet = () => {
    return Axios.get('categories');
}

// Создание Action Creators
export let categoriesGetActionCreator = (data) => {
    return {
        type: CATEGORIES_GET,
        data: data,
    };
}

let categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_GET:
            return {
                ...state,
                categories: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default categoriesReducer;