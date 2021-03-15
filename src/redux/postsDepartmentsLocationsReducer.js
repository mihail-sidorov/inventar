import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const POSTS_DEPARTMENTS_LOCATIONS_SET = 'POSTS_DEPARTMENTS_LOCATIONS_SET', POST_DEPARTMENT_LOCATION_ADD = 'POST_DEPARTMENT_LOCATION_ADD';

let initialState = {
    postsDepartmentsLocations: {},
};

// Запросы к API
export let postsDepartmentsLocationsGet = () => {
    return Axios.get('post_dep_loc');
}

export let postDepartmentLocationAdd = obj => Axios.post('post_dep_loc', obj);
export let postDepartmentLocationEdit = obj => Axios.patch('post_dep_loc', obj);

// Создание Action Creators
export let postsDepartmentsLocationsSetActionCreator = (data) => {
    return {
        type: POSTS_DEPARTMENTS_LOCATIONS_SET,
        data: data,
    };
}

export let postDepartmentLocationAddActionCreator = obj => ({
    type: POST_DEPARTMENT_LOCATION_ADD,
    obj: obj,
});

let postsDepartmentsLocationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_DEPARTMENTS_LOCATIONS_SET:
            return {
                postsDepartmentsLocations: arrayToObject(action.data),
            };
        case POST_DEPARTMENT_LOCATION_ADD:
            return {
                postsDepartmentsLocations: {
                    ...state.postsDepartmentsLocations,
                    [action.obj.id]: action.obj,
                },
            };
        default:
            return state;
    }
}

export default postsDepartmentsLocationsReducer;