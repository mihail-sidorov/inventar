import Axios from "../config/axiosConfig";

const
    SET_PLAN_STATE = 'SET_PLAN_STATE',
    RESET_PLAN_STATE = 'RESET_PLAN_STATE',
    BLOCK_TITLE_EDIT = 'BLOCK_TITLE_EDIT',
    SECTION_TITLE_EDIT = 'SECTION_TITLE_EDIT',
    ADD_PLAN_BLOCK = 'ADD_PLAN_BLOCK',
    ADD_PLAN_SECTION = 'ADD_PLAN_SECTION',
    DEL_PLAN_BLOCK = 'DEL_PLAN_BLOCK',
    DEL_PLAN_SECTION = 'DEL_PLAN_SECTION',
    CONNECTION_STATUS_CHANGE = 'CONNECTION_STATUS_CHANGE';

let initialState = {
    role: null,
    userId: null,
    userType: null,
    connectionStatus: null,
    plan: null,
};

// Запросы к API

export let userRights = id => Axios.get(`/userRights?id=${id}`);

export let planSave = (id, plan) => Axios.patch('/mentoring', {id, plan});

export let planSend = id => Axios.put('/mentoring', {id});

// Создание Action Creators

export let setPlanStateActionCreator = data => ({
    type: SET_PLAN_STATE,
    data,
});

export let resetPlanStateActionCreator = () => ({
    type: RESET_PLAN_STATE,
});

export let blockTitleEditActionCreator = (value, index) => ({
    type: BLOCK_TITLE_EDIT,
    value,
    index,
});

export let sectionTitleEditActionCreator = (value, indexBlock, indexSection) => ({
    type: SECTION_TITLE_EDIT,
    value,
    indexBlock,
    indexSection,
});

export let addPlanBlockActionCreator = () => ({
    type: ADD_PLAN_BLOCK,
});

export let addPlanSectionActionCreator = indexBlock => ({
    type: ADD_PLAN_SECTION,
    indexBlock,
});

export let delPlanBlockActionCreator = index => ({
    type: DEL_PLAN_BLOCK,
    index,
});

export let delPlanSectionActionCreator = (indexBlock, indexSection) => ({
    type: DEL_PLAN_SECTION,
    indexBlock,
    indexSection,
});

export let connectionStatusChangeActionCreator = status => ({
    type: CONNECTION_STATUS_CHANGE,
    status,
});

// Редуктор

let planReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case SET_PLAN_STATE:
            return {
                ...state,
                ...action.data,
            };
        case RESET_PLAN_STATE:
            return initialState;
        case BLOCK_TITLE_EDIT:
            let block = {...newState.plan.blocks[action.index]};
            block.title = action.value;
            newState.plan = {...newState.plan};
            newState.plan.blocks[action.index] = block;
            return newState;
        case SECTION_TITLE_EDIT:
            let section = {...newState.plan.blocks[action.indexBlock].sections[action.indexSection]};
            section.title = action.value;
            newState.plan = {...newState.plan};
            newState.plan.blocks[action.indexBlock].sections[action.indexSection] = section;
            return newState;
        case ADD_PLAN_BLOCK:
            if (newState.plan === null) {
                newState.plan = {};
                newState.plan.blocks = [];
            }
            else {
                newState.plan = {...newState.plan};
            }
            newState.plan.blocks.push(
                {
                    title: '',
                }
            );
            return newState;
        case ADD_PLAN_SECTION:
            newState.plan = {...newState.plan};
            if (newState.plan.blocks[action.indexBlock].sections === undefined) {
                newState.plan.blocks[action.indexBlock].sections = [];
            }
            newState.plan.blocks[action.indexBlock].sections.push(
                {
                    title: '',
                }
            );
            return newState;
        case DEL_PLAN_BLOCK:
            newState.plan = {...newState.plan};
            newState.plan.blocks.splice(action.index, 1);
            if (newState.plan.blocks.length === 0) {
                newState.plan = null;
            }
            return newState;
        case DEL_PLAN_SECTION:
            newState.plan = {...newState.plan};
            newState.plan.blocks[action.indexBlock].sections.splice(action.indexSection, 1);
            if (newState.plan.blocks[action.indexBlock].sections.length === 0) {
                delete newState.plan.blocks[action.indexBlock].sections;
            }
            return newState;
        case CONNECTION_STATUS_CHANGE:
            return {
                ...state,
                connectionStatus: action.status,
            };
        default:
            return state;
    }
};

export default planReducer;