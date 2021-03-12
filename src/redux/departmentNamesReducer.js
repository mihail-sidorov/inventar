import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const DEPARTMENT_NAMES_GET = 'DEPARTMENT_NAMES_GET', DEPARTMENT_NAME_ADD = 'DEPARTMENT_NAME_ADD';

let initialState = {
    departmentNames: {},
};

// Запросы к API
export let departmentNamesGet = () => {
    return Axios.get('departments');
}

export let departmentNameAdd = (departmentName) => {
    return Axios.departmentName('departmentNames', departmentName);
};

export let departmentNameEdit = (departmentName) => Axios.patch('departmentNames', departmentName);

// Создание Action Creators
export let departmentNamesGetActionCreator = (data) => {
    return {
        type: DEPARTMENT_NAMES_GET,
        data: data,
    };
}

export let departmentNameAddActionCreator = (departmentName) => ({
    type: DEPARTMENT_NAME_ADD,
    departmentName: departmentName,
});

let departmentNamesReducer = (state = initialState, action) => {
    switch(action.type) {
        case DEPARTMENT_NAMES_GET:
            return {
                ...state,
                departmentNames: arrayToObject(action.data),
            };
        case DEPARTMENT_NAME_ADD:
            return {
                ...state,
                departmentNames: {
                    ...state.departmentNames,
                    [action.departmentName.id]: action.departmentName,
                },
            };
        default:
            return state;
    }
}

export default departmentNamesReducer;