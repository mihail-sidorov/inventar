import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const SOFTWARE_CATEGORIES_GET = 'SOFTWARE_CATEGORIES_GET';

let initialState = {
    softwareCategories: {},
};

// Запросы к API
export let softwareCategoriesGet = () => {
    return Axios.get('softwareCategory');
}

// Создание Action Creators
export let softwareCategoriesGetActionCreator = (data) => {
    return {
        type: SOFTWARE_CATEGORIES_GET,
        data: data,
    };
}

let softwareCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SOFTWARE_CATEGORIES_GET:
            return {
                ...state,
                softwareCategories: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default softwareCategoriesReducer;