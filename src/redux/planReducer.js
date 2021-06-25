import Axios from "../config/axiosConfig";
import arrayMove from 'array-move';
import mentoringFileLoad from "../functions/mentoringFileLoad";

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
    PLAN_TEST_FINISH = 'PLAN_TEST_FINISH',
    MOVE_PLAN_BLOCK = 'MOVE_PLAN_BLOCK',
    MOVE_PLAN_SECTION = 'MOVE_PLAN_SECTION',
    ADD_IMAGE_TO_TEST = 'ADD_IMAGE_TO_TEST',
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    CHANGE_TASK_DESC = 'CHANGE_TASK_DESC',
    DEL_TASK = 'DEL_TASK',
    ADD_FILE_TO_TASK_BY_MENTOR = 'ADD_FILE_TO_TASK_BY_MENTOR',
    ADD_PLAN_TASK = 'ADD_PLAN_TASK',
    DEL_PLAN_TASK = 'DEL_PLAN_TASK',
    CHANGE_PLAN_TASK_TITLE = 'CHANGE_PLAN_TASK_TITLE',
    CHANGE_PLAN_TASK_DESC = 'CHANGE_PLAN_TASK_DESC',
    CHANGE_TASK_ANSWER_COMMENT = 'CHANGE_TASK_ANSWER_COMMENT',
    CHANGE_PLAN_TASK_ANSWER_COMMENT = 'CHANGE_PLAN_TASK_ANSWER_COMMENT',
    ADD_FILE_TO_TASK_ANSWER = 'ADD_FILE_TO_TASK_ANSWER',
    UPDATE_PLAN = 'UPDATE_PLAN',
    CHANGE_TASK_GRADE = 'CHANGE_TASK_GRADE';

let initialState = {
    userId: null,
    userType: null,
    connectionStatus: null,
    plan: null,
};

// Запросы к API

export let userRights = id => Axios.get(`/userRights?id=${id}`);

export let planSave = (id, plan) => Axios.patch('/mentoring', {id, plan});

export let planSaveProtege = (id, plan) => Axios.patch('/mentoringProtege', {id, plan});

export let planSaveMentor = (id, plan) => Axios.patch('/mentoringMentor', {id, plan});

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

export let movePlanBlockActionCreator = (from, to) => ({
    type: MOVE_PLAN_BLOCK,
    from,
    to,
});

export let movePlanSectionActionCreator = (bIndex, from, to) => ({
    type: MOVE_PLAN_SECTION,
    bIndex,
    from,
    to,
});

export let addImageToTestActionCreator = (path, bIndex, qIndex, aIndex) => ({
    type: ADD_IMAGE_TO_TEST,
    path,
    bIndex,
    qIndex,
    aIndex,
});

export let addTaskActionCreator = bIndex => ({
    type: ADD_TASK,
    bIndex,
});

export let changeTaskTitleActionCreator = (title, bIndex) => ({
    type: CHANGE_TASK_TITLE,
    title,
    bIndex,
});

export let changePlanTaskTitleActionCreator = title => ({
    type: CHANGE_PLAN_TASK_TITLE,
    title,
});

export let changeTaskDescActionCreator = (desc, bIndex) => ({
    type: CHANGE_TASK_DESC,
    desc,
    bIndex,
});

export let changePlanTaskDescActionCreator = desc => ({
    type: CHANGE_PLAN_TASK_DESC,
    desc,
});

export let delTaskActionCreator = bIndex => ({
    type: DEL_TASK,
    bIndex,
});

export let delPlanTaskActionCreator = () => ({
    type: DEL_PLAN_TASK,
});

export let addFileToTaskByMentorActionCreator = (path, bIndex) => ({
    type: ADD_FILE_TO_TASK_BY_MENTOR,
    path,
    bIndex,
});

export let addPlanTaskActionCreator = () => ({
    type: ADD_PLAN_TASK,
});

export let changeTaskAnswerCommentActionCreator = (value, bIndex) => ({
    type: CHANGE_TASK_ANSWER_COMMENT,
    value,
    bIndex,
});

export let changePlanTaskAnswerCommentActionCreator = value => ({
    type: CHANGE_PLAN_TASK_ANSWER_COMMENT,
    value,
});

export let addFileToTaskAnswerActionCreator = (path, bIndex) => ({
    type: ADD_FILE_TO_TASK_ANSWER,
    path,
    bIndex,
});

export let updatePlanActionCreator = plan => ({
    type: UPDATE_PLAN,
    plan,
});

export let changeTaskGradeActionCreator = (value, bIndex) => ({
    type: CHANGE_TASK_GRADE,
    value,
    bIndex,
});

// Thunks

export let loadImageToTestThunk = (file, cId, bIndex, qIndex, aIndex) => async (dispatch) => {
    let path = (await mentoringFileLoad(file, cId)).data.path;
    dispatch(addImageToTestActionCreator(path, bIndex, qIndex, aIndex));
};

export let loadFileToTaskByMentorThunk = (file, cId, bIndex) => async dispatch => {
    let path = (await mentoringFileLoad(file, cId)).data.path;
    dispatch(addFileToTaskByMentorActionCreator(path, bIndex));
};

export let loadFileToTaskAnswerThunk = (file, cId, bIndex) => async dispatch => {
    let path = (await mentoringFileLoad(file, cId)).data.path;
    dispatch(addFileToTaskAnswerActionCreator(path, bIndex));
};

export let planSaveProtegeThunk = planId => async (dispatch, getState) => {
    let {plan} = (await planSaveProtege(planId, getState().planState.plan)).data;
    dispatch(updatePlanActionCreator(plan));
};

export let sendTaskForCheckingThunk = (planId, bIndex) => async (dispatch, getState) => {
    let plan = getState().planState.plan;
    if (bIndex !== undefined) {
        plan.blocks[bIndex].task.checking = 'checking';
    }
    else {
        plan.task.checking = 'checking';
    }
    plan = (await planSaveProtege(planId, plan)).data.plan;
    dispatch(updatePlanActionCreator(plan));
};

export let planSaveMentorThunk = planId => async (dispatch, getState) => {
    let {plan} = (await planSaveMentor(planId, getState().planState.plan)).data;
    dispatch(updatePlanActionCreator(plan));
};

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
                        },
                        {
                            title: '',
                        },
                        {
                            title: '',
                        },
                        {
                            title: '',
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
                        },
                        {
                            title: '',
                        },
                        {
                            title: '',
                        },
                        {
                            title: '',
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
            newState.plan = {...newState.plan};
            newState.plan.blocks[action.bIndex].test.status = 'complete';
            return newState;
        case PLAN_TEST_FINISH:
            newState.plan = {...newState.plan};
            newState.plan.test.status = 'complete';
            return newState;
        case MOVE_PLAN_BLOCK:
            newState.plan = {...newState.plan};
            arrayMove.mutate(newState.plan.blocks, action.from, action.to);
            return newState;
        case MOVE_PLAN_SECTION:
            newState.plan = {...newState.plan};
            arrayMove.mutate(newState.plan.blocks[action.bIndex].sections, action.from, action.to);
            return newState;
        case ADD_IMAGE_TO_TEST:
            if (action.bIndex !== undefined) {
                state.plan.blocks[action.bIndex].test = {...state.plan.blocks[action.bIndex].test};
                if (action.aIndex === undefined) {
                    state.plan.blocks[action.bIndex].test.questions[action.qIndex].img = action.path;
                }
                else {
                    state.plan.blocks[action.bIndex].test.questions[action.qIndex].answers[action.aIndex].img = action.path;
                }
            }
            else {
                state.plan.test = {...state.plan.test};
                if (action.aIndex === undefined) {
                    state.plan.test.questions[action.qIndex].img = action.path;
                }
                else {
                    state.plan.test.questions[action.qIndex].answers[action.aIndex].img = action.path;
                }
            }
            return state;
        case ADD_TASK:
            newState.plan = {...newState.plan};
            newState.plan.blocks[action.bIndex].task = {
                title: '',
                desc: '',
            };
            return newState;
        case CHANGE_TASK_TITLE:
            state.plan.blocks[action.bIndex].task = {...state.plan.blocks[action.bIndex].task};
            state.plan.blocks[action.bIndex].task.title = action.title;
            return state;
        case CHANGE_TASK_DESC:
            state.plan.blocks[action.bIndex].task = {...state.plan.blocks[action.bIndex].task};
            state.plan.blocks[action.bIndex].task.desc = action.desc;
            return state;
        case DEL_TASK:
            newState.plan = {...newState.plan};
            delete newState.plan.blocks[action.bIndex].task;
            return newState;
        case ADD_FILE_TO_TASK_BY_MENTOR:
            if (action.bIndex !== undefined) {
                state.plan.blocks[action.bIndex].task = {...state.plan.blocks[action.bIndex].task};
                state.plan.blocks[action.bIndex].task.file = action.path;
            }
            else {
                state.plan.task = {...state.plan.task};
                state.plan.task.file = action.path;
            }
            return state;
        case ADD_PLAN_TASK:
            newState.plan = {...newState.plan};
            newState.plan.task = {
                title: '',
                desc: '',
            };
            return newState;
        case DEL_PLAN_TASK:
            newState.plan = {...newState.plan};
            delete newState.plan.task;
            return newState;
        case CHANGE_PLAN_TASK_TITLE:
            state.plan.task = {...state.plan.task};
            state.plan.task.title = action.title;
            return state;
        case CHANGE_PLAN_TASK_DESC:
            state.plan.task = {...state.plan.task};
            state.plan.task.desc = action.desc;
            return state;
        case CHANGE_TASK_ANSWER_COMMENT:
            state.plan.blocks[action.bIndex].task = {...state.plan.blocks[action.bIndex].task};
            if (state.plan.blocks[action.bIndex].task.answer === undefined) {
                state.plan.blocks[action.bIndex].task.answer = {
                    comment: '',
                };
            }
            state.plan.blocks[action.bIndex].task.answer.comment = action.value;
            return state;
        case CHANGE_PLAN_TASK_ANSWER_COMMENT:
            state.plan.task = {...state.plan.task};
            if (state.plan.task.answer === undefined) {
                state.plan.task.answer = {
                    comment: '',
                };
            }
            state.plan.task.answer.comment = action.value;
            return state;
        case ADD_FILE_TO_TASK_ANSWER:
            if (action.bIndex === undefined) {
                state.plan.task = {...state.plan.task};
                if (state.plan.task.answer === undefined) {
                    state.plan.task.answer = {
                        comment: '',
                    };
                }
                state.plan.task.answer.file = action.path;
            }
            else {
                state.plan.blocks[action.bIndex].task = {...state.plan.blocks[action.bIndex].task};
                if (state.plan.blocks[action.bIndex].task.answer === undefined) {
                    state.plan.blocks[action.bIndex].task.answer = {
                        comment: '',
                    };
                }
                state.plan.blocks[action.bIndex].task.answer.file = action.path;
            }
            return state;
        case UPDATE_PLAN:
            return {
                ...state,
                plan: action.plan,
            };
        case CHANGE_TASK_GRADE:
            if (action.bIndex !== undefined) {
                state.plan.blocks[action.bIndex].task = {...state.plan.blocks[action.bIndex].task};
                state.plan.blocks[action.bIndex].task.grade = action.value;
            }
            else {
                state.plan.task = {...state.plan.task};
                state.plan.task.grade = action.value;
            }
            return state;
        default:
            return state;
    }
};

export default planReducer;