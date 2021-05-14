import { data } from "jquery";
import Axios from "../config/axiosConfig";

const SHOW_COMPONENT_CHANGE = 'SHOW_COMPONENT_CHANGE', MENTORING_SET = 'MENTORING_SET', SHOW_COMPONENTS_SET = 'SHOW_COMPONENTS_SET', MENTOR_SEARCH_SET = 'MENTOR_SEARCH_SET', PROTEGE_SEARCH_SET = 'PROTEGE_SEARCH_SET', MENTOR_ID_SET = 'MENTOR_ID_SET', PROTEGE_ID_SET = 'PROTEGE_ID_SET', RESET_MENTORER_PAGE_STATE = 'RESET_MENTORER_PAGE_STATE';

let initialState = {
    showComponents: {},
    mentoringHr: [],
    mentoringMentor: [],
    mentoringProtege: [],
    mentorSearch: {},
    protegeSearch: {},
    mentorId: null,
    protegeId: null,
};

// Запросы к API

export let mentoringGet = () => Axios.get('/mentoring');

export let mentoringPost = (mentorId, protegeId) => Axios.post('/mentoring', {mentor_id: mentorId, protege_id: protegeId});

// Создание Action Creators

export let showComponentsChangeActionCreator = component => ({
    type: SHOW_COMPONENT_CHANGE,
    component,
});

export let mentoringSetActionCreator = (mentoringHr, mentoringMentor, mentoringProtege) => ({
    type: MENTORING_SET,
    mentoringHr,
    mentoringMentor,
    mentoringProtege,
});

export let showComponentsSetActionCreator = obj => ({
    type: SHOW_COMPONENTS_SET,
    obj,
});

export let mentorSearchSetActionCreator = search => {
    let state = window.store.getState();
    let users = state.usersState.users;
    let mentorId = state.mentorerPageState.mentorId;
    let protegeId = state.mentorerPageState.protegeId;
    let mentorSearch = {};
    let pattern = new RegExp(search.toLowerCase());

    if(search !== '') {
        for (let id in users) {
            if (id != mentorId && id != protegeId && users[id].full_name.toLowerCase().match(pattern)) {
                mentorSearch[id] = users[id];
            }
        }
    }

    return {
        type: MENTOR_SEARCH_SET,
        mentorSearch,
    }
};

export let protegeSearchSetActionCreator = search => {
    let state = window.store.getState();
    let users = state.usersState.users;
    let mentorId = state.mentorerPageState.mentorId;
    let protegeId = state.mentorerPageState.protegeId;
    let protegeSearch = {};
    let pattern = new RegExp(search.toLowerCase());

    if(search !== '') {
        for (let id in users) {
            if (id != mentorId && id != protegeId && users[id].full_name.toLowerCase().match(pattern)) {
                protegeSearch[id] = users[id];
            }
        }
    }

    return {
        type: PROTEGE_SEARCH_SET,
        protegeSearch,
    }
};

export let mentorIdSetActionCreator = id => ({
    type: MENTOR_ID_SET,
    id,
});

export let protegeIdSetActionCreator = id => ({
    type: PROTEGE_ID_SET,
    id,
});

export let resetMentorerPageStateActionCreator = () => ({
    type: RESET_MENTORER_PAGE_STATE,
});

// Редуктор

let mentorerPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_COMPONENT_CHANGE:
            let showComponents = {...state.showComponents};
            for (let component in showComponents) {
                showComponents[component] = false;
            }
            showComponents[action.component] = true;

            return {
                ...state,
                showComponents,
            };
        case MENTORING_SET:
            return {
                ...state,
                mentoringHr: action.mentoringHr,
                mentoringMentor: action.mentoringMentor,
                mentoringProtege: action.mentoringProtege,
            };
        case SHOW_COMPONENTS_SET:
            return {
                ...state,
                showComponents: action.obj,
            };
        case MENTOR_SEARCH_SET:
            return {
                ...state,
                mentorSearch: action.mentorSearch,
            };
        case PROTEGE_SEARCH_SET:
            return {
                ...state,
                protegeSearch: action.protegeSearch,
            };
        case MENTOR_ID_SET:
            return {
                ...state,
                mentorId: action.id,
            };
        case PROTEGE_ID_SET:
            return {
                ...state,
                protegeId: action.id,
            };
        case RESET_MENTORER_PAGE_STATE:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default mentorerPageReducer;