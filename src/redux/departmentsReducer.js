import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const DEPARTMENTS_SET = 'DEPARTMENTS_SET';

let initialState = {
    departments: {},
};

// Запросы к API
export let departmentsGet = () => {
    return Axios.get('dep_loc_united');
}

// Создание Action Creators
export let departmentsSetActionCreator = (data) => {
    return {
        type: DEPARTMENTS_SET,
        data: data,
    };
}

let departmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEPARTMENTS_SET:
            return {
                ...state,
                departments: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default departmentsReducer;