import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const EMPLOYERS_GET = 'EMPLOYERS_GET', EMPLOYER_ADD = 'EMPLOYER_ADD';

let initialState = {
    employers: {},
};

// Запросы к API
export let employersGet = () => {
    return Axios.get('employers');
}

export let employerAdd = (employer) => {
    return Axios.post('employers', employer);
};

export let employerEdit = (employer) => Axios.patch('employers', employer);

// Создание Action Creators
export let employersGetActionCreator = (data) => {
    return {
        type: EMPLOYERS_GET,
        data: data,
    };
}

export let employerAddActionCreator = (employer) => ({
    type: EMPLOYER_ADD,
    employer: employer,
});

let employersReducer = (state = initialState, action) => {
    switch(action.type) {
        case EMPLOYERS_GET:
            return {
                ...state,
                employers: arrayToObject(action.data),
            };
        case EMPLOYER_ADD:
            return {
                ...state,
                employers: {
                    ...state.employers,
                    [action.employer.id]: action.employer,
                },
            };
        default:
            return state;
    }
}

export default employersReducer;