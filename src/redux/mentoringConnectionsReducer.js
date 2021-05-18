import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const MENTORING_CONNECTIONS_SET = 'MENTORING_CONNECTIONS_SET';

let initialState = {
    mentoringConnections: {},
};

// Запросы к API
export let MentoringConnectionsGet = () => {
    return Axios.get('mentoring');
}

// Создание Action Creators
export let mentoringConnectionsSetActionCreator = (data) => {
    return {
        type: MENTORING_CONNECTIONS_SET,
        data: data,
    };
}

let mentoringConnectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case MENTORING_CONNECTIONS_SET:
            return {
                ...state,
                mentoringConnections: arrayToObject(action.data),
            };
        default:
            return state;
    }
}

export default mentoringConnectionsReducer;