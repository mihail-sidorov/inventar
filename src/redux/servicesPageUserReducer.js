import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const USER_SERVICES_SET = 'USER_SERVICES_SET';

let initialState = {
    userServices: {},
};

// Запросы к API
export let userServicesGet = (userId) => Axios.get(`account_owners?userId=${userId}`);

// Создание Action Creators
export let userServicesSetActionCreator = data => ({
    type: USER_SERVICES_SET,
    data: data,
});

let servicesPageUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SERVICES_SET:
            return {
                ...state,
                userServices: arrayToObject(action.data),
            };
        default:
            return state;
    }
};

export default servicesPageUserReducer;