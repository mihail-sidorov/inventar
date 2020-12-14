import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const POST_DEP_LOCS_GET = 'POST_DEP_LOCS_GET';

let initialState = {
    postDepLocs: {},
};

// Запросы к API
export let postDepLocsGet = (all = false) => {
    let status = 'free';

    if (all) {
        status = 'all';
    }

    return Axios.get(`post_dep_loc_united?status=${status}`);
}

// Создание Action Creators
export let postDepLocsGetActionCreator = (data) => {
    return {
        type: POST_DEP_LOCS_GET,
        data: data,
    };
}

let postDepLocsReducer = (state = initialState, action) => {
    switch(action.type) {
        case POST_DEP_LOCS_GET:
            return {
                ...state,
                postDepLocs: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default postDepLocsReducer;