import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const RESPONSIBLES_GET = 'RESPONSIBLES_GET';

let initialState = {
    responsibles: {},
};

// Запросы к API
export let responsiblesGet = () => {
    return Axios.get('warehouseResponsible');
}

// Создание Action Creators
export let responsiblesGetActionCreator = (data) => {
    return {
        type: RESPONSIBLES_GET,
        data: data,
    };
}

let responsiblesReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESPONSIBLES_GET:
            return {
                ...state,
                responsibles: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default responsiblesReducer;