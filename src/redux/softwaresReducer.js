import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const SOFTWARES_GET = 'SOFTWARES_GET', SOFTWARES_POST = 'SOFTWARES_POST', UPDATE_SOFTWARE = 'UPDATE_SOFTWARE';

let initialState = {
    softwares: {},
};

// Запросы к API
export let softwaresGet = () => {
    return Axios.get('softwares');
}

export let softwaresPost = (softwareObj) => {
    return Axios.post('softwares', softwareObj);
}

export let softwaresPatch = (softwareObj) => {
    return Axios.patch('softwares', softwareObj);
}

// Создание Action Creators
export let softwaresGetActionCreator = (data) => {
    return {
        type: SOFTWARES_GET,
        data: data,
    };
}

export let softwaresPostActionCreator = (softwareObj) => {
    return {
        type: SOFTWARES_POST,
        softwareObj: softwareObj,
    };
}

export let updateSoftwareActionCreator = obj => ({
    type: UPDATE_SOFTWARE,
    obj,
});

let softwaresReducer = (state = initialState, action) => {
    switch (action.type) {
        case SOFTWARES_GET:
            return {
                ...state,
                softwares: arrayToObject(action.data),
            };
        case SOFTWARES_POST:
            let softwares = {...state.softwares};
            softwares[action.softwareObj.id] = action.softwareObj;
            return {
                ...state,
                softwares: {
                    ...state.softwares,
                    [action.softwareObj.id]: action.softwareObj,
                },
            };
        case UPDATE_SOFTWARE:
            return {
                ...state,
                softwares: {
                    ...state.softwares,
                    [action.obj.id]: action.obj,
                },
            };
        default:
            return state;
    }
}

export default softwaresReducer;