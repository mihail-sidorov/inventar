import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const DEPARTMENTS_LOCATIONS_SET = 'DEPARTMENTS_LOCATIONS_SET', DEPARTMENT_LOCATION_ADD = 'DEPARTMENT_LOCATION_ADD';

let initialState = {
    departmentsLocations: {},
};

// Запросы к API
export let departmentsLocationsGet = () => {
    return Axios.get('dep_loc');
}

export let departmentLocationAdd = departmentLocation => Axios.post('dep_loc', departmentLocation);
export let departmentLocationEdit = departmentLocation => Axios.patch('dep_loc', departmentLocation);

// Создание Action Creators
export let departmentsLocationsSetActionCreator = (data) => {
    return {
        type: DEPARTMENTS_LOCATIONS_SET,
        data: data,
    };
}

export let departmentLocationAddActionCreator = obj => ({
    type: DEPARTMENT_LOCATION_ADD,
    obj: obj,
});

let departmentsLocationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEPARTMENTS_LOCATIONS_SET:
            return {
                departmentsLocations: arrayToObject(action.data),
            };
        case DEPARTMENT_LOCATION_ADD:
            return {
                departmentsLocations: {
                    ...state.departmentsLocations,
                    [action.obj.id]: action.obj,
                },
            };
        default:
            return state;
    }
}

export default departmentsLocationsReducer;