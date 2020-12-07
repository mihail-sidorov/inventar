import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const EMPLOYERS_GET = 'EMPLOYERS_GET';

let initialState = {
    employers: {},
};

// Запросы к API
export let employersGet = () => {
    return Axios.get('employers');
}

// Создание Action Creators
export let employersGetActionCreator = (data) => {
    return {
        type: EMPLOYERS_GET,
        data: data,
    };
}

let employersReducer = (state = initialState, action) => {
    switch(action.type) {
        case EMPLOYERS_GET:
            return {
                ...state,
                employers: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default employersReducer;