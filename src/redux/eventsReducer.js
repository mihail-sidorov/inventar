import Axios from "../config/axiosConfig";

const EVENTS_GET = 'EVENTS_GET', UPDATE_EVENTS_AFTER_ACCEPT_OR_REJECT = 'UPDATE_EVENTS_AFTER_ACCEPT_OR_REJECT';

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

export let updateEventsAfterAcceptOrRejectActionCreator = events => ({
    type: UPDATE_EVENTS_AFTER_ACCEPT_OR_REJECT,
    events: events,
});

let eventsReducer = (state = initialState, action) => {
    let events;
    switch (action.type) {
        case EVENTS_GET:
            events = {};
            action.data.forEach(element => {
                events[[element.history_id, element.event_confirm_preset_id]] = element;
            });

            return {
                ...state,
                events: events,
            };
        case UPDATE_EVENTS_AFTER_ACCEPT_OR_REJECT:
            events = {...state.events};
            action.events.forEach(event => {
                events[`${event.history_id},${event.event_confirm_preset_id}`] = event;
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