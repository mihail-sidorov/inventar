import Axios from "../config/axiosConfig";
import arrayToObject from "../functions/arrayToObject";

const EVENTS_GET = 'EVENTS_GET';

let initialState = {
    events: {},
};

// Запросы к API
export let eventsGet = () => {
    return Axios.get('events?all=true');
}

// Создание Action Creators
export let eventsGetActionCreator = (data) => {
    return {
        type: EVENTS_GET,
        data: data,
    };
}

let eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case EVENTS_GET:
            let events = {};
            action.data.forEach(element => {
                events[[element.history_id, element.event_confirm_preset_id]] = element;
            });

            return {
                ...state,
                events: events,
            };
        default:
            return state;
    }
}

export default eventsReducer;