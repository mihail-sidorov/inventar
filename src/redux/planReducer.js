import Axios from "../config/axiosConfig";

const
    INIT_USER_RIGHTS = 'INIT_USER_RIGHTS',
    RESET_PLAN_STATE = 'RESET_PLAN_STATE';

let initialState = {
    role: null,
    userId: null,
    userType: null,
    connectionStatus: null,
    plan: null,
};

// Запросы к API

export let userRights = id => Axios.get(`/userRights?id=${id}`);

// Создание Action Creators

export let initUserRightsActionCreator = data => ({
    type: INIT_USER_RIGHTS,
    data,
});

export let resetPlanStateActionCreator = () => ({
    type: RESET_PLAN_STATE,
});

// Редуктор

let planReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_USER_RIGHTS:
            return {
                ...state,
                ...action.data,
            };
        case RESET_PLAN_STATE:
            return initialState;
        default:
            return state;
    }
};

export default planReducer;