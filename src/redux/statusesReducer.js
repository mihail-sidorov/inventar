import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const STATUSES_GET = 'STATUSES_GET';

let initialState = {
    statuses: {},
};

// Запросы к API
export let statusesGet = () => {
    return Axios.get('statuses');
}

// Создание Action Creators
export let statusesGetActionCreator = (data) => {
    return {
        type: STATUSES_GET,
        data: data,
    };
}

let statusesReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATUSES_GET:
            return {
                ...state,
                statuses: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default statusesReducer;