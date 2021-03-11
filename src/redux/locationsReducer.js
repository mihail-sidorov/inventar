import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const LOCATIONS_GET = 'LOCATIONS_GET', LOCATION_ADD = 'LOCATION_ADD';

let initialState = {
    locations: {},
};

// Запросы к API
export let locationsGet = () => {
    return Axios.get('locations');
}

export let locationAdd = location => Axios.post('locations', location);

export let locationEdit = location => Axios.patch('locations', location);

// Создание Action Creators
export let locationsGetActionCreator = (data) => {
    return {
        type: LOCATIONS_GET,
        data: data,
    };
}

export let locationAddActionCreator = location => ({
    type: LOCATION_ADD,
    location: location,
});

let locationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCATIONS_GET:
            return {
                ...state,
                locations: arrayToObject(action.data),
            };
        case LOCATION_ADD:
            return {
                locations: {
                    ...state.locations,
                    [action.location.id]: action.location,
                },
            };
        default:
            return state;
    }
}

export default locationsReducer;