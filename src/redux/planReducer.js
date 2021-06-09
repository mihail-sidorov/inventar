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
    CONNECTION_STATUS_CHANGE = 'CONNECTION_STATUS_CHANGE',
    ADD_TEST = 'ADD_TEST',
    ADD_TEST_QUESTION = 'ADD_TEST_QUESTION',
    TEST_TITLE_CHANGE = 'TEST_TITLE_CHANGE',
    TEST_QUESTION_TITLE_CHANGE = 'TEST_QUESTION_TITLE_CHANGE',
    DEL_TEST_QUESTION = 'DEL_TEST_QUESTION',
    DEL_TEST = 'DEL_TEST',
    TEST_QUESTION_ANSWER_TITLE_CHANGE = 'TEST_QUESTION_ANSWER_TITLE_CHANGE',
    TEST_QUESTION_ANSWER_SET_RIGHT = 'TEST_QUESTION_ANSWER_SET_RIGHT',
    ADD_PLAN_TEST = 'ADD_PLAN_TEST',
    ADD_PLAN_TEST_QUESTION = 'ADD_PLAN_TEST_QUESTION',
    PLAN_TEST_TITLE_CHANGE = 'PLAN_TEST_TITLE_CHANGE',
    PLAN_TEST_QUESTION_TITLE_CHANGE = 'PLAN_TEST_QUESTION_TITLE_CHANGE',
    DEL_PLAN_TEST_QUESTION = 'DEL_PLAN_TEST_QUESTION',
    DEL_PLAN_TEST = 'DEL_PLAN_TEST',
    PLAN_TEST_QUESTION_ANSWER_TITLE_CHANGE = 'PLAN_TEST_QUESTION_ANSWER_TITLE_CHANGE',
    PLAN_TEST_QUESTION_ANSWER_SET_RIGHT = 'PLAN_TEST_QUESTION_ANSWER_SET_RIGHT',
    TEST_QUESTION_ANSWER_SET_PICK = 'TEST_QUESTION_ANSWER_SET_PICK',
    TEST_FINISH = 'TEST_FINISH',
    PLAN_TEST_QUESTION_ANSWER_SET_PICK = 'PLAN_TEST_QUESTION_ANSWER_SET_PICK',
    PLAN_TEST_FINISH = 'PLAN_TEST_FINISH';

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

export let addTestActionCreator = blockIndex => ({
    type: ADD_TEST,
    blockIndex,
});

export let addTestQuestionActionCreator = blockIndex => ({
    type: ADD_TEST_QUESTION,
    blockIndex,
});

export let testTitleChangeActionCreator = (value, blockIndex) => ({
    type: TEST_TITLE_CHANGE,
    value,
    blockIndex,
});

export let testQuestionTitleChangeActionCreator = (value, blockIndex, index) => ({
    type: TEST_QUESTION_TITLE_CHANGE,
    value,
    blockIndex,
    index,
});

export let delTestQuestionActionCreator = (blockIndex, index) => ({
    type: DEL_TEST_QUESTION,
    blockIndex,
    index,
});

export let delTestActionCreator = blockIndex => ({
    type: DEL_TEST,
    blockIndex,
});

export let testQuestionAnswerTitleChangeActionCreator = (value, bIndex, qIndex, aIndex) => ({
    type: TEST_QUESTION_ANSWER_TITLE_CHANGE,
    value,
    bIndex,
    qIndex,
    aIndex,
});

export let testQuestionAnswerSetRightActionCreator = (bIndex, qIndex, aIndex) => ({
    type: TEST_QUESTION_ANSWER_SET_RIGHT,
    bIndex,
    qIndex,
    aIndex,
});

export let testQuestionAnswerSetPickActionCreator = (bIndex, qIndex, aIndex) => ({
    type: TEST_QUESTION_ANSWER_SET_PICK,
    bIndex,
    qIndex,
    aIndex,
});

export let testFinishActionCreator = bIndex => ({
    type: TEST_FINISH,
    bIndex,
});






export let addPlanTestActionCreator = () => ({
    type: ADD_PLAN_TEST,
});

export let addPlanTestQuestionActionCreator = () => ({
    type: ADD_PLAN_TEST_QUESTION,
});

export let planTestTitleChangeActionCreator = value => ({
    type: PLAN_TEST_TITLE_CHANGE,
    value,
});

export let planTestQuestionTitleChangeActionCreator = (value, qIndex) => ({
    type: PLAN_TEST_QUESTION_TITLE_CHANGE,
    value,
    qIndex,
});

export let delPlanTestQuestionActionCreator = index => ({
    type: DEL_PLAN_TEST_QUESTION,
    index,
});

export let delPlanTestActionCreator = () => ({
    type: DEL_PLAN_TEST,
});

export let planTestQuestionAnswerTitleChangeActionCreator = (value, qIndex, aIndex) => ({
    type: PLAN_TEST_QUESTION_ANSWER_TITLE_CHANGE,
    value,
    qIndex,
    aIndex,
});

export let planTestQuestionAnswerSetRightActionCreator = (qIndex, aIndex) => ({
    type: PLAN_TEST_QUESTION_ANSWER_SET_RIGHT,
    qIndex,
    aIndex,
});

export let planTestQuestionAnswerSetPickActionCreator = (qIndex, aIndex) => ({
    type: PLAN_TEST_QUESTION_ANSWER_SET_PICK,
    qIndex,
    aIndex,
});

export let planTestFinishActionCreator = () => ({
    type: PLAN_TEST_FINISH,
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
        case ADD_TEST:
            newState.plan = {...newState.plan};
            if (newState.plan.blocks[action.blockIndex].test === undefined ) {
                newState.plan.blocks[action.blockIndex].test = {};
                newState.plan.blocks[action.blockIndex].test.status = 'uncomplete';
                newState.plan.blocks[action.blockIndex].test.title = '';
            }
            return newState;
        case ADD_TEST_QUESTION:
            if (newState.plan.blocks[action.blockIndex].test.questions === undefined) {
                newState.plan.blocks[action.blockIndex].test.questions = [];
            }
            newState.plan.blocks[action.blockIndex].test.questions.push(
                {
                    title: '',
                    answers: [
                        {
                            title: '',
                            isRight: false,
                            isPick: false,
                        },
                        {
                            title: '',
                            isRight: false,
                            isPick: false,
                        },
                        {
                            title: '',
                            isRight: false,
                            isPick: false,
                        },
                        {
                            title: '',
                            isRight: false,
                            isPick: false,
                        },
                    ],
                }
            );
            newState.plan.blocks[action.blockIndex].test = {...newState.plan.blocks[action.blockIndex].test};
            return newState;
        case TEST_TITLE_CHANGE:
            state.plan.blocks[action.blockIndex].test.title = action.value;
            state.plan.blocks[action.blockIndex].test = {...state.plan.blocks[action.blockIndex].test};
            return state;
        case TEST_QUESTION_TITLE_CHANGE:
            state.plan.blocks[action.blockIndex].test.questions[action.index].title = action.value;
            state.plan.blocks[action.blockIndex].test = {...state.plan.blocks[action.blockIndex].test};
            return state;
        case DEL_TEST_QUESTION:
            state.plan.blocks[action.blockIndex].test.questions.splice(action.index, 1);
            if (state.plan.blocks[action.blockIndex].test.questions.length === 0) {
                delete state.plan.blocks[action.blockIndex].test.questions;
            }
            state.plan.blocks[action.blockIndex].test = {...state.plan.blocks[action.blockIndex].test};
            return state;
        case DEL_TEST:
            delete newState.plan.blocks[action.blockIndex].test;
            newState.plan = {...newState.plan};
            return newState;
        case TEST_QUESTION_ANSWER_TITLE_CHANGE:
            state.plan.blocks[action.bIndex].test.questions[action.qIndex].answers[action.aIndex].title = action.value;
            state.plan.blocks[action.bIndex].test = {...state.plan.blocks[action.bIndex].test};
            return state;
        case TEST_QUESTION_ANSWER_SET_RIGHT:
            state.plan.blocks[action.bIndex].test.questions[action.qIndex].answers.forEach(el => {
                el.isRight = false;
            });
            state.plan.blocks[action.bIndex].test.questions[action.qIndex].answers[action.aIndex].isRight = true;
            state.plan.blocks[action.bIndex].test = {...state.plan.blocks[action.bIndex].test};
            return state;
        case TEST_QUESTION_ANSWER_SET_PICK:
            state.plan.blocks[action.bIndex].test.questions[action.qIndex].answers.forEach(el => {
                el.isPick = false;
            });
            state.plan.blocks[action.bIndex].test.questions[action.qIndex].answers[action.aIndex].isPick = true;
            state.plan.blocks[action.bIndex].test = {...state.plan.blocks[action.bIndex].test};
            return state;
        case ADD_PLAN_TEST:
            newState.plan = {...newState.plan};
            if (newState.plan.test === undefined ) {
                newState.plan.test = {};
                newState.plan.test.status = 'uncomplete';
                newState.plan.test.title = '';
            }
            return newState;
        case ADD_PLAN_TEST_QUESTION:
            if (state.plan.test.questions === undefined) {
                state.plan.test.questions = [];
            }
            state.plan.test.questions.push(
                {
                    title: '',
                    answers: [
                        {
                            title: '',
                            isRight: false,
                            isPick: false,
                        },
                        {
                            title: '',
                            isRight: false,
                            isPick: false,
                        },
                        {
                            title: '',
                            isRight: false,
                            isPick: false,
                        },
                        {
                            title: '',
                            isRight: false,
                            isPick: false,
                        },
                    ],
                }
            );
            state.plan.test = {...state.plan.test};
            return state;
        case PLAN_TEST_TITLE_CHANGE:
            state.plan.test.title = action.value;
            state.plan.test = {...state.plan.test};
            return state;
        case PLAN_TEST_QUESTION_TITLE_CHANGE:
            state.plan.test.questions[action.qIndex].title = action.value;
            state.plan.test = {...state.plan.test};
            return state;
        case DEL_PLAN_TEST_QUESTION:
            state.plan.test.questions.splice(action.index, 1);
            if (state.plan.test.questions.length === 0) {
                delete state.plan.test.questions;
            }
            state.plan.test = {...state.plan.test};
            return state;
        case DEL_PLAN_TEST:
            delete newState.plan.test;
            newState.plan = {...newState.plan};
            return newState;
        case PLAN_TEST_QUESTION_ANSWER_TITLE_CHANGE:
            state.plan.test.questions[action.qIndex].answers[action.aIndex].title = action.value;
            state.plan.test = {...state.plan.test};
            return state;
        case PLAN_TEST_QUESTION_ANSWER_SET_RIGHT:
            state.plan.test.questions[action.qIndex].answers.forEach(el => {
                el.isRight = false;
            });
            state.plan.test.questions[action.qIndex].answers[action.aIndex].isRight = true;
            state.plan.test = {...state.plan.test};
            return state;
        case PLAN_TEST_QUESTION_ANSWER_SET_PICK:
            state.plan.test.questions[action.qIndex].answers.forEach(el => {
                el.isPick = false;
            });
            state.plan.test.questions[action.qIndex].answers[action.aIndex].isPick = true;
            state.plan.test = {...state.plan.test};
            return state;
        case TEST_FINISH:
            newState.plan = {...newState.plan}
            newState.plan.blocks[action.bIndex].test.status = 'complete';
            return newState;
        case PLAN_TEST_FINISH:
            newState.plan = {...newState.plan}
            newState.plan.test.status = 'complete';
            return newState;
        default:
            return state;
    }
};

export default planReducer;