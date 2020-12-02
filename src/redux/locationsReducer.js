import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const LOCATIONS_GET = 'LOCATIONS_GET';

let initialState = {
    locations: {},
};

// Запросы к API
export let locationsGet = () => {
    return Axios.get('locations');
}

// Создание Action Creators
export let locationsGetActionCreator = (data) => {
    return {
        type: LOCATIONS_GET,
        data: data,
    };
}

let locationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCATIONS_GET:
            return {
                ...state,
                locations: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default locationsReducer;